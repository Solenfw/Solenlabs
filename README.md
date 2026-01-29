# Collab - 3D Globe Visualization

This project uses **Vite + React + Three.js** to create an interactive 3D globe visualization.

## Prerequisites

Before you start, make sure you have these installed on your Windows machine:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - Verify installation by opening Command Prompt and typing:
```bash
     node --version
     npm --version
```

2. **Git** (optional, but recommended)
   - Download from: https://git-scm.com/download/win

3. **Code Editor**
   - Recommended: [VS Code](https://code.visualstudio.com/)

## Setup Instructions

### 1. Clone or Download the Project

**Option A - With Git:**
```bash
git clone <repository-url>
cd collab
```

**Option B - Without Git:**
- Download the project ZIP file
- Extract it to a folder
- Open Command Prompt and navigate to the folder:
```bash
  cd path\to\collab
```

### 2. Install Dependencies

In the project folder, run:
```bash
npm install
```

This will install:
- React
- Vite
- Three.js
- OrbitControls (for camera interaction)

**Note:** This may take a few minutes the first time.

### 3. Run the Development Server

Start the local development server:
```bash
npm run dev
```

You should see output like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. View the Project

Open your browser and go to:
```
http://localhost:5173/
```

You should see the 3D globe! 🌍

### 5. Stop the Server

To stop the development server, press:
```
Ctrl + C
```
in the Command Prompt where it's running.

## Common Issues & Solutions

### ❌ "npm is not recognized"
**Solution:** Node.js is not installed or not in your PATH. Reinstall Node.js and restart Command Prompt.

### ❌ Port 5173 is already in use
**Solution:** Either:
- Close the other application using that port
- Or Vite will automatically use port 5174 instead

### ❌ Module not found errors
**Solution:** Delete `node_modules` folder and `package-lock.json`, then run:
```bash
npm install
```

### ❌ Three.js errors
**Solution:** Make sure Three.js is installed:
```bash
npm install three
```

## Project Structure
```
my-research-lab/
├── src/
│   ├── assets/              # Images, textures, and data files
│   │   ├── circle.png       # Sprite texture for particles
│   │   ├── earth-uv-map.jpg # Earth texture map
│   │   ├── rad-grad.png     # Radial gradient texture
│   │   ├── geojson/         # Geographic data
│   │   │   ├── countries.json
│   │   │   └── ne_110m_land.json
│   │   └── usgs_geojson_api.json  # Earthquake data
│   ├── components/          # React components
│   │   ├── Globe.jsx        # Main 3D globe component
│   │   ├── Controls.jsx     # UI controls
│   │   ├── InfoPanel.jsx    # Information display
│   │   └── QuakeDetails.jsx # Earthquake details component
│   ├── hooks/               # Custom React hooks & Three.js utilities
│   │   ├── getLayer.js      # Background layer generator
│   │   ├── getStarField.js  # Starfield background
│   │   ├── getThreeGeoJSON.js  # GeoJSON to Three.js converter
│   │   └── useEarthquakes.js   # Earthquake data hook
│   ├── services/            # API services
│   │   └── earthquakeAPI.js # USGS earthquake API calls
│   ├── utils/               # Utility functions
│   │   ├── colorScale.js    # Color mapping utilities
│   │   └── earthquakeUtils.js # Coordinate conversions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   ├── App.css              # App styles
│   └── index.css            # Global styles
├── public/                  # Static files
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Making Changes

1. The main 3D globe code is in `src/components/Globe.jsx`
2. Edit the file and save
3. The browser will automatically reload with your changes (Hot Module Replacement)

## Controls

- **Left Mouse Button + Drag:** Rotate the globe
- **Mouse Wheel:** Zoom in/out
- **Right Mouse Button + Drag:** Pan the camera

## Need Help?

- Three.js Documentation: https://threejs.org/docs/
- React Documentation: https://react.dev/
- Vite Documentation: https://vite.dev/

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
