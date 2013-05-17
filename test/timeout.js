
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
})
