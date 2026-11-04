# GitHub Pages deployment

Status: **Deploy complete.** The public site, its ordinary update in a returning browser, and all 12 published files were verified on November 4, 2026.

- Public source: `https://github.com/yehuawei01/sales-dashboard-test`
- Verified website: `https://yehuawei01.github.io/sales-dashboard-test/`
- Branch: `main`
- Publishing workflow: `.github/workflows/pages.yml`
- Production repository prefix: `/sales-dashboard-test/`
- Evaluation evidence: `EVALUATION.md`, including the final tested source checkpoint.
- Final evaluated app source commit: `d5bac404a7ecdd996c3bad36e5b0257d4746db2d` (Round 3). Initial publication used the Round 2 source checkpoint recorded below.
- Verified updated publication commit: `5c83462d42b43687bddd6222feb2aa6441242307`. Relevant app source and plan match the final evaluated app checkpoint; only reports differ.
- Node: 24.22.1; npm used for local evaluation: 10.9.3.

The student's November 4 request authorizes Evaluate followed by the public GitHub Pages workflow. The student supplied the account `yehuawei01` and repository name `sales-dashboard-test`, and browser sign-in to that personal account was observed. Existing history and the approved placeholder author identity are preserved. No tokens or passwords belong in the project or chat.

## Website contents

The workflow builds with locked npm dependencies and uploads only `dist/`. Tests, reports, source history, local originals in `predictions/`, development dependencies, and Git metadata are not website files. Source, plan, evaluation, and deployment records remain public in the repository. The app retains the BANKING77 attribution/license, library/font notices, and visible limits on prediction provenance.

Official Action releases were checked on November 4, 2026: checkout v7.0.1, setup-node v7.1.0, configure-pages v6.0.0, upload-pages-artifact v5.0.0, deploy-pages v5.0.1. The template was updated only for setup-node's newer verified patch/minor release. Publishing uses GitHub Actions as the repository's Pages source.

## Completion evidence

The sections below record successful workflow completion and actual live observations, rather than treating a push or queued run as deployment success. Source tests and the formal local evaluation remain in `EVALUATION.md`.

## First publication — November 4, 2026

- Evaluated source: `e462c8546196ffdb891f714b43c0f7de3c952105` (Round 2).
- Published commit: `0b0e8569cf8ae256dd6f3700b6b08a73fcb062e8`. Its relevant source and plan are identical to the evaluated checkpoint; the difference is evaluation/deployment reports.
- Successful workflow: [Publish browser app, run 41890224775](https://github.com/yehuawei01/sales-dashboard-test/actions/runs/41890224775). The package job completed in 18 seconds and deploy in 8 seconds. The Actions runner-image migration annotation was informational; neither job failed.
- GitHub Pages was enabled with build type `workflow` before pushing `main`. The repository was created empty, with no conflicting generated README or forced history change.
- The live browser loaded `https://yehuawei01.github.io/sales-dashboard-test/`, including the fingerprinted script and stylesheet beneath the repository prefix. It showed 3,080 examples, 88.44% / 92.24% / 94.16%, and 539 mistake examples.
- Beneficiary not allowed changed scores to 87.50% / 90.00% / 35.00% and 26 mistake examples; Next reached the one-row final page, and Reset restored the overview. Clicking Source code and build records opened the actual public `yehuawei01/sales-dashboard-test` repository.
- The same browser returned to the live page before the ordinary update and confirmed the new publication note was not yet present. The update adds the now-verified publication date and a link to this record, without changing calculations or data. Returning-browser verification follows after that source checkpoint is deployed.

## Verified ordinary update — November 4, 2026

- Evaluated app checkpoint: `d5bac404a7ecdd996c3bad36e5b0257d4746db2d` (Round 3); published commit: `5c83462d42b43687bddd6222feb2aa6441242307`.
- Successful workflow: [Publish browser app, run 41892709699](https://github.com/yehuawei01/sales-dashboard-test/actions/runs/41892709699). The package job passed in 16 seconds and deploy passed in 1 minute 12 seconds. Runner-image migration annotations were informational.
- The same browser tab that had visited the first publication received the new publication note with an ordinary reload of the unchanged live URL. It displayed “Published on November 4, 2026. Publication and update record.”, the original overview scores, and 539 mistake examples. No cache clearing, new browser profile, or query-string cache bypass was used for this returning-browser check.
- Changing the request type after that reload again produced 87.50% / 90.00% / 35.00% and 26 beneficiary mistake examples. Reset returned the tab to the default view. Captured live browser warning/error logs were empty.
- A separate HTTP comparison fetched every file from the live repository-prefixed URL and compared its bytes with the evaluated local `dist/` build: **12 of 12 matched**, with successful HTTP responses and no failures. This covers HTML, JS, CSS, all three fonts, all three CSVs, source/data license information, and the combined third-party notices.
- The repository's About section links to the live website. The in-app source link opened the actual public repository; its source, plan, evaluation, and publication-record paths are present in the pushed history.
- Final source/plan freshness checks passed. Any report-only commit following these observations preserves the evaluated and deployed app source and plan. The final evidence-only commit uses GitHub's documented `[skip ci]` instruction so it does not redeploy an identical website; this does not alter or disable the workflow. See [GitHub's skip-workflow documentation](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs).

No live verification gate remains unresolved. The evaluation's model-provenance and accessibility limitations still apply; publication does not remove them.

## Authentication and authorization history

Browser sign-in as `yehuawei01` succeeded. The official GitHub CLI 2.103.3 was downloaded from its release and its SHA-256 matched GitHub's published digest. A check of the pre-existing Git credential helper found no reusable GitHub publishing credential, without displaying or changing credentials.

Automatic approval review initially rejected initiating `gh auth login` with the additional `workflow` scope because it had not been specifically authorized. The student subsequently replied “I approve,” then completed device authorization on GitHub and confirmed “done.” GitHub CLI reported successful login to `yehuawei01`, using the system keyring. The normal CLI scopes are `repo`, `workflow`, `read:org`, and `gist`; no token or password is stored in project files. Publishing used a per-command GitHub CLI credential helper, without changing global Git credential settings.

The authenticated destination check confirmed the repository did not exist before creation. The only remote added is `origin`, pointing to `https://github.com/yehuawei01/sales-dashboard-test.git`. Source freshness and plan applicability passed immediately before upload. No unrelated repository, identity, or branch was changed.

## Ordinary updates

1. Change the requested behavior or content while preserving other settled decisions.
2. Evaluate affected behavior and record its source checkpoint, expected/observed results, and limitations.
3. Run the source/plan freshness checks described by the plugin; commit only intended public files.
4. Push `main` without force-pushing, and wait for that commit's Pages run to complete successfully.
5. Check the live known-answer interaction and reload a returning browser. Update this record with the deployed revision.

Vite fingerprints imported assets. If a public CSV or other file copied verbatim changes, version its filename/reference explicitly. Keep data licenses and notices. Never commit credentials or private visitor imports.
