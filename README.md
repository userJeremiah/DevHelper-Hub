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

This project was built with Vite. Follow these instructions to get a local copy up and running.

### 1. Clone the Repository

First, clone the repository to your local machine from GitHub:

```bash
git clone https://github.com/your-username/devhelper-hub.git
cd devhelper-hub
```
*(Note: Replace the URL with the actual repository URL after you've uploaded it.)*


### 2. Install Dependencies

Once you are in the project directory, install all the required dependencies using npm. This single command will read the `package.json` file and install all packages with the correct, compatible versions.

```bash
npm install
```

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
- **AI Knowledge Search**: The "Knowledge AI" page features `Input`, `Button`, and `Card` components, with the Nuclia integration.
- **Progress Tracker**: The "Progress" page demonstrates the `ProgressBar`, `Chart`, and `Card` components.
- **Scheduler**: The "Scheduler" page showcases the full `Scheduler` and `Notification` components.
- **Layout**: The main application layout uses the `Drawer` and `AppBar` for navigation.

Enjoy exploring DevHelper Hub!