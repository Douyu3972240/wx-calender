// component/clockInCalender/clockInCalender.js
let DATE = require("./date.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectDate:{
      // 用于控制日历上几月几号显示点
      type:Array,
      value:[]
    },
    infinite: {
      // 是否开启无限滚动，不开始默认查看前180天和后180天。开启后会自动更新数据，会有页面拉回效果
      type: Boolean,
      value: true
    },
    weekStart: { 
      type: Number,
      value: 7 //设置默认一个星期的开始是周几，1是周一，7是周天
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      switch (this.data.weekStart) {
        case 1:
          var weeks = [{
            simple: "一",
            text: "星期一",
            value: 1
          }, {
            simple: "二",
            text: "星期二",
            value: 2
          }, {
            simple: "三",
            text: "星期三",
            value: 3
          }, {
            simple: "四",
            text: "星期四",
            value: 4
          }, {
            simple: "五",
            text: "星期五",
            value: 5
          }, {
            simple: "六",
            text: "星期六",
            value: 6
          }, {
            simple: "日",
            text: "星期日",
            value: 7
          }]
          this.setData({
            weeks
          })
          break;
        case 2:
          var weeks = [{
            simple: "二",
            text: "星期二",
            value: 2
          }, {
            simple: "三",
            text: "星期三",
            value: 3
          }, {
            simple: "四",
            text: "星期四",
            value: 4
          }, {
            simple: "五",
            text: "星期五",
            value: 5
          }, {
            simple: "六",
            text: "星期六",
            value: 6
          }, {
            simple: "日",
            text: "星期日",
            value: 7
          }, {
            simple: "一",
            text: "星期一",
            value: 1
          }]
          break;
        case 3:
          var weeks = [{
            simple: "三",
            text: "星期三",
            value: 3
          }, {
            simple: "四",
            text: "星期四",
            value: 4
          }, {
            simple: "五",
            text: "星期五",
            value: 5
          }, {
            simple: "六",
            text: "星期六",
            value: 6
          }, {
            simple: "日",
            text: "星期日",
            value: 7
          }, {
            simple: "一",
            text: "星期一",
            value: 1
          }, {
            simple: "二",
            text: "星期二",
            value: 2
          }]
          break;
        case 4:
          var weeks = [{
            simple: "四",
            text: "星期四",
            value: 4
          }, {
            simple: "五",
            text: "星期五",
            value: 5
          }, {
            simple: "六",
            text: "星期六",
            value: 6
          }, {
            simple: "日",
            text: "星期日",
            value: 7
          }, {
            simple: "一",
            text: "星期一",
            value: 1
          }, {
            simple: "二",
            text: "星期二",
            value: 2
          }, {
            simple: "三",
            text: "星期三",
            value: 3
          }]
          break;
        case 5:
          var weeks = [{
            simple: "五",
            text: "星期五",
            value: 5
          }, {
            simple: "六",
            text: "星期六",
            value: 6
          }, {
            simple: "日",
            text: "星期日",
            value: 7
          }, {
            simple: "一",
            text: "星期一",
            value: 1
          }, {
            simple: "二",
            text: "星期二",
            value: 2
          }, {
            simple: "三",
            text: "星期三",
            value: 3
          }, {
            simple: "四",
            text: "星期四",
            value: 4
          }]
          break;
        case 6:
          var weeks = [{
            simple: "六",
            text: "星期六",
            value: 6
          }, {
            simple: "日",
            text: "星期日",
            value: 7
          }, {
            simple: "一",
            text: "星期一",
            value: 1
          }, {
            simple: "二",
            text: "星期二",
            value: 2
          }, {
            simple: "三",
            text: "星期三",
            value: 3
          }, {
            simple: "四",
            text: "星期四",
            value: 4
          }, {
            simple: "五",
            text: "星期五",
            value: 5
          }]
          break;
        case 7:
          var weeks = [{
            simple: "日",
            text: "星期日",
            value: 7
          }, {
            simple: "一",
            text: "星期一",
            value: 1
          }, {
            simple: "二",
            text: "星期二",
            value: 2
          }, {
            simple: "三",
            text: "星期三",
            value: 3
          }, {
            simple: "四",
            text: "星期四",
            value: 4
          }, {
            simple: "五",
            text: "星期五",
            value: 5
          }, {
            simple: "六",
            text: "星期六",
            value: 6
          }]
          break;
      }
      this.setData({
        weeks
      })
      this.init()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    currentSwiperItem:"",
    userSelectDate: {
      // 用户选择了哪一天
      year: "",
      month: "",
      day: ""
    },
    weeks: [], //星期
    "YYYY/MM/DD": "", //当前年月日
    year: "", //当前年
    month: "", //当前月
    day: "", //当天多少号
    dateList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    noSelectDayHint(e){
      console.log(e)
      wx.showModal({
        title:"提示",
        content:`请选择本月的日期`,
        showCancel:false
      })
    },
    init(isFoucsToday, date) {
      let ISFOUCSTODAY = isFoucsToday == false ? false : true //是否聚焦到今天,默认是开启
      // 初始化，用于显示calender和更新
      let currentDate = date ? date : DATE.getCurrentYMDHMS()

      let year = currentDate.year
      let month = currentDate.months
      let day = currentDate.days

      if (date) {

      } else {
        this.setData({
          year,
          month,
          day
        })
      }

      let timestamp = DATE.timestamp(`${year}/${month}/${day}`)
      // 180是半年前,然后再加上后面半年
      let oneLastYearTimestamp = timestamp - (60 * 60 * 24 * 1000 * 180)

      let dateList = []

      for (let i = 0; i < 360 / 30; i++) {
        dateList.push({
          pageMonth: []
        })
      }
      // 先得到半年前的时间

      let YMD = DATE.timestampConvertToYMD(oneLastYearTimestamp)
      
      YMD = DATE.timestampConvertToYMD(DATE.timestamp(`${YMD.year}/${YMD.months}/01`)) //半年前1号是星期几
      oneLastYearTimestamp = DATE.timestamp(`${YMD.year}/${YMD.months}/01`) //半年前1号的时间戳
      // 得到关键的1号是星期几
      let currentYMD = DATE.timestampConvertToYMD(oneLastYearTimestamp) //得到半年前1号的日期
      // 每个月的最后一天
      let lastDay = DATE.timestampConvertToYMD(DATE.timestamp(new Date(currentYMD.year, currentYMD.months, 0))).days
      let eveyMonthArr = [] //这里装的是每个月的数据

      for (let i = 0; i < dateList.length; i++) {
        // 开始循环6个月
        if (i == 0) {
          // 如果是第一次循环时，找到1号是星期几，然后根据1号是星期几得出前面差了一天，补齐
          let emptyDay = 0
          for (let emptyDayI in this.data.weeks) {
            if (this.data.weeks[emptyDayI].value == currentYMD.week) {
              // 找到需要空多少天
              break
            }
            emptyDay++
          }
          oneLastYearTimestamp = oneLastYearTimestamp - 60 * 60 * 24 * 1000 * emptyDay

          for (let k = 0; k < emptyDay; k++) {
            dateList[i].pageMonth.push({
              year: DATE.timestampConvertToYMD(oneLastYearTimestamp).year,
              month: DATE.timestampConvertToYMD(oneLastYearTimestamp).months,
              day: DATE.timestampConvertToYMD(oneLastYearTimestamp).days
            })
            oneLastYearTimestamp = oneLastYearTimestamp + 60 * 60 * 24 * 1000
          }

          for (let p = 0; p < lastDay; p++) {
            // 一天就是86,400毫秒             
            oneLastYearTimestamp = p == 0 ? oneLastYearTimestamp : oneLastYearTimestamp + 60 * 60 * 24 * 1000


            let eveydayDate = DATE.timestampConvertToYMD(oneLastYearTimestamp)
            let year = eveydayDate.year
            let month = eveydayDate.months
            let day = eveydayDate.days

            eveyMonthArr.push({
              year,
              month,
              day
            })
            if (day * 1 == lastDay * 1) {
              // 判断这个月的最后一天,如果已经是最后一天了就去找下个月的数据
              dateList[i].monthNumber = {
                year: eveydayDate.year,
                month: eveydayDate.months,
                day: eveydayDate.days
              }
              dateList[i].pageMonth.push(...eveyMonthArr)
              // 要求一行7个，一共6行
              let lastDayTimestamp = oneLastYearTimestamp //oneLastYearTimestamp不能改变，后面会根据这个找到下个月的第一天
              if (dateList[i].pageMonth.length <= 7 * 6) {
                let lastDayNumber = 7 * 6 - dateList[i].pageMonth.length
                // 如果这个月的数据天数没有达到6行，每行7个，这个时候就需要把剩下的天数给填充上
                for (let a = 0; a < lastDayNumber; a++) {
                  lastDayTimestamp = lastDayTimestamp + 60 * 60 * 24 * 1000
                  let lastDay = DATE.timestampConvertToYMD(lastDayTimestamp)
                  dateList[i].pageMonth.push({
                    year: lastDay.year,
                    month: lastDay.months,
                    day: lastDay.days
                  })
                }
                eveyMonthArr = []
              } else {
                eveyMonthArr = []
                break
              }
            }
          }
        } else {
          oneLastYearTimestamp = oneLastYearTimestamp + 60 * 60 * 24 * 1000 //先加一天，得到明天的时间戳，也就是下个月的1号
          let currentNextYMD = DATE.timestampConvertToYMD(oneLastYearTimestamp)

          let emptyDay = 0
          for (let emptyDayI in this.data.weeks) {
            if (this.data.weeks[emptyDayI].value == currentNextYMD.week) {
              // 找到需要空多少天
              break
            }
            emptyDay++
          }

          oneLastYearTimestamp = oneLastYearTimestamp - 60 * 60 * 24 * 1000 * emptyDay

          for (let k = 0; k < emptyDay; k++) {
            dateList[i].pageMonth.push({
              year: DATE.timestampConvertToYMD(oneLastYearTimestamp).year,
              month: DATE.timestampConvertToYMD(oneLastYearTimestamp).months,
              day: DATE.timestampConvertToYMD(oneLastYearTimestamp).days
            })
            oneLastYearTimestamp = oneLastYearTimestamp + 60 * 60 * 24 * 1000
          }

          let lastDay = DATE.timestampConvertToYMD(DATE.timestamp(new Date(currentNextYMD.year, currentNextYMD.months, 0))).days

          for (let p = 0; p < lastDay * 1; p++) {
            oneLastYearTimestamp = p == 0 ? oneLastYearTimestamp : oneLastYearTimestamp + 60 * 60 * 24 * 1000

            let currcurrentNextYMDentYMD = DATE.timestampConvertToYMD(oneLastYearTimestamp) //转换成YYYY/MM/DD

            lastDay = DATE.timestampConvertToYMD(DATE.timestamp(new Date(currentNextYMD.year, currentNextYMD.months, 0))).days

            let eveydayDate = DATE.timestampConvertToYMD(oneLastYearTimestamp)
            let year = eveydayDate.year
            let month = eveydayDate.months
            let day = eveydayDate.days

            eveyMonthArr.push({
              year,
              month,
              day
            })


            if (day * 1 == lastDay * 1) {
              // 判断这个月的最后一天,如果已经是最后一天了就去找下个月的数据
              dateList[i].pageMonth.push(...eveyMonthArr)
              dateList[i].monthNumber = {
                year: eveydayDate.year,
                month: eveydayDate.months,
                day: eveydayDate.days
              }
              // 要求一行7个，一共6行
              let lastDayTimestamp = oneLastYearTimestamp //oneLastYearTimestamp不能改变，后面会根据这个找到下个月的第一天
              if (dateList[i].pageMonth.length <= 7 * 6) {
                let lastDayNumber = 7 * 6 - dateList[i].pageMonth.length
                // 如果这个月的数据天数没有达到6行，每行7个，这个时候就需要把剩下的天数给填充上
                for (let a = 0; a < lastDayNumber; a++) {
                  lastDayTimestamp = lastDayTimestamp + 60 * 60 * 24 * 1000
                  let lastDay = DATE.timestampConvertToYMD(lastDayTimestamp)
                  dateList[i].pageMonth.push({
                    year: lastDay.year,
                    month: lastDay.months,
                    day: lastDay.days
                  })
                }
                eveyMonthArr = []
              } else {
                eveyMonthArr = []
                break
              }
            }
          }
        }
      }
      

      if (ISFOUCSTODAY) {
        let currentSwiperItem = ""
        for (let index in dateList) {
          if (dateList[index].monthNumber.year * 1 == year * 1 && dateList[index].monthNumber.month * 1 == month * 1) {
            currentSwiperItem = index
          }
        }
        this.setData({
          dateList: dateList,
          currentSwiperItem
        })
        this.triggerEvent("swiperChange", dateList[currentSwiperItem].monthNumber)
      } else {
        this.setData({
          dateList: dateList
        })
      }
      console.log("selectDate:",this.data)
      console.log("dateList:",dateList)

    },
    selectDay(e) {
      this.setData({
        userSelectDate: e.currentTarget.dataset
      })
      const data = e.currentTarget.dataset
      this.triggerEvent("userSelectDay", data)
    },
    swiperChange(e) {
      const index = e.detail.current
      let data = this.data.dateList[index].monthNumber

      if (index == 0) {
        // 当前是滑动到第一个去了，所以应该以这个月生成数据
        if (this.data.infinite) {
          this.init(false, {
            year: data.year,
            months: data.month,
            days: data.day
          })
          this.setData({
            currentSwiperItem: 5
          })
        }
      } else if (index == this.data.dateList.length - 1) {
        // 当前是滑动到最后一个去了，所以应该以这个月生成数据

        if (this.data.infinite) {
          this.init(false, {
            year: data.year,
            months: data.month,
            days: data.day
          })
          this.setData({
            currentSwiperItem: 5
          })
        }
      }

      this.triggerEvent("swiperChange", data)

    }
  }
})