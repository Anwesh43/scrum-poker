const w = window.innerWidth, h = window.innerHeight, size = w/7
class ScrumNumber {
    constructor(number,i,div) {
        this.number = number
        this.createDiv(i,div)
    }
    createDiv(i,container) {
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
        container.appendChild(this.div)
    }
    handleTap(cb) {
        this.div.onclick = (event) => {
            cb(this.number)
        }
    }
}
class ScrumNumberContainer {
    constructor() {
        this.scrums = []
        this.createContainer()
        this.createScrums()
    }
    createContainer() {
        this.container = document.createElement('div')
        this.container.style.position = 'absolute'
        this.container.style.left = 0
        this.container.style.top = 0
        this.container.style.width = w
        this.container.style.height = h
        this.container.style.background = '#212121'
        document.body.appendChild(this.container)
    }
    createScrums() {
        var a = 0,b = 1,c  = 0
        for(i=1;i<=11;i++) {
            c = a+b
            const scrum = new ScrumNumber(c,i,this.container)
            this.scrums = new Scrum()
        }
    }
    update(scale) {
        this.container.style.transform = this.container.style.transform || this.container.style.webkitTransform || this.container.style.mozTransform
        this.container.style.transform = `rotateY(${180*scale})`
    }
}
