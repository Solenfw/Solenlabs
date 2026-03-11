import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePluginString from 'vite-plugin-string'
<<<<<<< HEAD
=======
import path from 'path'
>>>>>>> develop

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePluginString()
  ],
<<<<<<< HEAD
=======
  build: {
    chunkSizeWarningLimit: 1600, // increase chunk size limit to 1.6MB
    rollupOptions: {
      output: {
        // 2. Separate the libraries from code
        manualChunks: {
          // Split React and generic libs
          vendor: ['react', 'react-dom'],
          // Split the heavy 3D engine
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@constants': path.resolve(__dirname, 'src/constants/index.ts'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@shaders': path.resolve(__dirname, 'src/shaders/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@types': path.resolve(__dirname, 'src/types/index.ts'),
    },
  },
>>>>>>> develop
})


