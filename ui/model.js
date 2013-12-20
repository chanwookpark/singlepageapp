// -- Model -- //
var ProductModel = function() {
	this.json;

	this.load = function(){
		this.json = $.getJSON("https://raw.github.com/chanwookpark/singlepageapp/master/ui/server.json");
		console.log("Product Mdoel(GET): ", this.json);
		return this;
	};
};
// -- Model -- //