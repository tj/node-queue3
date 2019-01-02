var test = require('tape')
var Queue = require('..');

test('should timeout jobs', function(t){
  var q = new Queue({ timeout: 1000 });
  var calls = [];

  q.push(function(fn){
    setTimeout(function(){
      fn();
    }, 5000);
  }, function(err){
    t.equal(err.message, 'Timeout of 1000ms exceeded', 'Timeout of 1000ms exceeded');
    t.end();
  });
})

test('should run subsequent jobs', function(t){
  var q = new Queue({ timeout: 500 });
  var calls = [];

  q.push(function(done){
    setTimeout(function(){
      calls.push(1);
      done();
    }, 5000);
  }, function(err){
    t.assert(err.timeout, '1 should timeout');
  });

  q.push(function(done){
    setTimeout(function(){
      calls.push(2);
      done();
    }, 5000);
  }, function(err){
    t.assert(err.timeout, '2 should timeout');
  });

  q.push(function(done){
    setTimeout(function(){
      calls.push(3);
      done();
    }, 100);
  }, function(err){
    t.assert(!err, '3 should not timeout');
  });

  q.push(function(done){
    setTimeout(function(){
      calls.push(4);
      done();
    }, 100);
  }, function(err){
    t.assert(!err, '4 should not timeout');
  });

  q.push(function(){
    t.deepEquals(calls, [3,4], 'include correct calls');
    t.end();
  });
});
