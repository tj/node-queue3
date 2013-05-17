
var request = require('superagent');
var Queue = require('./');
var q = new Queue({ concurrency: 3 });

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://ign.com',
  'http://msn.com',
  'http://hotmail.com',
  'http://cloudup.com',
  'http://learnboost.com'
];

var id = setInterval(function(){
  urls.forEach(function(url){
    q.push(function(fn){
      console.log('%s', url);
      request.get(url, function(res){
        console.log('%s -> %s', url, res.status);
        fn();
      });
    });
  });
}, 5000);

var tid = setInterval(function(){
  console.log('%s queued', q.length);
}, 500);

setTimeout(function(){
  console.log('shutting down');
  clearInterval(id);
  clearInterval(tid);
}, 15000);
