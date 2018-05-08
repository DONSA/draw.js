export default class Vector {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }

    multiply(n) {
        this.x *= n || 0
        this.y *= n || 0
        this.z *= n || 0
    }

    distance() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z))
    }
}