$(function(){
  function buildHTML(message) {
    let image = (message.image) ? `<img src=${message.image}>` : "";
    let html = 
      `<div class="messages" data-message-id="${message.id}">
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
          ${image}
      </div>`
      return html;
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
    .done(function(data) {
      var html = buildHTML(data);
      $('.main_chat_message').append(html);      
      $('.main_chat_message').animate({ scrollTop: $('.main_chat_message')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
      var last_message_id = $('.messages:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
            $('.main_chat_message').append(insertHTML);
            $('.main_chat_message').animate({ scrollTop: $('.main_chat_message')[0].scrollHeight});
            $('form')[0].reset();
            $('.form__submit').prop('disabled', false);
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
  }; 
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});
