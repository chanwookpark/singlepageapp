//-- View --//
var View = function(templateKey, templateUrl) {
	var templateKey = templateKey;
	var templateUrl = templateUrl;

	//Model을 Observe한다는 것을 목표로 하지만, 아직은 구현 못함. how? 
	this.render = function(model, renderingCallback){
		$.get(templateUrl, function( template ) {
	  		console.log("load template html: ", template);

			// Compile 
			var compiled = dust.compile(template, templateKey);
			console.log("compiled: ", compiled);

			// Load
			dust.loadSource(compiled);

			// Rendering
			console.log("responseText: " , model.json.responseText);
			dust.render(templateKey, JSON.parse(model.json.responseText) , function(err, out){
				console.log("final(success): ", out);
				console.log("final(err): ", err);
					
				renderingCallback(err, out);
			});
		});
	};
};
//-- View --//