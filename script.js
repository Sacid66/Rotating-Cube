const bgColorInput = document.getElementById('bg-color');
const audioPlayer = document.getElementById('audio-player');
const musicSelect = document.getElementById('music');
const cube = document.getElementById('cube');

let isDragging = false;
let startX, startY, lastX, lastY, currentRotX = 0, currentRotY = 0;
let velocityX = 0, velocityY = 0;
let lastMouseMoveTime = Date.now();

bgColorInput.addEventListener('input', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

musicSelect.addEventListener('change', (e) => {
    audioPlayer.src = e.target.value;
    audioPlayer.play();
});

cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lastX = e.clientX;
    lastY = e.clientY;
    lastMouseMoveTime = Date.now();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        velocityX = deltaX;
        velocityY = deltaY;
        currentRotY += deltaX * 0.5;
        currentRotX -= deltaY * 0.5;
        cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
        lastX = e.clientX;
        lastY = e.clientY;
        lastMouseMoveTime = Date.now();
    }
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
});

document.addEventListener('mouseleave', (e) => {
    isDragging = false;
});

function animate() {
    const currentTime = Date.now();
    if (!isDragging) {
        if (velocityX !== 0 || velocityY !== 0) {
            currentRotY += velocityX * 0.05;
            currentRotX -= velocityY * 0.05;
            velocityX *= 0.95;
            velocityY *= 0.95;
            if (Math.abs(velocityX) < 0.01) velocityX = 0;
            if (Math.abs(velocityY) < 0.01) velocityY = 0;
        }
        if (velocityX === 0 && velocityY === 0) {
            currentRotY += 0.1;
        }
        cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    }
    requestAnimationFrame(animate);
}

animate();
