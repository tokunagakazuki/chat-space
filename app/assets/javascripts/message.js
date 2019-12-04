$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      image = `<img class="lower-message__image" src="${message.image}"></img>`
      
    } else {
      image = ''
    }
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
})