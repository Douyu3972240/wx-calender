const localhost = "http://47.112.174.103:8080"; //本地开发环境

const develop = "http://47.112.174.103:8080"; //开发环境

const test = "http://192.168.0.253:8080"; //测试环境 
// const test = "http://192.168.0.120:8080"; //测试环境 乐年本地地址
// const test = "http://192.168.0.34:8080"; //测试环境 刘晓龙本地地址 

const formal = "https://dp.zanecon.cn/api"; //正式地址
// const formal = "https://47.112.174.103:8080"; //正式地址



// const http = "localhost"
// const http = "develop"
const http = "test"
// const http = "formal"

let api = ""

switch (http) {
  case 'localhost':
    api = localhost
    break;
  case 'develop':
    api = develop
    break;
  case 'test':
    api = test
    break;
  case 'formal':
    api = formal
    break;
}

export {
  localhost,
  develop,
  test,
  formal,
  api
}