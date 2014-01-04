이번에는 첫 번째 단계에서 구현한 코드의 **'전역오염(전역변수)'**를 찾아서 개선해보도록 하겠다. 

app.html에서 선언한 변수 3개를 살펴보면 productMdoel, productView, productEvent가 전역변수로 선언되어 있다.

여기서 가장 큰 문제는 이 세 변수가 쓰임새와 관계없이 정확한 역할을 부여받지 못한채 전역변수로 선언되어 있다는 점이다. 

# Step 1 - 변수 범위 제약 (global -> function(이 표현이 맞나?) ) 
전역변수의 범위를 줄이기 위해 app.html의 코드를 fuction()으로 감싸보겠다.

    [code]
    커밋 히스토리에서 코드 확인하기 
    [code]

이 방법은 xxx 방법으로(이름 확인 필요) 변수의 범위를 fuction() 함수 범위로 줄여주는 역할을 한다. (상세 내용 보강) 

이렇게 수정하고 다시 프로그램을 돌려보면 다음과 같은 에러가 발생한다.

	[화면 덤프]

app.html에서 선언한 변수를 전역이 아닌 함수 범위로 막고 나니까 여기서 선언된 전역변수를 사용하는 코드로 인해서 에러가 난 것이다. 

문제의 코드는 다음이다!

    [code]
    var ViewEvent = function() {
        "use strict";
    
        this.init = function() {
    
            var model = productModel.load(); // 전역변수 직접 사용!! 
            productView.render(model, function(err, out){ //전역변수 직접 사용!! 
                $("#table_content").html(out);
            });		
        }
    }
    [code]

# Step 2 - 파라미터화
이 문제를 해결하기 위해 app.html에 선언한 변수를 직접 가져다 사용하는 것이 아니라 필요할 때 '파라미터'로 받아서 처리하도록 코드를 개선하자

    [code]
    var ViewEvent = function() {
        "use strict";
    
        this.init = function(productModel, productView) { **// 파라미터로 변경**
            var model = productModel.load();
            productView.render(model, function(err, out){
                $("#table_content").html(out);
            });		
        }
    }
    [code]

app.html에서 생성했던 Model, View, Event 객체는 이제 전역이 아니다! 
event -> 전역변수 참조 2건 제거 

# Step3. 클래스도 전역범위에서 제거 
이제 스크립트 태그로 선언해 전역적으로 사용하는 JS 클래스에 대해서는 전역이 아니라 범위를 가지고 사용할 수 있도록 리팩토링해보자.

    [code]
        전역: 
        <script src="model.js"></script>
        var productModel = new ProductModel();
    [code]

이 코드는 두 가지 개선 사항이 있는데 

* script 태그로 로딩된 model.js에 선언된 변수는 전역변수로 취급되어 등록된다. 여기서 ProductModel도 전역적으로 사용할 수 있는 클래스(=변수) (맞나?!)가 된다. 
* script 태그 로 선언된 파일이 '동기' 방식으로 로딩되어 페이지의 렌더링 속도를 저하하는 원인이 된다. 

우선 첫 번째 문제를 개선하고자 모듈 파일을 script 태그가 아닌 특정한 범위를 가지고 로딩될 수 있도록 해보자. 

Model을 반환하는 함수를 정의하고 해당 함수 범위로 클래스 선언의 범위도 줄이도록 하겠다. 

    [code]
    //
    var productModel = require('ProductModel');
    //
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
            }
        };
    
        return new ModuleMap[moduleName]();
    }
    [code]

우선 첫 번째 ProductModel을 매핑하는 일종의 맵 변수를 정의하고 이 객체를 반환하는 함수(require())를 지원하도록 수정했다. 

ProductEvent 역시 동일한 방식으로 리팩토링 하도록 하자.
    [code]
    ProductEvent도 ModuleMap에 추가한 샘플 코드 
    [code]

# Step4. 모듈 타입에 맞춰 모듈 파일 생성하고 의존성 맺어주기
이렇게 함으로써 앞서 제기한 두 개의 문제를 해결하게 됐다.
각 타입은 이제 완벽히 전역 범위에서 제거 됐다. 

하지만 반대로 문제가 생겼다.
직접만든 ModuleMap으로 Mdoel과 Event 타입의 클래스가 들어가는 바람에 모듈 유형 구분이 어려워진 것이다.

모듈을 위한 코드가 하나의 파일, 하나의 변수로 섞여 버린 것이다.

이 문제를 해결하기 위해서 이제 자체 만든 모듈 관리 기능이 아닌 의존성을 정의하고, 관계를 맺어주기 위한 목적으로 특화된 require.js를 사용해보도록 하자.

require.js를 도입해서 

- 타입이 한 파일로 몰린 문제를 해결
- 논리적인 모듈 단위로 물리적인 모듈 파일을 다시 구분할 수 있도록 함 
- (논리/물리) 모듈 간의 의존성을 정의하고, 이에 따라 실행 및 객체간의 관계가 정의된다. 

하나씩 require.js를 사용해 리팩터링 해보도록 하자.

model을 일단 해보자. 

    [code]
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
    [code]

모듈을 정의할 때는 define() 함수를 사용한다.

이제 Model은 함수 범위로 축소되었으며 필요시에는 model.js 파일에서 정의도니 함수에서 리턴하는 exports 변수의 프로퍼티/함수에 접근해 사용하도록 한다. 

이번에는 view를 개선해보도록 하자. 

    [code]
    define(function(){
        "use strict";
        
        var exports = {
            version: "0.1"
        };
    
        //TODO Model을 Observe한다는 것을 목표로 하지만, 아직은 구현 못함
        exports.render = function(templateKey, templateUrl, json, renderingCallback){
            $.get(templateUrl, function( template ) {
                console.log(">> load template html: ", template);
    
                // Compile 
                var compiled = dust.compile(template, templateKey);
                console.log(">> compiled: ", compiled);
    
                // Load
                dust.loadSource(compiled);
    
                // Rendering
                console.log(">> JSON: " , json.responseText);
                dust.render(templateKey, JSON.parse(json.responseText) , function(err, out){
                    console.log(">> final(success): ", out);
                    console.log(">> final(err): ", err);
                        
                    renderingCallback(err, out);
                });
            });
        };
    
        return exports;
    });
    
    [code]

templateUrl과 key 또한 파라미터도 받도록 수정하였다. 

이번에는 event.js를 리팩터링 해보자.

    [code]
    define(["view", "model"], function(view, model){
        "use strict";
    
        var exports = {
            version: "0.1"
        };
    
        var templateKey = "_prd";
        var templateUrl = "https://raw.github.com/chanwookpark/singlepageapp/master/ui/template.html";
    
        exports.init = function() {
            var json = model.load();
            view.render(templateKey, templateUrl, json, function(err, out){
                $("#table_content").html(out);
            });		
        }
    
        return exports;
    });
    [code]

여기가 중요하다.
우선 event에서 사용하는 모듈인 view와 model을 define()으로 모듈함수 정의 시에 첫 번째 인자로 정의하였다. 이렇게 하면 event 모듈 로딩 시 view와 model에 대한 의존성 정보를 읽어 모듈을 함께 로딩하도록 되어 있다. 

그 인자로 model, view를 받도록 수정했다. 이렇게 하면서 더욱 더 의존성이 명확해졌다. 

이렇게 수정하면서 app.html에서도 script 태그로 모듈 파일을 로딩하는 코드는 없어지고 

    [code]
    완전 없음 
    [code]

이제는 메인이 되는 함수를 올리는 require()를 선언한 파일을 require.js 로딩 문과 함께 선언한다.

    [code]
    <script type="text/javascript" data-main="app" src="lib/require.js"></script>
    [code]

data-main에 정의한 'app'은 이 html 파일이 있는 경로에 .js를 붙인 파일이며(이 내용은 상세화 하자..) require.js 라이브러리 로딩이 끝나면 자동 실행된다. 

이 파일에 정의한 함수를 이벤트의 시작점으로 보면 된다. 

이제 전체 모듈을 사용하는 시작점이 되는 app.js 파일을 살펴보자. 

    [code]
    require(["event"], function(event) {
        "use strict";
    
        // 아래 코드는 DOM -> Event 호출 로직..
        // Event 매핑 (암묵적으로 onLoad() 이벤트가 걸린 것)  => DOM - Event 바인딩 (나중에 코드 정리.. )
        event.init();
    }, function(err){
        console.log(err);
    });
    [code]

require() 에서도 첫 번째 인자로 의존성이 있는 모듈명을 적는다.

이제 app. js에서는 이벤트를 수행(결국에는 '등록'하는 방식을 원함)하는 코드만 남게 된다. 

# Step5. 의존성 검토
이제 첫 번째 단계(v1)에서 그렸던 event->model, event->view 관계가 실제 코드로 제대로 표현이 됐다. 이전 단계에서는 그림과 다르게 app.html -> model, view 였었다. 

[계속..]
