class ParticleField {
    constructor() {
        console.log('ParticleField constructor called');
        try {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
            this.renderer = new THREE.WebGLRenderer({ 
                alpha: true,
                antialias: true
            });
            this.particleCount = 2000;
            this.init();
        } catch (error) {
            console.error('Error in constructor:', error);
        }
    }

    init() {
        console.log('Init method called');
        try {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000, 0);
            
            const container = document.querySelector('.container');
            if (!container) {
                console.error('Container not found!');
                return;
            }
            
            container.appendChild(this.renderer.domElement);
            
            const canvas = this.renderer.domElement;
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '1';
            canvas.style.pointerEvents = 'none';
            
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(this.particleCount * 3);
            
            const screenRatio = window.innerWidth / window.innerHeight;
            const width = 1500 * screenRatio;
            const height = 1500;
            
            for (let i = 0; i < this.particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * width;
                positions[i * 3 + 1] = (Math.random() - 0.5) * height;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            // 调整粒子材质以增强亮度
            const material = new THREE.PointsMaterial({
                size: 4,  // 增大粒子尺寸
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.9,  // 增加不透明度
                blending: THREE.AdditiveBlending,
                depthWrite: false  // 禁用深度写入以增强发光效果
            });
            
            this.particles = new THREE.Points(geometry, material);
            this.scene.add(this.particles);
            
            this.camera.position.z = 1500;
            
            window.addEventListener('resize', () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
            });
            
            this.animate();
        } catch (error) {
            console.error('Error in init:', error);
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        const time = Date.now() * 0.00005;
        const positions = this.particles.geometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += Math.sin(time + positions[i + 1] * 0.0005) * 0.1;
            positions[i + 1] += Math.cos(time + positions[i] * 0.0005) * 0.1;
        }
        
        this.particles.geometry.attributes.position.needsUpdate = true;
        this.particles.rotation.z = time * 0.05;
        
        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('load', () => {
    console.log('Window loaded');
    if (typeof THREE === 'undefined') {
        console.error('THREE is not defined!');
        return;
    }
    console.log('THREE.js is loaded');
    new ParticleField();
}); 