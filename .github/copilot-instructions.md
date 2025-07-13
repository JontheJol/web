# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React TypeScript CRUD application using:
- **React 18** with TypeScript and functional components
- **Material-UI (MUI)** v7 for UI components and theming
- **Zustand** for lightweight state management
- **React Hook Form** + **Yup** for forms and validation
- **Material React Table** for advanced data tables
- **React Router DOM** v7 for client-side routing
- **Vite** as the build tool and dev server

## Architecture Patterns

### State Management
- **Global state**: Use Zustand store (`src/store/appStore.ts`) with immutable updates
- **Store pattern**: Actions return new state via `set((state) => ({ ...state, newData }))`
- **Type safety**: All store interfaces are exported from the store file itself
- **Local state**: Use React Hook Form for forms, avoid useState for form data

### Component Structure
- **Pages** (`src/pages/`): Route-level components that compose other components
- **Components** (`src/components/`): Reusable UI components with clear props interfaces
- **Types** (`src/types/index.ts`): Shared TypeScript interfaces (separate from store types)
- **Naming**: PascalCase for components, camelCase for functions/variables/props

### Form Handling
- **Pattern**: Use reusable form components with props for different contexts (Add/Edit)
- **Validation**: Yup schemas defined inline in form components
- **Controller**: Wrap MUI inputs with React Hook Form `Controller`
- **Navigation**: Forms automatically navigate back on successful submission
- **Error handling**: Display store errors using MUI `Alert` components

### Table Implementation
- **Material React Table**: Configure with `MRT_ColumnDef<T>[]` and `useMemo`
- **Actions**: Use `enableRowActions` with custom action components
- **Responsive**: Wrap tables in `Box` with responsive padding
- **Confirmation**: Use `window.confirm()` for destructive actions

### MUI Theming & Layout
- **Theme**: Custom theme in `App.tsx` with primary/secondary colors and global CSS resets
- **Layout**: Full-height layout with flex column, navigation at top
- **Responsive**: Use MUI breakpoint system (`xs`, `sm`) for responsive design
- **Icons**: Import specific icons from `@mui/icons-material`

## Development Workflow

### Running the App
```bash
npm run dev  # Start development server (background task available)
npm run build  # TypeScript compilation + Vite build
npm run preview  # Preview production build
```

### Key Commands
- The "Desarrollar aplicación React" task runs `npm run dev` in background
- No testing setup currently configured
- ESLint configured for code quality

## Project-Specific Conventions

### Data Flow
1. Store manages data arrays with CRUD operations
2. Pages import store actions and pass them to reusable components
3. Components receive data and callbacks via props, not direct store access
4. Form submissions trigger store updates and programmatic navigation

### TypeScript Patterns
- Store types are defined and exported from store file
- Component-specific types go in `src/types/index.ts`
- Use `React.FC` for component type annotation
- Props interfaces are defined inline above components

### Routing Structure
- `/` - Home page with welcome content
- Main entity listing page with actions
- Add form routes
- Edit form routes (using URL params)

When modifying this codebase:
- Follow the established patterns for forms (reusable component with props)
- Use Zustand actions for all state mutations
- Maintain responsive design with MUI breakpoints
- Keep type definitions close to their usage context
