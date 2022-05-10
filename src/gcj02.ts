/*
 * @Author: Quarter
 * @Date: 2022-05-10 10:39:45
 * @LastEditTime: 2022-05-10 10:54:21
 * @LastEditors: Quarter
 * @Description: 火星坐标系
 * @FilePath: /geo-convert/src/gcj02.ts
 */

import BD09 from "./bd09";
import { BD09_2_GCJ02, GCJ02_2_BD09, GCJ02_2_WGS84, WGS84_2_GCJ02 } from "./geo";
import LngLat from "./lnglat";
import WGS84 from "./wgs84";

export default class GCJ02 extends LngLat {
  /**
   * @description: 从84坐标转换
   * @author: Quarter
   * @return {GCJ02}
   */
  static fromWGS84(wgs84: WGS84): GCJ02 {
    const result = WGS84_2_GCJ02(wgs84.lng, wgs84.lat);
    return new GCJ02(result[0], result[1]);
  }

  /**
   * @description: 从百度坐标转换
   * @author: Quarter
   * @return {BD09}
   */
  static fromBD09(bd09: BD09): GCJ02 {
    const result = BD09_2_GCJ02(bd09.lng, bd09.lat);
    return new GCJ02(result[0], result[1]);
  }

  /**
   * @description: 转换成84坐标系
   * @author: Quarter
   * @return {WGS84}
   */
  toWGS84(): WGS84 {
    const result = GCJ02_2_WGS84(this.lng, this.lat);
    return new WGS84(result[0], result[1]);
  }

  /**
   * @description: 转换成百度坐标
   * @author: Quarter
   * @return {BD09}
   */
  toBD09(): BD09 {
    const result = GCJ02_2_BD09(this.lng, this.lat);
    return new BD09(result[0], result[1]);
  }
}