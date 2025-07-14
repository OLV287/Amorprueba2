const canvas = document.getElementById('romantic-canvas');
console.log('Canvas element:', canvas);
const ctx = canvas.getContext('2d');
console.log('Canvas context:', ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const letters = [];

const rose_image = new Image();
rose_image.src = 'https://i.imgur.com/g6D2G3p.png';

const heart_image = new Image();
heart_image.src = 'https://i.imgur.com/C1B4O5v.png';


function Particle(x, y, size, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.weight = this.size / 10;
    this.directionX = -1;

    this.update = function() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = this.size / 10;
            this.x = Math.random() * canvas.width * 1.2;
        }
        this.weight += 0.01;
        this.y += this.weight;
        this.x += this.directionX;
    };

    this.draw = function() {
        if (this.type === 'rose') {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        } else {
            ctx.fillStyle = 'pink';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
    };
}

function init() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        const type = Math.random() > 0.5 ? 'rose' : 'heart';
        particles.push(new Particle(x, y, size, type));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('load', function() {
    init();
    animate();
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    init();
});
