// -- Event -- //
var ViewEvent = function() {
	"use strict";

	this.init = function(productModel, productView) {
		var model = productModel.load();
		productView.render(model, function(err, out){
			$("#table_content").html(out);
		});		
	}
}
// -- Event -- //