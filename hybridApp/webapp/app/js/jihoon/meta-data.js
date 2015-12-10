function getMetaData(param){

	var data;

	var requestIP="http://192.168.1.2:8080/";
	var friendURL = requestIP+"friend/json/";
	var user = JSON.parse(window.localStorage.getItem("userKey"));

	
	//입력 값으로 return data 지정 
	if(param=="ip"){
		data = requestIP;
	}else if(param=="user"){
		data = user;
	}else if(param=="friendURL"){
		data = friendURL;
	
	/*}else if(param==""){*/
	}else{
		data = null;
	}

	return data;
};





