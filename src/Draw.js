import Vector from './Vector.js'

window.width = undefined
window.height = undefined

/**
 * Draw class
 */
export default class Draw {

    constructor() {
        this.pixelDensity = Math.ceil(window.devicePixelRatio) || 1
        this.canvas = undefined
        this.ctx = undefined
        this.lastFrameTime = window.performance.now()
        this.targetFrameRate = 60
        this.frameRate = 0

        this.events = this.getDeafultEvents()

        this.doStroke = true
        this.doFill = true

        this.setup()
        this.draw()
    }

    setup() {
        this.bindGlobalFunctions()
        this.bindGlobalEvents()
        createCanvas(600, 600)

        if (typeof window.setup === 'function') {
            window.setup()
        }
    }

    draw() {
        let now = window.performance.now()
        let timeSinceLast = now - this.lastFrameTime
        let targetTimeBetweenFrames = 1000 / this.targetFrameRate

        const epsilon = 5
        if (timeSinceLast >= targetTimeBetweenFrames - epsilon ) {
            this.frameRate = 1000.0 / (now - this.lastFrameTime)
            this.lastFrameTime = now
            window.draw()
        }

        window.requestAnimationFrame(() => this.draw())
    }

    bindGlobalFunctions() {
        for (let prop in Draw.prototype) {
            if (typeof Draw.prototype[prop] === 'function') {
                if (prop in window) {
                    console.log(`global '${prop}' already exists`)
                    continue
                }

                window[prop] = Draw.prototype[prop].bind(this)
            } else {
                window[prop] = Draw.prototype[prop]
            }
        }
    }

    bindGlobalEvents() {
        for (var e in this.events) {
            let fx = this['on' + e.capitalize()]

            if (fx) {
                let m = fx.bind(this)
                window.addEventListener(e, m)
                this.events[e] = m
            }
        }
    }

    getDeafultEvents() {
        return {
            'mousemove': null,
            'mousedown': null,
            'mouseup': null,
            'dragend': null,
            'dragover': null,
            'click': null,
            'mouseover': null,
            'mouseout': null,
            'keydown': null,
            'keyup': null,
            'keypress': null,
            'touchstart': null,
            'touchmove': null,
            'touchend': null,
            'resize': null,
            'blur': null
        }
    }

    setProperty(prop, value) {
        this[prop] = value
        window[prop] = value
    }
}

Draw.prototype.keyCode = 0

Draw.prototype.noStroke = function() {
    this.setProperty('doStroke', false)
}

Draw.prototype.fill = function(r, g, b, a = 1) {
    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
}

Draw.prototype.rect = function(x, y, w, h, color = '#fffff', lineWidth = 0.0001) {
    this.ctx.save()
    this.ctx.fillRect(x, y, w, h)
    this.ctx.restore()

    if (!this.doStroke) {
        return
    }

    let vals = canvas.modeAdjust(x, y, w, h, 'corner')
    // Translate the line by (0.5, 0.5) to draw a crisp rectangle border
    if (this.doStroke && this.ctx.lineWidth % 2 === 1) {
        this.ctx.translate(0.5, 0.5)
    }
    this.ctx.beginPath()

    // No rounded corners
    this.ctx.rect(vals.x, vals.y, vals.w, vals.h)
    this.ctx.stroke()

    if (this.doStroke && this.ctx.lineWidth % 2 === 1) {
        this.ctx.translate(-0.5, -0.5);
    }
}

Draw.prototype.background = function(r, g, b, a = 1) {
    if (arguments.length === 1) {
        g = r
        b = r
    }

    this.ctx.save()
    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.restore()
}

Draw.prototype.constrain = function(n, low, high) {
    return Math.max(Math.min(n, high), low)
}

Draw.prototype.distance = function(x1, y1, z1, x2, y2, z2) {
    if (arguments.length === 4) {
        return Math.hypot(z1-x1, x2-y1)
    } else if (arguments.length === 6) {
        return Math.hypot(x2-x1, y2-y1, z2-z1)
    }
}

Draw.prototype.createVector = function (x, y, z) {
    return new Vector(x, y, z)
}

Draw.prototype.frameRate = function(fps) {
    if (typeof fps === 'number' && fps > 0) {
        this.targetFrameRate = fps
    }
}

Draw.prototype.noCanvas = function() {
    if (this.canvas) {
        this.canvas.parentNode.removeChild(this.canvas)
    }
}

Draw.prototype.createCanvas = function(w, h, renderer = '2d') {
    let elements = document.getElementsByTagName('canvas')
    Array.from(elements).forEach(element => element.remove())

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext(renderer)

    this.canvas.width = (width = w) * this.pixelDensity
    this.canvas.height = (height = h) * this.pixelDensity
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.scale(this.pixelDensity, this.pixelDensity)

    document.body.appendChild(this.canvas)
}

Draw.prototype.random = function(min, max) {
    if (max < min) {
        throw new Error(`Max (${max}) is lower than min (${min})`)
    }

    if (typeof min === 'undefined') {
        return Math.random()
    }

    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
}

/*
 * Keys binding
 */
Draw.prototype.onKeydown = function (e) {
    this.setProperty('keyCode', e.keyCode)

    let keys = {
        32: 'keySpace',
        37: 'keyLeft',
        38: 'keyUp',
        39: 'keyRight',
        40: 'keyDown'
    }

    if (keys[e.keyCode] && typeof window[keys[e.keyCode]] === 'function') {
        window[keys[e.keyCode]](e)
    }

    if (typeof window.keyPressed === 'function') {
        window.keyPressed(e)
    }
}

Draw.prototype.onMousedown = function(e) {
    if (typeof window.mousePressed === 'function') {
        window.mousePressed(e)
    }
}

/*
 * Canvas
 */
let canvas = new class Canvas {
    modeAdjust(a, b, c, d, mode) {
        switch (mode) {
            case 'corner':
                return { x: a, y: b, w: c, h: d }
            case 'corners':
                return { x: a, y: b, w: c-a, h: d-b }
            case 'radius':
                return { x: a-c, y: b-d, w: 2*c, h: 2*d }
            case 'center':
                return { x: a-c*0.5, y: b-d*0.5, w: c, h: d }
        }
    }
}

