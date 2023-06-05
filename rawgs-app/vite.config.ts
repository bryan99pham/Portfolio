import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import EnvironmentPlugin from 'vite-plugin-environment';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), 
    EnvironmentPlugin('all'),
    eslint({
    exclude: ['/virtual:/**', 'node_modules/**'],
  })],
  
  // test: {
  //   environment: 'jsdom',
  //   globals: true,
  //   setupFiles: ['./src/tests/setup.js'],
  //   testMatch: ['./src/*.test.jsx'],
  // }
})

