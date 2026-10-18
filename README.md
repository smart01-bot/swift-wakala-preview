# Swift Wakala — Interactive Preview

A public, **no-authentication**, interactive portfolio demonstration of Swift Wakala's agent and main-agent workflows. This is a **standalone repository**, not a branch of the production mobile application or of the portfolio.

## What visitors can explore

- **Agent onboarding:** sample phone/personal/business details → documents marker → registration submission → locked pending state → main-agent application approval or correction request.
- **Agent workspace:** home, network accounts, new request, exact account/amount review, request history, request details and sample profile.
- **Main-agent workspace:** overview, queue, transfers, agents and applications.
- **Exchange lifecycle:** agent submits → main agent reviews → capacity is atomically checked and reserved *within this JavaScript model* → simulated source confirmation → simulated payout → completed and reservation released.
- **Risk scenarios:** rejection with reason, insufficient capacity blocking acceptance, unknown payout outcome holding reserved capacity until synthetic reconciliation.
- Switch between roles instantly, reset all examples, and change light/dark themes. Sample changes remain within the open browser tab.

The demonstration follows the product flow and visual language observed in `smart01-bot/SILVERSTONE-FRONTEND` `Development` on 18 October 2026. It is a purpose-built browser rendition, not an actual native Expo build or a claim of finished provider integration.

## Privacy and safety

**No auth, no provider API, no backend, no real payment and no real account.** The preview runs entirely inside the browser. Data is fictional and in-memory. It does not call Supabase, Render, Firebase or mobile-money providers, send OTPs, upload identification, or store login credentials. The zero Swift Wakala service fee is shown. All claimed completions and confirmations are explicitly *simulated*, not real settlement evidence.

Do not use real personal details in the onboarding forms. A real production app **must preserve its authentication, identity/authorization checks, private KYC document handling, financial state rules and audit trails**. None are bypassed in production by this preview.

## Local usage

The site uses native browser HTML/CSS/JavaScript without dependencies or a build step.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

Run workflow tests:

```bash
node --test tests/*.test.cjs
```

## Publish to GitHub Pages (separate repo)

1. Create a **new public repository** called `swift-wakala-preview` under `smart01-bot`.
2. Upload the **contents of this directory** (not the directory itself) into the repository's `main` branch. `index.html` must be at the root.
3. In the GitHub repository, open **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then save.
4. When GitHub reports the site as deployed, verify it at `https://smart01-bot.github.io/swift-wakala-preview/`.
5. In the portfolio repository `smart01-bot/smart01-bot.github.io`, change the Swift Wakala preview link in `index.html` and `README.md` to the verified Pages URL. Do not change it to an unverified or unpublished URL.

The URL above is the **expected GitHub Pages URL after successful publication**, not proof of a live deployment.

## File structure

- `index.html` — entry point and metadata
- `styles.css` — responsive visual system
- `model.js` — pure synthetic workflow functions
- `app.js` — role-switchable application interface
- `favicon.svg` — static brand icon
- `.nojekyll` — consistent static GitHub Pages publishing
- `tests/workflows.test.cjs` — lifecycle and safety tests

## Notes

This repository should remain independent of the protected development and production source repositories. Do not add backend credentials, wallet provider secrets or active API endpoints to this static demo.