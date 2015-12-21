//다이어리 호출 함수
            function loadDiary(args){
              //alert('여기는 loadDiary');
             
              //alert(temp.uNo);
              $.ajax(requestURL+args,{
                method: "post",
                crossDomain : true,
                dataType : "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify({
                   uNo : user.uNo
                }),
                success: function(result){
                  //alert("Ajax success");
                  var temp = diaryLink.import;
                  console.log(result);
                  var source = temp.querySelector('#entry-template').text;
                        Handlebars.registerHelper('userCheck', function (uNo, dNo) {
                            //alert(rUNo);
                            var userhtml ="<div class='dropdown pull-right' style='padding-right: 20px;'><i class='fa fa-cog'data-toggle='dropdown'/><div class='dropdown-menu' role='menu' aria-labelledby='dLabel' style='padding-top: 0px;padding-bottom: 0px;'><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><updateDiary style='height:transparent'><button type='button' class='btn btn-default'  style='width:100%'><a>수정하기</a></button></updateDiary></p><p style='margin-bottom: 0px;'><input type='hidden' value='"+dNo+"'><deleteDiary style='height:transparent'><button type='button' class='btn btn-default' style='width:100%'><a>삭제하기</a></button></deleteDiary></p></div></div>";
                            
                            if(uNo == user.uNo){
                                return userhtml;
                            }else{
                              return '';
                            }
                      });

                        Handlebars.registerHelper('likeCheck', function (likeList) {
                            //alert(rUNo);
                            var likehtml = "<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>";
                            
                            for(var i =0; i<likeList.length; i++){
                              if(likeList[i].uNo == user.uNo && likeList[i].lState == 1){
                                likehtml = "<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>";
                              }
                            }
                            return likehtml;
                      });
                      var template = Handlebars.compile(source);
                      var html = template(result);
                      //$('#diaryHandle').append(html);
                      $('#diaryHandle').after(html);
                  //}
                }
              });
              }

              //[좋아요 누르기]
              $(document).on("click", "insertLike", function(){
                var likes = $(this);
                var diaryNo = $(this).prev('input');
                //alert(diaryNo.val());
                $.ajax({
                   url: requestIP+"like/json/insertLike",
                   method : 'POST',
                   dataType : 'JSON',
                   contentType: "application/json; charset=UTF-8",
                   data: JSON.stringify({
                       dNo : diaryNo.val(),
                       uNo : user.uNo
                    }),
                   success: function(result){
                      if(result.result == true){
                        //alert($(this).parent().children('insertLike').text);
                        likes.parent().children('insertLike').remove();
                        
                        $.ajax({
                           url: requestIP+"like/json/countLike",
                           method : 'POST',
                           dataType : 'JSON',
                           contentType: "application/json; charset=UTF-8",
                           data: JSON.stringify({
                               dNo : diaryNo.val(),
                            }),
                           success: function(result){
                              //alert(result.likeCount);
                              $('likeCount[id='+diaryNo.val()+']').text(result.likeCount);
                              diaryNo.after("<deleteLike><a><i class='fa fa-thumbs-o-up'/> 좋아요취소</a></deleteLike>");
                           }
                        });

                      }
                   }
                });
              });

              //[좋아요취소 누르기]
              $(document).on("click", "deleteLike", function(){
                var likes = $(this);
                var diaryNo = $(this).prev('input');
                //alert(diaryNo.val());
                $.ajax({
                   url: requestIP+"like/json/deleteLike",
                   method : 'POST',
                   dataType : 'JSON',
                   contentType: "application/json; charset=UTF-8",
                   data: JSON.stringify({
                       dNo : diaryNo.val(),
                       uNo : user.uNo
                    }),
                   success: function(result){
                      if(result.result == true){
                        //alert($(this).parent().children('deleteLike').text);
                        likes.parent().children('deleteLike').remove();
                        
                        $.ajax({
                           url: requestIP+"like/json/countLike",
                           method : 'POST',
                           dataType : 'JSON',
                           contentType: "application/json; charset=UTF-8",
                           data: JSON.stringify({
                               dNo : diaryNo.val(),
                            }),
                           success: function(result){
                              //alert(result.likeCount);
                              $('likeCount[id='+diaryNo.val()+']').text(result.likeCount);
                              diaryNo.after("<insertLike><a><i class='fa fa-thumbs-o-up'/> 좋아요</a></insertLike>");
                           }
                        });

                      }
                   }
                });
              });


              //[시용]다이어리 삭제.
              $(document).on("click", "deleteDiary", function(){
                  var diaryNo  = $(this).prev('input');
                  //alert(diaryNo.val());
                  $.ajax({
                    url: requestURL+'deleteDiary',
                    method: 'POST',
                    dataType: 'JSON',
                    contentType: "application/json; charset=UTF-8",
                    data: JSON.stringify({
                       dNo : diaryNo.val()
                    }),
                    success: function(result){
                        if(result.result == true){
                          //alert("삭제성공");
                          //location.reload(true);
                          //alert(diaryNo.val());
                          $("#deleteDiary"+diaryNo.val()).fadeOut("fast");
                          //setTimeout($("#deleteDiary"+diaryNo.val()).remove(),1000*2);
                        }
                    }
                    });   
                });


              //[시용]다이어리 수정
              $(document).on("click", "updateDiary", function(){
                  var diaryNo  = $(this).prev('input');
                  //console.log(diaryNo.val());
                  $('form[name=updateForm]').children('input').val(diaryNo.val());

                  var test = $('form[name=updateForm]').children('input').val();
                  //alert(test);

                  $('form[name=updateForm]').submit();
                  window.localStorage.setItem("diaryKey", test);
                  $(window.parent.frames["innerframe"].document.location).attr("href","updateDiary.html");
                });