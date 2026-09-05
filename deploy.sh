#!/usr/bin/env bash
# One-shot: create the GitHub repo, push, enable Pages with the custom domain.
# Usage: ./deploy.sh <github-owner> [repo-name]   (needs `gh auth login` as that owner)
set -euo pipefail
OWNER="${1:?github owner/username}"; REPO="${2:-crustyaimarketingpoop.camp}"
cd "$(dirname "$0")"
gh repo create "$OWNER/$REPO" --public --source=. --remote=origin --push
gh api -X POST "repos/$OWNER/$REPO/pages" -f 'source[branch]=main' -f 'source[path]=/' >/dev/null || true
gh api -X PUT "repos/$OWNER/$REPO/pages" -f cname=crustyaimarketingpoop.camp -F https_enforced=false >/dev/null
echo "Pages: https://$OWNER.github.io/$REPO  → custom domain crustyaimarketingpoop.camp"
echo "Now add the DNS records from README.md at Squarespace, then enable Enforce HTTPS in repo Settings → Pages."
echo "CNAME for www should point to: $OWNER.github.io"
