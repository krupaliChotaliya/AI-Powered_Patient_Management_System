import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@devexpress/dx-react-scheduler-material-ui',
      '@mui/icons-material',
      // Add other DevExpress packages as needed
    ],
  },
  plugins: [react()],
});
