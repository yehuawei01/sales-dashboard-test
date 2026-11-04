# Prediction comparison dashboard

## Agreed interactive extension — November 4, 2026

The user selected mistake patterns: exactly one, two, or all three methods wrong. Add clickable groups with counts for the selected reference category, calculated from exact prediction/reference equality. The three groups partition all mistakes (355 + 132 + 52 = 539 on the default data). Counts are before text search; selecting a group filters only examples and starts at page one. Category selection updates group counts and scores; search intersects the selected group. Existing All examples and Methods disagree views remain available and deselect the mistake-group buttons. Reset restores all categories, Any method incorrect, empty search, and page one. Empty groups remain selectable and show the existing readable empty state. Use native keyboard-operable buttons with pressed state, responsive layout, and no new dependencies or storage. All-three-wrong includes shared wrong answers, not only disagreement. Verify independent fixture counts [2,2,1], real-data counts [355,132,52], combined filters, reset, keyboard operation, and narrow rendering. This extends the earlier interaction exclusions only as stated and leaves the data and accuracy formulas unchanged.

Status: the first version was agreed on October 9, 2026 and subsequently built. On November 4, 2026, the student requested formal evaluation and GitHub Pages publication; the amendment below supersedes the original local-only delivery decision. The calculation model and dashboard interactions remain as originally agreed.

## Brief, audience, and useful task

Opening request: “Use plan-browser-app to help me plan a simple dashboard based on the csv files in the 'predictions' folder.” Earlier instructions require keeping the experiment local and explaining choices for someone with no coding experience.

The student chose **“Compare the three methods and explore their mistakes.”** Their audience answer was “just some random people,” interpreted here as general visitors who need plain-language definitions.

Smallest useful version: one page that compares the saved predictions on the same test examples and lets a visitor investigate where the methods make different mistakes.

Learning objective: understand that the method with the highest overall accuracy can still perform poorly on a particular request category.

The three supplied filenames will be labeled **Word-based logistic regression**, **Fine-tuned classifier**, and **Prompted LLM**. These names describe the provided files; the dashboard does not verify how the methods were trained or prompted.

## First version and request coverage

| Request | Planned behavior | Check |
| --- | --- | --- |
| Use the prediction CSVs | Load the three verified local files automatically and match examples by `case_id`. | Exactly 3,080 shared examples and 77 known request categories, with identical reference text/labels. |
| Compare the three methods | A compact comparison shows accuracy, correct answers, incorrect answers, and the common denominator. Native horizontal bars use a labeled 0–100% scale alongside exact numbers. | Match the independent totals below. |
| Explore mistakes | Filter by reference category, search example text, and choose all examples, any method incorrect, or methods disagree. Show the known category and all three predictions side by side. | Match the specified category and mistake counts below. |
| Keep it simple | One page, ordinary labels, a short “How to read this” explanation, and 25 examples per page. | Main task is usable without knowing programming or machine-learning terminology. |
| Keep runtime self-contained | Static app with bundled files, code, and fonts; GitHub Pages publication authorized November 4. | No external runtime APIs, model calls, accounts, or analytics; only the app's own origin serves assets. |

No requested capability has been deferred. The agreed first version excludes model training, new predictions, confidence estimates, cost/speed comparisons, statistical-significance claims, a full 77-by-77 confusion chart, CSV replacement/export, and persistent saved selections. Hosting was originally excluded and is now included by the November 4 publication amendment. Reconsider the plan if other excluded features are requested later.

## Data and origin

Inputs, preserved without modifying the originals:

- `predictions/bow_logistic_regression_test_predictions_3080.csv`
- `predictions/fine_tuned_classifier_test_predictions_3080.csv`
- `predictions/llm_prompting_test_predictions_3080.csv`

All have `case_id`, `text`, `true_label`, `predicted_label`, and `correct`. The LLM file also has `status` and `error`.

Read-only inspection found 3,080 rows per method, unique nonempty IDs, the same ID set, and matching text/reference labels by ID. There are 77 categories with 40 examples each. All current predictions are present and within the known category set. Every supplied correctness flag agrees with independently recomputed label equality; every LLM status is `ok` and its error field is empty.

On October 9, 2026, all `(text, true_label)` pairs in all three files were compared with the official PolyAI `(text, category)` test file: all 3,080 matched exactly, in order, without normalization. No local data was uploaded for this check.

Public source: [PolyAI BANKING77](https://github.com/PolyAI-LDN/task-specific-datasets), [official test CSV](https://github.com/PolyAI-LDN/task-specific-datasets/blob/master/banking_data/test.csv), and [CC BY 4.0 license](https://github.com/PolyAI-LDN/task-specific-datasets/blob/master/LICENSE). Credit Casanueva et al. (2020), *Efficient Intent Detection with Dual Sentence Encoders*, as requested by the repository. Build must retain the license and visible attribution, and explain that case IDs and method predictions were added to the source examples. The public-source check establishes the text/reference-label origin; prediction generation remains unverified.

During Build, copy only the verified input files into the app's local data assets and retain their source notice. Runtime reads must stay on the preview's own origin; do not fetch the public repository from the app. Planning stages only authored plan/decision records, not the supplied CSVs.

Current file SHA-256 values, tying expected results to the inspected inputs:

| File prefix | SHA-256 |
| --- | --- |
| `bow_logistic_regression` | `7849d3e747329300480ed0bbef2ce0f698f19ed1a42c3ce9fd4c3d3e4bcc1718` |
| `fine_tuned_classifier` | `a8806998d171702f18b411627bbd02f8118e11dc9ad46b63e394b99cabb3b948` |
| `llm_prompting` | `68a6c410a3b7acf045b7896b2f06fd619cabaf54bc7df83fdb0b9cbb943b26d1` |

## Calculation rules and assumptions

One example has one reference category and one prediction per method. Match by `case_id`, never by row position or by joining only on the category. Duplicate/missing IDs, different ID sets, or mismatched text/reference labels block the comparison with a readable error; do not silently compare different samples or drop cases.

Use the reference label as the answer for this evaluation, without claiming it is infallible. Recompute correctness from exact category equality; do not trust the provided `correct` flag as the source of a metric.

- **Correct answers:** number whose prediction equals the reference label.
- **Incorrect answers:** selected example count minus correct answers.
- **Accuracy:** correct answers divided by selected example count, multiplied by 100.
- **Any method incorrect:** an example where at least one of the three predictions is wrong.
- **Methods disagree:** an example where the three predicted labels are not all equal. Disagreement is different from incorrectness: all methods can agree on a wrong answer.

Counts are whole examples. Display accuracy to two decimal places and calculate with unrounded counts. Percentage differences, if displayed, use percentage points and are calculated before rounding. Show sample size beside the percentages; a selected category has only 40 examples in the current data.

The reference-category filter updates comparison metrics and example results immediately. Search and the example-view selector filter only the example list; label their scope clearly and keep headline accuracy based on the selected reference category. Always show matching-example count and pagination range.

Required CSV fields: `case_id`, `text`, `true_label`, `predicted_label`. Preserve strings and IDs. Accept BOM, CRLF, quoted commas, escaped quotes, and quoted line breaks. Ignore wholly blank lines; reject malformed rows, blank required values, or unknown predicted categories. If `status` is present, require `ok`, and require its `error` field to be blank. Such failures show no ranking until the data is fixed. A contradictory `correct` flag raises a data-quality warning but never overrides label equality. Empty valid input produces “No examples” and an unavailable accuracy, never 0% or division by zero.

These are descriptive results on this test set, not a recommendation for production banking use. Files contain no verified cost, latency, confidence, or training information. Overall accuracy gives each example equal weight; this test set happens to have equal counts per category.

## Default and counterfactual checks

First load: all 3,080 examples, all categories, empty search, and the example list set to **Any method incorrect**. The comparison shows the overall leader while the example list opens on mistakes worth investigating. All examples remain accessible through the selector.

Independently counted using Python's standard CSV reader and direct reference/prediction comparisons, not future app code:

| Method | Correct | Incorrect | Accuracy |
| --- | ---: | ---: | ---: |
| Word-based logistic regression | 2,724 | 356 | 88.44% |
| Fine-tuned classifier | 2,841 | 239 | 92.24% |
| Prompted LLM | 2,900 | 180 | 94.16% |

For example, LLM accuracy is `2,900 / 3,080 × 100 = 94.155844…%`, displayed as 94.16%. Its 180 errors equal `3,080 − 2,900`. The default mistake list has **539** examples; the disagreement list has **511**. All three methods are wrong on **52** examples, demonstrating that agreement is not proof of correctness.

Meaningful input change: select `beneficiary_not_allowed` (display “Beneficiary not allowed”). The denominator becomes 40 for each method. Word-based: `35/40 = 87.50%`, 5 errors; fine-tuned: `36/40 = 90.00%`, 4 errors; LLM: `14/40 = 35.00%`, 26 errors. The leading method changes to the fine-tuned classifier. There are 26 examples with any method incorrect and 25 with disagreement. This is an important category weakness, not evidence that the overall calculation is wrong.

Additional filter check: `card_arrival`, 40 examples. Correct counts are 34, 34, and 32; accuracies 85.00%, 85.00%, and 80.00%; errors 6, 6, and 8. The first two methods tie. There are 11 examples with any error and 8 with disagreement. Ties must remain ties.

## Separate hand-check fixture

Use these eight invented examples only in `tests/`, clearly separate from the substantial 3,080-example default. `A` and `B` are fictional categories; fixture text can be short synthetic descriptions, never copied private records.

| ID | Reference | Word-based | Fine-tuned | LLM |
| --- | --- | --- | --- | --- |
| a1 | A | A | A | A |
| a2 | A | A | A | A |
| a3 | A | A | A | B |
| a4 | A | B | A | B |
| b1 | B | B | B | B |
| b2 | B | A | B | B |
| b3 | B | A | A | B |
| b4 | B | A | A | A |

Independent derivation: correct counts are 4, 6, and 5 of 8, yielding 50.00%, 75.00%, and 62.50%; incorrect counts are 4, 2, and 3. There are 5 examples with any error, 4 with disagreement, and 1 where all methods are wrong. Filter A: correct counts 3, 4, 2 of 4 (75%, 100%, 50%). Filter B: 1, 2, 3 of 4 (25%, 50%, 75%). The filtered leader changes without changing any predictions.

## Interaction, presentation, and acceptance

- Explain **known request type**, **predicted request type**, **accuracy**, and **disagreement** beside the view or in a short expandable explanation. Replace underscores with spaces for display while preserving original values in calculations.
- Category selection, example-view selection, and search update immediately. Reset restores the default category, search, view, and first page. Show the active category and list filters explicitly.
- Page the example list in groups of 25; reset to page one after a filter change. Show “1–25 of 539” for the default list and disable unavailable previous/next actions. Never imply the displayed page contains every matching example.
- Render imported text as plain text. Show full text and all predictions; use explicit Correct/Incorrect text alongside color.
- Keep loading, unreadable/missing file, schema mismatch, invalid data, and no search results states readable. A bad load must not leave stale percentages labeled as current.
- Desktop acceptance: comparison, filters, and first results are easy to find at a normal 1280-pixel-wide viewport. At 390 pixels, stack comparisons and example details so all labels and predictions remain readable without clipping or page-wide horizontal scrolling.
- Keyboard acceptance: all filters, search, reset, and paging are reachable with visible focus; controls have labels; results and changing counts are accessible. Color is never the only indicator. Use semantic tables on desktop and an accessible labeled narrow layout.
- Use the starter's bundled Duke colors, typography, and local licensed fonts, with no institutional marks or endorsement claim. Prefer useful spacing and ordinary controls over animation.
- Evaluation must independently verify overview/category/fixture counts, filter scopes, pagination, quoted CSV fields, reordered rows, duplicate IDs, mismatched references, empty input, invalid predictions, and harmless rendering of markup-like text. No predictions, browser selections, or private inputs are saved in browser storage.

## Smallest justified tool choice and Build handoff

Selected library ID: **`papa-parse`**, approved version `papaparse@5.7.0`, for reliable parsing of the supplied quoted CSV files. Native JavaScript arrays handle a small three-file join/count operation; native HTML handles the small comparison and paged examples. No chart, table, statistics, or React library is selected.

Build mode: **managed**, because the agreed app uses one approved library. During Build, preserve the current starter content and add only the required managed build files, pinned dependencies, lockfile, and notices using the installed managed-build guidance. Reuse verified compatible host Node/npm and record actual commands/versions in `SETUP.md`; no dependency installation or starter migration occurs during this planning stage. Bundle all runtime code locally. Visitors still need only a browser, and both development and production previews remain loopback-only.

When the student later requests Build, use `build-browser-app`, `papa-parse-browser-app`, and the bundled Campus Designer. Preserve the three original CSVs, create local app data assets with attribution, implement real reusable calculation modules, and create the browser test page at `tests/index.html`. Run the appropriate dependency/build checks and Evaluate against the independent expected values above. Do not publish.

## Agreement and remaining questions

Agreed: compare the three methods and explore mistakes; keep the experiment local; explain choices in ordinary language; automatically load the three CSVs; use the first-load mistake view, category/search/list controls, and metric/filter behavior specified above. Technical choices use the smallest justified approved library/build configuration.

The student confirmed **“Yes—make this the agreed plan; build later.”** No material planning question remains. Implementation and dependency preparation are intentionally left for a later user-requested Build stage. Incorporate any later student correction into this plan before building.

## Publication amendment — November 4, 2026

The student requested: “Use evaluate-browser-app to evaluate this app, then use deploy-browser-app to help me publish it on GitHub Pages.” The repository name is `sales-dashboard-test` and the selected GitHub account is `yehuawei01`. This supersedes the original restriction to local delivery and authorizes the normal public GitHub Pages publishing workflow, whose public source/history implications were explained before the request.

Publish the existing dashboard without changing its data, formulas, audience, or main interactions. Use `https://github.com/yehuawei01/sales-dashboard-test` for public source and the repository prefix `/sales-dashboard-test/` for production assets. Keep licenses and a compact build explanation in the app; keep the full request, plan, evaluation, and deployment records in source only. The website artifact contains only `dist/`, excluding tests, local inputs, reports, Git metadata, and development dependencies. Verify production assets, a known score, the category counterexample, source links, and a returning-browser update at the live address.
