# TaskFlow - Task Management Application

A responsive task management web application built with **React**, **TypeScript**, and **Ant Design (antd)**. The application allows users to create, edit, organize, prioritize, and track tasks with local persistence and real-time filtering.

---

## Features

- **Full Task Lifecycle Management**:
  - **Create Tasks**: Add tasks with title, description, priority, and due date.
  - **Edit Tasks**: Update existing task details at any time via a dedicated modal.
  - **Toggle Completion**: Mark tasks as complete or active with animated feedback and visual strikethrough styling.
  - **Delete Tasks**: Remove tasks with confirmation dialogs (Ant Design `Popconfirm`) to prevent accidental deletions.
- **Priority & Due Date Tracking**:
  - Assign priority levels: **High** (Red), **Medium** (Gold), and **Low** (Green).
  - Select due dates using Ant Design's `DatePicker`.
  - Automatic visual badges for **Overdue** tasks and tasks **Due Today**.
- **Interactive Filtering & Sorting**:
  - Filter tasks by status: **All**, **Active**, and **Completed** with live counter badges.
  - Real-time text search across task titles and descriptions.
  - Filter by priority level (**All Priorities**, **High**, **Medium**, **Low**).
  - Sort by due date (earliest or latest), priority (high-to-low), or creation date.
- **Local Storage Persistence**:
  - All tasks automatically sync to browser `localStorage` and persist across page reloads and browser sessions.
  - Comes with pre-loaded sample tasks for initial demonstration.
- **Statistics & Progress Overview**:
  - Visual metrics showing total, active, completed, and overdue tasks.
  - Dynamic progress bar showing task completion percentage.
- **Bulk Actions**:
  - Mark all active tasks as completed in a single click.
  - Clear all completed tasks with confirmation.
- **Form Validation & Empty States**:
  - Robust form validation ensuring non-empty task titles (with whitespace trimming) and character length limits.
  - Contextual empty states for empty lists, search misses, or completed tabs.
- **Responsive Layout**:
  - Mobile-friendly layout adapting cleanly from small smartphone screens to wide desktop viewports.

---

## Technologies & Development Tools Used

- **React 18**: UI component architecture and state management (`useState`, `useEffect`, `useMemo`).
- **TypeScript**: Static type safety, interfaces, and type definitions for task models and component properties.
- **Ant Design (antd v5)**: UI component system including `Layout`, `Modal`, `Form`, `DatePicker`, `Select`, `Input`, `Card`, `Segmented`, `Statistic`, `Progress`, `Tag`, `Popconfirm`, `Empty`, and `message`.
- **@ant-design/icons**: Icon library for intuitive visual indicators.
- **Day.js**: Lightweight date library used for date formatting, comparisons, and Ant Design date picker integration.
- **Vite**: Modern frontend tooling and bundler for fast local development and optimized production builds.

---

## Project Structure & Important Files

```
task-manager/
├── index.html                  # HTML entry point with viewport configuration and title
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── tsconfig.node.json          # TypeScript configuration for Vite config
├── vite.config.ts              # Vite configuration with React plugin and dev server options
├── src/
│   ├── main.tsx                # React root rendering entry point
│   ├── App.tsx                 # Main application component, state coordinator, and layout
│   ├── index.css               # Global styles and responsive layout rules
│   ├── types/
│   │   └── task.ts             # TypeScript interfaces for Task, priorities, and filters
│   ├── utils/
│   │   └── storage.ts          # Local storage read/write utilities and default sample data
│   └── components/
│       ├── TaskItem.tsx        # Individual task card with completion toggle, badges, edit & delete
│       ├── TaskFormModal.tsx   # Modal form for adding and editing tasks with input validation
│       ├── TaskFilters.tsx     # Filter toolbar (status segmented control, search, priority, sort)
│       ├── TaskStats.tsx       # Statistics cards and overall progress bar
│       └── EmptyState.tsx      # Context-sensitive empty illustrations and action buttons
```

### Key File Details:

- **`src/types/task.ts`**: Defines the data models (`Task`, `TaskPriority`, `TaskFilter`, `TaskFormData`, etc.) ensuring end-to-end type safety.
- **`src/utils/storage.ts`**: Encapsulates localStorage access (`loadTasksFromStorage` and `saveTasksToStorage`), safely handling serialization, JSON parsing errors, and populating initial sample tasks on first launch.
- **`src/components/TaskFormModal.tsx`**: Implements the Ant Design modal and form for task creation and editing. Handles field pre-population, whitespace trimming validation, priority selection, and date formatting.
- **`src/components/TaskItem.tsx`**: Renders each task item with interactive check toggling, dynamic color-coded priority and overdue tags, expandable descriptions, and confirmation delete prompts.
- **`src/components/TaskFilters.tsx`**: Provides the filtering controls: tab-like segmented buttons for status, real-time search input, priority filter dropdown, and sorting options.
- **`src/components/TaskStats.tsx`**: Computes and displays total, active, completed, and overdue metrics, accompanied by an animated progress bar.
- **`src/App.tsx`**: Top-level orchestration managing state, modal visibility, filter calculations, local storage synchronization, batch operations, and layout structure.

---

## Getting Started Locally

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation

1. Navigate to the `task-manager` directory:
   ```bash
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the Vite development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the displayed local URL (typically `http://localhost:5173`).

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

