// -- Event Logic -- //
var ViewEventLogic = function() {
	this.init = function(model) {
		productModel.load();
		productView.render(model, function(err, out){
			$("#table_content").html(out);
		});		
	}
}
// -- Event Logic -- //