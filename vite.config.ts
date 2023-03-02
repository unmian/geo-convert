/*
 * @Author: Quarter
 * @Date: 2021-12-29 07:29:06
 * @LastEditTime: 2023-03-02 07:28:21
 * @LastEditors: Quarter
 * @Description: vite 组件库配置
 * @FilePath: /geo-convert/vite.config.ts
 */

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "GeoConvert",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    dts({
      outputDir: "types",
      cleanVueFileName: true,
      include: ["src/**"],
      beforeWriteFile: (filePath: string, content: string) => ({
        filePath: filePath.replace("/types/src", "/types"),
        content,
      }),
    }),
  ],
});
