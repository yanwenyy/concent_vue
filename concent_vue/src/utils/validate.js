/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

export function isInteger(s) {
  return /^([0]|[1-9][0-9]*)$/.test(s)
}

/**
 * 金额
 * @param {*} s
 */

export function isMoney(s) {
  s=s.replace(/[^\d.]/g,'');
  s=s.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
  return s;
  // return /^(([1-9][0-9])|(([0].\d{0,2}|[1-9][0-9].\d{0,2})))$/.test(s)
}
