// This is called with the results from from FB.getLoginStatus().
// FB.login(function(response){
// 	console.log('statusChangeCallback');
// 	console.log(response);
// 	// The response object is returned with a status field that lets the
// 	// app know the current login status of the person.
// 	// Full docs on the response object can be found in the documentation
// 	// for FB.getLoginStatus().
// 	if (response.status === 'connected') {
// 		// Logged into your app and Facebook.
// 		console.log('facebook Login Success');
// 		var accessToken = response.authResponse.accessToken;
// 		console.log('accessToken :' + accessToken);

// 		//var  for Graph API 
// 		var graphAPI = '/me?fields=name,email,id,picture{url}'
// 		FB.api(graphAPI, function(response) {

// 			var mailToServer = response.email;

// 			console.log('Successful login for: ' + response.name);
// 			console.log('facebookLogin User email :' + mailToServer + "$");
// 			console.log('facebookLogin User id :' + response.id + "$");
// 			console.log('facebookLogin User picture url :'
// 					+ response.picture.data.url + "$");

// 			if (mailToServer == null) {
// 				mailToServer = "noEmail@SNSLoginUser";
// 			}
// 			;

// 			var formData = {
// 				mail : mailToServer,
// 				nickname : response.name,
// 				uPic : response.picture.data.url,
// 				socialNo : response.id
// 			};
// 			var requestURL = 'http://dodam.java74.com:8080/user/json/';
// 			var responseURL = 'mainIndex.html';

// 			// Insert SNS User Logic
// 			$.ajax({
// 				url : requestURL + 'insertUser',
// 				type : 'POST',
// 				contentType : 'application/json',
// 				data : JSON.stringify(formData),
// 				dataType : 'json',
// 				success : function(responseData, status) {
// 					console('responseData.user :' + responseData.user
// 							+ ', status :' + status);
// 					var cookieUser = JSON.stringify(responseData.user);
// 					window.localStorage.setItem("userKey", cookieUser);
// 					self.location = responseURL;
// 				}
// 			});// /. Inser SNS User 							

// 		});

// 	} else if (response.status === 'not_authorized') {
// 		// The person is logged into Facebook, but not your app.
// 		// document.getElementById('status').innerHTML = 'Please log '
// 		// 		+ 'into this app.';
// 		alert('Dodam App 에서 페이스북으로 로그인해주세요.');
// 	} else {
// 		// The person is not logged into Facebook, so we're not sure if
// 		// they are logged into this app or not.
// 		// document.getElementById('status').innerHTML = 'Please log '
// 		// 		+ 'into Facebook.';
// 		alert('Facebook에 로그인 되어있지 않습니다.');
// 	}

// });//end of FB.login()


function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		console.log('facebook Login Success');
		var accessToken = response.authResponse.accessToken;
		console.log('accessToken :' + accessToken);

		//var  for Graph API 
		var graphAPI = '/me?fields=name,email,id,picture{url}'
		FB.api(graphAPI, function(response) {

			var mailToServer = response.email;

			console.log('Successful login for: ' + response.name);
			console.log('facebookLogin User email :' + mailToServer + "$");
			console.log('facebookLogin User id :' + response.id + "$");
			console.log('facebookLogin User picture url :'
					+ response.picture.data.url + "$");

			if (mailToServer == null) {
				mailToServer = "noEmail@SNSLoginUser";
			}
			;

			var formData = {
				mail : mailToServer,
				nickname : response.name,
				uPic : response.picture.data.url,
				socialNo : response.id
			};
			var requestURL = 'http://dodam.java74.com:8080/user/json/';
			var responseURL = 'mainIndex.html';

			// Insert SNS User Logic
			$.ajax({
				url : requestURL + 'insertUser',
				type : 'POST',
				contentType : 'application/json',
				data : JSON.stringify(formData),
				dataType : 'json',
				success : function(responseData, status) {
					console('responseData.user :' + responseData.user
							+ ', status :' + status);
					var cookieUser = JSON.stringify(responseData.user);
					window.localStorage.setItem("userKey", cookieUser);
					self.location = responseURL;
				}
			});// /. Inser SNS User 							

		});

	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		// document.getElementById('status').innerHTML = 'Please log '
		// 		+ 'into this app.';
		alert('Dodam App 에서 페이스북으로 로그인해주세요.');
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		// document.getElementById('status').innerHTML = 'Please log '
		// 		+ 'into Facebook.';
		alert('Facebook에 로그인 되어있지 않습니다.');
	}
}// end of statusChangeCallback

// This function is called when someone finishes with the Login
// Button. See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId : '{1681810372061784}',
		cookie : true, // enable cookies to allow the server to access
		// the session
		xfbml : true, // parse social plugins on this page
		version : 'v2.2' // use version 2.2
	});

	// Now that we've initialized the JavaScript SDK, we call
	// FB.getLoginStatus(). This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide. They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	// your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id))
		return;
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful. See statusChangeCallback() for when this call is made.

