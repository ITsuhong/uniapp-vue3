
//减法函数
export function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //last modify by deeka
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 乘法计算
export function accMul(arg1, arg2) {
  var m = 0, s1 = arg1 ? arg1.toString() : '0', s2 = arg2 ? arg2.toString() : '0';
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

// 加法计算
export function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//数字保留两位小数
export function formatPrice(num) {
  num = String(num)
  if (num.indexOf('.') != -1 && num.split('.')[1].length == 2) {
    return num
  }
  return parseInt(Number(num)) + '.' + ((Number(num) - parseInt(num)) > 0 ? parseInt((Number(num) - parseInt(num)) * 10) + '' + parseInt(((Number(num) - parseInt(num))) * 100 % 10) : '00')
}


export async function getOSSData() {
  const encBase64 = require('crypto-js/enc-base64');
  const HmacSHA1 = require('crypto-js/hmac-sha1');
  const { Base64 } = require('@/utils/base64.min.js');
  const { data } = await getApp().$vm.$store.dispatch({ type: 'oss/getSTSInfo' })
  const policyText = {
    expiration: data.Credentials.Expiration, // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ["content-length-range", 0, 500 * 1024 * 1024], 
    ],
  };
  const policy = Base64.encode(JSON.stringify(policyText)) // policy必须为base64的string。
  // 计算签名。
  function computeSignature(accessKeySecret, canonicalString) {
    return encBase64.stringify(HmacSHA1(canonicalString, accessKeySecret));
  }
  const signature = computeSignature(data.Credentials.AccessKeySecret, policy)
  const formData = {
    OSSAccessKeyId: data.Credentials.AccessKeyId,
    signature,
    policy,
    'x-oss-security-token': data.Credentials.SecurityToken
  }
  // console.log(formData)
  return formData
}
