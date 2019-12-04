$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `
      <div class="message">
      <div class="message__upper">
      <div class="message__upper--talker">
      ${message.user_name}
      </div>
      <div class="message__upper__date">
      ${message.created_at}
      </div>
      </div>
      <div class="message__text">
      <img class="lower-message__image" src="${message.image}">
      </div>
      </div>
      `//メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `
      <div class="message">
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

    </div>
    </div>
      `//メッセージに画像が含まれない場合のHTMLを作る
    }
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
      // console.log(message)
      var html = buildHTML(message);
      $('.chat-main').append(html)
      $('.chat-main').animate({ scrollTop: $('.chat-main')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
      // debugger
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
})