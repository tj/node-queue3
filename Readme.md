
# queue

  Task (function) queue with concurrency / timeout control.

## Installation

    $ npm install queue3

## Example

```js

var request = require('superagent');
var Queue = require('queue3');
var q = new Queue({ concurrency: 3, timeout: 3000 });

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://ign.com',
  'http://msn.com',
  'http://hotmail.com',
  'http://cloudup.com',
  'http://learnboost.com'
];

urls.forEach(function(url){
  q.push(function(fn){
    console.log('%s', url);
    request.get(url).then(function(res){
      console.log('%s -> %s', url, res.status);
      fn();
    });
  });
});
```

## License

  MIT
