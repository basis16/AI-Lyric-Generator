import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // FIX: Replace `process.cwd()` with `''`. Vite's `loadEnv` resolves an empty string
  // to the current working directory, which fixes the TypeScript type error.
  const env = loadEnv(mode, '', '');
  return {
    plugins: [react()],
    define: {
      // This makes the environment variable available in the client-side code
      // and adheres to the guideline of using process.env.API_KEY.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
