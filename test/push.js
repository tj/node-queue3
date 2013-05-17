
var Queue = require('..');

describe('Queue#push(fn)', function(){
  it('should process jobs in order', function(done){
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
        calls.should.eql(['one', 'two', 'three', 'four', 'five']);
        done();
      }, 100);
    });
  })

  it('should support .concurrency', function(done){
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
        calls.should.have.length(5);
        calls.should.include('one');
        calls.should.include('two');
        calls.should.include('three');
        calls.should.include('four');
        calls.should.include('five');
        done();
      }, 100);
    });
  })
})
