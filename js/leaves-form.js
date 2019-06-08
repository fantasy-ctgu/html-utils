/*
 * @Author: Fantasy
 * @Date: 2019-04-02 12:29:05
 * @LastEditors: Fantasy
 * @LastEditTime: 2019-06-07 15:51:49
 * @Descripttion: 表单正则匹配
 * @Email: 776474961@qq.com
 */

/**
 *
 * 判断非空
 * @param {inputDOM} obj input对象
 */
function checkNotEmpty(obj) {
    var str = $(obj).val();
    if (str != "" && str != null) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为年龄
 * @param {inputDOM} obj input对象
 */
function checkAge(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj)) {
        if (!(/^\d{1,3}$/.test(str)) || str < 1 || str > 110) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

/**
 * 判断qq
 * @param {inputDOM} obj input对象
 */
function checkQQ(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/^\d{5,12}$/.test(str))) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断数字
 * @param {inputDOM} obj input对象
 */
function checkNum(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/^\d+$/.test(str))) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为汉字
 * @param {inputDOM} obj 
 */
function checkChinese(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/^[\u4e00-\u9fa5]{0,}$/.test(str))) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为变量
 * @param {inputDOM} obj 
 */
function checkVar(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/^[A-Za-z0-9]{2,16}$/.test(str))) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为Email
 * @param {inputDOM} obj 
 */
function checkEmail(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str))) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为IP
 * @param {inputDOM} obj 
 */
function checkIP(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/\d+\.\d+\.\d+\.\d+/.test(str))) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否为Phone
 * @param {inputDOM} obj 
 */
function checkPhone(obj) {
    var str = $(obj).val();
    if (checkNotEmpty(obj) && (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str))) {
        return true;
    } else {
        return false;
    }
}
// 表单正则匹配结束

/**
 * 判断两input内值是否相等
 * @param {String} inputId1 第一个input的id 
 * @param {String} inputId2 第二个input的id
 */
function compareInput(inputId1, inputId2) {
    var value1 = $("#" + inputId1).val();
    var value2 = $("#" + inputId2).val();
    if (value1 == value2) {
        return true;
    } else {
        return false;
    }
}

/**
 * 构造表单参数：json
 * @param {DOM} obj 
 */
function getDataToJson(obj, parentLabel = "form") {
    var formDOM = $(obj).parents(parentLabel);
    var varList = $(formDOM).find("[name]");
    var data = {};
    varList.each(function () {
        if ($(this).attr("ignore") != undefined) {
            ;
        } else if ($(this).is("select")) {
            data[$(this).attr("name")] = $(this).find("option:selected").val();
        } else {
            data[$(this).attr("name")] = $(this).val();
        }
    });
    // console.log(data);
    return data;
}

/**
 * 判断包含obj的parentLabel域里的所有input是否合法
 * @param {DOM} obj 调用对象
 * @param {String} parentLabel 向上查找至parentLabel
 * @param {boolean} removeNullLabel 是否移除空name属性
 */
function checkNameDOM(obj, parentLabel = "form", removeNullLabel = false) {
    var formDOM = $(obj).parents("form");
    var varList = $(formDOM).find("[name]");
    var flag = true;
    varList.each(function () {
        var checkFun = $(this).attr("check");
        if (checkFun && /(\S+)/.test(checkFun)) {
            if (!eval(checkFun)) {
                $(this).addClass("inp_error");
                $(this).focus();
                flag = false;
                console.error(this);
                var errmsg = $.trim($(this).attr("errmsg"));
                if (errmsg) {
                    alert(errmsg);
                } else {
                    alert("请按要求填写所有信息");
                }
                return false;
            }
            $(this).removeClass("inp_error");
        }
    });
    if (removeNullLabel) {
        varList.each(function () {
            if ($(this).val() == "") {
                $(this).attr("name", "");
            }
        });
    }
    return flag;
}

/**
 * 判断是否可以提交表单
 * @param {DOM} obj 
 */
function checkForm(obj, removeNullLabel = false) {
    if (checkNameDOM(obj, "form", removeNullLabel)) $(obj).parents("form").submit();
}

/**
 * 焦点移出时判断
 * @param {DOM} obj 出发对象
 */
function checkBlur(obj) {
    $(obj).each(function () {
        var checkFun = $(obj).attr("check");
        if (checkFun && /(\S+)/.test(checkFun)) {
            if (!eval(checkFun)) {
                $(this).addClass("inp_error");
                $(this).focus();
                console.error(this);
                var errmsg = $.trim($(this).attr("errmsg"));
                if (errmsg) {
                    console.error(errmsg);
                } else {
                    console.error("请按要求填写所有信息");
                }
                return false;
            }
            $(this).removeClass("inp_error");
        }
    });
}
