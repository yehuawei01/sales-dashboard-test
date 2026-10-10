# Initial Build checks

October 9, 2026. App: Prediction comparison dashboard. These checks cover the agreed known answers and important browser behavior. They are not a completed Evaluate stage.

## Reproduce and compare

Use the actual tools in `SETUP.md`. Start `npm run test:browser -- --port 5174` and open `http://127.0.0.1:5174/tests/`. The final visible result was **30 of 30 checks passed, 0 failed**: 28 shared calculation/data checks and two browser-only checks. The 28 shared tests also passed under the verified Node executable using an explicit reader for the same local CSVs.

Build with `npm run build`, then `npm run preview -- --port 4173`. Open `http://127.0.0.1:4173/`. Independently established expectations from `PLAN.md` matched these visible results:

| View | Expected and observed |
| --- | --- |
| Default | 3,080 examples, 77 categories; correct 2,724 / 2,841 / 2,900; accuracy 88.44% / 92.24% / 94.16%; 539 examples with any incorrect method; rows 1–25, page 1 of 22 |
| Beneficiary not allowed | 40 examples; accuracy 87.50% / 90.00% / 35.00%; Fine-tuned classifier leads; 26 examples with any incorrect method |
| That category, Next | Row 26–26 of 26; page 2 of 2; one row; Next disabled |
| That category, Methods disagree | 25 matches; page 1 of 1 |
| Card arrival, Methods disagree | 40 reference examples; accuracy 85.00% / 85.00% / 80.00%; first two methods jointly lead; 8 matches |
| No matching search | 0 matches, readable empty state, no pages; selected-category scores unchanged |
| Reset view | All categories, blank search, Any method incorrect, page 1; default scores and 539 matches restored |

## Test coverage

The 28 checks include the independent eight-example fixture, category denominators/leaders, wrong answers vs disagreement, combined filters, case-insensitive search, quoted commas/quotes/newlines/BOM/CRLF, reordered rows joined by ID, partial/empty pagination, empty valid data, and actual dataset totals. They reject missing/duplicate headers, blank required fields, malformed records, duplicate IDs, unequal ID sets, mismatched reference text/category, unknown predictions, non-ok statuses, and error fields. Contradictory correctness flags warn without overriding category equality. Markup-like fixture text remains literal.

The browser renderer test passes synthetic markup-like text through the actual `createExampleRow` function, checking exact literal text, all five cells, explicit answer labels, and no inserted image/script elements. The font test loads the actual bundled faces and inspects FontFace statuses: **EB Garamond 400 loaded; Open Sans 400 loaded; Open Sans 600 loaded**.

## Browser evidence and limits

- Production inspected at 1280, 390, and 320 pixels wide. Document width equaled viewport width at each. At narrow sizes, full text, reference category, predictions, and Correct/Incorrect labels were readable in stacked rows.
- Controls have native labels; text accompanies correctness color. Visible focus was confirmed on view/search controls. Tab navigation, keyboard search typing, and Enter activation of reset worked. Search left scores unchanged.
- Main contrast pairs were checked against AA text thresholds: white/navy, graphite/whisper gray, navy/white, magnolia/white, and white/copper. Focus has a royal-blue outline with a white separator. This is an initial inspection, not an accessibility certification or screen-reader audit.
- The production browser’s captured console showed no warnings/errors during normal use. The test page’s duplicate-header fixture deliberately produces Papa Parse’s duplicate-header warning.
- The production page’s observed asset inventory contained eight resources: one script, one stylesheet, three CSVs, and three fonts, all from `http://127.0.0.1:4173/`. Source review found no remote runtime imports, model calls, analytics, or browser storage. This records the observed page state, not an exhaustive network trace of every possible state.

## Data identity

Bundled CSVs matched the original supplied files byte for byte. SHA-256:

```text
bow_logistic_regression_test_predictions_3080.csv
7849d3e747329300480ed0bbef2ce0f698f19ed1a42c3ce9fd4c3d3e4bcc1718
fine_tuned_classifier_test_predictions_3080.csv
a8806998d171702f18b411627bbd02f8118e11dc9ad46b63e394b99cabb3b948
llm_prompting_test_predictions_3080.csv
68a6c410a3b7acf045b7896b2f06fd619cabaf54bc7df83fdb0b9cbb943b26d1
```

Public text/reference provenance was established during planning; see `PLAN.md` and `app/public/data/SOURCE.txt`. Original `predictions/` files were not edited or staged. Training and prediction generation remain unverified.

## Toolchain and checkpoint

Node 24.19.0 and npm 10.9.3 were verified. Installation and offline clean reinstall passed with installation scripts disabled. The packaged dependency checker passed; installation reported zero vulnerabilities. Production build retained three library/font notice sections.

This document is included in the **Build local prediction comparison dashboard** Git checkpoint. Use `git log -1` to identify that revision before Evaluate. Evaluate should record its own reproducible evidence against the tested revision. Publication is outside the current local experiment.
