// -- Model -- //
var ProductModel = function() {
	"use strict";
	this.json;

	this.load = function(){
		// 서버 없이 테스트하는 경우
		//this.json = $.getJSON("https://raw.github.com/chanwookpark/singlepageapp/master/ui/server.json");

		// 서버로 기동하는 경우
		this.json  = $.getJSON("http://localhost:3000/products");
		console.log("Change product Mmdoel(by load()): ", this.json);
		return this;
	};
};
// -- Model -- //