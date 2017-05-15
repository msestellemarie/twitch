var channels = ["cretetion", "ESL_SC2", "freecodecamp", "habathcx", "noobs2ninjas", "OgamingSC2", "RobotCaleb", "storbeck", "brunofin"];
var selected = "all";
var search = "";

function getChannel(each){
  $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channels[each], function(users){
      if(users.error !== undefined){
        $(".user" + each).html(channels[each]);
        $(".detail" + each).html("No account found");
        $(".logo" + each).html("<img class='rounded-circle' src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png'>");
        $(".icon" + each).html("<i class='fa fa-exclamation-circle dne float-right' title='No account found' aria-hidden='true'></i>");
        $(".c" + each).addClass("all");
      }
      else {
        $(".s" + each).wrap("<a target='_blank' href='https://www.twitch.tv/" + channels[each] + "'></a>")
        if(users.logo === null){
          $(".logo" + each).html("<img class='rounded-circle' src='https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_70x70.png'>");
        }
        else {
          $(".logo" + each).html("<img class='rounded-circle' src='" + users.logo + "'>");
        }
        $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channels[each], function(users){
          if(users.stream === null){
            $(".user" + each).html(channels[each]);
            $(".icon" + each).html("<i class='fa fa-circle offline float-right' title='Offline' aria-hidden='true'></i>");
            $(".c" + each).addClass("off");
            $(".c" + each).addClass("all");
          }
          else {
            $(".user" + each).html(channels[each]);
            if(users.stream.game.length <= 15){
              $(".detail" + each).html(users.stream.game);
            }
            else {
              $(".detail" + each).html(users.stream.game.slice(0,15).trim() + "...");
            }
            $(".icon" + each).html("<i class='fa fa-circle online float-right' title='Online' aria-hidden='true'></i>");
            $(".c" + each).addClass("on")
            $(".c" + each).addClass("all");
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

function getFilters(){
  $(".offBtn").click(function(){
    selected = "off";
    filterResults(search, selected);
  });
  $(".onBtn").click(function(){
    selected = "on";
    filterResults(search, selected);
  });
  $(".allBtn").click(function(){
    selected = "all";
    filterResults(search, selected);
  });
  $("input").keyup(function(){
    search = $("input:text").val().toLowerCase();
    filterResults(search, selected);
  });
}

function filterResults(search, selected){
  for(each in channels){
    if($(".user" + each).text().toLowerCase().concat($(".detail" + each).text().slice(2).toLowerCase()).match(search) !== null && $(".c" + each).hasClass(selected)){
      $(".c" + each).show();
    }
    else {
      $(".c" + each).hide();
    }
  }
}

$(document).ready(function(){
  getInfo();
  getFilters();
});
