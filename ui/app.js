// -- Model -- //
var ProductModel = function() {
	this.get = function(){
		var modelJson = 
			$.getJSON("https://raw.github.com/chanwookpark/singlepageapp/master/ui/product-model.json");
		
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
		productView.render(model, function(err, out){
			$("#table_content").html(out);
		});
	}
}
// -- Event Logic -- //