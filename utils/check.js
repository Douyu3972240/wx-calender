function checkPhone(phone) {
  let str = phone;
  let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!reg.test(str)) {
    return false
  } else {
    return true
  }
}


function checkBank(bankID) {
  let reg = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/
  let str = bankID.replace(/\s+/g, "")
  if (!reg.test(str)) {
    return false
  } else {
    return true
  }
}

function checkIDCard(card) {
  // 验证身份证
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card) == false) {
    return false;
  } else {
    return true;
  }
}

export {
  checkPhone,
  checkBank,
  checkIDCard
}