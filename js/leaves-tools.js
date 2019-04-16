$(function(){	
	$(window).scroll(function() {		
		if($(window).scrollTop() >= 100){
			$('.leavesToTop').fadeIn(300); 
		}else{    
			$('.leavesToTop').fadeOut(300);    
		}  
	});
	$('.leavesToTop').click(function(){
        $('html,body').animate({scrollTop: '0px'}, 800);}
    );	
});

function autoFillModel(obj, parentLabel = "tr", targetModelId = "exampleModal") {
	var parentDOM = $(obj).parents(parentLabel);
	var varList = $(parentDOM).find("[name]");
	var targetModel = $("#" + targetModelId);
	varList.each(function() {
		var name = $(this).attr("name");
		var value = $(this).text();
		if(checkHasName(targetModel,name)){
			$(targetModel).find("[name=" + name + "]").val(value);
			console.log($(targetModel).find("[name=" + name + "]"));
		}
	});
}