# Draw.js
Lightweight framework to draw on canvas.

## Getting started
Compile the file locally running ```npm run build``` and refference ```./dist/draw.js``` file.  
Another option is to reference the CDN file directly: ```<script src="https://cdn.jsdelivr.net/npm/draw.js/dist/draw.js"></script>```

## How to use it
```
// Setup function is optional and it will run before load event is fired
setup() {
    frameRate(10)          // Optional (default 60)
    createCanvas(400, 400) // Optional (default 600x600)
    noCanvas()             // Optional
}

// Draw function will be intercepted and run in loop over the specified frame rate
draw() {
    console.log('run')
}
```

## Available methods
### General
```
background(r, g, b, a)
    
fill(r, g, b, a)
rect(x, y, w, h)
    
distance(x1, y1, z1, x2, y2, z2)    
constrain(n, low, high)
```

### Vector
```
let vector = createVector(x, y, z)
vector.multiply(n)
vector.distance()
```

### Utils
```
random(min, max)
```

### Key bindings
```
keySpace()    { console.log('Space bar pressed') }
keyLeft()     { console.log('Left key pressed')  }
keyUp()       { console.log('Up key pressed')    }
keyRight()    { console.log('Right key pressed') }
keyDown()     { console.log('Down key pressed')  }
onMousedown() { console.log('Mouse click')       }
```

## Example
https://github.com/DONSA/snake

## Licence
[MIT](https://github.com/DONSA/draw.js/new/master?readme=1)
