// Configuration de la scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

// Caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Rendu
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lumières
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff6b6b, 1, 10);
pointLight1.position.set(2, 3, 4);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 10);
pointLight2.position.set(-2, -1, 3);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0x45b7d1, 1, 10);
pointLight3.position.set(0, 4, 2);
scene.add(pointLight3);

// Étoiles en arrière-plan
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 3000;
const starsPositions = new Float32Array(starsCount * 3);

for (let i = 0; i < starsCount * 3; i += 3) {
    starsPositions[i] = (Math.random() - 0.5) * 100;
    starsPositions[i + 1] = (Math.random() - 0.5) * 100;
    starsPositions[i + 2] = (Math.random() - 0.5) * 100;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Tore animé central
const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff6b6b,
    emissive: 0x442222,
    wireframe: true
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Sphères flottantes représentant les passions
const passionColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xffeaa7];
const passionSpheres = [];

for (let i = 0; i < 5; i++) {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshStandardMaterial({ 
        color: passionColors[i],
        emissive: 0x222222
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    // Position aléatoire autour du tore
    const angle = (i / 5) * Math.PI * 2;
    sphere.position.x = Math.cos(angle) * 2.5;
    sphere.position.y = Math.sin(angle) * 1.5;
    sphere.position.z = Math.sin(angle) * 1;
    
    sphere.userData = {
        angle: angle,
        speed: 0.01 + Math.random() * 0.01,
        radius: 2.5 + Math.random() * 0.5,
        yOffset: Math.sin(angle) * 1.5
    };
    
    scene.add(sphere);
    passionSpheres.push(sphere);
}

// Particules magiques
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    // Position aléatoire dans une sphère
    const radius = 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    posArray[i] = Math.sin(phi) * Math.cos(theta) * radius;
    posArray[i + 1] = Math.sin(phi) * Math.sin(theta) * radius;
    posArray[i + 2] = Math.cos(phi) * radius;
    
    // Couleurs aléatoires
    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.5);
    colorsArray[i] = color.r;
    colorsArray[i + 1] = color.g;
    colorsArray[i + 2] = color.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Animation
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;
    
    // Rotation du tore
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.0025;
    
    // Mouvement des sphères
    passionSpheres.forEach((sphere, index) => {
        const data = sphere.userData;
        data.angle += data.speed;
        
        sphere.position.x = Math.cos(data.angle + index) * data.radius;
        sphere.position.y = Math.sin(data.angle + index) * 1.5 + Math.sin(time * 2 + index) * 0.3;
        sphere.position.z = Math.sin(data.angle + index) * 1 + Math.cos(time * 2 + index) * 0.3;
    });
    
    // Rotation des étoiles
    stars.rotation.y += 0.0002;
    
    // Rotation des particules
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.0005;
    
    // Mouvement de la caméra
    camera.position.x = Math.sin(time * 0.1) * 5;
    camera.position.z = Math.cos(time * 0.1) * 5;
    camera.lookAt(0, 1, 0);
    
    renderer.render(scene, camera);
}

animate();

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
