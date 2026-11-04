# Prediction comparison dashboard

Learn why an overall accuracy score can hide mistakes in particular request types.

This local dashboard implements the agreed `PLAN.md`. It automatically loads the three prediction CSVs, checks that they contain the same examples, and compares their saved answers. No coding is needed to use it.

## Open and use it

Open the published [Prediction comparison dashboard](https://yehuawei01.github.io/sales-dashboard-test/). GitHub Pages publication and the live overview/category interactions were verified on November 4, 2026.

Public source: [yehuawei01/sales-dashboard-test](https://github.com/yehuawei01/sales-dashboard-test). See `DEPLOYMENT.md` for verified revisions, workflow evidence, and update instructions. For local inspection while the preview is running, use **http://127.0.0.1:4173/sales-dashboard-test/**; that address works only on the computer running the preview.

1. Read the accuracy cards. Each uses the same examples and shows the exact correct and incorrect counts.
2. Choose a **Known request type** to change both scores and examples. Try **Beneficiary not allowed** to see a different method lead.
3. Use **Show examples** and **Search example text** to investigate mistakes. These controls change only the list; scores remain based on the selected request type.
4. Use **Previous** and **Next** for pages of 25 examples. **Reset view** restores all request types, a blank search, the first page, and **Any method incorrect**.

**How to read this comparison** explains the terms. Accuracy means matching the reference category exactly. Agreement does not prove correctness: all three methods can agree on a wrong answer. Full text remains visible; small screens stack each example’s reference and three predictions vertically.

If the preview stops, ask Codex: **“Restart this folder’s local dashboard preview.”** You do not need to type commands. Machine details and restart commands are in `SETUP.md`.

## Data and limits

There are 3,080 shared examples across 77 categories, with 40 examples per category.

| Method | Correct | Incorrect | Accuracy |
| --- | ---: | ---: | ---: |
| Word-based logistic regression | 2,724 | 356 | 88.44% |
| Fine-tuned classifier | 2,841 | 239 | 92.24% |
| Prompted LLM | 2,900 | 180 | 94.16% |

Percentages use full counts and round only for display. The default list contains 539 examples where at least one method was incorrect. Changes to category, list view, or search start on the first page. Search matches example text without regard to capitalization.

The source text/reference pairs match the official [PolyAI BANKING77 test file](https://github.com/PolyAI-LDN/task-specific-datasets/blob/master/banking_data/test.csv). Attribution: Casanueva et al. (2020), *Efficient Intent Detection with Dual Sentence Encoders*. The source is [CC BY 4.0](https://github.com/PolyAI-LDN/task-specific-datasets/blob/master/LICENSE); the unchanged license and details of added fields are in `app/public/data/`. The bundled CSVs are unchanged copies of the verified inputs in `predictions/`. IDs and method predictions were added locally; prediction generation, training, and prompting remain unverified.

These scores describe saved predictions on this test set. The app does not generate predictions or measure confidence, cost, or speed, and cannot establish performance on other data. Contradictory saved correctness flags warn without overriding exact category equality. Missing files, malformed fields, duplicate IDs, unequal samples, mismatched references, unknown predictions, or failed statuses block the comparison. Three valid header-only files show no examples and unavailable accuracy.

There are no accounts, analytics, remote model calls, browser storage, import replacement, or export. Runtime code, fonts, and data load locally. Source links open only when selected.

## Design and implementation

Browser App Builder’s Setup, Plan, Build, Papa Parse, and bundled Campus Designer skills guided this experiment. The page uses unchanged canonical Duke color tokens, local EB Garamond 400 headings, and local Open Sans 400/600 text. The font CSS and published fallback stacks are unchanged; all three faces loaded during browser checks. No font substitutions or institutional marks were added. No institutional endorsement is implied.

**Papa Parse 5.7.0** is the sole app library, selected to read fields with commas, quotation marks, and line breaks reliably. Native controls, tables, and bars keep the interface simple. `app/model.js` contains calculation functions shared with tests. The actual `app/render.js` row renderer inserts CSV values with `textContent`, keeping markup-like text literal.

**Vite 8.3.4** prepares development and production previews. Exact versions and integrity records are in `package-lock.json`; `.npmrc` disables package installation scripts. Ignored `node_modules/` holds dependencies; ignored `dist/` holds generated output. The build generates `app/public/THIRD-PARTY-NOTICES.txt`, retaining Papa Parse’s MIT license and both fonts’ OFL notices. Vite’s development-tool license remains in its installed package and lockfile. No CDN is required.

## Commands and checks

From the project root, with the verified Node/npm setup in `SETUP.md`:

```sh
npm ci
npm run dev -- --port 5173
npm run test:browser -- --port 5174
npm run build
npm run preview -- --port 4173
```

Use a separate terminal for each server. Development: `http://127.0.0.1:5173/sales-dashboard-test/`. Tests: `http://127.0.0.1:5174/tests/`. Production preview: `http://127.0.0.1:4173/sales-dashboard-test/`. Rebuild and refresh production after source changes. Servers bind to `127.0.0.1` and refuse occupied ports instead of silently choosing another.

All 30 initial checks passed: 28 calculation/data checks and two browser-only font/rendering checks. Formal evaluation on November 4, 2026 independently recounted the CSVs and reran the browser suite, with all 30 checks passing. Browser interactions verified scores, changing leaders and ties, filtering, paging, no matches, reset, keyboard search, browser Back, and desktop/narrow layouts. `EVALUATION.md` preserves each tested source checkpoint and the publication-path refresh. Historical build evidence is in `BUILD_CHECKS.md`; publishing status and update steps are in `DEPLOYMENT.md`.

## Publishing and updates

GitHub Pages is configured through `.github/workflows/pages.yml`. It checks out `main`, uses the tested Node version in `.node-version`, installs locked dependencies with `npm ci`, builds the app, and uploads only `dist/`. Source tests, development tools, Git metadata, and evaluation reports are excluded from the website bundle. These records remain available in the public source repository.

For later changes: revise the app, evaluate affected behavior, check that the tested source is current, commit, push `main`, and verify the completed Pages run and live known-answer interaction. Vite fingerprints imported JavaScript, CSS, and fonts. If a CSV or other verbatim public asset changes, give it an explicit new filename/version and update its reference before publishing so returning visitors receive the new data. Do not force-push or add confidential data, credentials, or local imports.
