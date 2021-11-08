function request(url, data, header, method) {
  // 需要将拿到的数据进行合法化，避免开发者传错了数据
  const methodArr = ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]
  const arg = arguments
  if (!arg[0]) {
    console.error("reqeust方法第一个参数必须传入一个地址")
    return false
  }
  // if (arg[0].indexOf("http") == -1 || arg[0].indexOf("://") == -1) {
  //   console.error("reqeust方法必须穿入一个有效的地址")
  //   return false
  // }
  if (!arg[1]) {
    console.error("reqeust方法必须传入data字段")
    return false
  }
  if (!arg[2]) {
    header = {
      "content-type": "application/json"
    }
  } else
    /*
    if (methodArr.includes(arg[2].toUpperCase())) {
      header = {
        "content-type": "application/json"
      }
      method = arg[2].toUpperCase()
    } else
    */
    if (!arg[3] && methodArr.includes(arg[2].toUpperCase()) == false) {
      method = "GET"
      header = {
        "content-type": "application/json"
      }
    } else
  if (methodArr.includes(method) == false) {
    const originMethod = method
    method = method.toUpperCase()
    method = "GET"
    console.warn(`请传入有效的参数，如${methodArr.toString()}，已自动将${originMethod}方式替换为GET方式`)
  }
  console.log("url:", url)
  console.log("data:", data)
  console.log("header:", header)
  console.log("method:", method)
  return new Promise((s, f) => {
    wx.hideLoading()
    wx.showLoading({
      title: '数据请求中...',
    })
    wx.request({
      url: `${url}`,
      data,
      header: header,
      method: method,
      success: function (e) {
        s(e)
        if (e.data.code != 200) {
          wx.showToast({
            title: `${e.data.msg}`,
            icon: "none"
          })
        }
      },
      fail: function (e) {
        f(e)
        wx.hideLoading()
        wx.hideToast()
        wx.showToast({
          title: '请求失败',
          icon: "none"
        })
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function login() {
  return new Promise((s, f) => {
    wx.hideLoading()
    wx.showLoading({
      title: '数据请求中...',
    })
    wx.login({
      timeout: 10 * 10000,
      success: function (code) {
        s(code.code)
      },
      fail: function (e) {
        f(e)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function getUserInfo(desc, lang) {
  // 获得用户基本信息，头像昵称城市等，但是不包含手机号
  let result = new Promise((s, f) => {
    wx.getUserProfile({
      desc: desc || '用于昵称和头像展示',
      lang: lang || 'zh_CN',
      success: function (e) {
        console.log(e)
        console.log(JSON.stringify(e))
        s(e)
      },
      fail: function (e) {
        console.log(e)
        s(e)
      }
    })
  })
  return result
}

function chooseImage(count, sizeType, sourceType) {
  return new Promise((s, f) => {
    wx.chooseImage({
      count: count || 1,
      sizeType: sizeType || ['original'],
      sourceType: sourceType || ['album', 'camera'],
      success: function (e) {
        s(e)
      },
      fail: function (e) {
        f(e)
      }
    })
  })
}

function transformToBase64(filePath) {
  // 传入一个图片的地址，返回一个base64字符串
  return new Promise((s, f) => {
    wx.getFileSystemManager().readFile({
      filePath, //图片路径
      encoding: 'base64', //编码格式
      success: res => { //成功的回调
        s(`data:image/png;base64,${res.data}`)
      },
      fail: e => {
        f(e)
      }
    })
  })
}

function retainPoint(num, n) {
  // num是需要处理的数，n是需要保留小数点后面几位，填写的是几就是保留小数点几个数
  // const pow = 10 ** n
  const pow = Math.pow(10, n)
  let result = parseInt(num * pow) / pow
  if (result % num == 0) {
    // 表示没有小数了，需要人为的加上小数部分
    let zero = []
    for (let i = 0; i < n; i++) {
      zero.push(0)
    }
    zero = zero.toString().replace(/,/g, "")
    result = `${result.toString()}.${zero}`
  }
  return result
}

function unitTransform(u1, u2, d) {
  u1 = u1.toUpperCase()
  u2 = u2.toUpperCase()
  // 单位换算
  // u1，以u1为基础
  // u2，换算成u2，就是将u1变成u2，d对应的是u1的数据
  let result = 0
  // B,KB,MB,GB,TB
  switch (u1) {
    case "B":
      switch (u2) {
        case "KB":
          result = retainPoint((d / 1024), 4)
          break;
        case "MB":
          result = retainPoint((d / 1024 / 1024), 4)
          break;
        case "GB":
          result = retainPoint((d / 1024 / 1024 / 1024), 4)
          break;
        case "TB":
          result = retainPoint((d / 1024 / 1024 / 1024 / 1024), 4)
          break;
      }
      break;
    case "KB":
      switch (u2) {
        case "B":
          result = retainPoint((d * 1024), 4)
          break;
        case "MB":
          result = retainPoint((d / 1024), 4)
          break;
        case "GB":
          result = retainPoint((d / 1024 / 1024), 4)
          break;
        case "TB":
          result = retainPoint((d / 1024 / 1024 / 1024), 4)
          break;
      }
      break;
    case "MB":
      switch (u2) {
        case "B":
          result = retainPoint((d * 1024 * 1024), 4)
          break;
        case "KB":
          result = retainPoint((d * 1024), 4)
          break;
        case "GB":
          result = retainPoint((d / 1024), 4)
          break;
        case "TB":
          result = retainPoint((d / 1024 / 1024), 4)
          break;
      }
      break;
  }
  return result
}

function uploadFile(filePath, name, url, header, formData) {
  console.log("filePath:", filePath)
  console.log("name:", name || "")
  console.log("url:", url)
  console.log("header:", header || {
    "Content-Type": "application/x-www-form-urlencoded"
  })
  console.log("formData:", formData || "")
  return new Promise((s, f) => {
    wx.hideLoading()
    wx.showLoading({
      title: '文件上传中...',
    })
    wx.uploadFile({
      filePath,
      name: name || "",
      url: `${url}`,
      header: header || {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      formData: formData || "",
      success: function (e) {
        s(e)
      },
      fail: function (e) {
        f(e)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

function getImageInfo(src) {
  return new Promise((s, f) => {
    wx.getImageInfo({
      src,
      success: function (e) {
        s(e)
      },
      fail: function (e) {
        f(e)
      }
    })
  })
}

function numberAnimation(_this, number) {
  // 数字变化动画,
  const key = number.key
  let oldNum = number.oldValue
  const newNum = number.newValue
  let timer = null

  clearInterval(timer)
  oldNum = oldNum + 2
  _this.setData({
    [key]: oldNum
  })
  timer = setInterval(() => {
    oldNum = oldNum + 2
    if (oldNum >= newNum) {
      clearInterval(timer)
      _this.setData({
        [key]: newNum
      })
      return false
    }
    _this.setData({
      [key]: oldNum
    })

  }, 50)

}

/*
Number.prototype.toDecimal = function (n) {
  // const pow = 10 ** n  //es6写法，下方es5写法
  const pow = Math.pow(10, n)
  let result = parseInt(this * pow) / pow
  if (result % this == 0) {
    // 表示没有小数了，需要人为的加上小数部分
    let zero = []
    for (let i = 0; i < n; i++) {
      zero.push(0)
    }
    zero = zero.toString().replace(/,/g, "")
    result = `${result.toString()}.${zero}`
    // this = result
  }
  return result
}
*/

function getDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s; //返回的单位是千米，1就是1千米
}

export {
  getDistance,
  uploadFile,
  request,
  chooseImage,
  login,
  getImageInfo,
  unitTransform,
  retainPoint,
  transformToBase64,
  getUserInfo,
  numberAnimation
}