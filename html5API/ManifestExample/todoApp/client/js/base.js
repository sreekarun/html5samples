/**
 * Defining Application Namespace
 */
var TODO = {};

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);       
            this._super = tmp;
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();

/**
 * Observable base class to add observers
 */
var Observable = Class.extend({
    on: function (listenerName, listener) {
        if (!this.listenerList) {
            this.listenerList = {};
        }
        if (!this.listenerList[listenerName]) {
            this.listenerList[listenerName] = [];
        }
        this.listenerList[listenerName].push(listener);
        
        //console.log(this.listenerList[listenerName].length);
    },
    fire: function (listenerName) {
        if (!this.listenerList[listenerName]) {
            return;
        }
        var len = this.listenerList[listenerName].length;
        for (var i = 0, listener; i < len; i++) {
            listener = this.listenerList[listenerName][i];
            listener.call(this);
        }
    }
});


/**
 * Define all the base methods in 'Base' namespace
 */
var Base = {};

/**
 * All the Model must inherit from Base.Model
 */
Base.Model = Observable.extend({
    url: '',
    init: function () {
        console.log('super initiated');
    },
    so: function () {
        console.log('asfd');
    },
    __get: function () {
        if (!url) {
            return;
        }
        
        console.log('get data from', url);
        this.fire('get');
    },
    __update: function () {
        console.log('update data');
        this.fire('update');
    }
});

/**
 * All the View must inherit from Base.View
 */
Base.View = Class.extend({
    init: function () {
        //console.log('base View creation');
    }
});

/**
 * All the Controller must inherit from Base.Controller
 */
Base.Controller = Class.extend({
    init: function () {
        //console.log('base Controller creation');
    }
});