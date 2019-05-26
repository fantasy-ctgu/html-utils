/**
 * 
 * @param {String} url 调用的删除接口
 * @param {DOM Object} obj 如果调用删除接口成功，将删除obj所在行
 */
function delDataInTable(url, obj = null) {
    if (confirm("确定删除此条信息吗?")) {
        $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            async: true,
            success: function (msg) {
                if (msg == "1") {
                    alert("删除成功");
                    if (obj) {
                        $(obj).parents("tr").remove();
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

function updData(url,obj){
	if(checkNameDOM(obj)){
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