/*
 * @Author: Quarter
 * @Date: 2022-05-10 09:15:50
 * @LastEditTime: 2022-05-10 09:36:35
 * @LastEditors: Quarter
 * @Description: 经纬度坐标
 * @FilePath: /geo-convert/src/lnglat.ts
 */

import { LNGLAT2XY, XY2LNGLAT } from "./mercator";
import XY from "./xy";

export default class LngLat {
  constructor(lng: number, lat: number) {
    this.lng = lng;
    this.lat = lat;
  }

  /**
   * @description: 从经纬度转换
   * @author: Quarter
   * @param {XY} xy 墨卡托坐标
   * @return {LngLat}
   */
  static fromLngLat(xy: XY): LngLat {
    const result = XY2LNGLAT(xy.x, xy.y);
    return new LngLat(result[0], result[1]);
  }

  lng!: number; // 经度
  lat!: number; // 纬度

  /**
   * @description: 转换为字符串
   * @author: Quarter
   * @return {string}
   */
  toString(): string {
    return `${this.lng},${this.lat}`;
  }

  /**
   * @description: 转换为数组
   * @author: Quarter
   * @return {number[]}
   */
  toArray(): number[] {
    return [this.lng, this.lat];
  }

  /**
   * @description: 转换为 JSON
   * @author: Quarter
   * @return {object}
   */
  toJSON(): object {
    return {
      lng: this.lng,
      lat: this.lat,
    };
  }

  /**
   * @description: 转换为墨卡托坐标
   * @author: Quarter
   * @return {XY}
   */
  toXY(): XY {
    const result = LNGLAT2XY(this.lng, this.lat);
    return new XY(result[0], result[1]);
  }
}