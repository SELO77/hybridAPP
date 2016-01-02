//다이어리 호출 함수
var imgSrc = "http://192.168.0.3:8080/thumbnail_upload/diary/";

function loadDiary(args) {

	$
			.ajax(
					requestURL + args,
					{
						method : "post",
						crossDomain : true,
						dataType : "json",
						contentType : "application/json; charset=UTF-8",
						data : JSON.stringify({
							uNo : user.uNo
						}),
						success : function(result) {
							// alert("Ajax success");
							var temp = diaryLink.import;
							console.log(result);
							var source = temp.querySelector('#entry-template').text;
							Handlebars
									.registerHelper(
											'userCheck',
											function(uNo, dNo) {
												// alert(rUNo);
												var userhtml = "<div class='dropdown pull-right' style='padding-right:5px;padding-top: 7px;float:right'><img src='img/btn_update.png' style='width:20px; height:20px;' data-toggle='dropdown'><!--<i class='fa fa-cog' data-toggle='dropdown'/>--><div class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='padding-top: 0px;padding-bottom: 0px;'><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><updateDiary style='height:transparent'><button type='button' class='btn btn-default'  style='width:100%'><a>수정</a></button></updateDiary></p><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><deleteDiary style='height:transparent'><button type='button' class='btn btn-default' style='width:100%'><a>삭제</a></button></deleteDiary></p></div></div>";
																							
												if (uNo == user.uNo) {
													return userhtml;
												} else {
													return '';
												}

											});

							// [SELO77] dContent에서 Tag효과 주는 로직 추가.
							Handlebars
									.registerHelper(
											'dContentForTag',
											function(dContent) {
												console
														.log('== dContent Parsing for HashTag == dContent:'
																+ dContent);

												var startTagIndex = dContent
														.indexOf("#");
												var temp = dContent
														.slice(startTagIndex);
												var endTagIndex = temp
														.indexOf(" ");

												var hashTags = temp.slice(0,
														endTagIndex);
												console.log('hashTags :'
														+ hashTags);

												var hashTagList = hashTags
														.split("#");
												hashTagList.splice(0, 1);

												for (i in hashTagList) {
													var temp = '<strong style="color:#125688" class="hashTag">#'
															+ hashTagList[i]
															+ '</strong>';
													hashTagList[i] = temp;
												}

												return dContent.replace(
														hashTags, hashTagList
																.toString()
																.replace(/,/gi,
																		""));
											}); // /Handlebars.registerHelper('dContentForTag'

							Handlebars
									.registerHelper(
											'likeCheck',
											function(likeList) {
												// alert(rUNo);
												var likehtml = "<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>";

												for (var i = 0; i < likeList.length; i++) {
													if (likeList[i].uNo == user.uNo
															&& likeList[i].lState == 1) {
														likehtml = "<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>";
													}
												}
												return likehtml;
											});
							Handlebars
									.registerHelper(
											'sharePicCheck',
											function(dPics) {
												// alert(rUNo);
												var returnImg = '';
												if (dPics.length == 0
														|| dPics[0].trim() == '') {
													return returnImg;
												} else {
													for (var i = 0; i < dPics.length; i++) {
														if (i != dPics.length - 1) {
															returnImg += imgSrc
																	+ dPics[i]
																	+ ',';
														} else {
															returnImg += imgSrc
																	+ dPics[i];
														}
													}
													return returnImg;
												}
											});

							Handlebars
									.registerHelper(
											'picCheck',
											function(dPics) {
												// alert(rUNo);
												var returnHtml = ' ';
												if (dPics.length == 0
														|| dPics[0].trim() == '') {
													return returnHtml;
												}
												if (dPics.length == 1) {
													returnHtml = '<img class="img" src="'
															+ imgSrc
															+ dPics[0]
															+ '" style="width: 100%; height:auto; margin: 0">';
													return returnHtml;
												} else {
													if (dPics.length % 2 == 0) {

														for (var i = 0; i < dPics.length; i++) {
															returnHtml += '<img class="img" src="'
																	+ imgSrc
																	+ dPics[i]
																	+ '" style="width: 50%; height:auto; padding: 3px; ">';
														}

													} else {
														returnHtml += '<img class="img" src="'
																+ imgSrc
																+ dPics[0]
																+ '" style="width: 100%; height:auto;">';

														for (var i = 1; i < dPics.length; i++) {
															returnHtml += '<img class="img" src="'
																	+ imgSrc
																	+ dPics[i]
																	+ '" style="width: 50%; height:auto; padding: 3px">';
														}
													}
													return returnHtml;
												}
											});
							var template = Handlebars.compile(source);
							var html = template(result);
							// $('#diaryHandle').append(html);
							$('#diaryHandle').after(html);
							// }
						}
					});
}

//[시용]diaryList에서 userdiary 보기
$(document).on("click", "#getDiary", function(){
	var dNo = $(this).prev().val();
	window.localStorage.setItem('frDiaryKey', dNo);
	$(window.parent.frames["innerframe"].document.location).attr("href", "friendDiary.html");
})

//[시용]friend Diary
function friendDiary(args) {
	
	$
			.ajax(
					requestURL + 'getUserDiaryList',
					{
						method : "post",
						crossDomain : true,
						dataType : "json",
						contentType : "application/json; charset=UTF-8",
						data : JSON.stringify({
							uNo : args
						}),
						success : function(result) {
							// alert("Ajax success");
							var temp = diaryLink.import;
							console.log(result);
							var source = temp.querySelector('#entry-template').text;
							Handlebars
									.registerHelper(
											'userCheck',
											function(uNo, dNo) {
												// alert(rUNo);
												var userhtml = "<div class='dropdown pull-right' style='padding-right:5px;padding-top: 7px;float:right'><img src='img/btn_update.png' style='width:20px; height:20px;' data-toggle='dropdown'><!--<i class='fa fa-cog' data-toggle='dropdown'/>--><div class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='padding-top: 0px;padding-bottom: 0px;'><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><updateDiary style='height:transparent'><button type='button' class='btn btn-default'  style='width:100%'><a>수정</a></button></updateDiary></p><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><deleteDiary style='height:transparent'><button type='button' class='btn btn-default' style='width:100%'><a>삭제</a></button></deleteDiary></p></div></div>";

												if (uNo == user.uNo) {
													return userhtml;
												} else {
													return '';
												}

											});

							// [SELO77] dContent에서 Tag효과 주는 로직 추가.
							Handlebars
									.registerHelper(
											'dContentForTag',
											function(dContent) {
												console
														.log('== dContent Parsing for HashTag == dContent:'
																+ dContent);

												var startTagIndex = dContent
														.indexOf("#");
												var temp = dContent
														.slice(startTagIndex);
												var endTagIndex = temp
														.indexOf(" ");

												var hashTags = temp.slice(0,
														endTagIndex);
												console.log('hashTags :'
														+ hashTags);

												var hashTagList = hashTags
														.split("#");
												hashTagList.splice(0, 1);

												for (i in hashTagList) {
													var temp = '<strong style="color:#125688" class="hashTag">#'
															+ hashTagList[i]
															+ '</strong>';
													hashTagList[i] = temp;
												}

												return dContent.replace(
														hashTags, hashTagList
																.toString()
																.replace(/,/gi,
																		""));
											}); // /Handlebars.registerHelper('dContentForTag'

							Handlebars
									.registerHelper(
											'likeCheck',
											function(likeList) {
												// alert(rUNo);
												var likehtml = "<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>";

												for (var i = 0; i < likeList.length; i++) {
													if (likeList[i].uNo == user.uNo
															&& likeList[i].lState == 1) {
														likehtml = "<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>";
													}
												}
												return likehtml;
											});
							Handlebars
									.registerHelper(
											'sharePicCheck',
											function(dPics) {
												// alert(rUNo);
												var returnImg = '';
												if (dPics.length == 0
														|| dPics[0].trim() == '') {
													return returnImg;
												} else {
													for (var i = 0; i < dPics.length; i++) {
														if (i != dPics.length - 1) {
															returnImg += imgSrc
																	+ dPics[i]
																	+ ',';
														} else {
															returnImg += imgSrc
																	+ dPics[i];
														}
													}
													return returnImg;
												}
											});

							Handlebars
									.registerHelper(
											'picCheck',
											function(dPics) {
												// alert(rUNo);
												var returnHtml = ' ';
												if (dPics.length == 0
														|| dPics[0].trim() == '') {
													return returnHtml;
												}
												if (dPics.length == 1) {
													returnHtml = '<img class="img" src="'
															+ imgSrc
															+ dPics[0]
															+ '" style="width: 100%; height:auto; margin: 0">';
													return returnHtml;
												} else {
													if (dPics.length % 2 == 0) {

														for (var i = 0; i < dPics.length; i++) {
															returnHtml += '<img class="img" src="'
																	+ imgSrc
																	+ dPics[i]
																	+ '" style="width: 50%; height:auto; padding: 3px; ">';
														}

													} else {
														returnHtml += '<img class="img" src="'
																+ imgSrc
																+ dPics[0]
																+ '" style="width: 100%; height:auto;">';

														for (var i = 1; i < dPics.length; i++) {
															returnHtml += '<img class="img" src="'
																	+ imgSrc
																	+ dPics[i]
																	+ '" style="width: 50%; height:auto; padding: 3px">';
														}
													}
													return returnHtml;
												}
											});
							var template = Handlebars.compile(source);
							var html = template(result);
							// $('#diaryHandle').append(html);
							$('#diaryHandle').after(html);
							// }
						}
					});
}

$(document).on(
		'tap',
		'#shareDiary',
		function() {
			var dNo = $(this).prev('input').val();
			// alert(dNo);
			$.ajax(requestURL + 'getDiary',
					{
						method : "post",
						crossDomain : true,
						dataType : "json",
						contentType : "application/json; charset=UTF-8",
						data : JSON.stringify({
							dNo : dNo
						}),
						success : function(result) {
							console.log(result.diaries);
							var diary = result.diaries[0];
							console.log('diary' + diary);
							// console.log('diary to
							// json'+JSON.parseJSON(diary));
							var resultImg = [];
							if (diary.dPics.length == 0
									|| diary.dPics[0].trim() == '') {
								returnImg = "";
							} else {
								for (var i = 0; i < diary.dPics.length; i++) {

									resultImg.push(imgSrc + diary.dPics[i]);

								}
								console.log(resultImg);

							}
							window.plugins.socialsharing.share(null,
									diary.dContent+'by.도담도담', resultImg, diary.dContent+'by.도담도담');
						}
					});
		})

/*
 * function diaryShare(){ var dNo = $(this).prev('input').val(); alert(dNo);
 * $.ajax(requestURL + 'getDiary', { method : "post", crossDomain : true,
 * dataType : "json", contentType : "application/json; charset=UTF-8", data :
 * JSON.stringify({ dNo : dNo }), success: function(result){ var diary =
 * result.diaries; var returnImg = ''; if(dPics.length == 0|| dPics[0].trim() ==
 * ''){ returnImg=''; }else{ for(var i =0; i<diary.dPics.length; i++){ if(i !=
 * dPics.length-1){ returnImg +=
 * 'http://192.168.0.3:8080/resources/thumbnail/diary/'+dPics[i]+','; }else{
 * returnImg += 'http://192.168.0.3:8080/resources/thumbnail/diary/'+dPics[i]; } } }
 * window.plugins.socialsharing.share('Message and image', diary.dContent,
 * '['+returnImg+']', null); } } ); }
 */
// 다이어리 하나만 보기
function getDiary(args) {
	// alert('여기는 loadDiary');

	// alert(temp.uNo);
	$
			.ajax(
					requestURL + 'getDiary',
					{
						method : "post",
						crossDomain : true,
						dataType : "json",
						contentType : "application/json; charset=UTF-8",
						data : JSON.stringify({
							dNo : args
						}),
						success : function(result) {
							// alert("Ajax success");
							var temp = diaryLink.import;
							console.log(result);
							var source = temp.querySelector('#entry-template').text;
							Handlebars
									.registerHelper(
											'userCheck',
											function(uNo, dNo) {
												// alert(rUNo);
												var userhtml = "<div class='dropdown pull-right' style='padding-right:5px;padding-top: 7px;float:right'><img src='img/btn_update.png' style='width:20px; height:20px;' data-toggle='dropdown'><!--<i class='fa fa-cog' data-toggle='dropdown'/>--><div class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='padding-top: 0px;padding-bottom: 0px;'><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><updateDiary style='height:transparent'><button type='button' class='btn btn-default'  style='width:100%'><a>수정</a></button></updateDiary></p><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><deleteDiary style='height:transparent'><button type='button' class='btn btn-default' style='width:100%'><a>삭제</a></button></deleteDiary></p></div></div>";

												if (uNo == user.uNo) {
													return userhtml;
												} else {
													return '';
												}
											});

							// [SELO77] dContent에서 Tag효과 주는 로직 추가.
							Handlebars
									.registerHelper(
											'dContentForTag',
											function(dContent) {
												console
														.log('== dContent Parsing for HashTag == dContent:'
																+ dContent);

												var startTagIndex = dContent
														.indexOf("#");
												var temp = dContent
														.slice(startTagIndex);
												var endTagIndex = temp
														.indexOf(" ");

												var hashTags = temp.slice(0,
														endTagIndex);
												console.log('hashTags :'
														+ hashTags);

												var hashTagList = hashTags
														.split("#");
												hashTagList.splice(0, 1);

												for (i in hashTagList) {
													var temp = '<strong style="color:#125688" class="hashTag">#'
															+ hashTagList[i]
															+ '</strong>';
													hashTagList[i] = temp;
												}

												return dContent.replace(
														hashTags, hashTagList
																.toString()
																.replace(/,/gi,
																		""));
											}); // /Handlebars.registerHelper('dContentForTag'

							Handlebars
									.registerHelper(
											'likeCheck',
											function(likeList) {
												// alert(rUNo);
												var likehtml = "<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>";

												for (var i = 0; i < likeList.length; i++) {
													if (likeList[i].uNo == user.uNo
															&& likeList[i].lState == 1) {
														likehtml = "<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>";
													}
												}
												return likehtml;
											});

							Handlebars
									.registerHelper(
											'picCheck',
											function(dPics) {
												// alert(rUNo);
												var returnHtml = ' ';
												if (dPics.length == 0
														|| dPics[0].trim() == '') {
													return returnHtml;
												}
												if (dPics.length == 1) {
													returnHtml = '<img class="img" src="'
															+ imgSrc
															+ dPics[0]
															+ '" style="width: 100%; height:auto; margin: 0">';
													return returnHtml;
												} else {
													if (dPics.length % 2 == 0) {

														for (var i = 0; i < dPics.length; i++) {
															returnHtml += '<img class="img" src="'
																	+ imgSrc
																	+ dPics[i]
																	+ '" style="width: 50%; height:auto; padding: 3px; ">';
														}

													} else {
														returnHtml += '<img class="img" src="'
																+ imgSrc
																+ dPics[0]
																+ '" style="width: 100%; height:auto;">';

														for (var i = 1; i < dPics.length; i++) {
															returnHtml += '<img class="img" src="'
																	+ imgSrc
																	+ dPics[i]
																	+ '" style="width: 50%; height:auto; padding: 3px">';
														}
													}
													return returnHtml;
												}
											});
							var template = Handlebars.compile(source);
							var html = template(result);
							// $('#diaryHandle').append(html);
							$('#diaryHandle').after(html);
							// }
						}
					});
}


// getDiaryListByTag
function getDiaryListByTag(args) {
	console.log('==getDiaryListByTag(args)== args:' + args);
	$
			.ajax(
					requestURL + 'getDiaryListByTag',
					{
						method : 'POST',
						contentType:"application/json; charset=UTF-8",
						dataType : 'json',
						data : JSON.stringify({dTag : args}),
					success : function(json, textStatus) {
						console.log('textStatus :' + textStatus);
						console.log('responseData :' + json);
						var temp = diaryLink.import;
						var source = temp.querySelector('#entry-template').text;
						Handlebars
								.registerHelper(
										'userCheck',
										function(uNo, dNo) {
											// alert(rUNo);
											var userhtml = "<div class='dropdown pull-right' style='padding-right:5px;padding-top: 7px;float:right'><img src='img/btn_update.png' style='width:20px; height:20px;' data-toggle='dropdown'><!--<i class='fa fa-cog' data-toggle='dropdown'/>--><div class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='padding-top: 0px;padding-bottom: 0px;'><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><updateDiary style='height:transparent'><button type='button' class='btn btn-default'  style='width:100%'><a>수정</a></button></updateDiary></p><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><deleteDiary style='height:transparent'><button type='button' class='btn btn-default' style='width:100%'><a>삭제</a></button></deleteDiary></p></div></div>";

											if (uNo == user.uNo) {
												return userhtml;
											} else {
												return '';
											}
										});// helper

						// [SELO77] dContent에서 Tag효과 주는 로직 추가.
						Handlebars
								.registerHelper(
										'dContentForTag',
										function(dContent) {
											console
													.log('== dContent Parsing for HashTag == dContent:'
															+ dContent);

											var startTagIndex = dContent
													.indexOf("#");
											var temp = dContent
													.slice(startTagIndex);
											var endTagIndex = temp.indexOf(" ");

											var hashTags = temp.slice(0,
													endTagIndex);
											console
													.log('hashTags :'
															+ hashTags);

											var hashTagList = hashTags
													.split("#");
											hashTagList.splice(0, 1);

											for (i in hashTagList) {
												var temp = '<strong style="color:#125688" class="hashTag">#'
														+ hashTagList[i]
														+ '</strong>';
												hashTagList[i] = temp;
											}

											return dContent
													.replace(
															hashTags,
															hashTagList
																	.toString()
																	.replace(
																			/,/gi,
																			""));
										}); // /Handlebars.registerHelper('dContentForTag'

						Handlebars
								.registerHelper(
										'likeCheck',
										function(likeList) {
											// alert(rUNo);
											var likehtml = "<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>";

											for (var i = 0; i < likeList.length; i++) {
												if (likeList[i].uNo == user.uNo
														&& likeList[i].lState == 1) {
													likehtml = "<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>";
												}
											}
											return likehtml;
										});// helper

						Handlebars
								.registerHelper(
										'picCheck',
										function(dPics) {

											var returnHtml = ' ';
											if (dPics.length == 0
													|| dPics[0].trim() == '') {
												return returnHtml;
											}
											if (dPics.length == 1) {
												returnHtml = '<img class="img" src="'
														+ imgSrc
														+ dPics[0]
														+ '" style="width: 100%; height:auto; margin: 0">';
												return returnHtml;
											} else {
												if (dPics.length % 2 == 0) {

													for (var i = 0; i < dPics.length; i++) {
														returnHtml += '<img class="img" src="'
																+ imgSrc
																+ dPics[i]
																+ '" style="width: 50%; height:auto; padding: 3px; ">';
													}

												} else {
													returnHtml += '<img class="img" src="'
															+ imgSrc
															+ dPics[0]
															+ '" style="width: 100%; height:auto;">';

													for (var i = 1; i < dPics.length; i++) {
														returnHtml += '<img class="img" src="'
																+ imgSrc
																+ dPics[i]
																+ '" style="width: 50%; height:auto; padding: 3px">';
													}
												}
												return returnHtml;
											}
										});// helper
						var template = Handlebars.compile(source);
						var html = template(json);
						$('#diaryHandle').after(html);
						}

					});// success function
}// /getDiaryListByTag


// [좋아요 누르기]
$(document)
		.on(
				"tap",
				"insertLike",
				function() {
					var likes = $(this);
					var diaryNo = $(this).prev('input');

					$
							.ajax({
								url : requestIP + "like/json/insertLike",
								method : 'POST',
								dataType : 'JSON',
								contentType : "application/json; charset=UTF-8",
								data : JSON.stringify({
									dNo : diaryNo.val(),
									uNo : user.uNo
								}),
								success : function(result) {
									if (result.result == true) {

										likes.parent().children('insertLike')
												.remove();

										$
												.ajax({
													url : requestIP
															+ "like/json/countLike",
													method : 'POST',
													dataType : 'JSON',
													contentType : "application/json; charset=UTF-8",
													data : JSON.stringify({
														dNo : diaryNo.val(),
													}),
													success : function(result) {

														$(
																'likeCount[id='
																		+ diaryNo
																				.val()
																		+ ']')
																.text(
																		result.likeCount);
														diaryNo
																.after("<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>");
													}
												});

									}
								}
							});
				});

// [좋아요취소 누르기]
$(document)
		.on(
				"tap",
				"deleteLike",
				function() {
					var likes = $(this);
					var diaryNo = $(this).prev('input');

					$
							.ajax({
								url : requestIP + "like/json/deleteLike",
								method : 'POST',
								dataType : 'JSON',
								contentType : "application/json; charset=UTF-8",
								data : JSON.stringify({
									dNo : diaryNo.val(),
									uNo : user.uNo
								}),
								success : function(result) {
									if (result.result == true) {

										likes.parent().children('deleteLike')
												.remove();

										$
												.ajax({
													url : requestIP
															+ "like/json/countLike",
													method : 'POST',
													dataType : 'JSON',
													contentType : "application/json; charset=UTF-8",
													data : JSON.stringify({
														dNo : diaryNo.val(),
													}),
													success : function(result) {

														$(
																'likeCount[id='
																		+ diaryNo
																				.val()
																		+ ']')
																.text(
																		result.likeCount);
														diaryNo
																.after("<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>");
													}
												});

									}
								}
							});
				});

// [시용]다이어리 삭제.
$(document).on("tap", "deleteDiary", function() {
	var diaryNo = $(this).prev('input');
	
		//[시용] Diary 삭제 Confirm Dialog


		var r = confirm("일기를 삭제하시겠습니까?");
		if (r == true) {
		    $.ajax({
					url : requestURL + 'deleteDiary',
					method : 'POST',
					dataType : 'JSON',
					contentType : "application/json; charset=UTF-8",
					data : JSON.stringify({
						dNo : diaryNo.val()
					}),
					success : function(result) {
						if (result.result == true) {

							$("#deleteDiary" + diaryNo.val()).fadeOut("fast");
						//window.plugins.toast.showLongBottom('일기가 삭제되었습니다.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
						window.plugins.toast.showWithOptions(
						    {
						      message: "일기가 삭제되었습니다.",
						      duration: "short",
						      position: "bottom",
						      addPixelsY: -40  
						    }   
						  );
						}
					}
				});
		} else {
		   return;
		}
	
});

// [시용]다이어리 수정
$(document).on(
		"tap",
		"updateDiary",
		function() {
			var diaryNo = $(this).prev('input');

			$('form[name=updateForm]').children('input').val(diaryNo.val());

			var test = $('form[name=updateForm]').children('input').val();

			$('form[name=updateForm]').submit();
			window.localStorage.setItem("diaryKey", test);
			$(window.parent.frames["innerframe"].document.location).attr(
					"href", "updateDiary.html");
		});

// [SELO77] HashTag를 tap시 검색 event처리

$(document).on(
		'tap',
		'.hashTag',
		function(event) {
			console.log('==Click!! on HashTag==');
			console.log($(this).text());
			var dTag = $(this).text();
			window.localStorage.setItem('dTag', dTag);
			$(window.parent.frames["innerframe"].document.location).attr(
					"href", "diaryListByTag.html");
		});
// $(document).on('tap', '.hashTag', function(event) {
// event.preventDefault();
// console.log('==Click!! on HashTag==');
// console.log($(this).text());

// $.getJSON(requestURL + 'getDiaryListByTag', {
// dTag : $(this).text()
// }, function(json, textStatus) {
// console.log('textStatus :' + textStatus);
// console.log('responseData :' + json);

// });

// });// /hashTag Click fnc

