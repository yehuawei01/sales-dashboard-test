# GitHub Pages deployment

Status: local publication evaluation passed; upload is awaiting authorization of the official GitHub publishing tool. Nothing has been published. Do not treat the intended website address as a verified live result.

- Authorized public source destination: `https://github.com/yehuawei01/sales-dashboard-test`
- Intended website: `https://yehuawei01.github.io/sales-dashboard-test/`
- Branch: `main`
- Publishing workflow: `.github/workflows/pages.yml`
- Production repository prefix: `/sales-dashboard-test/`
- Evaluation evidence: `EVALUATION.md`, including the final tested source checkpoint.
- Final evaluated source commit: `e462c8546196ffdb891f714b43c0f7de3c952105`.
- Node: 24.22.1; npm used for local evaluation: 10.9.3.

The student's November 4 request authorizes Evaluate followed by the public GitHub Pages workflow. The student supplied the account `yehuawei01` and repository name `sales-dashboard-test`, and browser sign-in to that personal account was observed. Existing history and the approved placeholder author identity are preserved. No tokens or passwords belong in the project or chat.

## Website contents

The workflow builds with locked npm dependencies and uploads only `dist/`. Tests, reports, source history, local originals in `predictions/`, development dependencies, and Git metadata are not website files. Source, plan, evaluation, and deployment records remain public in the repository. The app retains the BANKING77 attribution/license, library/font notices, and visible limits on prediction provenance.

Official Action releases were checked on November 4, 2026: checkout v7.0.1, setup-node v7.1.0, configure-pages v6.0.0, upload-pages-artifact v5.0.0, deploy-pages v5.0.1. The template was updated only for setup-node's newer verified patch/minor release. Publishing uses GitHub Actions as the repository's Pages source.

## Required completion evidence

Record the final evaluated source commit and published commit, completed workflow URL/result, observed live website address, successful assets under the repository prefix, the overview scores, the beneficiary counterexample, working source links, and a returning-browser update. A push or queued workflow alone does not complete Deploy.

## Access prerequisite

Browser sign-in as `yehuawei01` succeeded. The official GitHub CLI 2.103.3 was downloaded from its release and its SHA-256 matched GitHub's published digest, but it is not authenticated. A check of the existing Git credential helper found no reusable GitHub publishing credential, without displaying or changing credentials.

Automatic approval review rejected initiating `gh auth login` with the additional `workflow` scope because that credential permission had not been specifically authorized. No OAuth flow was started, no extra scope was granted, and no credentials were created or stored by that rejected attempt. Explicit authorization to initiate this flow is required before retrying; the student will review and approve access on GitHub itself. Repository and workflow access lets the official tool upload source and GitHub Actions workflows and is broader than browser sign-in alone.

After access is resolved, inspect whether `yehuawei01/sales-dashboard-test` already exists before creating it, preserve unrelated existing work, enable Pages with GitHub Actions, rerun the freshness checks, push the authorized branch, and complete the live evidence above. No remote was added and no repository was created during local preparation.

## Ordinary updates

1. Change the requested behavior or content while preserving other settled decisions.
2. Evaluate affected behavior and record its source checkpoint, expected/observed results, and limitations.
3. Run the source/plan freshness checks described by the plugin; commit only intended public files.
4. Push `main` without force-pushing, and wait for that commit's Pages run to complete successfully.
5. Check the live known-answer interaction and reload a returning browser. Update this record with the deployed revision.

Vite fingerprints imported assets. If a public CSV or other file copied verbatim changes, version its filename/reference explicitly. Keep data licenses and notices. Never commit credentials or private visitor imports.
