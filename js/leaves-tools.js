/*
 * @Author: Fantasy
 * @Date: 2019-04-09 21:06:28
 * @LastEditors: Fantasy
 * @LastEditTime: 2020-02-22 16:14:50
 * @Descripttion: 其它工具
 * @Email: 776474961@qq.com
 */

/**
 * 自定义id选择器
 * @param {String} idValue 对象的id值
 */
function $id(idValue) {
	return $("#" + idValue);
}

/**
 * js 实现 strip 函数(删除首尾flag字符串)
 * @param {String} 待删除字符串
 */
String.prototype.strip = function (flag = false) {
	if (flag) {
		var re = new RegExp("^" + flag + "+|" + flag + "+$", "gim");
		return this.replace(re, '');
	}
	return this.replace(/^\s+|\s+$/g, '');
}

/**
 * 滚动至顶部
 * @param {String} targetId 
 */
function initScroll(triggerId, targetId = false, duration = 800) {
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 100) {
			$id(triggerId).fadeIn(300);
		} else {
			$id(triggerId).fadeOut(300);
		}
	});
	$id(triggerId).click(function () {
		$('html,body').animate({
			scrollTop: targetId?$id(targetId).offset().top+'px':'0px'
		}, 800);
	});
}

/**
 * 判断obj是否包含属性name值为namestr的对象
 * @param {DOM} obj 判断对象
 * @param {String} name 查找对象
 */
function checkHasName(obj, name) {
	if ($(obj).find("[name=" + name + "]").length <= 0) {
		return false;
	} else {
		return true;
	}
}

/**
 * 自动填充模态框
 * @param {DOM} obj 原始数据 
 * @param {String} parentLabel 寻至父节点
 * @param {String} targetModelId 目标模态框id
 */
function autoFillModel(obj, parentLabel = "tr", targetModelId = "exampleModal") {
	var parentDOM = $(obj).parents(parentLabel);
	var varList = $(parentDOM).find("[name]");
	var targetModel = $id(targetModelId);
	varList.each(function () {
		var name = $(this).attr("name");
		var value = $(this).text();
		if (checkHasName(targetModel, name)) {
			// 往model填充值
			$(targetModel).find("[name=" + name + "]").val(value);
		}
	});
}

/**
 * 刷新验证码
 * @param {DOM} obj img标签DOM对象
 * @param {String} captchaUrl 刷新验证码接口
 */
function flushCaptcha(obj, captchaUrl) {
	var url = captchaUrl + Math.floor(Math.random() * 100);
	$(obj).attr("src", url);
	return true;
}

/**
 * 进度条初始化
 * @param {int} i 至第i进度
 */
function initProgress(i) {
	$('.step').each(function () {
		var a, $this = $(this);
		if (i > $this.find('li').length) {
			console.log('您输入数值已超过步骤最大数量' + $this.find('li').length + '！！！');
			a = $this.find('li').length;
		} else if (i == undefined && $this.data('step') == undefined) {
			a = 1
		} else if (i == undefined && $this.data('step') != undefined) {
			a = $(this).data('step');
		} else {
			a = i
		}
		$(this).find('li').removeClass('active');
		$(this).find('li:lt(' + a + ')').addClass('active');
	})
}