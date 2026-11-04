# Dashboard planning decisions

## Interactive mistake groups — November 4, 2026

The user chose groups by the number of methods wrong, rather than banking-topic grouping or custom tagging. Counts follow the selected category before text search. Group buttons and the existing view selector control one shared example view, avoiding contradictory simultaneous filters. Accuracy scores retain their category denominator. Native buttons and existing local data are sufficient; no additional dependency, storage, or remote model is needed.

## October 9, 2026

- The student selected **compare the three methods and explore their mistakes** as the main task. The first version centers on a comparison and example investigation.
- The audience answer was **“just some random people.”** The agreed plan interprets this as general visitors and uses ordinary descriptions of known categories, predictions, accuracy, and disagreement.
- The experiment remains local, following the earlier explicit instruction. Publication is outside the requested work.
- Public data origin was established by comparing every supplied text/reference-label pair with the official PolyAI BANKING77 test file. This resolved the earlier uncertain provenance for those fields. The student approved automatic local loading, with source attribution. How the provided predictions were generated remains unverified.
- The technical plan selects one approved CSV-reading library (`papa-parse`) and native controls/calculations. This handles quoted CSV fields while keeping the dashboard small; managed build preparation will occur during a later user-requested Build stage.
- The student confirmed **“Yes—make this the agreed plan; build later.”** `PLAN.md` is now agreed. No app implementation, data staging, or dependency installation occurred during planning.

## Implementation on October 9, 2026

- The student requested Build and a local browser link. The implementation retains the agreed scope and unchanged public data copies; original inputs remain untouched.
- Papa Parse 5.7.0 handles quoted CSV fields. Native controls, tables, and bars provide the rest. Vite 8.3.4 prepares local previews with exact locked versions and installation scripts disabled.
- Existing bundled Node 24.19.0 meets Vite’s requirements and passed actual checks, so no replacement was needed. npm 10.9.3 was bootstrapped temporarily from the official registry because the bundled runtime lacked it.
- Narrow screens stack example text, known type, and predictions. Metric and list-filter behavior remains as agreed.
- Initial Build checks passed; separate Evaluate and publication remain later stages. All previews bind only to this computer.

## Evaluation and publication — November 4, 2026

- The student requested Evaluate followed by Deploy to GitHub Pages. This supersedes the earlier local-only delivery choice, without changing the dashboard's model, dataset, audience, or main interactions.
- Selected destination: the public `yehuawei01/sales-dashboard-test` repository, using the student's supplied account and repository name. The public source/history implications were explained before this request. Existing approved `Local Experiment <local-experiment@example.invalid>` attribution is preserved; no history rewrite or personal email substitution is needed.
- Independent recount and the existing 30 browser checks passed on the original built source. Preserve those results as Round 1 in `EVALUATION.md`; refresh affected checks after publishing configuration and source links are included in the next checkpoint.
- The available bundled Node is now 24.22.1. A clean locked installation with npm 10.9.3 and a production build passed; `.node-version` aligns the publishing workflow with this tested runtime. Application dependencies remain pinned and unchanged.
- Publication uses bundled data and local assets only. No backend, account system for visitors, runtime AI calls, analytics, or secret keys are added.
