
function uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
	          var r = (Math.random() * 16) | 0,
		            v = c == "x" ? r : (r & 0x3) | 0x8;
	          return v.toString(16);
      })}

var session_id=uuidv4()
initial_message={"recipient_id":session_id,"text": "Καλως ήρθατε στο VoiceBot! Πώς μπορώ να σας εξυπηρετήσω;"}
$(function() {
  var INDEX = 0; 
  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val(); 
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    
    setTimeout(function() {
      sayToBot(msg);      
    }, 500)
    
  })

  function sayToBot(message) {
    console.log("User Message:", message)
    $.ajax({
      url: 'https://hostname:port/endpoint',
      type: 'POST',
      contentType: 'application/json; charset="utf-8"',
      data: JSON.stringify({
        "message": message,
        "sender": session_id
      }),
      success: function (data, textStatus) {
        if(data != null){
            console.log("Success : "+ data);
            //obj=JSON.parse(data);
            obj=data
            generate_message(obj,'user');
        }
      },
      error: function (errorMessage) {
        msg="Could not connect to server... :( Please try again.";
        generate_message(msg, "user");
        console.log('Error : ' + errorMessage);
  
      }
    });
  }
  
  function generate_message(val, type) {
    INDEX++;
    var str="";
    var msg="";
    if (val.length < 1){
      msg="..."; 
    }
    else if(type=="self")
    {
      msg=val;
    }
    else if(typeof(val)=="string" && type=="user")
    {
      msg=val
    }
    else
    {
      for (i = 0; i < val.length; i++) {
				//check if there is text message
				if (val[i].hasOwnProperty("text")) {
					msg+=val[i].text.toString('utf-8')+"<br>";
				}

				//check if there is image
				if (val[i].hasOwnProperty("image")) {
					msg+="<img src='"+val[i].image+"' class='chat_img'>";
				}
			}
    }
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img class='img_"+type+"'>";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  

  
  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
})
