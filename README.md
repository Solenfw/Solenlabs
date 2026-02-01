# Collab - 3D Globe Visualization

This project uses **Vite + React + TypeScript + Three.js** to create an interactive 3D globe visualization with real-time earthquake data.

## Tech Stack

- ⚛️ **React 18** - UI framework
- 📘 **TypeScript** - Type-safe development
- ⚡ **Vite** - Fast build tool and dev server
- 🌍 **Three.js** - 3D graphics library
- 🎨 **CSS3** - Styling

## Prerequisites

Before you start, make sure you have these installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - Verify installation:
```bash
     node --version
     npm --version
```

2. **Git** (optional, but recommended)
   - Download from: https://git-scm.com/

3. **Code Editor**
   - Recommended: [VS Code](https://code.visualstudio.com/) with TypeScript support

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
- Navigate to the folder in your terminal

### 2. Install Dependencies

In the project folder, run:
```bash
npm install
```

This will install:
- React & React DOM
- TypeScript & type definitions
- Vite (build tool)
- Three.js (3D graphics)
- ESLint (code linting)

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

You should see the interactive 3D globe! 🌍

### 5. Stop the Server

To stop the development server, press `Ctrl + C` in the terminal.

## Project Structure
```
collab/
├── src/
│   ├── assets/              # Images, textures, and data files
│   │   ├── circle.png       # Sprite texture for particles
│   │   ├── earth-uv-map.jpg # Earth texture map
│   │   ├── rad-grad.png     # Radial gradient texture
│   │   ├── geojson/         # Geographic data
│   │   │   ├── countries.json
│   │   │   └── ne_110m_land.json
│   │   └── usgs_geojson_api.json  # Earthquake data
│   ├── components/          # React components (.tsx)
│   │   ├── Globe.tsx        # Main 3D globe component
│   │   ├── Controls.tsx     # UI controls
│   │   ├── InfoPanel.tsx    # Information display
│   │   └── QuakeDetails.tsx # Earthquake details component
│   ├── hooks/               # Custom React hooks & Three.js utilities
│   │   ├── getLayer.ts      # Background layer generator
│   │   ├── getStarField.ts  # Starfield background
│   │   ├── getThreeGeoJSON.ts  # GeoJSON to Three.js converter
│   │   └── useEarthquakes.ts   # Earthquake data hook
│   ├── services/            # API services
│   │   └── earthquakeAPI.ts # USGS earthquake API calls
│   ├── utils/               # Utility functions
│   │   ├── colorScale.ts    # Color mapping utilities
│   │   └── earthquakeUtils.ts # Coordinate conversions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── vite-env.d.ts        # Vite type definitions
│   ├── App.css              # App styles
│   └── index.css            # Global styles
├── public/                  # Static files
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # TypeScript config for Node files
├── vite.config.ts           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Available Scripts

```bash
npm run dev         # Start development server with hot reload
npm run build       # Build for production (runs type-check first)
npm run preview     # Preview production build locally
npm run lint        # Run ESLint to check code quality
npm run type-check  # Run TypeScript type checking without emitting files
```

## Features

✨ **Interactive 3D Globe**
- Realistic Earth visualization with texture mapping
- Smooth camera controls (rotate, zoom, pan)
- Starfield background

🌋 **Real-time Earthquake Data**
- Fetches live data from USGS API
- Color-coded by magnitude
- Interactive earthquake markers
- Detailed information panels

🎯 **Type-Safe Development**
- Full TypeScript support
- Autocomplete and IntelliSense
- Catch errors during development

⚡ **Fast Development**
- Vite's lightning-fast HMR (Hot Module Replacement)
- Instant feedback on code changes

## Controls

- **Left Mouse + Drag:** Rotate the globe
- **Mouse Wheel:** Zoom in/out
- **Right Mouse + Drag:** Pan the camera
- **Click Earthquake Marker:** View details

## Making Changes

1. All source code is in the `src/` directory
2. Main globe logic is in `src/components/Globe.tsx`
3. Edit any `.tsx` or `.ts` file and save
4. The browser will automatically reload with your changes
5. TypeScript will warn you of any type errors in your editor

## TypeScript Benefits

This project uses TypeScript for:
- **Type safety** - Catch errors before runtime
- **Better IDE support** - Autocomplete for Three.js, React, and more
- **Self-documenting code** - Types serve as inline documentation
- **Easier refactoring** - Rename and restructure with confidence

## Common Issues & Solutions

### ❌ "npm is not recognized"
**Solution:** Node.js is not installed or not in your PATH. Reinstall Node.js and restart your terminal.

### ❌ Port 5173 is already in use
**Solution:** Vite will automatically use the next available port (5174, 5175, etc.)

### ❌ Module not found errors
**Solution:** Delete `node_modules` folder and `package-lock.json`, then run:
```bash
npm install
```

### ❌ TypeScript errors
**Solution:** Run type checking to see all errors:
```bash
npm run type-check
```

### ❌ Three.js type errors
**Solution:** Make sure type definitions are installed:
```bash
npm install -D @types/three
```

## Resources & Documentation

- **Three.js Docs:** https://threejs.org/docs/
- **React Docs:** https://react.dev/
- **TypeScript Docs:** https://www.typescriptlang.org/docs/
- **Vite Docs:** https://vitejs.dev/
- **USGS Earthquake API:** https://earthquake.usgs.gov/fdsnws/event/1/

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run `npm run type-check` to ensure no TypeScript errors
4. Run `npm run lint` to check code quality
5. Test your changes with `npm run dev`
6. Submit a pull request

## License

[Add your license here]

---

Built with ❤️ using React, TypeScript, and Three.js