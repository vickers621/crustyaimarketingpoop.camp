# crustyaimarketingpoop.camp

Static site. No build step. Edit `index.html` → the `window.SITE` block at the top holds every fact that changes (dates, price, ticket link, lineup, `confirmed` flag). `style.css` is the look, `site.js` wires the config into the page and builds the countdown + calendar file.

## Local preview
```bash
python3 -m http.server 8765
```
Open http://localhost:8765

## Hosting: GitHub Pages
1. Push this folder to a GitHub repo (branch `main`).
2. Repo → Settings → Pages → Source: Deploy from branch, `main` / root.
3. `CNAME` already contains `crustyaimarketingpoop.camp`; Pages will pick it up.

## DNS at Squarespace Domains
Domains → crustyaimarketingpoop.camp → DNS settings. Delete the Squarespace "Coming Soon" defaults, then add:

| Type  | Host | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | `<github-username>.github.io` |

Then in GitHub Pages settings tick **Enforce HTTPS** once the cert issues (can take up to an hour after DNS propagates).

## Shareable event link
`https://crustyaimarketingpoop.camp/nye` redirects to the NYE section.
