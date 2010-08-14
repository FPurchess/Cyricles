/**
 * document.ready currently sponsored by snipplr.com :)
 * @copyright http://snipplr.com/view/6156/documentready/
 */
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                }
                catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t),run();
            }, 0);
    };
})();

//@TODO implement own ready-method



/**
 * Cyricles
 *
 * @license see LICENSE file
 * @copyright Florian Purchess <florian@purchess.de>
 *
 * ####################################################################################
 */

/**
 * Initalize a new Cyricles-Object
 * @param canvas
 * @param options
 */
Cyricles = function (canvas, options) {
    var type = typeof(canvas);

    if (type == "string")
        this.canvas = document.getElementById(canvas);
    else if (type == "object")
        this.canvas = canvas;
    else
        return null;

    this.ctx = this.canvas.getContext("2d");

    // set up options
    this.options = Cyricles.extend({
            renderInterval : 20,
            background : 'transparent',
            width : 800,
            height : 600
        }, options);

    // init object-stack
    this.items = new Array();

    this.renderingInterval = null;
};

Cyricles.extend = function(defaults, options) {
    //@TODO Save extending + extending of Cyricles
    if (options == undefined) return defaults;

    for(var i in defaults) {
        if (options[i] == undefined)
            options[i] = defaults[i];
    }

    return options;
}

Cyricles.prototype.loadImages = function(images, callback) {
    var load = images.length; // amount of load images

    for(var i=0; i < images.length; i++) {
        var img = new Image();
        img.onload = img.onabort = img.onerror = function() {load--;};
        img.src = images[i];
        images[i] = img;
    }

    var t = setInterval(function() {
        if (!load)
            clearInterval(t);
    }, 0);

    if (typeof(callback) == "function")
        callback(images);

    return images;
};

/**
 * clear the canvas
 */
Cyricles.prototype.clearScreen = function() {
    this.canvas.width = this.canvas.width;
    if (this.options.background == 'transparent') return;

    this.ctx.save();
    this.ctx.fillStyle = this.options.background;
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    this.ctx.restore();
};

/**
 * render the current rendering-stack
 * @param that
 */
Cyricles.prototype.render = function(that) {
    //@TODO find a better solution than passing "this"-context
    that.clearScreen();

    for (var i=0; i < that.items.length; i++) {
        if (typeof(that.items[i]) == "function")
            that.items[i](that);
        else
            that.items[i].draw(this.ctx);
    }
};

/**
 * start rendering-interval
 */
Cyricles.prototype.startRender = function(){
    if (this.renderingInterval !== null) return false;

    this.render(this);
    this.renderingInterval = setInterval(function(that){that.render(that)}, this.options.renderInterval, this);

    return true;
};

/**
 * stop rendering-interval
 */
Cyricles.prototype.stopRender = function(){
    if (this.renderingInterval === null) return false;

    clearInterval(this.renderingInterval);
    this.renderingInterval = null;

    return true;
};

/**
 * Add an item to the rendering-stack
 * @param item
 */
Cyricles.prototype.addItem = function(item) {
    this.items.push(item);
};

//@TODO Add some rendering-stack manipulation methods


/**
 * CyObject
 * ####################################################################################
 */

/**
 * Initalize a CyObject
 * @param type
 */
CyObject = function(type) {
    this.type = type;
};

/**
 * Set drawing-attributes
 * @param ctx
 * @param options
 */
CyObject.prototype.setDrawingAttributes = function(ctx, options){
    for (var name in options)
        ctx[name] = options[name];

};


/**
 * CyTransform
 * ####################################################################################
 */

/**
 * Initalize a transformation-object
 * @param options
 */
CyTransformation = function(options) {
    CyObject.call(this, "CyTransform");
    this.options = Cyricles.extend({scale:[1,1], angle:0, translate:[0,0], transform:[0, 0, 0, 0, 0, 0]}, options);
};

CyTransformation.prototyp = new CyObject;
CyTransformation.prototyp.constructor = CyTransformation;

/**
 * apply a scale to a context
 * @param ctx
 */
CyTransformation.prototype.draw = function(ctx) {
    ctx.scale(this.options.scale[0],this.options.scale[1]);
    ctx.rotate(this.options.angle);
    ctx.translate(this.options.translate[0], this.options.translate[1]);
    ctx.transform(this.options.transform[0], this.options.transform[1], this.options.transform[2],
            this.options.transform[3], this.options.transform[4], this.options.transform[5]);
};

/**
 * Animate a scale
 * @param options
 * @param duration
 * @param callback
 */
CyTransformation.prototype.animate = function(options, duration, callback) {
//    //@TODO restructure animation (abstraction?)
//    var incX = (x - this.x) / duration;
//    var incY = (y - this.y) / duration;
//
//    var i = setInterval(function(that) {
//        if (x - that.x <= 0.0001) { //@TODO improve final condition
//            clearInterval(i);
//            if (typeof(callback) == "function")
//                callback();
//        }
//        that.x += incX;
//        that.y += incY;
//    }, 1, this);
};


/**
 * CyRect
 * ####################################################################################
 */

/**
 * Initalize a new Cyricles-Rectangle
 *
 * @param x
 * @param y
 * @param width
 * @param height
 * @param options
 */
CyRect = function(x, y, width, height, options) {
    CyObject.call(this, "CyRect");
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.options = Cyricles.extend({strokeStyle: false, fillStyle: false}, options);
};

CyRect.prototyp = new CyObject;
CyRect.prototyp.constructor = CyRect;

/**
 * draw rectangle on the canvas-context
 * @param ctx
 */
CyRect.prototype.draw = function(ctx){
    ctx.save();

    this.setDrawingAttributes(ctx, this.options);

    if (this.options.fillStyle !== false)
        ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.options.strokeStyle !== false)
        ctx.strokeRect(this.x, this.y, this.width, this.height);


    ctx.restore();
};

//@TODO implement rectangle-animations
//@TODO implement animation-algorithm for colors

/**
 * CyText
 * ####################################################################################
 */

/**
 * Initalize a new CyText-Object
 * @param text
 * @param x
 * @param y
 * @param options
 */
CyText = function(text, x, y, options) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.options = Cyricles.extend({font: "10px Arial", textAlign: "start", fillStyle: "#000"}, options);
};

/**
 * draw text on the canvas-context
 * @param ctx
 */
CyText.prototype.draw = function(ctx){
    ctx.save();

    Cyricles.setDrawingAttributes(ctx, this.options);
    ctx.fillText(this.text, this.x, this.y);

    ctx.restore();
};

//@TODO implement text-animations

//@TODO implement some gradient-handling