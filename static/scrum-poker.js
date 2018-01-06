const w = window.innerWidth, h = window.innerHeight, size = Math.min(w,h)/7
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
        this.div.style.fontSize = size/2
        this.div.style.textAlign = 'center'
        this.div.style.backgroundRadius = size/10
        this.div.style.position = 'absolute'
        const x_factor = i%3 , y_factor = Math.floor(i/3)
        this.div.style.left = size + (x_factor)*2*size
        this.div.style.top = size + (y_factor)*2*size
        this.div.innerHTML = `${this.number}`
        container.appendChild(this.div)
    }
    handleTap(cb) {
        this.div.onclick = (event) => {
            cb(this.number)
            event.stopPropagation()
            console.log(this.number)
        }
    }
}
class ScrumNumberContainer {
    constructor() {
        this.scrums = []
        this.createContainer()
        this.createScrums()
    }
    handleTap(cb) {
        this.scrums.forEach((scrum)=>{
            scrum.handleTap(cb)
        })
    }
    setVisibility() {
        this.container.style.visibility = 'visible'
        this.container.style.transform = 'rotateY(0deg)'
    }
    createContainer() {
        this.container = document.createElement('div')
        this.container.style.position = 'absolute'
        this.container.style.left = 0
        this.container.style.top = 0
        this.container.style.width = Math.min(w,h)
        this.container.style.height = Math.min(w,h)
        this.container.style.background = '#212121'
        document.body.appendChild(this.container)
    }
    createScrums() {
        var a = 0,b = 1,c  = 0
        for(var i=1;i<=11;i++) {
            c = a+b
            const scrum = new ScrumNumber(c,i-1,this.container)
            this.scrums.push(scrum)
            a = b
            b = c
        }
    }
    update(scale) {
        this.container.style.transform = this.container.style.transform || this.container.style.webkitTransform || this.container.style.mozTransform
        this.container.style.transform = `rotateY(${90*scale}deg)`
    }
    stop() {
        this.container.style.visibility = 'hidden'
    }
    start() {
        this.container.style.visibility = 'visible'
    }
}
class State {
    constructor() {
        this.scale = 0
        this.prevScale = 0
        this.prevDir = 1
        this.j = 0
        this.dir = 0
        this.animations = []
    }
    addAnimation(updatecb,stopcb) {
        this.animations.push({updatecb,stopcb})
    }
    update() {
        this.scale += this.dir * 0.1

        if(this.animations[this.j] && this.animations[this.j].updatecb) {
            this.animations[this.j].updatecb(this.scale)
            console.log(this.scale)
        }
        if(Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale
            if(this.animations[this.j] && this.animations[this.j].stopcb) {
                this.animations[this.j].stopcb()
            }
            this.j+=this.dir
            this.dir = 0
            if(this.j == this.animations.length || this.j == -1) {
                this.scale += this.prevDir
                this.prevScale = this.scale
                this.prevDir *= -1
                this.j += this.prevDir
            }
        }
    }
    startUpdating() {
        if(this.dir == 0) {
            this.dir = this.prevDir
        }
    }
}
class Animator {
    constructor() {
        this.animated = false
    }
    startUpdating(startcb,updatecb) {
        if(!this.animated) {
            console.log("started")
            console.log(updatecb)
            console.log(startcb)
            this.animated = true
            startcb()
            this.interval = setInterval(()=>{
                updatecb()
            },50)
        }
    }
    stop() {
        if(this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}
class IndividualNumberContainer {
    constructor() {
        this.createDivs()
    }
    createDivs() {
        this.div = document.createElement('div')
        this.div.style.color = 'white'
        const size1 = Math.min(w,h)/2
        this.div.style.width = size1
        this.div.style.height = size1
        this.div.style.position = 'absolute'
        this.div.style.borderRadius = size1/5
        this.div.style.background = '#283593'
        this.div.style.fontSize = size1/2
        this.div.style.textAlign = 'center'
        this.div.style.top = size1/2
        this.div.style.left = size1/2
        this.container = document.createElement('div')
        this.container.style.width = Math.min(w,h)
        this.container.style.height = Math.min(w,h)
        this.container.style.position = 'absolute'
        this.container.style.background = '#212121'
        this.container.style.top = 0
        this.container.style.left = 0
        document.body.appendChild(this.container)
        this.container.appendChild(this.div)
        this.container.style.visibility = 'hidden'
    }
    update(scale) {
        this.div.style.transform = this.div.style.transform || this.div.style.webkitTransform || this.div.style.mozTransform || this.div.style.oTransform
        this.div.style.transform = `rotateY(${90*(1-scale)}deg)`
        console.log(scale)
    }
    setNumber(number) {
        this.div.innerHTML = `${number}`
    }
    stop() {
        this.container.style.visibility = 'hidden'
        this.div.style.visibility = 'hidden'
    }
    start() {
        this.div.style.visibility = 'visible'
    }
    setVisibility() {
        this.container.style.visibility = 'visible'
        this.div.style.transform = this.div.style.transform || this.div.style.webkitTransform || this.div.style.mozTransform || this.div.style.oTransform
        this.div.style.transform = `rotateY(90deg)`
    }
    handleTap(cb) {
        this.container.onclick = (event) => {
            event.stopPropagation()
            cb()
            this.start()
        }
    }
}
class ScrumContainer {
    constructor() {
        this.snc = new ScrumNumberContainer()
        this.inc = new IndividualNumberContainer()
        this.animator = new Animator()
        this.state = new State()
        this.snc.update = this.snc.update.bind(this.snc)
        this.inc.update = this.inc.update.bind(this.inc)
    }
    handleAnimation() {
        const sncUpdate = (scale) => {
            this.snc.update(scale)
            console.log(scale)
        }
        const incUpdate = (scale) => {
            this.inc.update(scale)
            console.log(scale)
        }
        this.state.addAnimation(sncUpdate,()=>{
            this.inc.setVisibility()
            this.snc.stop()
            this.animator.stop()
        })
        this.state.addAnimation(incUpdate,()=>{
            this.snc.setVisibility()
            this.inc.stop()
            this.animator.stop()
        })
    }
    handleTap() {
        const startcb = () => {
            this.animator.startUpdating(()=>{
                this.state.startUpdating()
                console.log(this.state)
            },()=>{
                this.state.update()
            })
        }
        this.snc.handleTap((number)=>{
          startcb()
          this.inc.setNumber(number)
        })
        this.inc.handleTap(startcb)

    }
}
const scrumContainer = new ScrumContainer()
scrumContainer.handleAnimation()
scrumContainer.handleTap()
