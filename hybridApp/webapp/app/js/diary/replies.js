   //댓글 가져오기 function 모듈화
                function callReply(result){
                  var temp = replyLink.import;
                  console.log(result);
                  var source = temp.querySelector('#reply-template').text;
                        Handlebars.registerHelper('userCheck', function (rUNo) {
                            //alert(rUNo);
                            var userhtml ="<strong> <a class='updateReply'>  <span class='fa fa-pencil' aria-hidden='true'></span> </a> </strong>  <strong> <a class='removeReply'> <span class='fa fa-trash-o' aria-hidden='true'></span>  </a> </strong>";
                            if(rUNo == user.uNo){
                                return userhtml;
                            }else{
                              return '';
                            }
                      });
                      var template = Handlebars.compile(source);
                      var html = template(result);
                      console.log(html);
                      return html;
                   }


           //댓글 가져오기.
          $(document).on("tap", ".callReply", function(){
             // setTimeout('',1000*6);
             // $('collapse').dropdown(); 
              $('deletePoint').remove();
              var dNo = $(this).children('input').val();
              var thisBtn = $(this);
              //alert(dNo);
              $('updateDelete').remove();

              $.ajax({
                url: requestIP+'replies/json/getRepliesList',
                type: 'POST',
                crossDomain : true,
                dataType: 'JSON',
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({
                  dNo: dNo
                }),
                success: function(result){
                         var html = callReply(result);
                         $('#appendReply'+dNo).after(html);
                }
                });
              }
            );
          

          //[시용] 댓글달기 동적 이벤트 처리
          $(document).on("tap","#reply",function(){
              var dNo=$(this).prev('input').val();
              var rContent=$(this).parent().parent().children('#replyButton').children('#insertReply'+dNo);
              $('updateDelete').remove();
              $.ajax(requestIP+"replies/json/addReplies",{
                method: "post",
                crossDomain : true,
                dataType : "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({
                   rUNo : user.uNo,
                   dNo : dNo,
                   rContent : rContent.val()
                }),
                success: function(result){

                        $.ajax(requestIP+"replies/json/getReplyCount",{
                        method: "post",
                        crossDomain : true,
                        dataType : "json",
                        contentType: "application/json; charset=UTF-8",
                        data: JSON.stringify({
                          dNo : dNo
                        }), success: function(result){
                            //alert(result);
                            //alert($('#callReply'+dNo).text());
                            $('#callReply'+dNo).text(result.replyCount);
                            //$('replyCount[id=reply'+dNo+']').text(result.replyCount);
                            $('#reply'+dNo).children().children().children().children().children('replyCount').text(result.replyCount);
                        }
                        });

                        $.ajax({
                        url: requestIP+'replies/json/getRepliesList',
                        type: 'POST',
                        crossDomain : true,
                        dataType: 'JSON',
                        contentType: "application/json; charset=UTF-8",
                        data: JSON.stringify({
                          dNo: dNo
                        }),
                        success: function(result){
                                $('deletePoint').remove();
                                 var html = callReply(result);
                                 $('#appendReply'+dNo).after(html);
                                 rContent.val('');
                        }
                        });
                      }
                });
              });



        //[시용] 댓글삭제
        $(document).on("tap", ".removeReply", function(){
              var replySpan=$(this).parent().parent().children($('input[class="hiddenRNo"]'));
              //alert(replySpan.val());
              var diarySpan=$(this).parent().parent().children('#'+replySpan.val());
              //alert(diarySpan.val());
              //alert(replySpan.val());
              $.ajax(requestIP+"replies/json/deleteReplies",{
                method: "post",
                crossDomain : true,
                dataType : "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({
                  rNo : replySpan.val()
                }),
                success: function(result){
                  //alert(result);
                  if(result.result){
                      $.ajax(requestIP+"replies/json/getReplyCount",{
                        method: "post",
                        crossDomain : true,
                        dataType : "json",
                        contentType: "application/json; charset=UTF-8",
                        data: JSON.stringify({
                          dNo : diarySpan.val()
                        }), success: function(result){
                            //alert(diarySpan.val());
                            //alert(result.replyCount);
                            replySpan.parent().parent().parent().remove();
                            //$('#callReply'+diarySpan.val()).children('replyCount').text(result.replyCount);
                            $('#callReply'+diarySpan.val()).text(result.replyCount);
                            //$('replyCount[id=reply'+diarySpan.val()+']').text(result.replyCount);
                            $('#reply'+diarySpan.val()).children().children().children().children().children('replyCount').text(result.replyCount);
                        }
                    });
                  }
                  
                }
              });
        });



        //[시용] 댓글수정1
        $(document).on("tap", ".updateReply", function(){
                var replySpan=$(this).parent().parent().children($('input[class="hiddenRNo"]'));
                var replyNo = replySpan.val();
                var updateReply = $(this).parent().parent().next();
                var text = updateReply.text();
                //alert(replySpan.val());
                  //alert(text);
                  replySpan.parent().parent().parent().remove();
                  $('.updateReply').remove();
                  var html="<updateDelete><div class=row><div class='col-xs-10 col-sm-10 col-md-10' style='padding-right: 0px;'><input type='text' class='pull-left form-control' id='updateReply' value='"+text+"'></div><div class='col-xs-2 col-sm-2 col-md-2' style='padding-left: 0px;  padding-right: 15px;'><input type='hidden' value='"+replyNo+"'><button type='submit' class='btn btn-default updateButton' id='submit"+replyNo+"'>수정</button></div></div><br></updateDelete>"
                  $('#update'+replyNo).after(html);
                  $("#updateReply").focus();
                 });        
        
        //[시용] 댓글수정2
        $(document).on("tap", ".updateButton", function(){
                var replyNo = $(this).prev().val();
                //alert(replyNo);
                var updateContent = $(this).parent().prev().children('input').val();
                //alert(updateContent);
                $.ajax({
                  url: requestIP+"replies/json/updateReplies",
                  type: 'POST',
                  dataType: 'JSON',
                  contentType: "application/json; charset=UTF-8",
                  data: JSON.stringify({
                    rNo : replyNo,
                    rContent : updateContent
                  }),
                  success : function(result){
                      if(result.result != false){
                        var dNo = result.result.dNo;
                        $('deletePoint').remove();
                          $.ajax({
                          url: requestIP+'replies/json/getRepliesList',
                          type: 'POST',
                          crossDomain : true,
                          dataType: 'JSON',
                          contentType: "application/json; charset=UTF-8",
                          data: JSON.stringify({
                            dNo: dNo
                          }),
                          success: function(result){
                                   $('deletePoint').remove();
                                   $('updateDelete').remove();
                                   var html = callReply(result);
                                   $('#appendReply'+dNo).after(html);
                                   
                                },
                          fail: function(){
                                  alert('댓글수정에 실패했습니다.');
                              }
                          });
                      }
                  }
                })
                                
        });