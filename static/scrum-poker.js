const w = window.innerWidth, h = window.innerHeight, size = w/7
class ScrumNumber {
    constructor(number,i) {
        this.number = number
        this.createDiv(i)
    }
    createDiv(i) {
        this.div = document.createElement('div')
        this.div.style.background = '#283593'
        this.div.style.width = size
        this.div.style.height = size
        this.div.style.color = 'white'
        this.div.style.fontSize = size/3
        this.div.style.backgroundRadius = size/10
        this.div.style.postion = 'absolute'
        const x_factor = i%3 , y_factor = Math.floor(i/3)
        this.div.style.left = size + (x_factor-1)*2*size
        this.div.style.top = size + (y_factor-1)*2*size
        document.body.appendChild(this.div)
    }
    handleTap(cb) {
        this.div.onclick = (event) => {
            cb(this.number)
        }
    }
}
