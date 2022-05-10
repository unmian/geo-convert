/*
 * @Author: Quarter
 * @Date: 2022-05-10 09:00:07
 * @LastEditTime: 2022-05-10 10:51:12
 * @LastEditors: Quarter
 * @Description: 地理空间坐标转换
 * @FilePath: /geo-convert/src/geo.ts
 */

import { a, ee, PI, xPI } from "./constant";

/**
 * @description: BD09-GCJ02的经纬度转换
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number[]}
 */
export const BD09_2_GCJ02 = (lng: number, lat: number): number[] => {
  const x: number = lng - 0.0065;
  const y: number = lat - 0.006;
  const z: number = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI);
  const theta: number = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI);
  lng = z * Math.cos(theta);
  lat = z * Math.sin(theta);
  return [lng, lat];
};

/**
 * @description: GCJ02-BD09的经纬度转换
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number[]}
 */
export const GCJ02_2_BD09 = (lng: number, lat: number): number[] => {
  const z: number = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPI);
  const theta: number = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPI);
  lng = z * Math.cos(theta) + 0.0065;
  lat = z * Math.sin(theta) + 0.006;
  return [lng, lat];
};

/**
 * @description: WGS84-GCJ02的经纬度转换
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number[]}
 */
export const WGS84_2_GCJ02 = (lng: number, lat: number): number[] => {
  if (outOfChina(lng, lat)) {
    return [lng, lat];
  } else {
    let dLng: number = WGS84_2_GCJ02_LNG(lng - 105.0, lat - 35.0);
    let dLat: number = WGS84_2_GCJ02_LAT(lng - 105.0, lat - 35.0);
    const radlat: number = lat / 180.0 * PI;
    let magic: number = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic: number = Math.sqrt(magic);
    dLng = (dLng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    return [lng + dLng, lat + dLat];
  }
};

/**
 * @description: GCJ02-WGS84的经纬度转换
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number[]}
 */
export const GCJ02_2_WGS84 = (lng: number, lat: number): number[] => {
  if (outOfChina(lng, lat)) {
    return [lng, lat];
  } else {
    let dLng: number = WGS84_2_GCJ02_LNG(lng - 105.0, lat - 35.0);
    let dLat: number = WGS84_2_GCJ02_LAT(lng - 105.0, lat - 35.0);
    const radlat: number = lat / 180.0 * PI;
    let magic: number = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic: number = Math.sqrt(magic);
    dLng = (dLng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
    const mgLng: number = lng + dLng;
    const mgLat: number = lat + dLat;
    return [lng * 2 - mgLng, lat * 2 - mgLat];
  }
};

/**
 * @description: 判断是否在国内
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {boolean}
 */
export const inChina = (lng: number, lat: number): boolean => {
  lng = +lng;
  lat = +lat;
  // 纬度3.86~53.55,经度73.66~135.05
  return lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55;
};

/**
 * @description: 判断是否在国内
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {boolean}
 */
const outOfChina = (lng: number, lat: number): boolean => {
  lng = +lng;
  lat = +lat;
  // 纬度3.86~53.55,经度73.66~135.05
  return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
};

/**
 * @description: WGS84-GCJ02的经度转换
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number}
 */
const WGS84_2_GCJ02_LNG = (lng: number, lat: number): number => {
  lat = +lat;
  lng = +lng;
  let ret: number = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
};

/**
 * @description: WGS84-GCJ02的纬度转换
 * @author: Quarter
 * @param {number} lng 经度
 * @param {number} lat 纬度
 * @return {number}
 */
const WGS84_2_GCJ02_LAT = (lng: number, lat: number): number => {
  lat = +lat;
  lng = +lng;
  let ret: number = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret;
};