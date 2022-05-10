/*
 * @Author: Quarter
 * @Date: 2022-05-10 10:40:08
 * @LastEditTime: 2022-05-10 10:53:59
 * @LastEditors: Quarter
 * @Description: 84坐标系
 * @FilePath: /geo-convert/src/wgs84.ts
 */

import GCJ02 from "./gcj02";
import { GCJ02_2_WGS84, WGS84_2_GCJ02 } from "./geo";
import LngLat from "./lnglat";

export default class WGS84 extends LngLat {
  /**
   * @description: 从火星坐标转换
   * @author: Quarter
   * @return {WGS84}
   */
  static fromGCJ02(gcj02: GCJ02): WGS84 {
    const result = GCJ02_2_WGS84(gcj02.lng, gcj02.lat);
    return new WGS84(result[0], result[1]);
  }

  /**
   * @description: 转换成火星坐标
   * @author: Quarter
   * @return {GCJ02}
   */
  toGCJ02(): GCJ02 {
    const result = WGS84_2_GCJ02(this.lng, this.lat);
    return new GCJ02(result[0], result[1]);
  }
}