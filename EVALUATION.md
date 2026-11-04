# Prediction comparison dashboard evaluation

## Round 4 — interactive mistake patterns — November 4, 2026

Live follow-up: publication `8143b74247c93d251df3bf47812a60cf073cc945` passed workflow 41895620046. All three group buttons were verified on the public site with totals 355 / 132 / 52 and unchanged accuracy scores. Normal reload restored consistent default controls and counts using the new fingerprinted script; captured live errors/warnings were empty. See DEPLOYMENT.md for the workflow link and source checkpoint.

Tested source: `2f119ad2500b5b2e1d74e3cd30c11875f644bf04`. Result: **31 of 31 browser checks passed**, including 29 calculation/data checks and two real font/rendering checks. A clean-checkpoint production build passed with no dependency changes. The user explicitly selected grouping by one, two, or three methods wrong; PLAN.md records the revised behavior.

An independent standard-library CSV recount established 355 one-method, 132 two-method, and 52 three-method mistakes, totaling 539. The hand fixture partitions errors into [2,2,1], including its shared wrong answer. Tests verify these partitions, actual group filtering, empty counts, category counts, and search intersection. For the beneficiary category, independent existing counts imply 20 / 3 / 3: 26 error examples, 35 summed method errors, and three triple errors give three double errors and twenty single errors.

Production browser observations: All three wrong showed 52 examples and three pages; Next showed 26–50. Keyboard Enter on One method wrong switched to 355 examples and reset pagination. A search with no matches preserved the group's counts and category accuracy. Reset restored all defaults. Beneficiary group counts were 26 total, 20 single, three double, and three triple errors with category scores unchanged. Choosing Methods disagree deselected every group and showed its independent 25 examples. Two methods wrong showed 132 examples and six pages. Browser Back restored consistent default controls, counts, and scores before further interaction.

The 390-pixel mobile layout had document width 390. A screenshot of the actual controls confirmed stacked buttons, readable labels/counts, visible pressed/focus states, search and pagination. Desktop controls were reviewed at 1280 pixels. Production warning/error logs were empty. Existing provenance and accessibility limitations remain; no full assistive-technology audit is claimed. Required relevant-path freshness checks and plan checks were clean before the final run; subsequent commits may add reports only. Live update verification is recorded in DEPLOYMENT.md.

## Round 1 — November 4, 2026

**Result: passing local evaluation of the existing built dashboard.** Publishing configuration is evaluated separately in Round 2.

Tested commit: `c392cb7c07e65f561446820ce3a21dbb391b57b2`.

Relevant paths: `app/`, `tests/`, `.github/workflows/`, `package.json`, `package-lock.json`, `.npmrc`, `.node-version`, `vite.config.js`, `scripts/`, `licenses/`, and the substantive requirements in `PLAN.md`. Inspection found no additional authored executable tooling. Generated `dist/` and `node_modules/` are not source. Untracked original `predictions/` files remain outside the publication artifact and outside commits.

### Independent expected results

Before browser checks, Python's standard `csv.DictReader`, without importing application code or trusting saved correctness flags, matched rows by `case_id` and counted exact reference/prediction equality. All three files had 3,080 unique shared IDs and identical text/reference pairs. Category sample sizes are 40. These recounts agree with the plan's earlier independent results.

| Scenario | Correct counts (word-based / fine-tuned / prompted) | Displayed accuracies | Any wrong / disagreement |
| --- | --- | --- | --- |
| All examples | 2,724 / 2,841 / 2,900 out of 3,080 | 88.44% / 92.24% / 94.16% | 539 / 511 |
| Beneficiary not allowed | 35 / 36 / 14 out of 40 | 87.50% / 90.00% / 35.00% | 26 / 25 |
| Card arrival | 34 / 34 / 32 out of 40 | 85.00% / 85.00% / 80.00% | 11 / 8 |

Accuracy is `correct / selected examples × 100`, rounded only for display. There are 52 examples where all three methods are wrong. The separate eight-example fixture yields 4 / 6 / 5 correct (50% / 75% / 62.5%), five examples with any mistake, four disagreements, and one shared wrong answer. These are checkable counts, not a claim about how predictions were generated.

Each bundled CSV matched its original local input byte for byte. SHA-256 values remain those recorded in `PLAN.md` and `BUILD_CHECKS.md`.

### Checks and observed results

- The installed plugin's dependency checker accepted the pinned direct dependencies and registry lockfile. A fresh `npm ci` restored 17 locked packages; npm reported zero vulnerabilities. An attempted offline reinstall first found the old temporary cache missing; a normal official-registry reinstall succeeded. No dependency or lockfile changes were made.
- Node 24.22.1, npm 10.9.3, Vite 8.3.4, Papa Parse 5.7.0, and the Codex in-app browser were used. `npm run build` passed and retained all three library/font notice sections.
- `http://127.0.0.1:5174/tests/` visibly reported **30 of 30 checks passed, 0 failed**: 28 model/data checks and two browser checks. Coverage includes independent fixtures, data totals, quoted CSV, row reordering, invalid/missing fields, duplicate IDs/headers, mismatched samples, unknown predictions, failed statuses, empty valid files, disagreement, filtering, pagination, and safe literal-text rendering. The local font test reported EB Garamond 400 and Open Sans 400/600 loaded.
- Production at `http://127.0.0.1:4173/` matched all three scenarios above. The initial mistake list showed 1–25 of 539, page 1 of 22. The beneficiary counterexample changed the leader to the fine-tuned classifier; Next showed 26–26 of 26, page 2 of 2, with Next disabled. Disagreement produced 25 rows. Card arrival retained the two-method tie and eight disagreement rows.
- A search with no matches showed zero rows and no pages while keeping category scores unchanged. Reset restored every default control, the scores, and 539 examples. Keyboard Enter activated Reset; Tab moved from the example selector to the labeled search field with a visible solid focus outline. Keyboard entry `CaRd` produced 170 mistake examples without changing overview scores.
- Navigation to the local license and browser Back restored a consistent default: empty search, all request types, the three overview scores, and 539 examples, before any further interaction.
- Desktop at 1280 pixels and narrow layouts at 390 and 320 pixels had document widths equal to their viewport widths. Screenshots were visually inspected at 1280 and 390. Narrow example rows stacked and exposed all five labels; native controls stayed labeled and correctness remained explicit in text. No layout change was necessary. A separate simplification review found the existing compact comparison and disclosures appropriate for the task.
- The production browser reported no captured warning/error logs during these interactions. Script/style URLs were local fingerprinted assets. Source inspection confirmed bundled CSV/fonts and no runtime service, model, analytics, or browser-storage calls. This is not an exhaustive network trace.

### Request and lesson coverage

The substantial 3,080-example initial view supports the requested comparison and mistake investigation. The beneficiary counterexample visibly demonstrates why the overall leader need not lead in a category. No requested analytical feature was dropped and no model assumption needed changing. The explicit November 4 publication request supersedes only the earlier local-delivery restriction.

### Source freshness and public review

Before and after the run, all three required relevant-path diffs were empty and `git ls-files --others` over relevant paths was empty, including ignored source. The plan existed at the tested commit; its contents matched the current plan during this round. The later publication amendment and configuration changes require Round 2 rather than relabeling these results.

All four existing commits, their authors, file lists, and available historical source were reviewed for publication. No credentials or private client/employer records were found. The history uses the previously approved `Local Experiment <local-experiment@example.invalid>` identity. Public BANKING77 text/reference attribution and the uncertainty about added prediction provenance remain visible. Current tests, build reports, dependency directories, and Git metadata will not be part of the website artifact.

### Limits

These checks do not establish the training/prompting provenance or performance on new data, certify a business model, or constitute a full accessibility/screen-reader audit. HTTP-failure messages were source-reviewed; the browser suite tests invalid data but did not simulate every failed-network state. Full 200% text zoom and assistive technology were not separately tested. Student review remains possible in the preview and through the documented assumptions; no consequential model question is unresolved.

## Round 2 — publication configuration — November 4, 2026

**Result: passing local publication evaluation. Live deployment verification is pending authenticated upload.**

Tested source commit: `e462c8546196ffdb891f714b43c0f7de3c952105`.

This checkpoint includes the agreed publication amendment, Vite repository prefix, public source/plan/evaluation links, GitHub Pages workflow, and Node 24.22.1 pin. The dashboard's calculation code, CSV data, dependencies, tests, and ordinary interactions are unchanged from Round 1, so its independent calculations, invalid-input coverage, keyboard review, and broad layout findings remain applicable. The plan amendment changes delivery only and implements the student's explicit publishing request; it introduces no new model assumption.

- The pinned dependency checker passed again. The workflow YAML parsed with separate build and deploy jobs, uploads only `dist/`, and grants Pages/OIDC write permissions only to the deploy job. Its official Action releases were verified before inclusion.
- A fresh production build from the clean tested checkpoint passed, retained all three notice sections, and did not modify tracked source. The built website contains only HTML, bundled JS/CSS/fonts, three CSVs, and data/library license notices. No tests, evaluation reports, local originals, development dependencies, Git metadata, or symbolic links are present.
- The browser suite was reloaded after the configuration change and visibly passed **30 of 30 checks, 0 failed**, again confirming all three font faces loaded.
- The preview was restarted using the current configuration at `http://127.0.0.1:4173/sales-dashboard-test/`. Its script and stylesheet URLs include `/sales-dashboard-test/assets/`. The overview showed the independent 88.44% / 92.24% / 94.16% scores, 3,080 examples, and 539 mistake examples.
- At this repository path, Beneficiary not allowed showed 87.50% / 90.00% / 35.00% and 26 mistake examples. Next showed the one-row final page with Next disabled. Reset restored the overview.
- The expanded build explanation displayed the updated evaluation statement and exact agreed GitHub source, plan, and evaluation URLs. Local data/source and notice links retained the repository prefix. Remote source links await creation/upload of the repository and are part of live verification, not a claimed completed external check.
- The 390-pixel layout retained document width 390 with the expanded build notes; the mobile example rendering remained readable. Browser Back from the prefixed local license returned to consistent default controls, overview scores, and 539 examples before further interaction. No captured production warning/error logs appeared.
- Before and after the final run, all three freshness diffs were empty and the relevant-path untracked listing was empty. The plan at the tested commit exists and matches the current plan; its SHA-256 is `c6e32981c784441b7a96f96f66b4c0e974d9da5e2b2c5dee486343163f6b3acb`. Only report changes may follow this round without retesting relevant source.

The limits listed for Round 1 still apply. Evaluation does not claim that GitHub Actions has run, that the intended public URL is live, or that a returning browser has received an ordinary live update; those are Deploy completion checks.

## Round 3 — publication note and ordinary update — November 4, 2026

**Result: passing evaluation of the small post-publication update.**

Tested source commit: `d5bac404a7ecdd996c3bad36e5b0257d4746db2d`.

The only app change since Round 2 is one paragraph in the existing build disclosure: the observed publication date and a link to `DEPLOYMENT.md`. README/deployment reports now describe the first successful publication. Calculation modules, CSVs, dependencies, workflow, build configuration, tests, and the agreed plan are unchanged, so Round 2's 30 passing checks and independent numerical evidence are retained rather than repeated for this copy edit.

A production build from the clean checkpoint passed. At the local repository-prefixed preview, the disclosure rendered “Published on November 4, 2026. Publication and update record.” with the exact selected repository's deployment-record link. Overview scores remained 88.44% / 92.24% / 94.16%. At widths 1280 and 390, document width equaled viewport width; the added note stayed within the existing disclosure layout. Source/plan freshness was checked before publication. An old browser connection initially failed and a fresh preview connection recovered; no application defect or source change was involved.

Before this update, the first live deployment was independently verified at the public URL with overview scores, the beneficiary counterexample, pagination/reset, and a working public source link. The same live browser was retained with no `publication-note` element present. The ordinary reload and new-note observation are recorded in `DEPLOYMENT.md` after this update's workflow completes.

### Live completion

Publication commit `5c83462d42b43687bddd6222feb2aa6441242307` completed [workflow 41892709699](https://github.com/yehuawei01/sales-dashboard-test/actions/runs/41892709699) successfully. A normal reload in the retained browser received the new note and preserved the independent overview scores. The beneficiary counterexample and Reset passed again, with no captured live warnings/errors. A separate live-file byte comparison matched all 12 files in the evaluated production output, including the CSVs and fonts. `DEPLOYMENT.md` records the first publication, ordinary update, exact commits, working public URLs, and future update procedure.

The final changes after this observation are evidence reports only. Relevant source, tooling, workflow, tests, and plan remain identical to the final evaluated app checkpoint. The original numerical/provenance/accessibility limits remain explicit; there is no claim of additional unperformed testing.
