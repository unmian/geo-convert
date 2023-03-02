/*
 * @Author: Quarter
 * @Date: 2023-03-02 07:25:50
 * @LastEditors: Quarter
 * @LastEditTime: 2023-03-02 07:26:54
 * @FilePath: /geo-convert/vitest.config.ts
 * @Description: vitest 配置
 */

/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});