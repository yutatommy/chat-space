$(function(){

  function buildHTML(message){
      if (message.image){
      var html = `<div class="message" data-message-id=${message.id}>
      <div class="chat-main__messages-list__block">
      <div class="chat-main__messages-list__block--top">
      <div class="chat-main__messages-list__block--top__left">
      ${message.user_name}
      </div>
      <div class="chat-main__messages-list__block--top__right">
      ${message.created_at}
      </div>
      </div>
      <div class="chat-main__messages-list__block--bottom">
      <p class="lower-message__content">
      ${message.content}
      </p>
      <img class="lower-message__image" src="${message.image}">
      </div>
      </div>`
      return html;
  }else{
      var html = `<div class="message" data-message-id=${message.id}>
      <div class="chat-main__messages-list__block">
      <div class="chat-main__messages-list__block--top">
      <div class="chat-main__messages-list__block--top__left">
      ${message.user_name}
      </div>
      <div class="chat-main__messages-list__block--top__right">
      ${message.created_at}
      </div>
      </div>
      <div class="chat-main__messages-list__block--bottom">
      <p class="lower-message__content">
      ${message.content}
      </p>
      
      </div>
      </div>
      </div>`
      return html;
  };

}

  $('#new_message').on('submit',function(e){
   e.preventDefault();
   var formData = new FormData(this);
   var url = $(this).attr('action');

   $('.chat-main__messages-form--right').removeAttr('data-disable-with');

   $.ajax({
       url: url,
       type: "POST",
       data: formData,
       dataType:'json',
       processData: false,
       contentType: false
   })
   .done(function(data){
     var html = buildHTML(data);
     $('.chat-main__messages-list').append(html);
     $('.chat-main__messages-list').animate({ scrollTop: $('.chat-main__messages-list')[0].scrollHeight});
     $('form')[0].reset();
   })
   .fail(function(){
     aleart("メッセージの送信に失敗しました");
   })
 

  })
  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
        url: "api/messages",
        type: 'get',
        datatype: 'json',
        data: {id: last_message_id}
    })
    .done(function(messages){
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i,message){
            insertHTML += buildHTML(message)
        });
        $('.chat-main__messages-list').append(insertHTML);
        $('.chat-main__messages-list').animate({ scrollTop: $('.chat-main__messages-list')[0].scrollHeight});
      }
    })
    .fail(function(){
        alert('error');
    });
};
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});