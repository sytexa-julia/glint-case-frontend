# Glint Case Study

## Getting Started
1. Run the backend.
2. Create `.env` file with variables: `VITE_MAPBOX_TOKEN` and `VITE_BACKEND_API_ROOT` 
3. Run the frontend:
```
pnpm install
pnpm run dev
```

## Notes
- I did not include any component or integration tests for this simple case.
- In a real application I would refactor App.tsx to use multiple components: something like `Map` and `MapSidebar`.