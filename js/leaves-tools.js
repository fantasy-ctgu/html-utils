/*
 * @Author: Fantasy
 * @Date: 2019-04-09 21:06:28
 * @LastEditors: Fantasy
 * @LastEditTime: 2019-06-08 10:30:24
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

function initDistrict({
	level1,
	level2 = null,
	level3 = null,
	level4 = null,
	level5 = null,
	method = "client",
	dataurl
}) {
	domObj = [];
	domObj.push(level1)
	domObj.push(level2 || null)
	domObj.push(level3 || null)
	domObj.push(level4 || null)
	domObj.push(level5 || null)
	// 给每个select添加onchange事件
	for (let p = 0; p < domObj.length - 1; p++) {
		if (domObj[p] == null) continue;
		$id(domObj[p]).on("change", function () {
			//获取当前select的选中项的code
			var currentCode = $("#" + domObj[p] + " option:selected").attr("code");
			//清空原有下级select的数据
			$id(domObj[p + 1]).empty()
			var result = getSuit(p + 2, currentCode);
			// 更新下级select
			$.each(result, function (i, value) {
				$id(domObj[p + 1]).append("<option value='" + result[i]['name'] + "' code='" + result[i]['code'] + "'>" + result[i]['name'] + "</option>");
			});
			// 更新下下级
			$id(domObj[p + 1]).trigger("change");
		});
	}
	var district;
	if( method == "client"){
		// 获取行政区
		$.ajax({
			url: "./js/district.json",
			dataType: "text",
			async: false,
			success: function (data) {
				district = eval('(' + data + ')');
			},
			/**
			 * 
			 * @param {*} XMLHttpRequest 错误信息、捕获的错误对象
			 * @param {*} textStatus timeout、error、notmodified、parsererror
			 * @param {*} errorThrown 
			 */
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.error(XMLHttpRequest);
				alert("系统错误");
			}
		});
	}
	//初始化顶级select
	var result = getSuit(1);
	$.each(result, function (i, value) {
		var $option = $("<option value='" + result[i]['name'] + "' code='" + result[i]['code'] + "'>" + result[i]['name'] + "</option>");
		$id(domObj[0]).append($option);
	});
	$id(domObj[0]).trigger("change");
	/**
	 * 筛选子级行政区
	 * @param {integer} level 行政区等级
	 * @param {String} parentCode 父级行政区代码
	 */
	function getSuit(level, parentCode = 0) {
		result = []
		if(method == "server"){
			$.ajax({
				url: dataurl,
				dataType: "json",
				data:{
					"level": level,
					"parentCode": parentCode
				},
				async: false,
				success: function (data) {
					result = data;
				},
				/**
				 * 
				 * @param {*} XMLHttpRequest 错误信息、捕获的错误对象
				 * @param {*} textStatus timeout、error、notmodified、parsererror
				 * @param {*} errorThrown 
				 */
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.error(XMLHttpRequest);
					alert("系统错误");
				}
			});
			return result;
		}else{
			$.each(district, function (i, value) {
				obj = district[i];
				if (obj['level'] == level) {
					if (parentCode) {
						parentCode = parentCode.strip("0");
						var re = new RegExp("^" + parentCode, "gim");
						if (re.test(obj["code"])) {
							result.push(obj);
						}
					} else {
						result.push(obj);
					}
				}
			});
			return result;
		}
	}
}