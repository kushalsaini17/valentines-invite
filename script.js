// Check if device is laptop/desktop
function checkDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
    
    if (isMobile || isTablet || window.innerWidth < 1024) {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        font-family: 'Segoe UI', sans-serif; padding: 20px; text-align: center;">
                <div style="background: white; padding: 40px; border-radius: 20px; 
                            box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 500px;">
                    <h1 style="color: #e74c3c; font-size: 32px; margin-bottom: 20px;">💻 Laptop Only! 💻</h1>
                    <p style="color: #333; font-size: 18px; line-height: 1.6;">
                        This special invitation can only be opened on a laptop or desktop computer.
                    </p>
                    <p style="color: #e74c3c; font-size: 16px; margin-top: 20px;">
                        Please open this on your laptop! 💕
                    </p>
                </div>
            </div>
        `;
        return false;
    }
    return true;
}

// Check device on page load
if (!checkDevice()) {
    throw new Error('Mobile device detected');
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const userId = document.getElementById('userId').value;
    
    // Check if password matches (case-insensitive)
    if (password.toLowerCase() === 'kushalawadhsaini') {
        // Hide login page and show landing page
        document.getElementById('loginPage').classList.remove('active');
        document.getElementById('landingPage').classList.add('active');
    } else {
        // Shake the form to indicate wrong password
        const loginBox = document.querySelector('.login-box');
        loginBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginBox.style.animation = '';
        }, 500);
        alert('Wrong password! Try again 💕');
    }
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// No button hover effect - make it run away
const noBtn = document.getElementById('noBtn');
const modal = document.querySelector('.modal');

noBtn.addEventListener('mouseenter', function() {
    const modalRect = modal.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random position within the modal
    const maxX = modalRect.width - btnRect.width - 40;
    const maxY = 150; // Keep it in the button area
    
    const randomX = Math.random() * maxX - (maxX / 2);
    const randomY = Math.random() * maxY - 75;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Yes button - trigger celebration
document.getElementById('yesBtn').addEventListener('click', function() {
    // Hide the modal
    document.querySelector('.modal-overlay').style.display = 'none';
    
    // Create celebration
    createFireworks();
    createBalloons();
    
    // Show success message after a short delay
    setTimeout(() => {
        showSuccessMessage();
    }, 2000);
});

// Create fireworks effect
function createFireworks() {
    const celebration = document.getElementById('celebration');
    const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.1);
            
            // Create burst of particles
            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (Math.PI * 2 * j) / 30;
                const velocity = 50 + Math.random() * 100;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                
                celebration.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }
        }, i * 300);
    }
    
    // Continue fireworks for 5 seconds
    const fireworkInterval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.1);
        
        for (let j = 0; j < 20; j++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * j) / 20;
            const velocity = 40 + Math.random() * 80;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            celebration.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }, 400);
    
    setTimeout(() => clearInterval(fireworkInterval), 5000);
}

// Create balloons rising from bottom
function createBalloons() {
    const celebration = document.getElementById('celebration');
    const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3', '#ff6348', '#2ed573'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = (Math.random() * 100) + '%';
            balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
            balloon.style.setProperty('--rotate', (Math.random() * 60 - 30) + 'deg');
            balloon.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            celebration.appendChild(balloon);
            
            setTimeout(() => balloon.remove(), 5000);
        }, i * 200);
    }
}

// Show success message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <h1>💖 Yay! 💖</h1>
        <p>I knew you'd say yes!</p>
        <p>Happy Valentine's Week, Babe! 💕</p>
    `;
    document.body.appendChild(message);
}
