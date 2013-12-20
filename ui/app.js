// -- Model -- //
var ProductModel = function() {
	this.json;

	this.get = function(){
		this.json = $.getJSON("https://raw.github.com/chanwookpark/singlepageapp/master/ui/product-model.json");
		console.log("Product Mdoel(GET): ", this.json);
	};
};
// -- Model -- //

// -- Event Logic -- //
var ViewEventLogic = function() {
	this.init = function(model) {
		productModel.get();
		productView.render(model, function(err, out){
			$("#table_content").html(out);
		});
	}
}
// -- Event Logic -- //