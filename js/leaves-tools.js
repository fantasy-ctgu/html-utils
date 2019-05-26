$(function () {
	$(window).scroll(function () {
		if ($(window).scrollTop() >= 100) {
			$('.leavesToTop').fadeIn(300);
		} else {
			$('.leavesToTop').fadeOut(300);
		}
	});
	$('.leavesToTop').click(function () {
		$('html,body').animate({
			scrollTop: '0px'
		}, 800);
	});
});

/**
 * 自动填充模态框
 * @param {DOM} obj 原始数据 
 * @param {String} parentLabel 寻至父节点
 * @param {String} targetModelId 目标模态框id
 */
function autoFillModel(obj, parentLabel = "tr", targetModelId = "exampleModal") {
	var parentDOM = $(obj).parents(parentLabel);
	var varList = $(parentDOM).find("[name]");
	var targetModel = $("#" + targetModelId);
	varList.each(function () {
		var name = $(this).attr("name");
		var value = $(this).text();
		if (checkHasName(targetModel, name)) {
			$(targetModel).find("[name=" + name + "]").val(value);
			console.log($(targetModel).find("[name=" + name + "]"));
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
 * @param {int} i 
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
