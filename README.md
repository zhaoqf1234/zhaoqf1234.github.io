# Qingfei Zhao · Personal website

Two static pages for `https://zhaoqf1234.github.io`:

- `index.html`: LLM research, BPPO / PG-OPD paper figures and arXiv links, publications, education and experience.
- `embodied.html`: robotics methods and playable real-robot demonstrations. This page intentionally contains no success-rate or episode-count claims.

## Local preview

```bash
python3 build.py
python3 -m http.server 8765 --directory dist
```

Visit `http://localhost:8765`. No Node.js or package installation is required to build or serve this website.

## GitHub Pages

1. Create the public repository `zhaoqf1234/zhaoqf1234.github.io`.
2. Push this project's source files and assets to its `main` branch.
3. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
4. Run the **Deploy personal website to GitHub Pages** workflow if it has not started automatically.

The workflow builds the HTML with Python and uploads only `dist/`. The `.openai/` folder is optional hosting metadata for the separate Sites deployment; GitHub Pages does not use it.

For a manual upload, extract the release ZIP and upload the contents of `dist/` (including `assets/`) to the root of the Pages repository. Select **Deploy from a branch → main → /(root)** in Pages settings. These are alternative deployment methods; choose one.

## Edit content

- Main copy and shared layout: `build.py`. Run it after changes.
- Styling / responsive layouts: `dist/assets/style.css`.
- Figure lightbox, BibTeX, copy email and video switcher: `dist/assets/site.js`.
- Real videos: `dist/assets/videos/`; posters: `dist/assets/images/`.

To add a video, put an H.264 MP4 under `dist/assets/videos/` and update the corresponding video source in `build.py`. Current videos are loaded on demand and use native controls. No third-party analytics, remote fonts or tracking scripts are included.

## Sources

Personal information, education, experience and project descriptions are based on the supplied résumé, with subsequent user corrections applied. Only email and GitHub are shown; the original résumé PDF is not published.

- BPPO figure: original paper at https://arxiv.org/abs/2605.28028.
- PG-OPD figure: original paper at https://arxiv.org/abs/2606.21994.
- The extraction details and figure sources are documented in `ASSET_SOURCES.md`.
- The Galbot source repository is private / internal and is not linked publicly.

Keep actual credentials out of this repository. Video demonstrations are examples of behavior and are not presented as evaluation statistics.
