// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import vue from "file:///home/leopaixao/documents/projects/qa-solar/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///home/leopaixao/documents/projects/qa-solar/node_modules/vite/dist/node/index.js";
import istanbul from "file:///home/leopaixao/documents/projects/qa-solar/node_modules/vite-plugin-istanbul/dist/index.mjs";
import vueDevTools from "file:///home/leopaixao/documents/projects/qa-solar/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///home/leopaixao/documents/projects/qa-solar/apps/frontend/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
        defineModel: true
      }
    }),
    istanbul({
      include: "src/**/*",
      exclude: ["node_modules", "test/**/*"],
      extension: [".js", ".ts", ".vue"],
      cypress: true
    }),
    vueDevTools()
  ],
  build: {
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    port: 8181
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9sZW9wYWl4YW8vZG9jdW1lbnRzL3Byb2plY3RzL3FhLXNvbGFyL2FwcHMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2xlb3BhaXhhby9kb2N1bWVudHMvcHJvamVjdHMvcWEtc29sYXIvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9sZW9wYWl4YW8vZG9jdW1lbnRzL3Byb2plY3RzL3FhLXNvbGFyL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5cbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGlzdGFuYnVsIGZyb20gJ3ZpdGUtcGx1Z2luLWlzdGFuYnVsJztcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIHNjcmlwdDoge1xuICAgICAgICBwcm9wc0Rlc3RydWN0dXJlOiB0cnVlLFxuICAgICAgICBkZWZpbmVNb2RlbDogdHJ1ZSxcbiAgICAgIH1cbiAgICB9KSxcbiAgICBpc3RhbmJ1bCh7XG4gICAgICBpbmNsdWRlOiAnc3JjLyoqLyonLFxuICAgICAgZXhjbHVkZTogWydub2RlX21vZHVsZXMnLCAndGVzdC8qKi8qJ10sXG4gICAgICBleHRlbnNpb246IFsnLmpzJywgJy50cycsICcudnVlJ10sXG4gICAgICBjeXByZXNzOiB0cnVlLFxuICAgIH0pLFxuICAgIHZ1ZURldlRvb2xzKCksXG4gIF0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogODE4MSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZWLFNBQVMsZUFBZSxXQUFXO0FBRWhZLE9BQU8sU0FBUztBQUNoQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGNBQWM7QUFDckIsT0FBTyxpQkFBaUI7QUFMa00sSUFBTSwyQ0FBMkM7QUFPM1EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLFFBQ04sa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULFNBQVMsQ0FBQyxnQkFBZ0IsV0FBVztBQUFBLE1BQ3JDLFdBQVcsQ0FBQyxPQUFPLE9BQU8sTUFBTTtBQUFBLE1BQ2hDLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxJQUNELFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
