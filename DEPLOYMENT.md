# Deployment

The same codebase deploys to Vercel and to a Hostinger VPS. Nothing in the app
depends on Vercel-only infrastructure — that is why `output: "standalone"` is
set in `next.config.ts` and why bot protection is a honeypot plus an in-process
rate limiter rather than Vercel BotID.

Pick **one** as the production origin and point the domain at it. Running both
against the same domain would split your ranking signal.

---

## Environment variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin. Drives canonicals, sitemap, robots, OG URLs. **Inlined at build time** — changing it needs a rebuild, not a restart. |
| `RESEND_API_KEY` | Yes | Contact form delivery. Without it the form validates but returns an error rather than dropping the lead silently. |
| `CONTACT_FROM_EMAIL` | Yes | Must be on a domain verified in Resend or sends are rejected. |
| `CONTACT_TO_EMAIL` | Yes | Where enquiries land. |

Copy `.env.example` to `.env.local` for local development.

---

## Option A — Vercel

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add RESEND_API_KEY production
vercel env add CONTACT_FROM_EMAIL production
vercel env add CONTACT_TO_EMAIL production
vercel --prod
```

Then add `aliph.studio` under **Project → Settings → Domains** and set
`aliphstudio.com` to redirect to it.

Resend is available as a native Marketplace integration, which provisions the
key for you:

```bash
vercel integration add resend --yes
vercel env pull
```

---

## Option B — Hostinger VPS

Assumes Ubuntu 22.04+ with a public IP and your domain's A record already
pointing at it.

### 1. Prepare the server

```bash
ssh root@YOUR_SERVER_IP

apt update && apt upgrade -y
apt install -y nginx certbot python3-certbot-nginx git

# Docker
curl -fsSL https://get.docker.com | sh

# Firewall — leave 3000 closed; nginx is the only public entry point.
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

### 2. Deploy the app

```bash
git clone https://github.com/Abuxar/Aliph-Studio.git /srv/aliph-studio
cd /srv/aliph-studio

cp .env.example .env
nano .env          # fill in the real values

docker compose up -d --build
curl -I http://127.0.0.1:3000   # expect 200
```

### 3. Reverse proxy and TLS

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/aliph.studio
ln -s /etc/nginx/sites-available/aliph.studio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Comment out the four ssl_certificate lines before the first certbot run —
# the files do not exist yet and nginx will refuse to start.
nginx -t && systemctl reload nginx

certbot --nginx -d aliph.studio -d www.aliph.studio
systemctl reload nginx
```

Certbot installs its own renewal timer. Confirm it with
`systemctl list-timers | grep certbot`.

### 4. Shipping an update

```bash
cd /srv/aliph-studio
git pull
docker compose up -d --build
docker image prune -f
```

Rebuilding takes roughly 90 seconds and the old container keeps serving until
the new one passes its health check.

---

## Verifying a deploy

```bash
curl -sI  https://aliph.studio | head -1                      # 200
curl -s   https://aliph.studio/robots.txt                     # sitemap line
curl -s   https://aliph.studio/sitemap.xml | grep -c '<url>'  # 16
curl -s   https://aliph.studio | grep -o 'rel="canonical"[^>]*'
```

Then, once:

1. Submit the contact form and confirm the email arrives.
2. Run Lighthouse on mobile — the budget is 95+, LCP under 2.0s.
3. Validate structured data at <https://search.google.com/test/rich-results>.
4. Submit the sitemap in Google Search Console.
5. Create the Google Business Profile at the DHA Phase 3 address and make the
   NAP match `src/lib/site.ts` exactly.

---

## Notes on the VPS target

- **Memory.** The build needs roughly 2GB. On a 1GB plan, either add swap or
  build the image elsewhere and push it to a registry.
- **The rate limiter is per-process.** `src/app/actions/contact.ts` keeps its
  window in memory, so it resets on redeploy and does not coordinate across
  replicas. That is fine for one container; move it to Redis if you scale out.
- **Image optimization** runs through `sharp` inside the container. It is a
  listed dependency, so no extra install step is needed.
