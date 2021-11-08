function getCurrentYMDHMS() {
  let date = new Date()
  let year = date.getFullYear(); // 获取完整的年份(4位,1970-至今)
  let months = (date.getMonth() + 1) * 1 < 10 ? `0${date.getMonth() * 1 + 1}` : date.getMonth() * 1 + 1; // 获取当前月份(0-11,0代表1月)
  let days = date.getDate() * 1 < 10 ? `0${date.getDate() * 1}` : date.getDate() * 1; // 获取当前日(1-31)
  let week = date.getDay() == 0 ? 7 : date.getDay(); // 获取当前星期(1-7,7代表星期天)
  let hours = date.getHours() * 1 < 10 ? `0${date.getHours() * 1}` : date.getHours(); // 获取当前小时数(0-23)
  let minutes = date.getMinutes() * 1 < 10 ? `0${date.getMinutes() * 1}` : date.getMinutes() * 1; // 获取当前分钟数(0-59)
  let seconds = date.getSeconds() * 1 < 10 ? `0${date.getSeconds() * 1}` : date.getSeconds() * 1; // 获取当前秒数(0-59)
  return {
    year,
    months,
    days,
    week,
    hours,
    minutes,
    seconds
  }
}

function timestamp(date) {
  // 传入一个时间，yyyy-mm-dd这样的格式，把这个时间转换成时间戳
  let time = date.toString()
  if (time.indexOf("-") >= 0) {
    // 表示时间里面带横杠需要转换成斜杠
    time = time.replace(/-/g, "/")
  }
  let timestamp = new Date(time).getTime()
  // 返回的结果包含毫秒
  return timestamp
}

function timestampConvertToYMD(timestamp) {
  // 时间戳转换成yyyy-mm-dd
  let time = new Date(timestamp);
  let year = time.getFullYear();
  let months = time.getMonth() + 1;
  let days = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let week = time.getDay() == 0 ? 7 : time.getDay(); // 获取当前星期(1-7,7代表星期天)

  let result = {
    year: year,
    months: months * 1 < 10 ? `0${months}` : months,
    days: days * 1 < 10 ? `0${days}` : days,
    hours: hours * 1 < 10 ? `0${hours}` : hours,
    minutes: minutes * 1 < 10 ? `0${minutes}` : minutes,
    seconds: seconds * 1 < 10 ? `0${seconds}` : seconds,
    week
  }

  return result
}

function getNextDay(timestamp) {
  // 根据时间戳计算得到明天是是几月几号,传入时间必须是毫秒
  let nextTimestamp = timestamp + 60 * 60 * 24 * 1000
  // let nextTimestamp = timestamp
  timestampConvertToYMD(timestamp)
}



export {
  timestampConvertToYMD,
  getCurrentYMDHMS,
  timestamp,
  getNextDay
}