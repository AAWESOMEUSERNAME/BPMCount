import LangUtils from '../../utils/LangUtils.js'
let langSrc = LangUtils.getLangSrc()
const defaultAvgNum = 1

//bpm.js
//获取应用实例
const app = getApp();
Page({
  data: {
    lang: { ...langSrc.bpm },
    bpmAvg: 0.00,
    bpmSingle: 0.00,
    bpmArray: [],
    count: 0,
    preTime: 0,
    skipN: false,
    N: 0,
    avgNum: 5,
    tapButton: langSrc.bpm.start,
    ifCustomAvg: false,
    intervalBeat: 1,
  },
  onLoad: function () { },
  onShow: function () { this.setLanguage() },

  setLanguage: function () {
    langSrc = LangUtils.getLangSrc()
    this.setData({
      lang: { ...langSrc.bpm }
    })
  },

  checkboxChange: function (e) {
    let checkBoxValues = e.detail.value;
    if (checkBoxValues.includes("skipN")) {
      this.setData({
        skipN: true
      });
    } else {
      this.setData({
        skipN: false,
        N: 0
      });
    }
  },

  tap: function (e) {
    let N = this.data.N;
    let count = this.data.count;
    let nowTime = e.timeStamp / 1000;
    if (count <= N) {
      this.setData({
        count: count + 1,
        preTime: nowTime,
        tapButton: this.data.lang.tapMe
      });
      return;
    }

    let intervalBeat = this.data.intervalBeat;
    let bpmArray = this.data.bpmArray;
    let interval = nowTime - this.data.preTime;
    let bpmSingle = Math.floor(60 * 100  * intervalBeat/ interval) / 100;

    bpmArray.unshift(bpmSingle);
    if (bpmArray.length > this.data.avgNum) {
      bpmArray.pop();
    }
    let bpmAvg = bpmArray.reduce((acc, val) => acc + val, 0) / bpmArray.length;
    bpmAvg = Math.floor(bpmAvg * 100) / 100;
    this.setData({
      count: count + 1,
      preTime: nowTime,
      bpmAvg: bpmAvg,
      bpmSingle: bpmSingle,
      bpmArray: bpmArray,
      tapButton: this.data.lang.tapMe,
    });
    console.log("interval", interval);
    console.log("bpmSingTime", bpmSingle);
    console.log("array", bpmArray);
  },

  reset: function (e) {
    this.setData({
      bpmAvg: 0.00,
      bpmSum: 0.00,
      count: 0,
      preTime: 0,
      bpmArray: [],
      tapButton: this.data.lang.start
    });
  },

  inputN: function (e) {
    this.setData({ N: e.detail.value });
  },
  
  inputAvgNum: function (e) {
    this.setData({ avgNum: e.detail.value });
  },

  inputBeatInterval: function (e) {
    this.setData({ intervalBeat: e.detail.value });
  },

  onShareAppMessage: function (res) {
    return {
      title: 'BPM计算器',
      path: "/pages/bpm/bpm"
    }
  },

  radioChange: function (e) {
    let value = e.detail.value
    this.setData({
      intervalBeat: 1,
      ifCustomAvg: value < 0,
      avgNum: value < 0 ? defaultAvgNum : e.detail.value
    });
  }
});
