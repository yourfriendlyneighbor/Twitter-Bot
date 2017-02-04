//Things to load
const Twit = require("twit");
const config = require("./config");

//Variables to set
const T = new Twit(config)

console.log(config)
console.log("Bot started...");

function getTweets(){
  const params = {q:'pony', count:1}
  function gotData(err, data, response){
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
  }
  //Get Request
  T.get('search/tweets', params, gotData)
}
function tweetIt(txt){
  function tweeted(err, data, response){
    if(err){
      console.log(err)
    }else{
      console.log(data);
    }
  }
  const tweet = {
    status: txt
  }
  //Post Request
  T.post('statuses/update', tweet, tweeted);
}

tweetIt("hey");

//Setting up a user stream
var stream = T.stream('user');
//Anytine someone follows me
stream.on('follow', followed)

function followed(eventMsg){
  var name = event.source.nam;
  var screenName = event.source.screen_name;
  tweetIt('.@' + screenName + 'Thanks for following me!')
}
//setInterval(tweetIt, 1000*20);
