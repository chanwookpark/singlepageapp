// -- Event -- //
var ViewEvent = function() {
	this.init = function() {
		var model = productModel.load();
		productView.render(model, function(err, out){
			$("#table_content").html(out);
		});		
	}
}
// -- Event -- //