import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("homepage", "routes/homepage/layout.tsx", () => {
            route("home", "routes/homepage/home.tsx");
            route("account", "routes/homepage/account.tsx");
          });
        });
      },
    }),
  ],
});