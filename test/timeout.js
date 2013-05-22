
var Queue = require('..');

describe('Queue .timeout', function(){
  it('should timeout jobs', function(done){
    var q = new Queue({ timeout: 1000 });
    var calls = [];

    q.push(function(fn){
      setTimeout(function(){
        fn();
      }, 5000);
    }, function(err){
      err.message.should.equal('Timeout of 1000ms exceeded');
      done();
    });
  })

  it('should run subsequent jobs', function(done){
    var q = new Queue({ timeout: 200 });
    var calls = [];

    var n = 0;
    for (var i = 0; i < 5; i++) {
      (function(n){
        q.push(function(done){
          setTimeout(function(){
            calls.push(n);
            done();
          }, 250);
        });
      })(i);
    }

    q.push(function(){
      calls.should.eql([0,1,2,3]);
      done();
    });
  })
})
