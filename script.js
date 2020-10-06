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
canvas.addEventListener('click', ()=> {
	var range = colors.length; //The range of array values to choose from
	currentScheme = Math.floor(Math.random() * range);
	
	console.log(currentScheme);

    colorsArray = colors[currentScheme];
    circlesArray.forEach(circle => circle.kuler(colorsArray[Math.floor(Math.random() * 5)]));

});
const growthRadius = 50;
canvas.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
})
const colors = [['#56B9D0','#FEFEFE','#FBBA42','#F24C27', '#F8E71D'], ['#2E112D','#540032', '#820333','#C9283E','#F0433A'], ['#537A77','#6A9C98', '#8AB8B4','#58B8B0','#07B0A2']]
let currentScheme = Math.floor(Math.random());
let colorsArray = colors[currentScheme];

class Circle {
    constructor(x,y,radius,dx,dy) {
        this.color = colorsArray[Math.floor(Math.random() * 5)];
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
        if(this.x > canvas.width - this.radius || this.x < this.radius){
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
    kuler(color){
        
        this.color = color;
        
    }
}

const circlesArray = [];
const makeCircles = () => {
    circlesArray.length = 0;
    for(let i = 0; i < 800; i++){
        const rad = Math.floor(Math.random() * 5) + 5;
        const x = Math.floor(Math.random() * (canvas.width-50)) + rad;
        const y = Math.floor(Math.random() * (canvas.height-50)) + rad;
        
        const dx = (Math.floor(Math.random() * 2) + 1) * Math.pow(-1, Math.round(Math.random()));
        const dy = (Math.floor(Math.random() * 2) + 1) * Math.pow(-1, Math.round(Math.random()));
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