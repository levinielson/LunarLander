MyGame.graphics = (function() {
    'use strict';

    let canvas = document.getElementById('id-canvas');
    let context = canvas.getContext('2d');

    //------------------------------------------------------------------
    //
    // Public function that allows the client code to clear the canvas.
    //
    //------------------------------------------------------------------
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --------------------------------------------------------------
    //
    // Draws a texture to the canvas with the following specification:
    //    image: Image
    //    center: {x: , y: }
    //    size: { width: , height: }
    //
    // --------------------------------------------------------------
    function drawTexture(image, center, rotation, size) {
        context.save();

        context.translate(center.x, center.y);
        context.rotate(rotation);
        context.translate(-center.x, -center.y);

        context.drawImage(
            image,
            center.x - size.x / 2,
            center.y - size.y / 2,
            size.x, size.y);

        context.restore();
    }


    //---------------------------------------------------------------
    //
    // Draws the background
    //  image: Image
    //  
    //---------------------------------------------------------------
    function drawBackground(image) {
        context.drawImage(
            image,
            0, 0,
            canvas.width, canvas.height
        );
    }

    // --------------------------------------------------------------
    //
    // Draw a rectangle to the canvas with the following attributes:
    //      center: { x: , y: },
    //      size: { x: , y: },
    //      rotation:       // radians
    //
    // --------------------------------------------------------------
    function drawRectangle(rect, fillStyle, strokeStyle) {
        context.save();
        context.translate(rect.center.x, rect.center.y );
        context.rotate(rect.rotation);
        context.translate(-rect.center.x, -rect.center.y);
        
        context.fillStyle = fillStyle;
        context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);
        
        context.strokeStyle = strokeStyle;
        context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

        context.restore();
    }

    function drawLines(points, lineWidth, strokeStyle) {
        context.save();
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.beginPath();
        context.moveTo(points[0].x / 100 * canvas.width, points[0].y / 100 * canvas.height);
        for (let i = 1; i < points.length; i++) {
            context.lineTo(points[i].x / 100 * canvas.width, points[i].y / 100 * canvas.height);
        }
        context.lineTo(canvas.width, canvas.height);
        context.lineTo(0, canvas.height);
        context.stroke();
        context.fill();
        context.restore();
    }

    function drawText(text, color, size, position) {
        context.save();
        context.font = `${size}px Arial`;
        context.fillStyle = color;
        context.fillText(text, position.x * canvas.width / 100, position.y * canvas.height / 100);
        context.restore();
    }

    let api = {
        clear: clear,
        drawTexture: drawTexture,
        drawRectangle: drawRectangle,
        drawBackground: drawBackground,
        drawLines: drawLines,
        drawText: drawText,
        width: canvas.width,
        height: canvas.height
    };

    return api;
}());
