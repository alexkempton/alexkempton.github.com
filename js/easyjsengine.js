var eje = {};

eje.links = {};
eje.links.clicked = function(linkname){
	$.getJSON("articles/articlelist.json", function(json) {
	$("#article").load("articles/" + json.articles[linkname].link);
	$("header h1").text(json.articles[linkname].linkname);
	window.location.hash=linkname;
	 });
}

eje.links.addEventHandlers = function(){
	$("nav a").click(function(event){
	         event.preventDefault();
			$("nav a").each(function(){
				$(this).removeClass("active");
				});
	 		$(this).addClass("active");
			eje.links.clicked(this.id);
	});
}

eje.links.load = function(){
	$.getJSON("articles/articlelist.json", function(json) {
		var articles = json.articles;
			for(x in articles){
				if(articles[x].category==="about"){
					y = articles[x].linkname;
					$("#about").append("<a href='click' id=" + x + ">" + y + "</a><br>");
				}
				else if(articles[x].category==="blog"){
					y = articles[x].linkname;
					$("#blog").append("<a href='click' id=" + x + ">" + y + "</a><br>");
				}
			}
			
			
			
			eje.links.addEventHandlers();
			eje.handleHistory();
	 });
}

eje.handleHistory = function(){
	if(window.location.hash!=""){
		
		var locationstring = window.location.hash.split("#");
		console.log(locationstring[1]);
		$("#" + locationstring[1]).addClass("active");
		eje.links.clicked(locationstring[1]);
		
	}
	
	// No history - set to frontpage
	else{window.location.hash="#frontpage";
		$("#frontpage").addClass("active");
		eje.links.clicked("frontpage");
		
	}
}




$(document).ready(function() {
	$.ajaxSetup ({ cache: false});  // or else the articles won't update
	
	eje.links.load();
	
	
});



