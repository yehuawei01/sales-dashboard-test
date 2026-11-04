# Prediction comparison dashboard evaluation

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

## Round 2 — publication configuration

Pending the source checkpoint and the checks at `/sales-dashboard-test/`. Round 1 remains the evidence for the original source; publication must not proceed on that round alone.
