$(function(){
  
  function buildMessage(message){
    if (message.image) {
      var html = 
      `<div class="messages">
        <div class="message-list">
          <div class="message-name">
            ${message.user_name}
          </div>
          <div class="message-date">
            ${message.created_at}
          </div>
        </div>
        <div class="message-content">
          ${message.content}
        </div>
        <img src=${message.image} >
      </div>`
      return html;
    } else {
          var html =
          `<div class="messages">
            <div class="message-list">
              <div class="message-name">
                ${message.user_name}
              </div>
              <div class="message-date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-content">
              ${message.content}
            </div>
          </div>`
          return html;
    };
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessage(data);
      $('.main_chat_message').append(html);      
      $('.main_chat_message').animate({ scrollTop: $('.main_chat_message')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});