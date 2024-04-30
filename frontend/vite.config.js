import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            // { find: '@components', replacement: '/src/components' },
            { find: '@', replacement: '/src' },
        ],
    },
    optimizeDeps: { exclude: ['js-big-decimal'] },
})
