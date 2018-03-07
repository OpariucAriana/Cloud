const axios = require('axios');
var Twitter = require('twitter');
var fs = require('fs');
request = require('request');

var client = new Twitter({
  consumer_key: 'OwHqSf7Q1erKjtja5xcmcApET',
  consumer_secret: 'RGzof2WrufWYahyGJkj8R6HcztrRHeT5eRArpZMgDR2PIBc50g',
  access_token_key: '969046958395613184-XrxWXz27liEMx4fnFP7i0Is9qoSkwgW',
  access_token_secret: 'Kdqoot8oUNzDsDZm3l1bx5LL5fbjmDyHZyWZ2SitjBXol'
});

 var dataTitle;
 var books;
   function handleResponse(response) {
   	titleList='';
  for (var i = 0; i < response.items.length; i++) {
    var item = response.items[i];
    var volumeTitle = item.volumeInfo.title;
    var titleList = titleList.concat(volumeTitle+',');
    return titleList;
  }
}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

console.log('first request:' + 'https://api.nasa.gov/planetary/apod?api_key=YnN2KDn8DEXtpHiEERtNz92hQX45cWG3MWG8CewS');
axios.get('https://api.nasa.gov/planetary/apod?api_key=YnN2KDn8DEXtpHiEERtNz92hQX45cWG3MWG8CewS')
  .then(response => {
    dataTitle = response.data.title;

  download(response.data.url, 'nasaphoto1.png', function(){
    console.log('done');
  });

    dataTitle = dataTitle.replace(/\s/g, '+');

    var requestUrl = 'https://www.googleapis.com/books/v1/volumes?q='+ dataTitle;
    console.log(requestUrl);
    axios.get(requestUrl)
  .then(response => {
    books = response.data;
    var listOfBookTitles = handleResponse(books);
    console.log(listOfBookTitles);

    var data = require('fs').readFileSync('nasaphoto1.png');

// Make post request on media endpoint. Pass file data as media parameter
  client.post('media/upload', {media: data}, function(error, media, response) {

    if (!error) {

      // If successful, a media object will be returned.
      console.log(media);

      // Lets tweet it
      var status = {
        status: 'books to read about this picture:' + listOfBookTitles,
        media_ids: media.media_id_string // Pass the media id string
      }

      client.post('statuses/update', status, function(error, tweet, response) {
        if (!error) {
          console.log(tweet);
        }
      });

    }
  });

  })
  .catch(error => {
    console.log(error);
  });
  })
  .catch(error => {
    console.log(error);
  });