# Swift Wakala — Interactive Dual-Phone Preview

The public root now opens a **dual-handset interactive showcase**, not the old landing page. One dark phone and one light phone run separate instances of the original synthetic browser app. Both start at a two-second splash screen, flow into welcome, and let visitors navigate registration, agent, and main-agent workspaces.

Visitors can bring a handset forward by tapping the back phone, using the Dark / Light buttons, dragging horizontally, using left/right arrows on the stage, or swiping horizontally on the foreground handset. The back phone's app state remains intact while the other is in front. Restart Both resets both instances to their own themed splash screens.

Files: `index.html` (public two-phone stage), `showcase.css`, `showcase.js`, `experience.html` (isolated phone demo), `experience.css` (phone viewport), `app.js` and `model.js` (existing synthetic behavior). `showcase.html` is an alternative copy of the two-phone stage.

This is a browser rendition of Swift, **not an Expo native build or real financial service**. No real provider, backend, authentication, PIN or live payment is involved.

---


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
## Mobile interface cleanup (18 October 2026)

For narrow screens, visitors now arrive directly at a workspace switcher and the interactive phone UI; the large marketing introduction, duplicate stage buttons, and desktop journey remain desktop-only. Registration, home and reset are available in an expandable **More options and guide** section below the demo phone. Agent and main-agent opening screens use short action cards, rather than the oversized repeated marketing panels. Backend and workflow model are unchanged. No video or external embed was added.

## Visual palette (19 October 2026)

The dual-phone showcase was rethemed from green to **warm porcelain (`#f4f2f0`), graphite (`#222536`) and cobalt (`#3d51d5`)**. Phone UI accents now use the same cool blue family in their respective dark and light themes; small status colours inside workflow records retain their informational roles. Swipe, splash, independent state, phone size and navigation are unchanged.
