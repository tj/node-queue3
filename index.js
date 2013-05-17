
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;
var debug = require('debug')('queue');

/**
 * Expose `Queue`.
 */

module.exports = Queue;

/**
 * Initialize a `Queue` with the given options:
 *
 *  - `concurrency` [1]
 *
 * @param {Object} options
 * @api public
 */

function Queue(options) {
  options = options || {};
  this.concurrency = options.concurrency || 1;
  this.pending = 0;
  this.jobs = [];
}

/**
 * Inherit from `Emitter.prototype`.
 */

Queue.prototype.__proto__ = Emitter.prototype;

/**
 * Return queue length.
 *
 * @return {Number}
 * @api public
 */

Queue.prototype.__defineGetter__('length', function(){
  return this.pending + this.jobs.length;
});

/**
 * Queue `fn` for execution.
 *
 * @param {Function} fn
 * @param {Function} [cb]
 * @api public
 */

Queue.prototype.push = function(fn, cb){
  debug('enqueue');
  this.jobs.push([fn, cb]);
  process.nextTick(this.run.bind(this));
};

/**
 * Run jobs at the specified concurrency.
 *
 * @api private
 */

Queue.prototype.run = function(){
  while (this.pending < this.concurrency) {
    var job = this.jobs.shift();
    if (!job) break;
    this.exec(job);
  }
};

/**
 * Execute `job`.
 *
 * @param {Array} job
 * @api private
 */

Queue.prototype.exec = function(job){
  var self = this;
  debug('process');
  this.pending++;
  var fn = job[0];
  var cb = job[1];
  fn(function(err, res){
    cb && cb(err, res);
    self.pending--;
    self.run();
  });
};
