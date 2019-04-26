import Draw from './Draw.js'

function init() {
    if (
        typeof window.setup === 'function'
        || typeof window.draw === 'function'
    ) {
        new Draw()
    }
}

window.addEventListener('load', init, false)
