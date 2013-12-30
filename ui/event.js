define(["view", "model"], function(view, model){
	"use strict";

	var exports = {
		version: "0.1"
	};

	var templateKey = "_prd";
	var templateUrl = "https://raw.github.com/chanwookpark/singlepageapp/master/ui/template.html";

	exports.init = function() {
		var json = model.load();
		view.render(templateKey, templateUrl, json, function(err, out){
			$("#table_content").html(out);
		});		
	}

	return exports;
});