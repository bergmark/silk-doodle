// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var jsdom = require('jsdom')
var Uri = require('jsuri')

function makePost (host, url, data, done)
{
  var post_options =
    { host    : host
    , port    : '80'
    , path    : url
    , method  : 'POST'
    , headers :
      { 'Content-Type'  : 'text/plain'
      , 'Content-Length': data.length
      }
    };

  var response = "";
  var post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      response += chunk;
    });
    res.on('end', function () {
      done(response);
    });
  });

  post_req.write(data);
  post_req.end();
}

function doodleUrl (title, creatorName, creatorEmail, options)
{
  var e = encodeURIComponent;
  var uri = new Uri("http://doodle.com/polls/wizard.html");
  uri.addQueryParam("locale", "en");
  uri.addQueryParam("type", "text")
  uri.addQueryParam("title", e(title));
  uri.addQueryParam("name", e(creatorName));
  uri.addQueryParam("eMailAddress", e(creatorEmail));
  uri.setAnchor("#invite");
  options.forEach(function (o, i) { uri.addQueryParam("option" + (i+1), e(o)); });
  return uri.toString();
}

(function () {
  var e = encodeURIComponent;
  var args       = process.argv;
  var site       = args[2];
  var collection = args[3];
  var name       = args[4];
  var email      = args[5];
  var title      = args[6];

  var path = '/v1.11/site/uri/' + site + '/query';
  var query = 'from all documents where (document has type http://world.silkapp.com/tag/http://' + site + '/tag/' + e(collection) + ') select document name';

  makePost('api.silkapp.com', path, query, function done (c) {
    jsdom.env({
      html : c,
      scripts : ['http://code.jquery.com/jquery-1.10.1.js']
    }, function (err, window) {
      var $ = window.jQuery;
      var options = [];
      $("a").each(function (_,v) { options.push(v.textContent); });
      var doodle = doodleUrl(title, name, email, options);
      console.log(doodle);
    });
  });
})();
