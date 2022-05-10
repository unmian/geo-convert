/*
 * @Author: Quarter
 * @Date: 2021-12-29 07:29:06
 * @LastEditTime: 2022-05-10 10:58:16
 * @LastEditors: Quarter
 * @Description: vite 组件库配置
 * @FilePath: /geo-convert/build/lib.config.ts
 */
import baseConfig from "./base.config";
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  ...baseConfig,
  build: {
    outDir: "lib",
    lib: {
      entry: resolve(__dirname, "../src/index.ts"),
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