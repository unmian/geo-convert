/*
 * @Author: Quarter
 * @Date: 2022-05-10 10:37:54
 * @LastEditTime: 2022-05-10 10:47:10
 * @LastEditors: Quarter
 * @Description: 百度坐标系
 * @FilePath: /geo-convert/src/bd09.ts
 */

import GCJ02 from "./gcj02";
import { BD09_2_GCJ02, GCJ02_2_BD09 } from "./geo";
import LngLat from "./lnglat";

export default class BD09 extends LngLat {
  /**
   * @description: 从火星坐标转换
   * @author: Quarter
   * @return {BD09}
   */
  static fromGCJ02(gcj02: GCJ02): BD09 {
    const result = GCJ02_2_BD09(gcj02.lng, gcj02.lat);
    return new BD09(result[0], result[1]);
  }

  /**
   * @description: 转换成火星坐标
   * @author: Quarter
   * @return {GCJ02}
   */
  toGCJ02(): GCJ02 {
    const result = BD09_2_GCJ02(this.lng, this.lat);
    return new GCJ02(result[0], result[1]);
  }
}