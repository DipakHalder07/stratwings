# Audit & Action Plan: Restoring Authentic Experience from Live Site

## Reference Benchmark
* **Live Site:** [https://marina-zakharova.netlify.app/](https://marina-zakharova.netlify.app/)
* **Original Production CSS:** `scratch/original_live.css` (downloaded directly from `https://marina-zakharova.netlify.app/assets/index-BRQn7Ra-.css`)
* **Original Production JS:** `scratch/original_live.js` (downloaded directly from `https://marina-zakharova.netlify.app/assets/index-C7JCyN7e.js`)

---

## 1. Root Cause Analysis: What Got Broken & Why

### A. Vibe Section & Background Misconfiguration ("Undo that your break fully")
* **What broke:** In addressing the earlier "this section background issue", `.vibe` was detached from `.vibe-wrapper`, made `position: relative`, and given ad-hoc background images that clashed with `.bg-second`.
* **Authentic implementation in Live Site:**
  ```jsx
  <div className="bg-second">
    <Portfolio />
    <div className="vibe-wrapper">
      <Vibe />
      <Folders />
    </div>
  </div>
  ```
  * `.bg-second` has `background-image: url(/assets/bg-second-DOYhwnKY.png); background-size: cover;`.
  * `.vibe-wrapper` is `position: relative;`.
  * `.vibe` is `position: sticky; top: -25vh; height: 100vh; z-index: 1; overflow: hidden; padding: 200px 0 63vw;`.
  * As user scrolls past `.portfolio`, `.vibe` sticks in the viewport while the floating stickers sway with mouse movement.
  * Then `.folders` (`position: relative; z-index: 2; padding: 150px 0 32px;`) smoothly scrolls over `.vibe` within the same seamless sky background.

### B. Broken Hover Animations & Interactions
* **What broke:** Custom CSS blocks appended to `src/index.css` overrode default `:hover` and `:active` rules for:
  1. **Buttons:**
     - `.button.yellow:hover`, `.button.yellow-big:hover` (3D sunken bevel on hover).
     - `.button.pink-small:hover`, `.button.pink-big:hover` (3D elevation).
     - `.button.menu:hover`.
  2. **Vibe Stickers:**
     - `.vibe-item:hover .vibe-item-main` $\rightarrow$ `opacity: 0;`
     - `.vibe-item:hover .vibe-item-hover` $\rightarrow$ `opacity: 1;`
     - Sticker hover transitions were blocked by inline styles and custom CSS.
  3. **Folder Cards:**
     - `.folders-item:hover .folders-item-context` expansion and tilt.
  4. **Footer Links:**
     - `.footer-nav-link:hover .footer-nav-link-bg` $\rightarrow$ `opacity: 0;`
     - `.footer-nav-link:hover .footer-nav-link-bg-hover` $\rightarrow$ `opacity: 1;`
  5. **Header Navigation:**
     - `.header-list-item:hover a` transforms and color changes.

### C. Footer Architecture
* **What broke:** The footer was turned into a static inline box.
* **Authentic implementation in Live Site:**
  * `.footer` has `position: fixed; bottom: 0; left: 0; width: 100%; height: 100vh; z-index: 0; background: #ffd905;`.
  * `<main>` has `position: relative; z-index: 2;`.
  * An empty spacer `<div id="footer"></div>` sits after `<main>`.
  * When scrolling past Feedback, `<main>` moves away to reveal the fixed yellow Footer underneath, creating a curtain-reveal effect.

---

## 2. Recovery Plan

1. **Restore Authentic CSS (`src/index.css`):**
   - Replace `src/index.css` with the genuine `scratch/original_live.css` from `https://marina-zakharova.netlify.app/`.
   - Ensure all `@font-face` and asset URLs map correctly to local files in `public/`.
2. **Restore Authentic Component Tree (`src/App.jsx`):**
   - Align layout exactly to the live site:
     `<main>`
       `<div className="bg-first"><Banner /><About /></div>`
       `<div className="bg-second"><Portfolio /><div className="vibe-wrapper"><Vibe /><Folders /></div></div>`
       `<Concepts />`
       `<Plan />`
       `<Feedback />`
     `</main>`
     `<Footer />`
     `<div id="footer"></div>`
3. **Restore All Component Logics:**
   - **`Vibe.jsx`:** Ensure both `.vibe-item-main` and `.vibe-item-hover` exist for all 10 stickers, mouse parallax calculation `(e.clientX - window.innerWidth/2)/40`, and no overriding background.
   - **`Folders.jsx`:** Authentic markup and classes (`.folders`, `.folders-content`, `.folders-item`, `.folders-item-context`).
   - **`Footer.jsx`:** Authentic markup with `footer-nav-link`, `footer-nav-link-bg`, `footer-nav-link-bg-hover`, video player, and social buttons.
   - **`Feedback.jsx`:** Authentic envelope, letter, and review letters with intersection observer.
   - **`Concepts.jsx`:** Authentic 3-column parallax layout.
4. **Ensure All Assets & Fonts Exist in `public/`:**
   - Verified 183 assets downloaded directly from the live Netlify site.
5. **Validation:**
   - Verify build passes with zero errors.
   - Capture automated screenshots of each section on the dev server.
   - Compare with live site screenshots to verify 1:1 parity.
