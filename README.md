
# DevHelper Hub - KendoReact "Build Without Boundaries" Challenge

Welcome to DevHelper Hub, a smart productivity and knowledge hub for developers. This application is a submission for the KendoReact "Build Without Boundaries" challenge.

## Features

- **Snippet Manager**: Save, organize, and tag your code snippets in a powerful grid.
- **Docs & Notes**: Upload your personal Markdown/text documents.
- **AI Knowledge Search**: Use Nuclia RAG to ask natural language questions against your uploaded content.
- **Learning Progress Tracker**: Set learning goals and visualize your progress with charts and progress bars.
- **Coding Session Scheduler**: Plan your coding and learning sessions with a full-featured scheduler.
- **KendoReact AI Assistant Integration**: Placeholder demonstrating where the AI assistant can generate boilerplate code.

---

## Getting Started

This project was bootstrapped with Vite. Follow these instructions to get a local copy up and running.

### 1. Project Setup

First, create a new React + TypeScript project using Vite:

```bash
npm create vite@latest devhelper-hub -- --template react-ts
cd devhelper-hub
```

Next, replace the contents of the `src` directory with the files provided in this project.

### 2. Install Dependencies

Install all the required dependencies for the project, including KendoReact components.

```bash
npm install \
  react-router-dom \
  @nuclia/core \
  @progress/kendo-react-buttons \
  @progress/kendo-react-charts \
  @progress/kendo-react-data-tools \
  @progress/kendo-react-dateinputs \
  @progress/kendo-react-dialogs \
  @progress/kendo-react-dropdowns \
  @progress/kendo-react-grid \
  @progress/kendo-react-inputs \
  @progress/kendo-react-intl \
  @progress/kendo-react-layout \
  @progress/kendo-react-notification \
  @progress/kendo-react-progressbars \
  @progress/kendo-react-scheduler \
  @progress/kendo-react-tooltip \
  @progress/kendo-react-upload \
  @progress/kendo-data-query \
  @progress/kendo-drawing \
  @progress/kendo-licensing \
  cldr-data \
  hammerjs \
  lucide-react
```

Install Tailwind CSS dev dependencies:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,pages,App,constants}/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Create a `./index.css` file and add the Tailwind directives. Then import it in `index.tsx`.
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
*Note: Since the output format does not allow `index.css`, the provided code uses the Tailwind CDN link in `index.html` for simplicity. For a production build, follow the steps above.*

### 3. Environment Variables (Nuclia API)

This project uses the Nuclia RAG API for the AI Knowledge Search feature. You need to provide your Nuclia credentials.

1.  Create a `.env` file in the root of your project.
2.  Add your Nuclia API key and Knowledge Box ID to the file:

```
VITE_NUCLIA_KBID=your-knowledge-box-id
VITE_NUCLIA_API_KEY=your-nuclia-api-key
```

You can find these credentials in your Nuclia dashboard.

### 4. Run the Application

Once the dependencies are installed and environment variables are set, you can run the app:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 5. Testing KendoReact Components

The application is structured into pages, each showcasing different KendoReact components:

- **Snippet Manager**: Navigate to the "Snippets" section to see the `Grid`, `Dialog`, `MultiSelect`, and `Tooltip`.
- **Docs & Notes**: Go to "Docs & Notes" for the `Upload` and `Grid` components.
- **AI Knowledge Search**: The "Knowledge AI" page features `Input`, `Button`, and `Card` components, along with the stubbed Nuclia integration.
- **Progress Tracker**: The "Progress" page demonstrates the `ProgressBar`, `Chart`, and `Card` components.
- **Scheduler**: The "Scheduler" page showcases the full `Scheduler` and `Notification` components.
- **Layout**: The main application layout uses the `Drawer` and `AppBar` for navigation.

Enjoy exploring DevHelper Hub!
