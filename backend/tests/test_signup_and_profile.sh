#!/usr/bin/env bash
# -----------------------------------------------------------------------------
# test_auth_and_me.sh
#
# End-to-end smoke test for:
#   * POST /auth/{role}/signup
#   * POST /auth/{role}/login
#   * GET  /user/{role}/me
#
# Requires: curl, jq.
# -----------------------------------------------------------------------------

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:8000}"
RUN_ID="$(date +%s)$$"

CITIZEN_PHONE="$(printf '%010d' $(( (RUN_ID % 9000000000) + 1000000000 )))"
SPOC_EMAIL="spoc_${RUN_ID}@example.com"
TL_EMAIL="tl_${RUN_ID}@example.com"

PASS="SuperSecret123"

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

banner() {
  echo
  echo -e "${BLD}${CYN}─────────────── $* ───────────────${RST}"
}

section() {
  echo
  echo -e "${BLD}${CYN}═══════════════ $* ═══════════════${RST}"
}

ok()   { echo -e "${GRN}✅ $*${RST}"; }
warn() { echo -e "${YLW}⚠️  $*${RST}"; }
fail() { echo -e "${RED}❌ $*${RST}" >&2; exit 1; }

# POST JSON body → sets HTTP_STATUS + HTTP_BODY
post_json() {
  local url="$1" body="$2"
  local raw
  raw="$(curl -sS -w $'\n%{http_code}' \
    -X POST "$url" \
    -H 'Content-Type: application/json' \
    -d "$body")"
  HTTP_STATUS="$(printf '%s' "$raw" | tail -n1)"
  HTTP_BODY="$(printf '%s' "$raw" | sed '$d')"
}

# GET with optional bearer token → sets HTTP_STATUS + HTTP_BODY
get_json() {
  local url="$1" token="${2:-}"
  local raw
  if [[ -n "$token" ]]; then
    raw="$(curl -sS -w $'\n%{http_code}' \
      -X GET "$url" \
      -H "Authorization: Bearer $token")"
  else
    raw="$(curl -sS -w $'\n%{http_code}' -X GET "$url")"
  fi
  HTTP_STATUS="$(printf '%s' "$raw" | tail -n1)"
  HTTP_BODY="$(printf '%s' "$raw" | sed '$d')"
}

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
echo " Auth + /me smoke test"
echo " BASE_URL : $BASE_URL"
echo " RUN_ID   : $RUN_ID"
echo "======================================================================"

if ! curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL/" | grep -qE '^2'; then
  fail "Server at $BASE_URL is not responding. Is uvicorn running?"
fi

# =============================================================================
# 1) CITIZEN — signup → login → /me
# =============================================================================
section "1) CITIZEN  (signup → login → /me)"

CITIZEN_PAYLOAD=$(cat <<JSON
{
  "name": "Alice Citizen",
  "phone": "${CITIZEN_PHONE}",
  "password": "${PASS}",
  "longitude": 77.5946,
  "latitude": 12.9716,
  "occupation": "farmer",
  "age": 34,
  "gender": "F",
  "uni_token": null
}
JSON
)

banner "1a) signup"
post_json "$BASE_URL/auth/citizen/signup" "$CITIZEN_PAYLOAD"
expect_status 201
echo "$HTTP_BODY" | pretty
CITIZEN_ID="$(echo "$HTTP_BODY" | jq -r '.data.id')"
[[ -n "$CITIZEN_ID" && "$CITIZEN_ID" != "null" ]] || fail "no citizen id"
ok "citizen signup: id=$CITIZEN_ID"

banner "1b) login"
CITIZEN_LOGIN=$(cat <<JSON
{ "phone": "${CITIZEN_PHONE}", "password": "${PASS}" }
JSON
)
post_json "$BASE_URL/auth/citizen/login" "$CITIZEN_LOGIN"
expect_status 200
echo "$HTTP_BODY" | pretty
CITIZEN_TOKEN="$(echo "$HTTP_BODY" | jq -r '.access_token')"
[[ -n "$CITIZEN_TOKEN" && "$CITIZEN_TOKEN" != "null" ]] || fail "no citizen token"
ok "citizen login: got access_token"

banner "1c) GET /user/citizen/me"
get_json "$BASE_URL/user/citizen/me" "$CITIZEN_TOKEN"
expect_status 200
echo "$HTTP_BODY" | pretty
ME_ROLE="$(echo "$HTTP_BODY" | jq -r '.role')"
ME_ID="$(echo "$HTTP_BODY"   | jq -r '.id')"
[[ "$ME_ROLE" == "citizen" ]]    || fail "me role mismatch: $ME_ROLE"
[[ "$ME_ID"   == "$CITIZEN_ID" ]] || fail "me id mismatch: $ME_ID != $CITIZEN_ID"
ok "citizen /me: id matches signup"

# =============================================================================
# 2) SPOC — signup → login → /me
# =============================================================================
section "2) SPOC  (signup → login → /me)"

SPOC_PAYLOAD=$(cat <<JSON
{
  "uni_name": "Test University ${RUN_ID}",
  "name": "Dr. SPOC ${RUN_ID}",
  "email": "${SPOC_EMAIL}",
  "subject_expertise": ["ai", "iot"],
  "password": "${PASS}"
}
JSON
)

banner "2a) signup"
post_json "$BASE_URL/auth/spocuni/signup" "$SPOC_PAYLOAD"
expect_status 201
echo "$HTTP_BODY" | pretty
SPOC_ID="$(echo "$HTTP_BODY"    | jq -r '.data.id')"
UNI_UUID="$(echo "$HTTP_BODY"   | jq -r '.data.uni_id')"
REG_NUMBER="$(echo "$HTTP_BODY" | jq -r '.data.registration_number')"
[[ -n "$SPOC_ID" && "$SPOC_ID" != "null" ]]          || fail "no spoc id"
[[ -n "$REG_NUMBER" && "$REG_NUMBER" != "null" ]]    || fail "no registration_number"
ok "spoc signup:    id=$SPOC_ID"
ok "university:     uuid=$UNI_UUID  reg#=$REG_NUMBER"

banner "2b) login"
SPOC_LOGIN=$(cat <<JSON
{ "email": "${SPOC_EMAIL}", "password": "${PASS}" }
JSON
)
post_json "$BASE_URL/auth/spocuni/login" "$SPOC_LOGIN"
expect_status 200
echo "$HTTP_BODY" | pretty
SPOC_TOKEN="$(echo "$HTTP_BODY" | jq -r '.access_token')"
[[ -n "$SPOC_TOKEN" && "$SPOC_TOKEN" != "null" ]] || fail "no spoc token"
ok "spoc login: got access_token"

banner "2c) GET /user/spocuni/me"
get_json "$BASE_URL/user/spocuni/me" "$SPOC_TOKEN"
expect_status 200
echo "$HTTP_BODY" | pretty
ME_ROLE="$(echo "$HTTP_BODY" | jq -r '.role')"
ME_ID="$(echo "$HTTP_BODY"   | jq -r '.id')"
ME_REG="$(echo "$HTTP_BODY"  | jq -r '.registration_number')"
[[ "$ME_ROLE" == "spocuni" ]] || fail "me role mismatch: $ME_ROLE"
[[ "$ME_ID"   == "$SPOC_ID" ]] || fail "me id mismatch: $ME_ID != $SPOC_ID"
[[ "$ME_REG"  == "$REG_NUMBER" ]] || fail "me registration_number mismatch: $ME_REG != $REG_NUMBER"
ok "spoc /me: id + registration_number match signup"

# =============================================================================
# 3) TEAM LEAD — signup → login → /me
# =============================================================================
section "3) TEAM LEAD  (signup → login → /me)"

TL_PAYLOAD=$(cat <<JSON
{
  "name": "TL ${RUN_ID}",
  "email": "${TL_EMAIL}",
  "password": "${PASS}",
  "uni_id": ${REG_NUMBER},
  "team_members": ["bob", "carol"],
  "workspace": {
    "milestones": ["design", "build", "deploy"],
    "cost_estimate": "15000.00",
    "industry_partner": null
  }
}
JSON
)

banner "3a) signup"
post_json "$BASE_URL/auth/teamlead/signup" "$TL_PAYLOAD"
expect_status 201
echo "$HTTP_BODY" | pretty
TL_ID="$(echo "$HTTP_BODY"       | jq -r '.data.id')"
TL_TOKEN_NUM="$(echo "$HTTP_BODY"| jq -r '.data.token')"
TL_UNI="$(echo "$HTTP_BODY"      | jq -r '.data.uni_id')"
[[ -n "$TL_ID" && "$TL_ID" != "null" ]]           || fail "no team lead id"
[[ "$TL_UNI" == "$REG_NUMBER" ]]                  || fail "uni_id mismatch: $TL_UNI != $REG_NUMBER"
ok "team lead signup: id=$TL_ID  token=$TL_TOKEN_NUM  uni_id=$TL_UNI"

banner "3b) login"
TL_LOGIN=$(cat <<JSON
{ "email": "${TL_EMAIL}", "password": "${PASS}" }
JSON
)
post_json "$BASE_URL/auth/teamlead/login" "$TL_LOGIN"
expect_status 200
echo "$HTTP_BODY" | pretty
TL_ACCESS="$(echo "$HTTP_BODY" | jq -r '.access_token')"
[[ -n "$TL_ACCESS" && "$TL_ACCESS" != "null" ]] || fail "no teamlead token"
ok "teamlead login: got access_token"

banner "3c) GET /user/teamlead/me"
get_json "$BASE_URL/user/teamlead/me" "$TL_ACCESS"
expect_status 200
echo "$HTTP_BODY" | pretty
ME_ROLE="$(echo "$HTTP_BODY" | jq -r '.role')"
ME_ID="$(echo "$HTTP_BODY"   | jq -r '.id')"
[[ "$ME_ROLE" == "teamlead" ]] || fail "me role mismatch: $ME_ROLE"
[[ "$ME_ID"   == "$TL_ID" ]]   || fail "me id mismatch: $ME_ID != $TL_ID"
ok "teamlead /me: id matches signup"

# =============================================================================
# 4) NEGATIVE CASES — /me
# =============================================================================
section "4) NEGATIVE CASES — /me"

banner "4a) /me with NO token → 401"
get_json "$BASE_URL/user/citizen/me"
if [[ "$HTTP_STATUS" == "401" ]]; then
  ok "no token rejected (401)"
else
  echo "$HTTP_BODY" | pretty
  fail "no token returned $HTTP_STATUS (expected 401)"
fi

banner "4b) /me with garbage token → 401"
get_json "$BASE_URL/user/citizen/me" "not.a.real.token"
if [[ "$HTTP_STATUS" == "401" ]]; then
  ok "garbage token rejected (401)"
else
  echo "$HTTP_BODY" | pretty
  fail "garbage token returned $HTTP_STATUS (expected 401)"
fi

banner "4c) citizen token on /user/spocuni/me → 403 (role mismatch)"
get_json "$BASE_URL/user/spocuni/me" "$CITIZEN_TOKEN"
if [[ "$HTTP_STATUS" == "403" ]]; then
  ok "role mismatch rejected (403)"
else
  echo "$HTTP_BODY" | pretty
  fail "role mismatch returned $HTTP_STATUS (expected 403)"
fi

banner "4d) unknown role in path → 400"
get_json "$BASE_URL/user/wizard/me" "$CITIZEN_TOKEN"
if [[ "$HTTP_STATUS" == "400" ]]; then
  ok "unknown role rejected (400)"
else
  echo "$HTTP_BODY" | pretty
  fail "unknown role returned $HTTP_STATUS (expected 400)"
fi

# =============================================================================
# 5) NEGATIVE CASES — signup
# =============================================================================
section "5) NEGATIVE CASES — signup"

banner "5a) duplicate citizen phone → 409"
post_json "$BASE_URL/auth/citizen/signup" "$CITIZEN_PAYLOAD"
if [[ "$HTTP_STATUS" == "409" ]]; then
  ok "duplicate citizen rejected (409)"
else
  echo "$HTTP_BODY" | pretty
  fail "duplicate citizen returned $HTTP_STATUS (expected 409)"
fi

banner "5b) duplicate SPOC email → 409"
post_json "$BASE_URL/auth/spocuni/signup" "$SPOC_PAYLOAD"
if [[ "$HTTP_STATUS" == "409" ]]; then
  ok "duplicate SPOC rejected (409)"
else
  echo "$HTTP_BODY" | pretty
  fail "duplicate SPOC returned $HTTP_STATUS (expected 409)"
fi

banner "5c) duplicate team lead email → 409"
post_json "$BASE_URL/auth/teamlead/signup" "$TL_PAYLOAD"
if [[ "$HTTP_STATUS" == "409" ]]; then
  ok "duplicate team lead rejected (409)"
else
  echo "$HTTP_BODY" | pretty
  fail "duplicate team lead returned $HTTP_STATUS (expected 409)"
fi

banner "5d) invalid role → 400"
post_json "$BASE_URL/auth/wizard/signup" '{}'
if [[ "$HTTP_STATUS" == "400" ]]; then
  ok "invalid role rejected (400)"
else
  echo "$HTTP_BODY" | pretty
  fail "invalid role returned $HTTP_STATUS (expected 400)"
fi

banner "5e) malformed citizen payload → 422"
BAD_CITIZEN=$(cat <<'JSON'
{
  "name": "x",
  "phone": "123",
  "password": "short",
  "longitude": 999,
  "latitude": 999,
  "occupation": "BAD SPACE",
  "age": 200,
  "gender": "X"
}
JSON
)
post_json "$BASE_URL/auth/citizen/signup" "$BAD_CITIZEN"
if [[ "$HTTP_STATUS" == "422" ]]; then
  ok "malformed citizen rejected (422)"
else
  echo "$HTTP_BODY" | pretty
  fail "malformed citizen returned $HTTP_STATUS (expected 422)"
fi

banner "5f) team lead with unknown registration_number → 404"
BAD_TL=$(cat <<JSON
{
  "name": "Ghost",
  "email": "ghost_${RUN_ID}@example.com",
  "password": "${PASS}",
  "uni_id": 1111111111,
  "team_members": []
}
JSON
)
post_json "$BASE_URL/auth/teamlead/signup" "$BAD_TL"
if [[ "$HTTP_STATUS" == "404" ]]; then
  ok "unknown university rejected (404)"
else
  echo "$HTTP_BODY" | pretty
  fail "unknown university returned $HTTP_STATUS (expected 404)"
fi

banner "5g) citizen with unknown uni_token → 404"
BAD_CITIZEN_UNI=$(cat <<JSON
{
  "name": "Bob",
  "phone": "5555555555",
  "password": "${PASS}",
  "longitude": 0,
  "latitude": 0,
  "occupation": "farmer",
  "age": 25,
  "gender": "M",
  "uni_token": 1111111111
}
JSON
)
post_json "$BASE_URL/auth/citizen/signup" "$BAD_CITIZEN_UNI"
if [[ "$HTTP_STATUS" == "404" ]]; then
  ok "unknown uni_token rejected (404)"
else
  echo "$HTTP_BODY" | pretty
  fail "unknown uni_token returned $HTTP_STATUS (expected 404)"
fi

# =============================================================================
# Summary
# =============================================================================
echo
echo "======================================================================"
echo -e " ${GRN}${BLD}✅ All tests passed${RST}"
echo "======================================================================"
echo
echo "Created in this run:"
echo "  citizen    id=$CITIZEN_ID    phone=$CITIZEN_PHONE"
echo "  spoc       id=$SPOC_ID       email=$SPOC_EMAIL  reg#=$REG_NUMBER"
echo "  team lead  id=$TL_ID         email=$TL_EMAIL    token=$TL_TOKEN_NUM"
echo