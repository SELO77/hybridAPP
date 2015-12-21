//This is for Calender. it have some function for calculating something we need.

function getDiaryListForCalender( todayDay, todayMonth ){
	console.log('In calendarBySELO function getDiaryListForCalender');

	
	var todayDate =  calTodayDate( todayDay, todayMonth );
	var requestData = {
				uNo: user.uNo,
				dDate: todayDate
			}

	$.ajax({
	url: requestURL+'getDiaryListForCalender',
	type: 'POST',
	contentType: 'application/json',			
	dataType: 'json',
	data: JSON.stringify(requestData),
	success: function(responseData, status){
		console.log('status :'+status);
		if ( status == 'success' ) {
			console.log('Ajax Success');
			console.log('list.length :'+responseData.list.length);

			for (var i = 0; i < responseData.list.length; i++) {

				if ($('.calendar-day-'+responseData.list[i].dDate).children().children().length < 1) {
					$('.calendar-day-'+responseData.list[i].dDate).children().after('<div class="day-contents"><span class="fa fa-star"></span></div>');
					};						
				};

			};
		}// /.success
	});// /ajax

}// /function

//Server에 요청하는 Date형식( ex. 2015-12-18 ) 구하는 함수 
function calTodayDate( todayDay, todayMonth ) {

	console.log('==calTodayDate() In calendarBySELO ');
	var todayDate;
	var tempMonth;


	var monthSplited =  todayMonth.split(" ");
	console.log('todayMonth.split(" ") result :'+monthSplited);		

	if ( monthSplited[0] == "December") {
		tempMonth = 12;
	} else if ( monthSplited[1] == "January") {
		tempMonth = 1;
	} else if ( monthSplited[0] == "February") {
		tempMonth = 2;
	} else if ( monthSplited[0] == "March") {
		tempMonth = 3;
	} else if ( monthSplited[0] == "April") {
		tempMonth = 4;
	} else if ( monthSplited[0] == "May") {
		tempMonth = 5;
	} else if ( monthSplited[0] == "June") {
		tempMonth = 6;
	} else if ( monthSplited[0] == "July") {
		tempMonth = 7;
	} else if ( monthSplited[0] == "August") {
		tempMonth = 8;
	} else if ( monthSplited[0] == "September") {
		tempMonth = 9;
	} else if ( monthSplited[0] == "October") {
		tempMonth = 10;
	} else if ( monthSplited[0] == "November") {
		tempMonth = 11;
	} 

	todayDate = monthSplited[1] + '-'+ tempMonth + '-' + todayDay;
	console.log('todayDate :'+todayDate);	
	console.log('==calTodayDate() End ');
	
	return todayDate;
}// end of function

$(function() {

	//day Click Events
	// 특정 날짜의 다이어리를 얻기 위해서 필요한 인자 : uNo, dDate
	 $('.day').on('click', function(event) {				
	 	console.log('==.day.click function() start');
		console.log( 'which day clicked? '+$(this).text() );				
		arrayDate[0] = $(this).text();
		console.log(' arrayDate Value on Click :'+arrayDate);
		var clickDate = calTodayDate(arrayDate[0], arrayDate[1]);

		var requestData = {
			uNo: user.uNo,
			dDate: clickDate
		}
		console.log('Ajax RequestURL to Server:'+requestURL+'getDailyDiaryList');
		$.ajax({
			url: requestURL+'getDailyDiaryList',
			type: 'POST',
			contentType : 'application/json',
			dataType: 'json',
			data: JSON.stringify(requestData),
			success : function(responseData){
				//DailyDiary 서버에서 받아서 뿌리
				console.log(' responseData.list.length :'+responseData.list.length);
				if (responseData.list.length > 0) {
					console.log('DiaryList is not null');

				} else{
					console.log('DiaryList is null');
					
				}				

			}
		});// /.ajax

	});// /on
	
});// /oN Load




