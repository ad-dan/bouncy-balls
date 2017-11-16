const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;
window.addEventListener('resize', (e)=>{
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight;
    makeCircles();
});
const mouse = {
    x: undefined,
    y: undefined
}
const growthRadius = 50;
canvas.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})
const colorsArray = ['#56B9D0','#FEFEFE','#FBBA42','#F24C27', '#F8E71D'];

class Circle {
    constructor(x,y,radius,dx,dy) {
        this.color = colorsArray[Math.floor(Math.random() * 4)];
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rad = radius;
        this.dx = dx;
        this.dy = dy;
    }
    draw(){
        ctx.beginPath();
        this.checkMouse();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
        this.update();
    }
    checkMouse(){
        if(this.x < mouse.x + 50 && this.y < mouse.y + 50 && this.y > mouse.y-50 && this.x > mouse.x -50) {
            this.radius = 30;
        } else {
            this.radius = this.rad;
        }
    }
    update(){
        if(this.x > canvas.width - this.radius || this.x < 0 + this.radius){
           this.dx = -(this.dx);
           this.x += this.dx;
        } else {
            this.x += this.dx;
        }
        if(this.y > canvas.height - this.radius || this.y < this.radius){
            this.dy = -(this.dy);
            this.y += this.dy;  
        } else {
            this.y += this.dy;

        }
    }
}

const circlesArray = [];
const makeCircles = () => {
    circlesArray.length = 0;
    for(let i = 0; i < 800; i++){
        const x = Math.floor(Math.random() * window.innerWidth) + 10;
        const y = Math.floor(Math.random() * window.innerHeight) + 10;
        const rad = Math.floor(Math.random() * 5) + 5;
        const dx = Math.floor(Math.random() * 2) + 1;
        const dy = Math.floor(Math.random() * 2) + 1;
        circlesArray.push(new Circle(x,y,rad,dx,dy));
    }
}
makeCircles();

const animate = () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = '#3B3F42';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    circlesArray.forEach(circle => circle.draw());
}
animate();
setInterval(animate, 16); // Glorious Masterrace