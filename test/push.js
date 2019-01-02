var test = require('tape')
var Queue = require('..');

test('should process jobs in order', function(t){
  var q = new Queue;
  var calls = [];

  q.push(function(fn){
    calls.push('one');
    setTimeout(function(){
      calls.push('two');
      fn();
    }, 100);
  });


  q.push(function(fn){
    calls.push('three');
    setTimeout(function(){
      calls.push('four');
      fn();
    }, 100);
  });

  q.push(function(fn){
    calls.push('five');
    setTimeout(function(){
      fn();
      t.deepEquals(calls, ['one', 'two', 'three', 'four', 'five'], 'correct calls');
      t.end();
    }, 100);
  });
});

test('should support .concurrency', function(t){
  var q = new Queue({ concurrency: 5, timeout: 2000 });
  var calls = [];

  q.push(function(fn){
    calls.push('one');
    setTimeout(function(){
      calls.push('two');
      fn();
    }, 100);
  });


  q.push(function(fn){
    calls.push('three');
    setTimeout(function(){
      calls.push('four');
      fn();
    }, 100);
  });

  q.push(function(fn){
    calls.push('five');
    setTimeout(function(){
      fn();
      t.equals(calls.length, 5, 'calls.length');
      t.ok(calls.indexOf('one') !== -1, 'calls includes one');
      t.ok(calls.indexOf('two') !== -1, 'calls includes two');
      t.ok(calls.indexOf('three') !== -1, 'calls includes three');
      t.ok(calls.indexOf('four') !== -1, 'calls includes four');
      t.ok(calls.indexOf('five') !== -1, 'calls includes five');
      t.end();
    }, 100);
  });
});

