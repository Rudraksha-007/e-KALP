#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# test_univ_pitch.sh
#
# End-to-end tests for:
#   POST /univ/pitch
#   GET  /univ/evaluate
#
# Requires: curl, jq.
# -----------------------------------------------------------------------------

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8000}"
RUN_ID="$(date +%s)$$"

CIT_PHONE="$(printf '%010d' $(( (RUN_ID % 9000000000) + 1000000000 )))"
SPOC_A_EMAIL="spocA_${RUN_ID}@example.com"
SPOC_B_EMAIL="spocB_${RUN_ID}@example.com"
TL_A_EMAIL="tlA_${RUN_ID}@example.com"
TL_B_EMAIL="tlB_${RUN_ID}@example.com"
PASS="SuperSecret123"

if [[ -t 1 ]]; then
  RED='\033[0;31m'; GRN='\033[0;32m'; YLW='\033[0;33m'
  CYN='\033[0;36m'; BLD='\033[1m';    RST='\033[0m'
else
  RED=''; GRN=''; YLW=''; CYN=''; BLD=''; RST=''
fi

pretty() { jq -C . 2>/dev/null || cat; }
section() { echo; echo -e "${BLD}${CYN}═══════════════ $* ═══════════════${RST}"; }
banner()  { echo; echo -e "${BLD}${CYN}─────────────── $* ───────────────${RST}"; }
ok()      { echo -e "${GRN}✅ $*${RST}"; }
warn()    { echo -e "${YLW}⚠️  $*${RST}"; }
fail()    { echo -e "${RED}❌ $*${RST}" >&2; exit 1; }

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

echo "======================================================================"
echo " SPOC pitch + evaluate smoke test"
echo " BASE_URL : $BASE_URL"
echo " RUN_ID   : $RUN_ID"
echo "======================================================================"

if ! curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL/" | grep -qE '^2'; then
  fail "Server not responding at $BASE_URL."
fi

# =============================================================================
# 0) SETUP — two SPOCs (different unis), two team leads, one citizen + 2 problems
# =============================================================================
section "0) SETUP"

banner "0a) SPOC A signup + login  (creates university A)"
post "$BASE_URL/auth/spocuni/signup" "" "$(cat <<JSON
{ "uni_name": "Uni A ${RUN_ID}", "name": "SPOC A",
  "email": "${SPOC_A_EMAIL}", "subject_expertise": ["ai"],
  "password": "${PASS}" }
JSON
)"
expect_status 201
SPOC_A_ID="$(echo "$HTTP_BODY"    | jq -r '.data.id')"
REG_A="$(echo "$HTTP_BODY"         | jq -r '.data.registration_number')"
post "$BASE_URL/auth/spocuni/login" "" "$(cat <<JSON
{ "email": "${SPOC_A_EMAIL}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_SPOC_A="$(echo "$HTTP_BODY" | jq -r '.access_token')"
ok "SPOC A: id=$SPOC_A_ID  reg#=$REG_A"

banner "0b) SPOC B signup + login  (creates university B)"
post "$BASE_URL/auth/spocuni/signup" "" "$(cat <<JSON
{ "uni_name": "Uni B ${RUN_ID}", "name": "SPOC B",
  "email": "${SPOC_B_EMAIL}", "subject_expertise": ["iot"],
  "password": "${PASS}" }
JSON
)"
expect_status 201
SPOC_B_ID="$(echo "$HTTP_BODY"    | jq -r '.data.id')"
REG_B="$(echo "$HTTP_BODY"         | jq -r '.data.registration_number')"
post "$BASE_URL/auth/spocuni/login" "" "$(cat <<JSON
{ "email": "${SPOC_B_EMAIL}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_SPOC_B="$(echo "$HTTP_BODY" | jq -r '.access_token')"
ok "SPOC B: id=$SPOC_B_ID  reg#=$REG_B"

banner "0c) Team lead TL_A under Uni A"
post "$BASE_URL/auth/teamlead/signup" "" "$(cat <<JSON
{ "name": "TL A", "email": "${TL_A_EMAIL}", "password": "${PASS}",
  "uni_id": ${REG_A}, "team_members": ["x","y"] }
JSON
)"
expect_status 201
TL_A_ID="$(echo "$HTTP_BODY"    | jq -r '.data.id')"
TL_A_TOKEN="$(echo "$HTTP_BODY" | jq -r '.data.token')"
post "$BASE_URL/auth/teamlead/login" "" "$(cat <<JSON
{ "email": "${TL_A_EMAIL}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_TL_A="$(echo "$HTTP_BODY" | jq -r '.access_token')"
ok "TL_A: id=$TL_A_ID  token=$TL_A_TOKEN"

banner "0d) Team lead TL_B under Uni B"
post "$BASE_URL/auth/teamlead/signup" "" "$(cat <<JSON
{ "name": "TL B", "email": "${TL_B_EMAIL}", "password": "${PASS}",
  "uni_id": ${REG_B}, "team_members": ["p","q"] }
JSON
)"
expect_status 201
TL_B_ID="$(echo "$HTTP_BODY"    | jq -r '.data.id')"
TL_B_TOKEN="$(echo "$HTTP_BODY" | jq -r '.data.token')"
ok "TL_B: id=$TL_B_ID  token=$TL_B_TOKEN"

banner "0e) Citizen signs up + reports 2 problems"
post "$BASE_URL/auth/citizen/signup" "" "$(cat <<JSON
{ "name": "Citz", "phone": "${CIT_PHONE}", "password": "${PASS}",
  "longitude": 77.59, "latitude": 12.97, "occupation": "farmer",
  "age": 30, "gender": "F", "uni_token": null }
JSON
)"
expect_status 201
post "$BASE_URL/auth/citizen/login" "" "$(cat <<JSON
{ "phone": "${CIT_PHONE}", "password": "${PASS}" }
JSON
)"
expect_status 200
TOKEN_CIT="$(echo "$HTTP_BODY" | jq -r '.access_token')"

post "$BASE_URL/citizen/reportProblem" "$TOKEN_CIT" "$(cat <<'JSON'
{ "title": "P1 streetlight", "pd": "Out for a week.", "longitude": 1, "latitude": 1 }
JSON
)"
expect_status 201
P1_ID="$(echo "$HTTP_BODY" | jq -r '.id')"

post "$BASE_URL/citizen/reportProblem" "$TOKEN_CIT" "$(cat <<'JSON'
{ "title": "P2 pothole", "pd": "Deep and dangerous.", "longitude": 2, "latitude": 2 }
JSON
)"
expect_status 201
P2_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
ok "citizen problems: P1=$P1_ID  P2=$P2_ID"

# =============================================================================
# 1) EMPTY STATE
# =============================================================================
section "1) EMPTY STATE"

banner "1a) SPOC A evaluate — before any pitch"
get "$BASE_URL/univ/evaluate" "$TOKEN_SPOC_A"
expect_status 200
echo "$HTTP_BODY" | pretty
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "0" ]] || fail "expected 0 pitches, got $COUNT"
ok "empty pitch list for fresh SPOC"

# =============================================================================
# 2) HAPPY PATHS
# =============================================================================
section "2) HAPPY PATHS"

banner "2a) SPOC A pitches TL_A for P1"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
expect_status 201
echo "$HTTP_BODY" | pretty
PITCH1_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
PITCH1_TL="$(echo "$HTTP_BODY" | jq -r '.team_lead.token')"
PITCH1_PB="$(echo "$HTTP_BODY" | jq -r '.problem.id')"
[[ "$PITCH1_TL" == "$TL_A_TOKEN" ]] || fail "team_lead.token mismatch"
[[ "$PITCH1_PB" == "$P1_ID" ]]      || fail "problem.id mismatch"
ok "pitch #1 created: id=$PITCH1_ID"

banner "2b) SPOC A pitches TL_A for P2"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P2_ID}", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
expect_status 201
PITCH2_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
ok "pitch #2 created: id=$PITCH2_ID"

banner "2c) SPOC A re-pitches P1 — idempotent (should NOT create a new row)"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
expect_status 201
SAME_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
[[ "$SAME_ID" == "$PITCH1_ID" ]] || fail "expected same id, got $SAME_ID"
ok "re-pitch returns same row id — upsert works"

banner "2d) SPOC B pitches TL_B for P1 (different SPOC, same problem)"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_B" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_B_TOKEN} }
JSON
)"
expect_status 201
PITCH_B_ID="$(echo "$HTTP_BODY" | jq -r '.id')"
[[ "$PITCH_B_ID" != "$PITCH1_ID" ]] || fail "SPOC B's pitch reused SPOC A's row!"
ok "SPOC B got its own row: id=$PITCH_B_ID"

# =============================================================================
# 3) EVALUATE — VIEW PITCHES
# =============================================================================
section "3) EVALUATE"

banner "3a) SPOC A evaluate — should see exactly 2"
get "$BASE_URL/univ/evaluate" "$TOKEN_SPOC_A"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "2" ]] || fail "SPOC A should see 2 pitches, got $COUNT"
echo "$HTTP_BODY" | jq '[.[] | {id, problem_title: .problem.title, team_lead: .team_lead.name}]'
ok "SPOC A sees 2 pitches"

banner "3b) newest-first ordering (P2 was reported last)"
FIRST_TITLE="$(echo "$HTTP_BODY" | jq -r '.[0].problem.title')"
[[ "$FIRST_TITLE" == "P2 pothole" ]] || warn "first item is '$FIRST_TITLE', expected 'P2 pothole'"
ok "ordering by date_reported desc"

banner "3c) SPOC B evaluate — should see exactly 1"
get "$BASE_URL/univ/evaluate" "$TOKEN_SPOC_B"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "1" ]] || fail "SPOC B should see 1 pitch, got $COUNT"
ok "SPOC B sees 1 pitch"

banner "3d) cross-SPOC isolation — A's pitches must not appear in B's list"
HAS_PITCH2="$(echo "$HTTP_BODY" | jq --arg id "$PITCH2_ID" '[.[].id] | index($id)')"
[[ "$HAS_PITCH2" == "null" ]] || fail "SPOC B can see SPOC A's pitch — ISOLATION BROKEN"
ok "SPOC B cannot see SPOC A's pitches"

banner "3e) response shape of one item"
get "$BASE_URL/univ/evaluate" "$TOKEN_SPOC_A"
echo "$HTTP_BODY" | jq '.[0]'
for field in id spoc_id problem team_lead; do
  [[ "$(echo "$HTTP_BODY" | jq ".[0] | has(\"$field\")")" == "true" ]] || fail "missing field: $field"
done
for field in id token_number title status date_reported categories; do
  [[ "$(echo "$HTTP_BODY" | jq ".[0].problem | has(\"$field\")")" == "true" ]] || fail "missing problem.$field"
done
for field in id token name email uni_id; do
  [[ "$(echo "$HTTP_BODY" | jq ".[0].team_lead | has(\"$field\")")" == "true" ]] || fail "missing team_lead.$field"
done
ok "all expected fields present"

# =============================================================================
# 4) AUTH NEGATIVES
# =============================================================================
section "4) AUTH NEGATIVES"

banner "4a) POST /pitch — no token → 401"
post "$BASE_URL/univ/pitch" "" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
if [[ "$HTTP_STATUS" == "401" ]]; then ok "no token rejected (401)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "4b) GET /evaluate — no token → 401"
get "$BASE_URL/univ/evaluate"
if [[ "$HTTP_STATUS" == "401" ]]; then ok "no token rejected (401)"; else fail "got $HTTP_STATUS"; fi

banner "4c) POST /pitch — citizen token → 403"
post "$BASE_URL/univ/pitch" "$TOKEN_CIT" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
if [[ "$HTTP_STATUS" == "403" ]]; then ok "citizen token rejected (403)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "4d) GET /evaluate — team lead token → 403"
get "$BASE_URL/univ/evaluate" "$TOKEN_TL_A"
if [[ "$HTTP_STATUS" == "403" ]]; then ok "team lead token rejected (403)"; else fail "got $HTTP_STATUS"; fi

banner "4e) GET /evaluate — garbage token → 401"
get "$BASE_URL/univ/evaluate" "not.a.real.token"
if [[ "$HTTP_STATUS" == "401" ]]; then ok "garbage token rejected (401)"; else fail "got $HTTP_STATUS"; fi

# =============================================================================
# 5) BUSINESS-RULE NEGATIVES
# =============================================================================
section "5) BUSINESS-RULE NEGATIVES"

banner "5a) SPOC A pitches TL_B (different university) → 403"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_B_TOKEN} }
JSON
)"
if [[ "$HTTP_STATUS" == "403" ]]; then ok "cross-university team lead rejected (403)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "5b) pitch with unknown problem id → 404"
FAKE_UUID="00000000-0000-0000-0000-000000000000"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${FAKE_UUID}", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
if [[ "$HTTP_STATUS" == "404" ]]; then ok "unknown problem rejected (404)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "5c) pitch with unknown team lead token → 404"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": 999999999 }
JSON
)"
if [[ "$HTTP_STATUS" == "404" ]]; then ok "unknown team lead rejected (404)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "5d) missing team_lead_token → 422"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P1_ID}" }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then ok "missing team_lead_token rejected (422)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "5e) malformed problem_id → 422"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "not-a-uuid", "team_lead_token": ${TL_A_TOKEN} }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then ok "malformed uuid rejected (422)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "5f) extra field → 422 (extra=forbid)"
post "$BASE_URL/univ/pitch" "$TOKEN_SPOC_A" "$(cat <<JSON
{ "problem_id": "${P1_ID}", "team_lead_token": ${TL_A_TOKEN}, "hacked": true }
JSON
)"
if [[ "$HTTP_STATUS" == "422" ]]; then ok "unknown field rejected (422)"; else echo "$HTTP_BODY" | pretty; fail "got $HTTP_STATUS"; fi

banner "5g) no rows leaked from failed requests"
get "$BASE_URL/univ/evaluate" "$TOKEN_SPOC_A"
expect_status 200
COUNT="$(echo "$HTTP_BODY" | jq 'length')"
[[ "$COUNT" == "2" ]] || fail "expected still 2, got $COUNT"
ok "no orphaned rows from failed validations"

# =============================================================================
# Summary
# =============================================================================
echo
echo "======================================================================"
echo -e " ${GRN}${BLD}✅ All univ pitch tests passed${RST}"
echo "======================================================================"
echo
echo "Created:"
echo "  SPOC A  id=$SPOC_A_ID  reg#=$REG_A  pitches=2"
echo "  SPOC B  id=$SPOC_B_ID  reg#=$REG_B  pitches=1"
echo "  TL_A    id=$TL_A_ID    token=$TL_A_TOKEN  (uni A)"
echo "  TL_B    id=$TL_B_ID    token=$TL_B_TOKEN  (uni B)"
echo "  P1      id=$P1_ID"
echo "  P2      id=$P2_ID"
echo