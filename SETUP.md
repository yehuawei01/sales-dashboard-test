# Local browser app setup

Prepared on October 9, 2026 using the installed Browser App Builder `setup-browser-app` skill.

## What is ready

This folder contains a simple starter website in `app/`. It uses ordinary browser features, so no extra app libraries or software installations were needed. Its code, styles, fonts, and font licenses are stored locally.

The preview is available at **http://127.0.0.1:8765/app/** while the preview process is running. `127.0.0.1` means this computer; the server accepts connections only from this computer. The preview serves static files from the project root so both `app/` and future `tests/` pages can load JavaScript modules.

No website has been published, and no remote Git repository or publishing workflow has been added.

## Verified tools

- Operating system: macOS.
- File and shell access: verified in the selected, initially empty folder.
- Git executable: `/usr/bin/git`; verified with `git --version`: `git version 2.50.1 (Apple Git-155)`.
- Existing preview runtime: `/usr/bin/python3`; verified with `/usr/bin/python3 --version`: `Python 3.9.6`.
- Browser: Codex in-app browser, operated through its browser tools.
- Setup mode: plain HTML, CSS, and JavaScript. There is no agreed application plan or selected library yet.

## Version history

Git saves named versions so we can return to earlier work. This folder is its own repository on the `main` branch; `git rev-parse --show-toplevel` confirmed that the repository root is this project folder.

The student approved the experiment-only identity `Local Experiment <local-experiment@example.invalid>`, after being told that a commit's name and email would become public if its history were later published. Both values were set with `git config --local`, affecting only this project.

Initial starter commit: `76f7f80` — **Add local browser app starter**. Its existence and approved author were verified with `git log -1`. Only the starter files and their ignore rules were staged; the staged file list, source diff, and whitespace check were reviewed before committing.

The starter's ignore rules exclude generated output, local input files in `local-inputs/`, environment files, and common operating-system files from future additions to Git. Real confidential data should not be added to this project or its history.

## Preview checks

Verified in the browser:

1. Opening `/app/` displayed **“JavaScript module loaded. Preview is ready.”**
2. Clicking **Check interaction** displayed **“Interaction works. Ready to plan your app.”**
3. The page styles and theme styles loaded successfully. Server requests for the local Open Sans 400 and EB Garamond 400 font files returned HTTP 200.
4. The browser's captured console contained no warnings or errors.

The browser requested an optional favicon that the starter does not supply, returning HTTP 404; this did not affect loading or the interaction.

## Restarting the preview

If the preview stops, ask Codex: **“Restart this folder's local browser preview and open the starter.”** You do not need to type commands yourself.

For the agent resuming work, run the following existing-runtime invocation from the project root and keep the process running:

```sh
/usr/bin/python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/app/` and verify the module status and button. Refresh the page after editing files. If port 8765 is already occupied, inspect the existing process before starting a duplicate or changing the recorded URL. Stop a preview started in a terminal with Ctrl+C in that terminal.

## Remaining work

- Plan the app's purpose, inputs, outputs, and expected behavior with `plan-browser-app`.
- No application test page exists yet. The future location is `tests/index.html`, served as `http://127.0.0.1:8765/tests/`. Create it when there is defined behavior to evaluate.
- The checked starter proves that local setup works; it is not a finished or evaluated sales dashboard.
