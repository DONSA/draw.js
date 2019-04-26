export default class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    set(x, y, z) {
         if (x instanceof Vector) {
            this.x = x.x || 0
            this.y = x.y || 0
            this.z = x.z || 0

            return this
        }

        if (x instanceof Array) {
            this.x = x[0] || 0
            this.y = x[1] || 0
            this.z = x[2] || 0

            return this
        }

        this.x = x || 0
        this.y = y || 0
        this.z = z || 0

        return this
    }

    copy() {
        return new Vector(this.x, this.y, this.z)
    }

    add(x, y, z) {
        if (x instanceof Vector) {
            this.x += x.x || 0
            this.y += x.y || 0
            this.z += x.z || 0

            return this
        }

        if (x instanceof Array) {
            this.x += x[0] || 0
            this.y += x[1] || 0
            this.z += x[2] || 0

            return this
        }

        this.x += x || 0
        this.y += y || 0
        this.z += z || 0

        return this
    }

    subtract(x, y, z) {
        if (x instanceof Vector) {
            this.x -= x.x || 0
            this.y -= x.y || 0
            this.z -= x.z || 0

            return this
        }

        if (x instanceof Array) {
            this.x -= x[0] || 0
            this.y -= x[1] || 0
            this.z -= x[2] || 0

            return this
        }

        this.x -= x || 0
        this.y -= y || 0
        this.z -= z || 0

        return this
    }

    multiply(n) {
        this.x *= n || 0
        this.y *= n || 0
        this.z *= n || 0

        return this
    }

    divide(n) {
        if (!(typeof n === 'number' && isFinite(n))) {
            console.warn('Draw.Vector.prototype.divide:', 'n is undefined or not a finite number')

            return this
        }

        if (n === 0) {
            console.warn('Draw.Vector.prototype.divid:', 'divide by 0')

            return this
        }

        this.x /= n
        this.y /= n
        this.z /= n

        return this
    }

    magnitude() {
        return Math.sqrt(this.magnitudeSquared())
    }

    setMagnitude(n) {
        return this.normalize().multiply(n)
    }

    magnitudeSquared() {
        var x = this.x;
        var y = this.y;
        var z = this.z;

        return x * x + y * y + z * z;
    }

    limit(max) {
        var mSq = this.magnitudeSquared()

        if (mSq > max * max) {
            this
                .divide(Math.sqrt(mSq))
                .multiply(max)
        }

        return this
    }

    distance() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z))
    }

    normalize() {
        var len = this.magnitude()

        // Here we multiply by the reciprocal instead of calling divide()
        // since divide duplicates this zero check.
        if (len !== 0) {
            this.multiply(1 / len)
        }

        return this
    }
}
