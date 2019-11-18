//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    bpmAvg: 0.00,
    bpmSum: 0.00,
    count: 0,
    preTime: 0,
    tapButton: "开始",
    skipN: false,
    N: 0
  },
  onLoad: function () {},
  checkboxChange: function (e) {
    let checkBoxValues = e.detail.value;
    this.setData({
      skipN: checkBoxValues.includes("skipN")
    });
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

    let interval = nowTime - this.data.preTime;
    this.setData({preTime: nowTime});
    console.log("interval",interval);
    let bpmSingTime = Math.floor(60*100/interval)/100;
    console.log("bpmSingTime",bpmSingTime);
    let bpmSum = this.data.bpmSum + bpmSingTime;
    let bpmAvg = Math.floor(bpmSum*100/(count-N))/100;
    this.setData({
      count: count+1,
      preTime: nowTime,
      bpmSum: bpmSum,
      bpmAvg: bpmAvg
    });
  },
  reset: function (e) {
    this.setData({
      bpmAvg: 0.00,
      bpmSum: 0.00,
      count: 0,
      preTime: 0,
      tapButton: "开始"
    });
  },
  inputN: function (e) {
    this.setData({N:e.detail.value});
  },
  onShareAppMessage: function(res) {
    let that = this;
    return {
      title: 'BPM计算器',
      path: "/pages/index/index.js",
      success: function(res) {
          console.log("转发成功:" + JSON.stringify(res));
          that.shareClick();
      },
      fail: function(res) {
          console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
});
