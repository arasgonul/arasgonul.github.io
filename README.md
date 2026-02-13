# Portfolio — Game Developer

A static portfolio site for GitHub Pages. One page: hero, projects, experience, contact.

## Run locally

Open `index.html` in a browser, or use a simple server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. **Create a repo** on GitHub (e.g. `yourusername.github.io` for a user site, or any repo name for a project site).

2. **Push this folder** to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Turn on GitHub Pages**
   - Repo → **Settings** → **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or `master`), folder **/ (root)**
   - Save. The site will be at:
     - `https://YOUR_USERNAME.github.io` (if repo is `yourusername.github.io`)
     - `https://YOUR_USERNAME.github.io/YOUR_REPO` (for any other repo)

4. **Custom domain (optional)**  
   In Pages settings, set a custom domain and add the DNS records GitHub shows.

## What to edit

- **index.html** — Your name, tagline, project cards, experience list, email, and social links.
- **project-template.html** — Copy this to create new project pages (e.g., `project-3.html`)
- **css/style.css** — Colors (see `:root`), fonts, spacing.
- **images/** — Add your project screenshots, hero images here
- **videos/** — Add gameplay videos here (optional)

### Adding a New Project

1. Copy `project-template.html` → `project-yourname.html`
2. Fill in content (title, description, images, videos)
3. Update the project card in `index.html` to link to your new page
4. See `HOW-TO-ADD-PROJECTS.md` for detailed instructions

No build step required; GitHub Pages serves the files as-is.
