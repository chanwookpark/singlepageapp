define(function() {
	"use strict";

	var exports = {
		version: "0.1",
		json: ""
	};

	exports.load = function(){
		// 서버 없이 테스트하는 경우
		this.json = $.getJSON("https://raw.github.com/chanwookpark/singlepageapp/master/ui/server.json");

		// 서버로 기동하는 경우
		//this.json  = $.getJSON("http://localhost:3000/products");
		console.log("Change product Mmdoel(by load()): ", this.json);
		return this.json;
	}

	return exports;
});