import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { always, ifElse, propEq, replace } from 'ramda'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

const getProxyConfig = ifElse(
  propEq('LOCAL', 'VITE_CURRENT_ENV'),
  // @ts-ignore
  (env: ImportMeta['env']) => ({
    [env.VITE_PROXY]: {
      target: env.VITE_BASE_API_URL,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      secure: false,
      cookiePathRewrite: '/',
      rewrite: replace(/^\/[^/]+/, '')
    }
  }),
  always(undefined)
)

export default ({ mode }: { mode: string }) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), '') as ImportMeta['env']

  return defineConfig({
    define: {
      'process.env': env
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
          svgo: false,
          titleProp: true
        },
        include: '**/*.svg?react'
      })
    ],
    server: {
      port: 3000,
      strictPort: true,
      proxy: getProxyConfig(env),
      allowedHosts: true
    },
    envPrefix: 'VITE_',
    resolve: {
      alias: [{ find: '@', replacement: '/src' }]
    },
    build: {
      cssCodeSplit: true,
      outDir: 'dist',
      sourcemap: false,
      emptyOutDir: false,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        }
      },
      assetsDir: 'public'
    }
  })
}
