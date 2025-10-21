import { canvas, Engine, Pen, Rectangle, Text } from 'tscratch';

const engine = Engine.init();

// Changable values
const size = 100;
const maxDepth = 10;
const delayMs = 0;

// Base square
const rect = new Rectangle({
    y: -canvas.height / 2 + size,
    width: size,
    height: size,
    hidden: true
});

// Pen sprite
const pen = new Pen();

// Watermark
new Text({
    content: 'Made with TScratch',
    x: -canvas.width / 2 + 5,
    y: canvas.height / 2 - 5,
    align: 'left',
    baseline: 'top'
});

// Logic

tree(0, rect.width);

//tree(maxDepth, rect.width)

async function tree(depth: number, sideLength: number) {

    // Stop if exceeded the limit
    if (depth > maxDepth) return;

    // Clone
    rect.setWidth(sideLength);
    rect.setHeight(sideLength);
    pen.stamp(rect);
    
    // Store initial values
    const prevX = rect.x;
    const prevY = rect.y;
    const prevDir = rect.dir;

    // Left

    // Go to corner
    rect.turn(-90);
    rect.move(sideLength / 2);
    rect.turn(90);
    rect.move(sideLength / 2);

    const newSideLength = sideLength / (2 * engine.cos(45));

    // Move to the next center
    rect.turn(45);
    rect.move(newSideLength / 2);

    rect.turn(-90);
    rect.move(newSideLength / 2);

    // Delay the drawing
    await engine.wait(delayMs);

    await tree(depth + 1, newSideLength);

    // Go back
    rect.goTo(prevX, prevY);
    rect.point(prevDir);

    // Right

    // Go to corner
    rect.turn(90);
    rect.move(sideLength / 2);
    rect.turn(-90);
    rect.move(sideLength / 2);

    // Move to the next center

    rect.turn(-45);
    rect.move(newSideLength / 2);

    rect.turn(90);
    rect.move(newSideLength / 2);

    // Delay the drawing
    await engine.wait(delayMs);

    await tree(depth + 1, newSideLength);
}