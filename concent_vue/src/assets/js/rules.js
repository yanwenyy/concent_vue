// 通用验证

const rules = {
  notEmpty: { required: true, message: '此项不能为空' },
  phone: {
    pattern: /^1[3457869]\d{9}$/,
    message: '手机号格式不正确'
  },
  // onePoint: {
  //   pattern: /^[\-\+]?\d{1,3}(\.\d)?$/,
  //   message: '只能输入数字且小数点后只能保留1位数字！'
  // },

  // email: {
  //   // pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  //   pattern: /^([a-zA-Z0-9]+[-|\-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\-|\.]?)*[a-zA-Z0-9]+\.+[a-zA-Z]{1,3}$/,
  //   message: '请输入正确的邮箱'
  // },
  maxPoint: {
    validator: function(rule, value, callback) {
      const v = parseFloat(value)
      if (v > 100) {
        return callback(new Error('百分比不能大于100'))
      }
      return callback()
    },
    message: '百分比不能大于100！'
  },
  minPonit: {
    validator: function(rule, value, callback) {
      const v = parseFloat(value)
      if (v < 0) {
        return callback(new Error('百分比不能小于0'))
      }
      return callback()
    },
    message: '百分比不能小于0！'
  },
  NotEmpty: {
    // 非空字符串验证。 easyui 原装required 不能验证空格
    validator: function(rule, value, callback) {
      if (value && value.trim().length > 0) {
        return callback()
      }
      return callback(new Error('内容不能为空，限50字'))
    },
    message: '内容不能为空，限50字'
  },

  // number: {
  //   pattern: /^[\-\+]?\d{1,8}(\.\d)?$/,
  //   message: '只能输入数字,长度小于等于8位数字且小数点后只能保留1位数字！'
  // },
  // otherNum: {
  //   pattern: /^[\+]?\d{1,8}?$/,
  //   message: '只能输入整数且长度小于等于8位数字！'
  // },
  num: {
    pattern: /^[1-9]\d*$/,
    message: '只能输入整数字！'
  },
  numResource: {
    pattern: /^\d+(，\d+)*$/,
    message: '请按照举例进行填写！'
  },

  // otherNine: {
  //   pattern: /^[\+]?\d{1,9}?$/,
  //   message: '只能输入整数字且长度小于等于位9数字！'
  // },
  // otherNineTwo: {
  //   pattern: /^[\+]?\d{1,9}(\.\d{1,2})?$/,
  //   message: '只能输入数字,长度小于等于9位数字且小数点后只能保留2位数字！'
  // },
  // otherTen: {
  //   pattern: /^[\+]?\d{1,10}?$/,
  //   message: '只能输入整数字且长度小于等于位10数字！'
  // },
  // otherNumTwo: {
  //   pattern: /^[\+]?\d{1,8}(\.\d{1,4})?$/,
  //   message: '只能输入数字,长度小于等于8位数字且小数点后只能保留4位数字！'
  // },
  // otherCode: {
  //   pattern: /^[\-\+]?\d{1,20}(\.\d)?$/,
  //   message: '只能输入数字,长度小于等于20位数字且小数点后只能保留1位数字！'
  // },
  // otherNewNum: {
  //   pattern: /^[\-\+]?\d{1,20}(\.\d{1,4})?$/,
  //   message: '只能输入数字，长度小于等于20位数字且小数点后只能保留4位数字！'
  // },
  // numberThree: {
  //   pattern: /^[\-\+]?\d{1,8}(\.\d{1,4})?$/,
  //   message: '只能输入数字,长度小于等于8位数字且小数点后只能保留4位数字！'
  // },
  // IPVS: {
  //   pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  //   message: '请输入正确格式'
  // },
  IPVL: {
    pattern: /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
    message: '请输入正确格式'
  },
  // 统一社会信用代码由18位数字或者大写字母组成，但是字母不包括 I、O、Z、S、V
  // 一共由五部分组成
  // 第一部分：登记管理部门代码1位 (数字或大写英文字母)
  // 第二部分：机构类别代码1位 (数字或大写英文字母)
  // 第三部分：登记管理机关行政区划码6位 (数字)
  // 第四部分：主体标识码（组织机构代码）9位 (数字或大写英文字母)
  // 第五部分：校验码1位 (数字或大写英文字母)
  // 同时支持18位和15位社会信用代码
  codeTYSHXY: {
    pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
    message: '请输入正确的统一社会信用代码'
  },
  codeVLI: {
    pattern: /^[0-9ABCDEFGHJKLMNPQRTUWXY]{18}$/,
    message: '请输入正确的统一社会信用代码'
  },
  ZCZB: {
    pattern: /^[\\-\\+]?\d{1,20}(\.\d{1,4})?$/,
    message: '只能输入数字,长度小于等于20位数字且小数点后只能保留4位数字！'
  },

  GDDH: {
    // pattern: /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/,
    pattern: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    message: '固定电话,格式：(区号)-(号码)，例如：010-12345678'
  },
  DH: {
    pattern: /^(\d{3,4}-\d{7,8})$|^(\d){0,13}$/,
    message: '请输入正确的电话号码！'
  },
  TextSpace: {
    validator: (rule, value, callback) => {
      value = '' + value
      value = value.replace(/^\s+/g, '')
      if (!value.length) {
        return callback(new Error('此项不能为空'))
      }
      callback()
    },
    trigger: 'change'
  },
  // 整数10位
  integer10bits: {
    pattern: /^\d{1,10}?$/,
    message: '只能输入整数且长度小于等于10位数字'
  }
}

export { rules }
