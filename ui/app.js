//-- View --//
var View = function() {
	//Model을 Observe한다는 것을 목표로 하지만, 아직은 구현 못함. how? 
	this.render = function(model, templateUrl, templateKey){
		$.get( templateUrl, function( template ) {
	  		console.log("load template html: ", template);

			// Compile 
			var compiled = dust.compile(template, templateKey);
			console.log("compiled: ", compiled);

			// Load
			dust.loadSource(compiled);

			// Rendering
			console.log("responseText: " , model.responseText);
			dust.render(templateKey, JSON.parse(model.responseText) , function(err, out){
				console.log("final(success): ", out);
				console.log("final(err): ", err);
				$("#table_content").html(out);
			});
		});
	};
};
//-- View --//

// -- Model -- //
var ProductModel = function() {
	this.get = function(){
		var modelUrl = "https://raw.github.com/chanwookpark/singlepageapp/master/ui/product-model.json";
		var modelJson = $.getJSON(modelUrl);
		console.log("Model: ", modelJson);
		return modelJson;
	};
};
// -- Model -- //

// -- Event Logic -- //
var ViewEventLogic = function() {
	this.init = function() {
		//json 받아.. 
		var model = productModel.get();
		
		productView.render(model, templateUrl, templateKey);
	}
}
// -- Event Logic -- //