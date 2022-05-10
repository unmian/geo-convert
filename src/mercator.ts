/*
 * @Author: Quarter
 * @Date: 2022-05-10 09:00:29
 * @LastEditTime: 2022-05-10 09:29:02
 * @LastEditors: Quarter
 * @Description: 墨卡托投影转换
 * @FilePath: /geo-convert/src/mercator.ts
 */

/**
 * @description: 经纬度转墨卡托投影坐标
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number[]}
 */
export const LNGLAT2XY = (lng: number, lat: number): number[] => {
  const x: number = lng * 20037508.34 / 180;
  let y: number = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return [x, y];
};

/**
 * @description: 墨卡托投影坐标转经纬度
 * @author: Quarter
 * @param {number} x 横坐标
 * @param {number} y 纵坐标
 * @return {LngLat}
 */
export const XY2LNGLAT = (x: number, y: number): number[] => {
  const lng: number = x / 20037508.34 * 180;
  let lat: number = y / 20037508.34 * 180;
  lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
  return [lng, lat];
};