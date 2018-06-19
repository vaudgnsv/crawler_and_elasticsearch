$(document).ready(function(){
$("#button1").click(function(){
	var value=$("#keyWord").val(); // 입력된 키워드
	var result=document.getElementById('ajaxvalue'); // 출력할 값
	

	jQuery.ajaxSettings.traditional=true; 
	var target=document.getElementById("keyField");
	var jsondata;
	var option=target.options[target.selectedIndex].value; // 검색 조건
	
	if(option=="all"){ // 검색 조건이 '제목+이름'
	jsondata={
		"query":{
			"bool":{
				"should":[
					{"match":{"title":value}},{"match":{"nickname":value}}
				]
			}
		}
	};
	}
	else if(option=="title"){ // 검색 조건이 제목
	
	console.log("option:"+option+" value:"+value);
	jsondata={
		"query":{
			"match":{
				"title":value
			}
		}
	};
	}
	else{ // 검색 조건이 이름
	jsondata={
		"query":{
			"match":{
				"nickname":value
			}
		}
	};
	}
	
	
	jsondata=JSON.stringify(jsondata);
					
	
	
	$.ajax({ // ajax통신으로 HTTP 프로토콜 통신

		type:"POST",
		url:"http://localhost:9200/korean/board/_search?pretty",
		data:jsondata,
					
		dataType:"json",
		error:function(request,status,error){
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error"+error);
		},
		success:function(data){
			console.log(data);
			var list=data.hits.hits; // 검색된 Document list
			
			var listLen=list.length;
			var contentStr="";
			for(var i=0;i<listLen;i++){
				contentStr+="이름:"+list[i]._source.nickname+"\n</br>제목:"+list[i]._source.title+"\n</br>내용:"+list[i]._source.content+"\n</br>시간:"+list[i]._source.date+"\n</br></br>";
			}
			result.innerHTML=contentStr; // 검색결과 화면에 뿌려줌
			console.log(contentStr);
			
		}
	});	
	
});
});
