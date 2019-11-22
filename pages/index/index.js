//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    bpmAvg: 0.00,
    bpmSingle: 0.00,
    bpmArray: [],
    count: 0,
    preTime: 0,
    tapButton: "开始",
    skipN: false,
    N: 0,
    avgNum: 5
  },
  onLoad: function () {},
  checkboxChange: function (e) {
    let checkBoxValues = e.detail.value;
    if(checkBoxValues.includes("skipN")){
      this.setData({
        skipN: true
      });
    }else{
      this.setData({
        skipN: false,
        N: 0
      });
    }
  },
  tap: function (e) {
    let nowTime = e.timeStamp/1000;
    let count = this.data.count;
    let N = this.data.N;
    if(count <= N){
      this.setData({
        count: count+1,
        preTime: nowTime,
        tapButton: "tap!!"
      });
      return;
    }
    let bpmArray = this.data.bpmArray;
    let interval = nowTime - this.data.preTime;
    this.setData({preTime: nowTime});
    console.log("interval",interval);
    let bpmSingle = Math.floor(60*100/interval)/100;
    console.log("bpmSingTime",bpmSingle);
    bpmArray.unshift(bpmSingle);
    if(bpmArray.length > this.data.avgNum){
      bpmArray.pop();
    }
    console.log("array",bpmArray);
    let bpmAvg = bpmArray.reduce((acc, val) => acc + val, 0) / bpmArray.length;
    bpmAvg = Math.floor(bpmAvg*100)/100;
    this.setData({
      count: count+1,
      preTime: nowTime,
      bpmAvg: bpmAvg,
      bpmSingle: bpmSingle,
      bpmArray: bpmArray
    });
  },
  reset: function (e) {
    this.setData({
      bpmAvg: 0.00,
      bpmSum: 0.00,
      count: 0,
      preTime: 0,
      bpmArray: [],
      tapButton: "开始"
    });
  },
  inputN: function (e) {
    this.setData({N:e.detail.value});
  },
  onShareAppMessage: function(res) {
    return {
      title: 'BPM计算器',
      path: "/pages/index/index"
    }
  },
  radioChange: function (e) {
    this.setData({
      avgNum: e.detail.value
    });
  }
});
