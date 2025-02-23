// 创建星星背景
function createStars() {
    const stars = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        stars.appendChild(star);
    }
}

// 创建更多的星星层
function createStarLayers() {
    const layers = document.querySelectorAll('.stars');
    layers.forEach(layer => {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            layer.appendChild(star);
        }
    });
}

// 更新CSS样式
function updateStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .tarot-card {
            position: absolute;
            width: 80px;
            height: 140px;
            transform-origin: center center;
        }
        
        .card-face {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
            background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .card-glow {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background: radial-gradient(circle at 50% 50%, 
                rgba(255, 255, 255, 0.3), 
                transparent 70%);
            opacity: 0.3;
        }
        
        .stars {
            position: absolute;
            width: 100%;
            height: 100%;
            /* 移除任何可能的动画和变换 */
            transform: none;
            animation: none;
        }
    `;
    document.head.appendChild(style);
}

// 初始化
window.addEventListener('load', () => {
    createStarLayers();
    updateStyles();
});

// 窗口大小改变时重新初始化
window.addEventListener('resize', () => {
    const container = document.querySelector('.tarot-cards');
    container.innerHTML = '';
});

createStars();

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取按钮和 toast 元素
    const launchBtn = document.querySelector('.launch-btn');
    const toast = document.getElementById('toast');
    
    // 添加点击事件
    launchBtn.addEventListener('click', function() {
        // 显示 toast
        toast.classList.add('show');
        
        // 3秒后隐藏
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });

    // 页面滚动动画观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    // 观察所有页面容器
    document.querySelectorAll('.container').forEach(container => {
        observer.observe(container);
    });
}); 