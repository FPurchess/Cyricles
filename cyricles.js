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



/**
 * Cyricles-Core
 *
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
    var defaults = {
        renderInterval : 20,
        background : 'transparent',
        width : 800,
        height : 600
    };

    if (typeof(options) == "undefined") {
        this.options = defaults
    } else {
        this.options = options;
        for(var i in defaults) {
            if (typeof(options[i]) == "undefined")
                options[i] = defaults[i];
        }
    }

    // init object-stack
    this.items = new Array();
};

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
    that.clearScreen();

    for (var i=0; i < that.items.length; i++) {
        if (typeof(that.items[i]) == "function")
            that.items[i](that);
        else
            that.items[i].draw(this.ctx);
    }
};

Cyricles.prototype.startRender = function(){
    this.render(this);
    var r = setInterval(function(that){that.render(that)}, this.options.renderInterval, this);
};

Cyricles.prototype.stopRender = function(){
};

/**
 * Add an item to the rendering-stack
 * @param item
 */
Cyricles.prototype.addItem = function(item) {
    this.items.push(item);
};


/**
 * CyScale
 * ####################################################################################
 */

/**
 * Initalize a scale
 * @param x
 * @param y
 */
CyScale = function(x,y) {
    this.x = x;
    this.y = y;
};

/**
 * apply a scale to a context
 * @param ctx
 */
CyScale.prototype.draw = function(ctx) {
    ctx.scale(this.x,this.y);
};

/**
 * Animate a scale
 * @param x
 * @param y
 * @param duration
 */
CyScale.prototype.animate = function(x,y,duration, callback) {
    var incX = (x - this.x) / duration;
    var incY = (y - this.y) / duration;

    var i = setInterval(function(that) {
        if (x - that.x <= 0.0001) {
            clearInterval(i);
            if (typeof(callback) == "function")
                callback();
        }
        that.x += incX;
        that.y += incY;
    }, 1, this);
};


/**
 * CyRotation
 * ####################################################################################
 */

/**
 * Initalize a rotation
 * @param angle
 */
CyRotation = function(angle) {
    this.angle = angle;
};

/**
 * apply a rotation to the canvas-context
 * @param ctx
 */
CyRotation.prototype.draw = function(ctx) {
    ctx.rotate(this.angle);
};

/**
 * Animate a rotation
 * @param angle
 * @param duration
 */
CyRotation.prototype.animate = function(angle,duration, callback) {
    var incA = (angle - this.angle) / duration;

    var i = setInterval(function(that) {
        if (angle - that.angle <= 0.0001) {
            if (typeof(callback) == "function")
                callback();
            clearInterval(i);
        }
        that.angle += incA;
    }, 1, this);
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
 * @param strokeStyle
 * @param fillStyle
 */
CyRect = function(x, y, width, height, strokeStyle, fillStyle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
};

CyRect.prototype.draw = function(ctx){
    ctx.save();

    if (this.fillStyle) {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    if (this.strokeStyle) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    ctx.restore();
};

/**
 * CyText
 * ####################################################################################
 */

CyText = function(text, font, x, y, textAlign, fillStyle) {
    this.text = text;
    this.font = font;
    this.x = x;
    this.y = y;
    this.textAlign = textAlign;
    this.fillStyle = fillStyle;
};

CyText.prototype.draw = function(ctx){
    ctx.save();

    if (this.font)
        ctx.font = this.font;
    else
        ctx.font = "14pt Arial";

    if (this.textAlign)
        ctx.textAlign = this.textAlign;
    else
        ctx.textAlign = "start";

    if (this.fillStyle)
        ctx.fillStyle = this.fillStyle;
    else
        ctx.fillStyle = '#000';

    ctx.fillText(this.text, this.x, this.y);

    ctx.restore();
};