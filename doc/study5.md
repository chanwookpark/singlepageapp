3개의 책임

- rendering
- updating view
- binding behavior to HTML

저장의 2개 질문(=나도 100% 질문)

- 이벤트 핸들러를 HTML에 어떻게 binding/unbinding 할 것니야?
- 데이터를 갱신하는 단위(granularity)는? 

이 수준의 정의는 view 레이어를 얼마나 복잡하게 구현할 것인가에 따라 결정 
중요 구분 기준은 다음!

- Low end interactivity vs. high end interactivity
- Close to server vs. close to client
- Markup-driven views vs. Model-backed views
- View-granular vs. element-granular vs. string-granular updates
- CSS-based vs. framework-generated event bindings

# Low-end interactivity(ex. github) vs high-end interactivity (ex.gmail)

- 페이지가 static이냐 dynamic이냐
- 데이터가 서버에서 생성해 표현하는 위주냐 화면에서 사용자와의 interaction을 통해 표현하는 위주냐
- 페이지 전체를 갱신하냐 데이터를 변경하고 반드시 페이지를 리프레시하지 않고 뷰를 변경하냐 
- 어차피 페이지가 갱신되기에 HTML에 상태와 데이터를 저장할것이냐 하나의 데이터 변경이 멀티 뷰를 변경할 수 있기에 HTML에 저장하지 않는다.(그럼 어디에?!)
- (HTML에 상태를 저장하기에) UI 간의 인터랙션이 많이 없거나  많거나 
- 복잡한 인터랙션이 필요해지면 서버에서 처리하거나 원래 클라이언트에서 복잡한 인터랙션을 하니까 서버로 안 넘기거나 

# Close to server vs. close to client

http://singlepageappbook.com/assets/view-approaches.png

## PJAX vs. Widgets

- 서버에서 페이지를 대부분 생성 vs 스크립트로 클라이언트에서 대부분 생성 

# Markup-driven views vs Model-backed views
애플리케이션에서 이해하고자 하는 것이 마크업이냐? 코드냐? 

	[  Data in JS models    ]  [    Data in JS models         ]
	[  Model-backed views   ]  [    Markup accesses models    ]

위 그림이 무슨 의미인지 잘 이해가 안감.. 

## Model-backed views

- 모델이 시작하는 지점 
- 모델을 생성하고 뷰에 바인딩하거나 전달 
- 그리고 나서 뷰가 자신을 DOM으로 attach하고 모델을 템플릿으로 전달해 콘텐츠를 렌더링함 

	var model = new Todo({ title: 'foo', done: false }),
    view = new TodoView(model);
    
지금 구현해 놓은 방식이네.. 
model->view로 전달되는 관계네

## Markup-driven views

- 뷰와 모델의 관계가 모델-백엔드 뷰와 반대 
- 뷰 대부분이 마크업 작성으로 선언된다.. 

	{{view TodoView}}
		{{=window.model.title}}
	{{/view}}
	
(위 코드가 살짝 이해가 안가네..) 
이 방식은 템플릿 시스템으로 뷰를 만들고 프레임워크에서 제공하는 매카니즘으로 뷰가 변수에 접근하는 방식. 
간단한 경우에는 직접 뷰 인스턴스에 접근하지 않고, 대신 직접 뷰가 글로벌 스콥의 변수를 참조한다. 
'이름'으로 뷰가 컨트롤러나 변수/모델에 접근할 수 있다. 

# Two tracks! (완전히 두 접근방법이 다르다는 뜻)
마크업이 기본이 된다면.. 

- 기능을 구현하는데 필요로한 메타데이터를 생성하기 위해서 꽤 복잡한 템플릿 시스템을 사용할 필요가 있다
- 뷰를 보여주고 데이터가 갱신됐는지 확인하기 위해서 백그라운드에서 여전히 템플릿 언어를 뷰 객체로 변환해야 한다

코드가 기본이 된다면.. 

- 전체적인 구현의 단순함을 넘어서는 더 장황한 것을 받아들여야 한다. 

## View behavior: in view object vs. in controller?
모델 백엔드 뷰 방식은 '뷰'를 재사용 가능한 컴포넌트로 생각하려고 하는 경향이 있다. 
전통적인 MVC는 "skinny controller, fat model"를 제안. 로직을 모델에 넣지.. 

뷰에 코드를 작성하지 말라는 것이 나쁜 일인가? 아니다 ! 
뷰는 단순히 생성된 HTML 문자열이 아니니까! 

아래부터는 아직 정리안한 내용.. 

## Observables vs. event emitters
## Specifying bindings using DOM vs. having framework-generated element ID's
## What update granularity should be supported? View-granular, element-granular and string-granular
### View-granular frameworks - View-granular updates
### Element-granular frameworks - Element-granular updates
### String-granular frameworks - String-granular updates