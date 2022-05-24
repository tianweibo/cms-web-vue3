/* eslint-disable @typescript-eslint/no-this-alias */
"use strict";
/*
 * @Description: 存储服务
 * @Author: liudehua
 * @Date: 2021-02-03 15:21:16
 * @LastEditTime: 2021-02-04 14:45:55
 * @LastEditors: liudehua
 */
exports.__esModule = true;
const KEY_PREFIX = "yunjifen.";
const Storage = {
  get: function(key, isSession) {
    if (!this.isLocalStorage()) {
      return undefined;
    }
    const value = this.getStorage(isSession).getItem(KEY_PREFIX + key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    }
    return undefined;
  },
  set: function(key, value, isSession) {
    if (!this.isLocalStorage()) {
      return undefined;
    }
    value = JSON.stringify(value || "");
    this.getStorage(isSession).setItem(KEY_PREFIX + key, value);
    return true;
  },
  remove: function(key, isSession) {
    if (!this.isLocalStorage()) return undefined;
    this.getStorage(isSession).removeItem(KEY_PREFIX + key);
    return true;
  },
  removeAll: function(keys) {
    const _this = this;
    if (keys === void 0) {
      keys = [];
    }
    keys.concat(["TOKEN"]).forEach(function(item) {
      return _this.remove(item);
    });
  },
  getStorage: function(isSession) {
    return isSession ? sessionStorage : localStorage;
  },
  isLocalStorage: function() {
    try {
      if (!localStorage) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};
exports["default"] = Storage;
