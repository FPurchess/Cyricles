# Cyricles #

Experimental HTML5 Canvas Animation Framework

Currently, there's a hugh todo-list and many things, not even
placed on the it. However, to whom might wonder about, let this
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

*   **Cyricles.render(that)**
    Render rendering-stack of given Cyricle

*   **Cyricles.startRender()**
    Start the rendering interval (returns true on success)

*   **Cyricles.stopRender()**
    Clear rendering interval (returns true on success)

*   **Cyricles.isRendering()**
    True if rendering interval is set

*   **Cyricles.addItem(item)**
    Add an item to the rendering-stack


### CyObject ###

*   **CyObject(type)**
    Instanciate a new Cyricles-Object

*   **CyObject.setDrawingAttributes(ctx, options)**
    Set Attributes specified in options to given canvas-context ctx


### CyTransformation ###

*   **CyTransformation(options)**
    Instanciate a new Cyricles-Transformation

*   **CyTransformation.draw(ctx)**
    apply the transformation to the context

*   **CyTransformation.animate(ctx)**
    @TODO: Not implemented yet


### CyRect ###

*   **CyRect(x, y, width, height, options)**
    Instanciate a new Cyricles-Rectangle

*   **CyRect.draw(ctx)**
    draw the rectangle on the screen


### CyText ###

*   **CyText(text, x, y, options)**
    Instanciate a new Cyricles-Rectangle

*   **CyRect.draw(ctx)**
    draw the text on the screen


## TODO ##

*   implement own ready-method

*   improve Cyricles.extend for easy plugins

*   improve Cyricles.render (not passing this-context anymore)

*   add some rendering-stack manipulation methods

*   abstract & clean animation-methods in CyObject + Subclasses

*   implement color-parsing + color-animation algorithm

*   implement gradient-objects

## License ##

See LICENSE file.