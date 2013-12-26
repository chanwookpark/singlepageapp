
function require(moduleName){

	var ModuleMap = {
		ProductModel: function() {
			"use strict";
			this.json;

			this.load = function(){
				// 서버 없이 테스트하는 경우
				this.json = $.getJSON("https://raw.github.com/chanwookpark/singlepageapp/master/ui/server.json");

				// 서버로 기동하는 경우
				//this.json  = $.getJSON("http://localhost:3000/products");
				console.log("Change product Mmdoel(by load()): ", this.json);
				return this;
			}
		}, 
		ProductEvent: function() {
			"use strict";

			this.init = function(productModel, productView) {
				var model = productModel.load();
				productView.render(model, function(err, out){
					$("#table_content").html(out);
				});		
			}
		}
	};

	return new ModuleMap[moduleName]();
}
