var channels = ["brunofin", "comster404", "cretetion", "ESL_SC2", "freecodecamp", "habathcx", "noobs2ninjas", "OgamingSC2", "RobotCaleb", "storbeck"];

function getChannel(each){
  $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channels[each], function(users){
      if(users.error !== undefined){
        $(".user" + each).html(channels[each]);
        $(".logo" + each).html("<img class='rounded-circle' src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png'>");
        $(".icon" + each).html("<i class='fa fa-exclamation-circle dne float-right' aria-hidden='true'></i>");
        $(".c" + each).addClass("all");
      }
      else {
        if(users.logo === null){
          $(".logo" + each).html("<img class='rounded-circle' src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png'>");
        }
        else {
          $(".logo" + each).html("<img class='rounded-circle' src='" + users.logo + "'>");
        }
        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channels[each], function(users){
          if(users.stream === null){
            $(".user" + each).html(channels[each] + "<i class='fa fa-circle offline float-right' aria-hidden='true'></i>");
            $(".c" + each).addClass("off");
          }
          else {
            $(".user" + each).html(channels[each] + " : " + users.stream.game);
            $(".icon" + each).html("<i class='fa fa-circle online float-right' aria-hidden='true'></i>");
            $(".c" + each).addClass("on")
          }
        });
      }
  });
}

function getInfo(){
  for(each in channels){
    getChannel(each);
  }
}

function filterStatus(){
  $(".allBtn").click(function(){
    $(".all").show();
    $(".off").show();
    $(".on").show();
  });
  $(".offBtn").click(function(){
    $(".off").show();
    $(".all").hide();
    $(".on").hide();
  });
  $(".onBtn").click(function(){
    $(".on").show();
    $(".all").hide();
    $(".off").hide();
  });
}

function filterSearch(){
  $("input").keyup(function(){
    var search = $("input:text").val();
    for(each in channels){
      if(channels[each].toLowerCase().match(search.toLowerCase()) === null){
        $(".c" + each).hide();
      }
      else {
        $(".c" + each).show();
      }
    }
  });
}

$(document).ready(function(){
  getInfo();
  filterStatus();
  filterSearch();
});
