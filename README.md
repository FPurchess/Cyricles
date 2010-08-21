# Cyricles #

Experimental HTML5 Canvas Animation Framework

Currently, there's a hugh todo-list and many things, not even
placed on it. However, to whom might wonder about, let this
just be an experiment and proof of concept.

Please feel free to participate, test and suggest :)

## Small Object-Reference ##

### Cyricles ###

*   **Cyricles(canvas, options)**
    Instanciate a new Cyricles-Canvas-Object

*   **Cyricles.extend(defaults, options)**
    Combines two objects into a single set (presets are overwritten)

*   **Cyricles.loadImages(images, callback)**
    Returns autoloaded images. Fires callback with image-parameter

*   **Cyricles.clearScreen()**
    Clear the Canvas (with given background)

*   **Cyricles.render()**
    Render rendering-stack

*   **Cyricles.startRender()**
    Start the rendering interval (returns true on success)

*   **Cyricles.stopRender()**
    Clear rendering interval (returns true on success)

*   **Cyricles.isRendering()**
    True if rendering interval is set

*   **Cyricles.addItem(item)**
    Add an item to the rendering-stack

*   **Cyricles.addItemAt(item index)**
    Add an item to the rendering-stack at position <index>

*   **Cyricles.removeItem(item, index)**
    Remove an item off the rendering-stack

*   **Cyricles.colorToObject(colorString)**
    Parses color- and alpha-informations out of a string (hex, rgb and rgba) into an animatable object


### CyObject ###

*   **CyObject(type)**
    Instanciate a new Cyricles-Object

*   **CyObject.setDrawingAttributes(ctx, options)**
    Set Attributes specified in options to given canvas-context ctx

*   **CyObject.getAnimatables(user, options)**
    Retrieve all options that will be animated

*   **CyObject.getAddifiers(animatable, duration, steps, options)**
    Get the increase-value <addifier> for every <animatable> in relation to <duration> / <steps>

*   **CyObject.addOptionValues(addifiers, options)**
    Add the values of <addifiers> to the values of <options>

*   **CyObject.timer(fn, duration, steps, parameters, callback)**
    Executes a function <fn> for <duration> (in <steps> ms), passing <parameters>, executing callback at the end

*   **CyObject.animate(options, duration, callback)**
    Animates <options> over duration, calling <callback> at the end


### CyTransformation ###
Child of CyObject -> all CyObject-Methods are available

*   **CyTransformation(options)**
    Instanciate a new Cyricles-Transformation

*   **CyTransformation.draw(ctx)**
    apply the transformation to the context


### CyRect ###
Child of CyObject -> all CyObject-Methods are available

*   **CyRect(x, y, width, height, options)**
    Instanciate a new Cyricles-Rectangle

*   **CyRect.draw(ctx)**
    draw the rectangle on the screen

### CyArc ###
Child of CyObject -> all CyObject-Methods are available

*   **CyArc(x, y, radius, options)**
    Instanciate a new Cyricles-Arc

*   **CyArc.draw(ctx)**
    draw the arc on the screen

### CyText ###
Child of CyObject -> all CyObject-Methods are available

*   **CyText(text, x, y, options)**
    Instanciate a new Cyricles-Rectangle

*   **CyRect.draw(ctx)**
    draw the text on the screen


## TODO ##

*   implement own ready-method

*   improve Cyricles.extend for easy plugins

*   implement color-parsing + color-animation algorithm

*   implement gradient-objects

### Done ###

*   fix array-animation-bug (e.g. transformation-scale)

*   abstract & clean animation-methods in CyObject + Subclasses

*   add some rendering-stack manipulation methods

*   improve Cyricles.render (not passing this-context anymore)

## License ##

See LICENSE file.