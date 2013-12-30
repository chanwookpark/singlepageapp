require(["event"], function(event) {
	"use strict";

	// 아래 코드는 DOM -> Event 호출 로직..
	// Event 매핑 (암묵적으로 onLoad() 이벤트가 걸린 것)  => DOM - Event 바인딩 (나중에 코드 정리.. )
	event.init();
}, function(err){
	console.log(err);
});