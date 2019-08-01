/*
 * @Author: Fantasy
 * @Date: 2019-04-02 12:29:05
 * @LastEditors: Fantasy
 * @LastEditTime: 2019-08-01 15:35:41
 * @Descripttion: 
 * @Email: 776474961@qq.com
 */
/**
 * 通用删除接口
 * @param {DOM Object} obj 如果调用删除接口成功，将删除obj所在行
 * @param {String} url 调用的删除接口
 * @param {String} parentLabel 如果非空,且删除成功,则删除obj父级最近parentLabel标签
 */
function delDataInTable(obj, url, parentLabel = null) {
    if (confirm("确定删除此条信息吗?")) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            async: true,
            success: function (msg) {
                if (msg == "1") {
                    alert("删除成功");
                    if (parentLabel) {
                        $(obj).parents(parentLabel).remove();
                    }
                } else {
                    alert("删除失败");
                }
            },
            /**
             * 
             * @param {*} XMLHttpRequest 错误信息、捕获的错误对象
             * @param {*} textStatus timeout、error、notmodified、parsererror
             * @param {*} errorThrown 
             */
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("系统错误");
                console.error(XMLHttpRequest);
            }
        });
    }
}

/**
 * 向服务器询问obj能否使用当前值
 * @param {String} url 服务器地址
 * @param {DOM} obj DOM对象
 */
function checkServerValue(obj, url) {
    var flag = false;
    if (checkNotEmpty(obj)) {
        var dataStr = {};
        dataStr[$(obj).attr("name")] = $(obj).val();
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            async: false,
            data: dataStr,
            success: function (msg) {
                if (msg == "1") {
                    flag = true;
                } else {
                    flag = false;
                }
            },
            /**
             * 
             * @param {*} XMLHttpRequest 错误信息、捕获的错误对象
             * @param {*} textStatus timeout、error、notmodified、parsererror
             * @param {*} errorThrown 
             */
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("系统错误");
                console.error(XMLHttpRequest);
            }
        });
    }
    return flag;
}

/**
 * 通用更新接口
 * @param {*} obj 
 * @param {*} url 
 */
function updData(obj, url) {
    if (checkNameDOM(obj)) {
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: getDataToJson(obj),
            success: function (msg) {
                if (msg == "1") {
                    alert("修改成功");
                } else {
                    alert("修改失败");
                }
            },
            /**
             * 
             * @param {*} XMLHttpRequest 错误信息、捕获的错误对象
             * @param {*} textStatus timeout、error、notmodified、parsererror
             * @param {*} errorThrown 
             */
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("系统错误");
                console.error(XMLHttpRequest);
            }
        });
    }
}