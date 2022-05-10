/*
 * @Author: Quarter
 * @Date: 2022-05-10 09:09:56
 * @LastEditTime: 2022-05-10 09:34:37
 * @LastEditors: Quarter
 * @Description: 平面坐标
 * @FilePath: /geo-convert/src/xy.ts
 */

import LngLat from "./lnglat";
import { LNGLAT2XY, XY2LNGLAT } from "./mercator";

export default class XY {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * @description: 从经纬度转换
   * @author: Quarter
   * @param {LngLat} lnglat 空间坐标
   * @return {XY}
   */
  static fromLngLat(lnglat: LngLat): XY {
    const result = LNGLAT2XY(lnglat.lng, lnglat.lat);
    return new XY(result[0], result[1]);
  }

  x!: number; // x 坐标
  y!: number; // y 坐标

  /**
   * @description: 转换为字符串
   * @author: Quarter
   * @return {string}
   */
  toString(): string {
    return `${this.x},${this.y}`;
  }

  /**
   * @description: 转换为数组
   * @author: Quarter
   * @return {number[]}
   */
  toArray(): number[] {
    return [this.x, this.y];
  }

  /**
   * @description: 转换为 JSON
   * @author: Quarter
   * @return {object}
   */
  toJSON(): object {
    return {
      x: this.x,
      y: this.y,
    };
  }

  /**
   * @description: 转换为经纬度
   * @author: Quarter
   * @return {LngLat}
   */
  toLngLat(): LngLat {
    const result = XY2LNGLAT(this.x, this.y);
    return new LngLat(result[0], result[1]);
  }
}