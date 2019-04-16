/**
 * 
 * @param {String} url 调用的删除接口
 * @param {DOM Object} obj 如果调用删除接口成功，将删除obj所在行
 */
function delDataInTable(url, obj = null) {
    if (confirm("确定删除此条信息吗?")) {
        $.ajax({
            url: url,
            method: "get",
            dataType: "json",
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
            error: function (params) {
                alert("系统错误");
            }
        });
    }
}

function updData(url,obj){
	if(checkNameDOM(obj)){
		$.ajax({
			url: url,
			method: "post",
			dataType: "json",
			data: getDataToJson(obj),
			success: function (msg) {
				if (msg == "1") {
					alert("修改成功");
				} else {
					alert("修改失败");
				}
			},
			error: function (params) {
				alert("系统错误");
			}
		});
	}
}