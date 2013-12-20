// -- Event Logic -- //
var ViewEventLogic = function() {
	this.init = function() {
		productView.render(productModel.load(), function(err, out){
			$("#table_content").html(out);
		});		
	}
}
// -- Event Logic -- //