$(function(){
  // 下記復習のためあえて残してます
  // function buildHTML(message){
  //   // 「もしメッセージに画像が含まれていたら」という条件式
  //   if (message.image) {
  //     image = `<img class="lower-message__image" src="${message.image}"></img>`
      
  //   } else {
  //     image = ''
  //   }
  //   var html = `
  //     <div class="message">
  //     <div class="message__upper">
  //     <div class="message__upper--talker">
  //     ${message.user_name}
  //     </div>
  //     <div class="message__upper__date">
  //     ${message.created_at}
  //     </div>
  //     </div>
  //     <div class="message__text">
  //     <p class="lower-message__content">
  //     ${message.content}
  //     </p>
  //     ${image}
  //     </div>
  //     </div>
  //     `
  //   return html;
  // }
  var buildHTML = function(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `
      <div class="message" data-message_id="${message.id}">
        <div class="message__upper">
          <div class="message__upper--talker">
            ${message.user_name}
          </div>
          <div class="message__upper__date">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
         <p class="lower-message__content">
         ${message.content}
         </p>
         ${image}
        </div>
      </div>
      `
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main').append(html)
      $('.chat-main').animate({ scrollTop: $('.chat-main')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data("message_id"); 
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
        $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight});
      });
      $('.chat-main').append(insertHTML);
    })
    .fail(function() {
      console.log('error');
    });
  };
  };
  setInterval(reloadMessages, 7000);
});