const canvas = document.getElementById('romantic-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const letters = [];

const rose_image = new Image();
rose_image.src = 'https://i.pinimg.com/originals/2c/6c/8d/2c6c8d7b2a121c604e5a3f36151a689c.png';

const heart_image = new Image();
heart_image.src = 'https://i.pinimg.com/originals/8a/a5/8d/8aa58d0554b4e5a0e3c5f2be7e1c8b35.png';


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
            ctx.drawImage(rose_image, this.x, this.y, this.size, this.size);
        } else {
            ctx.drawImage(heart_image, this.x, this.y, this.size, this.size);
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

init();
animate();

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
