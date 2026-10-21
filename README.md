# ComePare ⚡️
> **"Come, pair any two wheels. See the difference without dealership spam."**

ComePare is a pure, privacy-first specification and comparison engine for automobiles—covering cars, bikes, and electric vehicles (EVs). Inspired by the utility-first philosophy of **GSMArena** and **Carsized**, ComePare eliminates the sales funnels, dealer spam calls, and OTP gates common to traditional auto portals.

🌐 **Live Demo (GitHub Pages):** [https://raj8313.github.io/comepare/](https://raj8313.github.io/comepare/)

---

## 🚀 Key Features

### 1. 🔍 Parametric "Auto Finder"
Filter vehicles with surgical precision:
* **Ground Clearance Slider:** Filter SUVs & cross-hatchbacks with $\ge 190\text{ mm}$ clearance.
* **Bike Ergonomics (Seat Height):** Filter motorcycles accessible for shorter riders ($\le 790\text{ mm}$) or tall ADV touring riders.
* **Safety NCAP Stars:** Filter strictly for 4-star and 5-star crash-tested vehicles (Bharat NCAP / Global NCAP).
* **Tech Must-Haves:** Level-2 ADAS, ventilated seats, wireless Apple CarPlay/Android Auto, and sunroofs.

### 2. ⚡️ The Showdown Engine (Side-by-Side Comparison)
* **Trim & Variant Selector:** Pick specific trims (e.g. *Creta SX(O)* vs *S(O)* or *Nexon EV Fearless+* vs *Creative*) and see real-time price updates.
* **The "Highlight Differences" Diff Toggle:** A single switch removes identical specs and highlights only where vehicles differ.
* **Cross-Powertrain Normalization:** Compare an EV against an ICE vehicle with normalized metrics (running cost per km, real-world tested range vs. claimed ARAI numbers).

### 3. 💰 Real-World Running Cost & TCO Calculator
* Adjust your **Monthly Driving Distance** (e.g., 1,200 km/month) with an interactive slider.
* Instantly compares monthly, 1-year, and 5-year direct fuel costs (e.g., ₹1.15/km for EV vs. ₹7.90/km for Petrol).

### 4. 📐 Visual Dimension & Stance Stacker
* Proportional 1:1 footprint visualizer (inspired by Carsized) comparing vehicle length, wheelbase, and ground clearance side-by-side.

---

## 🛠️ Zero-Cost Tech Stack

* **Framework:** React 18 + Vite + TypeScript
* **Styling:** Tailwind CSS + Lucide Icons
* **Data Layer:** Normalized JSON spec database (`src/data/vehicles.ts`)
* **Hosting:** GitHub Pages via Fastly CDN ($0.00/month)
* **CI/CD:** Automated GitHub Actions (`.github/workflows/deploy.yml`)

---

## 💻 Local Development

```bash
# 1. Clone the repository
git clone git@github.com:Raj8313/comepare.git
cd comepare

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

Visit `http://localhost:5173/comepare/` in your browser.

---

## 🚢 Deploying to GitHub Pages

1. Commit and push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: initial ComePare MVP prototype"
   git push -u origin main
   ```
2. In your GitHub repository:
   * Go to **Settings** > **Pages**.
   * Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The workflow defined in `.github/workflows/deploy.yml` will automatically build and publish the site to:
   `https://raj8313.github.io/comepare/`

---

## 📄 License
MIT License. Built for car, bike, and EV enthusiasts.
