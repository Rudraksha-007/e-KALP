#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# test_citizen_problems.sh
#
# End-to-end tests for:
#   POST /citizen/reportProblem
#   GET  /citizen/myProblems
#
# Requires: curl, jq.
# -----------------------------------------------------------------------------

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8000}"
RUN_ID="$(date +%s)$$"

# Two distinct citizens for isolation tests
PHONE_A="$(printf '%010d' $(( (RUN_ID % 9000000000) + 1000000000 )))"
PHONE_B="$(printf '%010d' $(( ((RUN_ID + 1) % 9000000000) + 1000000000 )))"

SPOC_EMAIL="spoc_${RUN_ID}@example.com"
PASS="SuperSecret123"

# A 1×1 transparent PNG, base64.
# Decodes to 67 bytes — small enough to inline, real enough to prove the
# base64 path works end-to-end.
PNG_B64="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="

# Colors
if [[ -t 1 ]]; then
  RED='\033[0;31m'; GRN='\033[0;32m'; YLW='\033[0;33m'
  CYN='\033[0;36m'; BLD='\033[1m';    RST='\033[0m'
else
  RED=''; GRN=''; YLW=''; CYN=''; BLD=''; RST=''
fi

# -----------------------------------------------------------------------------
# Helpers
# -----------------------------------------------------------------------------
pretty() { jq -C . 2>/dev/null || cat; }
section() {
  echo
  echo -e "${BLD}${CYN}═══════════════ $* ═══════════════${RST}"
}
banner() {
  echo
  echo -e "${BLD}${CYN}─────────────── $* ───────────────${RST}"
}
ok()   { echo -e "${GRN}✅ $*${RST}"; }
warn() { echo -e "${YLW}⚠️  $*${RST}"; }
fail() { echo -e "${RED}❌ $*${RST}" >&2; exit 1; }

# Generic request. Args: METHOD URL [TOKEN] [JSON_BODY]
# Sets: HTTP_STATUS, HTTP_BODY
request() {
  local method="$1" url="$2" token="${3:-}" body="${4:-}"
  local raw args=(-sS -w $'\n%{http_code}' -X "$method" "$url")
  [[ -n "$token" ]] && args+=(-H "Authorization: Bearer $token")
  if [[ -n "$body" ]]; then
    args+=(-H 'Content-Type: application/json' -d "$body")
  fi
  raw="$(curl "${args[@]}")"
  HTTP_STATUS="$(printf '%s' "$raw" | tail -n1)"
  HTTP_BODY="$(printf '%s' "$raw" | sed '$d')"
}

post() { request POST "$@"; }
get()  { request GET  "$@"; }

expect_status() {
  local want="$1"
  if [[ "$HTTP_STATUS" != "$want" ]]; then
    echo -e "${RED}❌ Expected HTTP $want, got $HTTP_STATUS${RST}"
    echo "$HTTP_BODY" | pretty
    exit 1
  fi
}

# -----------------------------------------------------------------------------
# Header + liveness
# -----------------------------------------------------------------------------
echo "======================================================================"
echo " Citizen problems smoke test"
echo " BASE_URL : $BASE_URL"
echo " RUN_ID   : $RUN_ID"
echo " phone A  : $PHONE_A"
echo " phone B  : $PHONE_B"
echo "======================================================================"

if ! curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL/" | grep -qE '^2'; then
  fail "Server at $BASE_URL is not responding. Is uvicorn running?"
fi

# =============================================================================
# 0) SETUP — create two citizens, one SPOC, one team lead
# =============================================================================
section "0) SETUP"

banner "0a) citizen A signup"
post "$BASE_URL/auth/citizen/signup" "" "$(cat <<JSON
{
  "name": "Peasant A",
  "phone": "${PHONE_A}",
  "password": "${PASS}",
  "longitude": 77.5946,
  "latitude": 12.9716,
  "occupation": "farmer",
  "age": 34,
  "gender": "F",
  "uni_token": null
}
JSON
)"
expect_status 201
CITIZEN_A_ID="$(echo "$HTTP_BODY" | jq -r '.data.id')"
ok "citizen A: id=$CITIZEN_A_ID"

banner "0b) citizen A login"
post "$BASE_URL/auth/citizen/login" "" "$(cat <<JSON
{ "phone": "${PHONE_A}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_A="$(echo "$HTTP_BODY" | jq -r '.access_token')"
[[ -n "$TOKEN_A" && "$TOKEN_A" != "null" ]] || fail "no token A"
ok "citizen A token acquired"

banner "0c) citizen B signup + login"
post "$BASE_URL/auth/citizen/signup" "" "$(cat <<JSON
{
  "name": "Peasant B",
  "phone": "${PHONE_B}",
  "password": "${PASS}",
  "longitude": 72.8777,
  "latitude": 19.0760,
  "occupation": "tailor",
  "age": 27,
  "gender": "M",
  "uni_token": null
}
JSON
)"
expect_status 201
CITIZEN_B_ID="$(echo "$HTTP_BODY" | jq -r '.data.id')"
ok "citizen B: id=$CITIZEN_B_ID"

post "$BASE_URL/auth/citizen/login" "" "$(cat <<JSON
{ "phone": "${PHONE_B}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_B="$(echo "$HTTP_BODY" | jq -r '.access_token')"
ok "citizen B token acquired"

banner "0d) SPOC signup + login (for role-mismatch tests)"
post "$BASE_URL/auth/spocuni/signup" "" "$(cat <<JSON
{
  "uni_name": "Isolation Test University ${RUN_ID}",
  "name": "SPOC ${RUN_ID}",
  "email": "${SPOC_EMAIL}",
  "subject_expertise": ["ai"],
  "password": "${PASS}"
}
JSON
)"
expect_status 201
post "$BASE_URL/auth/spocuni/login" "" "$(cat <<JSON
{ "email": "${SPOC_EMAIL}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_SPOC="$(echo "$HTTP_BODY" | jq -r '.access_token')"
ok "SPOC token acquired"

# =============================================================================
# 1) EMPTY STATE
# =============================================================================
section "1) EMPTY STATE"

banner "1a) GET /citizen/myProblems — before any report"
get "$BASE_URL/citizen/myProblems" "$TOKEN_A"
expect_status 200
echo "$HTTP_BODY" | pretty
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "0" ]] || fail "expected 0 problems, got $COUNT"
ok "empty list returned for fresh citizen"

banner "1b) GET /user/citizen/me — problems[] should be empty"
get "$BASE_URL/user/citizen/me" "$TOKEN_A"
expect_status 200
PROBS_LEN="$(echo "$HTTP_BODY" | jq '.problems | length')"
[[ "$PROBS_LEN" == "0" ]] || fail "expected problems[] empty, got $PROBS_LEN"
ok "/me problems[] empty as expected"

# =============================================================================
# 2) POST /citizen/reportProblem — HAPPY PATHS
# =============================================================================
section "2) REPORT PROBLEM — HAPPY PATHS"

banner "2a) minimal report (no photos/videos)"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{
  "title": "Broken streetlight on 5th Ave",
  "pd": "The streetlight at the corner of 5th and Main has been out for a week.",
  "photos": [],
  "videos": [],
  "longitude": 77.5946,
  "latitude": 12.9716,
  "categories": ["infrastructure", "lighting"]
}
JSON
)"
expect_status 201
echo "$HTTP_BODY" | pretty
P1_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
P1_TOKEN_NUM="$(echo "$HTTP_BODY" | jq -r '.token_number')"
P1_STATUS="$(echo "$HTTP_BODY" | jq -r '.status')"
[[ -n "$P1_ID" && "$P1_ID" != "null" ]] || fail "no problem id"
[[ "$P1_STATUS" == "NO_BIDDERS" ]]       || fail "status should default to NO_BIDDERS, got $P1_STATUS"
ok "problem #1 created: id=$P1_ID  token_number=$P1_TOKEN_NUM  status=$P1_STATUS"

banner "2b) report with one photo (base64 PNG)"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<JSON
{
  "title": "Garbage pile near market",
  "pd": "Large pile of garbage not collected for 3 days. Smell is unbearable.",
  "photos": ["${PNG_B64}"],
  "videos": [],
  "longitude": 77.6010,
  "latitude": 12.9730,
  "categories": ["sanitation"]
}
JSON
)"
expect_status 201
P2_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
P2_PHOTO_LEN="$(echo "$HTTP_BODY" | jq '.photos | length')"
[[ "$P2_PHOTO_LEN" == "1" ]] || fail "expected 1 photo, got $P2_PHOTO_LEN"
ok "problem #2 with photo: id=$P2_ID  photos=$P2_PHOTO_LEN"

banner "2c) report with photo + video"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<JSON
{
  "title": "Pothole on Ring Road",
  "pd": "Deep pothole causing accidents. Two scooters already fell.",
  "photos": ["${PNG_B64}", "${PNG_B64}"],
  "videos": ["${PNG_B64}"],
  "longitude": 77.5850,
  "latitude": 12.9680,
  "categories": ["infrastructure", "roads"]
}
JSON
)"
expect_status 201
P3_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
[[ "$(echo "$HTTP_BODY" | jq '.photos | length')" == "2" ]] || fail "expected 2 photos"
[[ "$(echo "$HTTP_BODY" | jq '.videos | length')" == "1" ]] || fail "expected 1 video"
ok "problem #3 with photo+video: id=$P3_ID"

banner "2d) report with no categories (defaults to [])"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{
  "title": "Stray dog menace",
  "pd": "Pack of stray dogs near the school gate every morning.",
  "longitude": 77.5900,
  "latitude": 12.9700
}
JSON
)"
expect_status 201
P4_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
[[ "$(echo "$HTTP_BODY" | jq '.categories | length')" == "0" ]] || fail "categories should default to []"
ok "problem #4 (no categories): id=$P4_ID"

# =============================================================================
# 3) GET /citizen/myProblems — AFTER POSTS
# =============================================================================
section "3) LIST PROBLEMS"

banner "3a) GET /citizen/myProblems — should have 4"
get "$BASE_URL/citizen/myProblems" "$TOKEN_A"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "4" ]] || fail "expected 4 problems, got $COUNT"
echo "$HTTP_BODY" | jq '[.[] | {id, title, status}]'
ok "4 problems listed for citizen A"

banner "3b) newest-first ordering"
FIRST_ID="$(echo "$HTTP_BODY" | jq -r '.[0].id')"
LAST_ID="$(echo "$HTTP_BODY"  | jq -r '.[-1].id')"
[[ "$FIRST_ID" == "$P4_ID" ]] || warn "first item is $FIRST_ID, expected $P4_ID (P4)"
[[ "$LAST_ID"  == "$P1_ID" ]] || warn "last item is $LAST_ID, expected $P1_ID (P1)"
ok "ordering check passed (newest first)"

banner "3c) GET /user/citizen/me — problems[] should now have 4 ids"
get "$BASE_URL/user/citizen/me" "$TOKEN_A"
expect_status 200
PROBS_LEN="$(echo "$HTTP_BODY" | jq '.problems | length')"
[[ "$PROBS_LEN" == "4" ]] || fail "expected 4 ids in problems[], got $PROBS_LEN"
HAS_P1="$(echo "$HTTP_BODY" | jq --arg id "$P1_ID" '.problems | index($id)')"
[[ "$HAS_P1" != "null" ]] || fail "problems[] missing P1 id $P1_ID"
ok "citizen /me problems[] synced with 4 ids"

# =============================================================================
# 4) CROSS-CITIZEN ISOLATION
# =============================================================================
section "4) CROSS-CITIZEN ISOLATION"

banner "4a) citizen B lists own problems — should be 0"
get "$BASE_URL/citizen/myProblems" "$TOKEN_B"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "0" ]] || fail "citizen B should see 0 problems, got $COUNT"
ok "citizen B sees no problems"

banner "4b) citizen B reports own problem"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_B" "$(cat <<'JSON'
{
  "title": "Water logging in B's lane",
  "pd": "The entire lane floods after every rain.",
  "longitude": 72.8777,
  "latitude": 19.0760,
  "categories": ["drainage"]
}
JSON
)"
expect_status 201
PB_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
ok "citizen B problem: id=$PB_ID"

banner "4c) citizen A still sees only their own 4"
get "$BASE_URL/citizen/myProblems" "$TOKEN_A"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "4" ]] || fail "citizen A should still see 4, got $COUNT"
HAS_PB="$(echo "$HTTP_BODY" | jq --arg id "$PB_ID" '[.[].id] | index($id)')"
[[ "$HAS_PB" == "null" ]] || fail "citizen A can see B's problem — ISOLATION BROKEN"
ok "citizen A cannot see citizen B's problem"

banner "4d) citizen B sees only their own 1"
get "$BASE_URL/citizen/myProblems" "$TOKEN_B"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "1" ]] || fail "citizen B should see 1, got $COUNT"
ok "citizen B sees exactly 1"

# =============================================================================
# 5) AUTH NEGATIVES
# =============================================================================
section "5) AUTH NEGATIVES"

banner "5a) POST /reportProblem — no token → 401"
post "$BASE_URL/citizen/reportProblem" "" "$(cat <<'JSON'
{ "title":"x","pd":"y","longitude":0,"latitude":0 }
JSON
)"
if [[ "$HTTP_STATUS" == "401" ]]; then
  ok "no token rejected (401)"
else
  echo "$HTTP_BODY" | pretty
  fail "no token returned $HTTP_STATUS (expected 401)"
fi

banner "5b) GET /myProblems — no token → 401"
get "$BASE_URL/citizen/myProblems"
if [[ "$HTTP_STATUS" == "401" ]]; then
  ok "no token rejected (401)"
else
  echo "$HTTP_BODY" | pretty
  fail "no token returned $HTTP_STATUS (expected 401)"
fi

banner "5c) POST /reportProblem — garbage token → 401"
post "$BASE_URL/citizen/reportProblem" "not.a.real.token" "$(cat <<'JSON'
{ "title":"x","pd":"y","longitude":0,"latitude":0 }
JSON
)"
if [[ "$HTTP_STATUS" == "401" ]]; then
  ok "garbage token rejected (401)"
else
  echo "$HTTP_BODY" | pretty
  fail "garbage token returned $HTTP_STATUS (expected 401)"
fi

banner "5d) POST /reportProblem — SPOC token → 403"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_SPOC" "$(cat <<'JSON'
{ "title":"x","pd":"y","longitude":0,"latitude":0 }
JSON
)"
if [[ "$HTTP_STATUS" == "403" ]]; then
  ok "SPOC token rejected on citizen endpoint (403)"
else
  echo "$HTTP_BODY" | pretty
  fail "SPOC token returned $HTTP_STATUS (expected 403)"
fi

banner "5e) GET /myProblems — SPOC token → 403"
get "$BASE_URL/citizen/myProblems" "$TOKEN_SPOC"
if [[ "$HTTP_STATUS" == "403" ]]; then
  ok "SPOC token rejected on citizen endpoint (403)"
else
  echo "$HTTP_BODY" | pretty
  fail "SPOC token returned $HTTP_STATUS (expected 403)"
fi

# =============================================================================
# 6) VALIDATION NEGATIVES
# =============================================================================
section "6) VALIDATION NEGATIVES"

banner "6a) missing title → 422"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{ "pd":"y","longitude":0,"latitude":0 }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then
  ok "missing title rejected (422)"
else
  echo "$HTTP_BODY" | pretty
  fail "missing title returned $HTTP_STATUS (expected 422)"
fi

banner "6b) empty title → 422"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{ "title":"","pd":"y","longitude":0,"latitude":0 }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then
  ok "empty title rejected (422)"
else
  echo "$HTTP_BODY" | pretty
  fail "empty title returned $HTTP_STATUS (expected 422)"
fi

banner "6c) longitude out of range → 422"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{ "title":"t","pd":"y","longitude":999,"latitude":0 }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then
  ok "longitude 999 rejected (422)"
else
  echo "$HTTP_BODY" | pretty
  fail "bad longitude returned $HTTP_STATUS (expected 422)"
fi

banner "6d) latitude out of range → 422"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{ "title":"t","pd":"y","longitude":0,"latitude":-91 }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then
  ok "latitude -91 rejected (422)"
else
  echo "$HTTP_BODY" | pretty
  fail "bad latitude returned $HTTP_STATUS (expected 422)"
fi

banner "6e) extra field → 422 (extra=forbid)"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{ "title":"t","pd":"y","longitude":0,"latitude":0,"hacked_field":"rm -rf /" }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then
  ok "unknown field rejected (422)"
else
  echo "$HTTP_BODY" | pretty
  fail "unknown field returned $HTTP_STATUS (expected 422)"
fi

banner "6f) bad base64 in photos → 400"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{
  "title": "t",
  "pd": "y",
  "longitude": 0,
  "latitude": 0,
  "photos": ["this is not base64!!!"]
}
JSON
)"
if [[ "$HTTP_STATUS" == "400" ]]; then
  ok "bad base64 rejected (400)"
else
  echo "$HTTP_BODY" | pretty
  fail "bad base64 returned $HTTP_STATUS (expected 400)"
fi

banner "6g) confirm no ghost rows after failed requests"
get "$BASE_URL/citizen/myProblems" "$TOKEN_A"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "4" ]] || fail "expected still 4 problems, got $COUNT — a failed request leaked a row"
ok "no orphaned rows from failed validations"

# =============================================================================
# 7) RESPONSE SHAPE
# =============================================================================
section "7) RESPONSE SHAPE"

banner "7a) problem shape on POST"
post "$BASE_URL/citizen/reportProblem" "$TOKEN_A" "$(cat <<'JSON'
{
  "title": "Shape check",
  "pd": "Checking response fields.",
  "longitude": 1.5,
  "latitude": 2.5,
  "categories": ["test"]
}
JSON
)"
expect_status 201
for field in id token_number title pd photos videos longitude latitude \
             status proposals date_reported categories assigned_to; do
  if [[ "$(echo "$HTTP_BODY" | jq "has(\"$field\")")" != "true" ]]; then
    fail "response missing field: $field"
  fi
done
ok "all expected fields present"

banner "7b) proposals defaults to {} (object, not array)"
PROPS_TYPE="$(echo "$HTTP_BODY" | jq -r '.proposals | type')"
[[ "$PROPS_TYPE" == "object" ]] || fail "proposals should be an object, got $PROPS_TYPE"
ok "proposals is an object"

banner "7c) assigned_to is null"
ASSIGNED="$(echo "$HTTP_BODY" | jq -r '.assigned_to')"
[[ "$ASSIGNED" == "null" ]] || fail "assigned_to should be null, got $ASSIGNED"
ok "assigned_to is null by default"

# =============================================================================
# Summary
# =============================================================================
echo
echo "======================================================================"
echo -e " ${GRN}${BLD}✅ All citizen problem tests passed${RST}"
echo "======================================================================"
echo
echo "Created in this run:"
echo "  citizen A  id=$CITIZEN_A_ID  phone=$PHONE_A  problems=4(+1 shape)=5"
echo "  citizen B  id=$CITIZEN_B_ID  phone=$PHONE_B  problems=1"
echo "  problems A: $P1_ID"
echo "              $P2_ID"
echo "              $P3_ID"
echo "              $P4_ID"
echo "  problems B: $PB_ID"
echo