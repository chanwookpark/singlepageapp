define(function(){
	"use strict";
	
	var exports = {
		version: "0.1"
	};

	//TODO Model을 Observe한다는 것을 목표로 하지만, 아직은 구현 못함
	exports.render = function(templateKey, templateUrl, json, renderingCallback){
		$.get(templateUrl, function( template ) {
	  		console.log(">> load template html: ", template);

			// Compile 
			var compiled = dust.compile(template, templateKey);
			console.log(">> compiled: ", compiled);

			// Load
			dust.loadSource(compiled);

			// Rendering
			console.log(">> JSON: " , json.responseText);
			dust.render(templateKey, JSON.parse(json.responseText) , function(err, out){
				console.log(">> final(success): ", out);
				console.log(">> final(err): ", err);
					
				renderingCallback(err, out);
			});
		});
	};

	return exports;
});
