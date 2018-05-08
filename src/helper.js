
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

Array.prototype.last = function() {
    return this[this.length - 1]
}