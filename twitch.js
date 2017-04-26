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
            $(".c" + each).addClass("all");
          }
          else {
            $(".user" + each).html(channels[each] + " : " + users.stream.game);
            $(".icon" + each).html("<i class='fa fa-circle online float-right' aria-hidden='true'></i>");
            $(".c" + each).addClass("on")
            $(".c" + each).addClass("all");
          }
        });
      }
  });
  $(".c" + each).addClass(channels[each]);
}

function getInfo(){
  for(each in channels){
    getChannel(each);
  }
}

function getActive(){
  if($(".onBtn").hasClass("active")){
    return "on";
  }
  else if($(".offBtn").hasClass("active")){
    return "off";
  }
  else {
    return "all";
  }
}

function getFilters(){
  $(".offBtn").click(function(){
    var search = $("input:text").val().toLowerCase();
    var selected = "off";
    filterResults(search, selected);
  });
  $(".onBtn").click(function(){
    var search = $("input:text").val().toLowerCase();
    var selected = "on";
    filterResults(search, selected);
  });
  $(".allBtn").click(function(){
    var search = $("input:text").val().toLowerCase();
    var selected = "all";
    filterResults(search, selected);
  });
  $("input").keyup(function(){
    var search = $("input:text").val().toLowerCase();
    var selected = getActive();
    filterResults(search, selected);
  });
}

function filterResults(search, selected){
  for(each in channels){
    if(channels[each].toLowerCase().match(search) !== null && $("." + channels[each]).hasClass(selected)){
      $("." + channels[each]).show();
    }
    else {
      $("." + channels[each]).hide();
    }
  }
}

$(document).ready(function(){
  getInfo();
  getFilters();
});
