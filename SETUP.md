# Local browser app setup

Updated October 9, 2026 for the implemented Prediction comparison dashboard.

## What is ready

The plain starter was upgraded to the agreed managed build because the plan selected Papa Parse for CSV reading. Vite prepares the browser files and previews them locally. Code, verified data copies, fonts, attribution, and licenses remain in this folder.

Production preview: **http://127.0.0.1:4173/**. Development: **http://127.0.0.1:5173/**. Tests: **http://127.0.0.1:5174/tests/**. URLs work while their processes run. The old Python starter preview on port 8765 is superseded. No publishing workflow or remote Git repository was added. Previews accept connections only from this computer.

## Verified tools

- macOS, project file access, and shell access were verified.
- Git: `/usr/bin/git`, version `2.50.1 (Apple Git-155)`.
- Node: `/Users/yehuawei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`, version `v24.19.0`.
- npm: `10.9.3`, temporarily extracted from the official registry package `https://registry.npmjs.org/npm/-/npm-10.9.3.tgz` into `/private/tmp/sales-dashboard-npm/package/bin/npm-cli.js`.
- Papa Parse `5.7.0`, Vite `8.3.4`, and Codex in-app browser.

The plugin inventory recommended Node 22.19.0. Existing bundled Node 24.19.0 satisfies Vite’s compatibility range (`^20.19.0 || >=22.12.0`) and passed installation, clean reinstall, build, and preview checks. `.node-version` records the verified version; no extra Node installation was needed.

Exact dependencies are locked. `.npmrc` sets `save-exact=true` and `ignore-scripts=true`. The reviewed lockfile uses registry integrity records; the packaged dependency checker passed. Installation reported zero vulnerabilities. An offline clean reinstall using the populated temporary cache also passed.

## Restarting locally

Ask Codex: **“Restart this folder’s local dashboard preview.”** No commands are required from the student.

For the agent, work from the project root. Node is not on the default shell PATH. The verified build invocation was:

```sh
env PATH='/Users/yehuawei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/usr/bin:/bin:/usr/sbin:/sbin' /Users/yehuawei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node /private/tmp/sales-dashboard-npm/package/bin/npm-cli.js run build
```

Start production in a persistent terminal using the same prefix and `run preview -- --port 4173`. Development uses `run dev -- --port 5173`; tests use `run test:browser -- --port 5174`.

The npm helper/cache are temporary. If the helper disappears but dependencies and `dist/` remain, preview needs no npm:

```sh
/Users/yehuawei/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vite/bin/vite.js preview --port 4173
```

For a rebuild, first run the verified Node executable with `scripts/notices.mjs`, then with `node_modules/vite/bin/vite.js build`. If dependencies are missing, restore the official npm helper or use a verified system npm and run `npm ci` with the pinned lockfile. Installation used `/private/tmp/sales-dashboard-npm-cache` as its writable cache.

Vite binds to `127.0.0.1` with `strictPort: true`. Inspect occupied ports before starting another process. Keep the server running, open its URL, and verify the three scores. Stop an agent-started preview with Ctrl+C in its terminal. Source edits update development; production needs a new build and refresh.

## Local version history

This folder is its own Git repository on `main`. The student approved `Local Experiment <local-experiment@example.invalid>`, stored only in local Git configuration. That authorization continues for this build’s checkpoint. A commit author would become public if history were later published.

Earlier checkpoints: `76f7f80` added the starter; `177b5e7` recorded checked setup; `5c9f19b` recorded the agreed plan. The Build checkpoint contains named app files, public data copies, tooling, tests, licenses, and documentation. Generated `dist/`, `node_modules/`, and the original untracked `predictions/` files are excluded from the checkpoint. Original inputs are unchanged.

## Checks and next stage

Build and development/production previews worked. The test page reported 30 of 30 checks passed, including actual local font faces. Browser evidence is in `BUILD_CHECKS.md`. Separate `evaluate-browser-app` is the next stage. Nothing has been deployed.
