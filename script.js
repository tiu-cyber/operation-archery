// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });
}

// Lukk mobilmeny når ein lenke blir klikka
if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            document.body.style.overflow = 'auto';
        });
    });
}

// Aktiver navigasjonslenkje basert på gjeldande side
document.addEventListener('DOMContentLoaded', () => {
    console.log('Operation Archery nettside lasta');
    
    // Legg til aktiv klasse for gjeldande side
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Animer statistikken på hjemmesiden
    if (document.querySelector('.hero-stats')) {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const originalText = stat.textContent;
            if (originalText.includes('+')) {
                const number = parseInt(originalText);
                let current = 0;
                const increment = number / 20;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        clearInterval(timer);
                        stat.textContent = originalText;
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, 50);
            }
        });
    }
    
    // Lag hover-effekt for kort
    const cards = document.querySelectorAll('.quick-link-card, .about-card, .game-card, .info-card, .schedule-card, .value-card, .partner-card, .choice-card, .equipment-card, .rule-card, .contact-method-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Alarmfunksjon (for kontakt-skjema)
function showAlert(message, type) {
    // Fjern eksisterande alarmar
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Lag alarm-element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    // Legg til på sida
    document.body.appendChild(alert);
    
    // Legg til stil
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    if (type === 'success') {
        alert.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#ef4444';
    }
    
    // Legg til lukkeknapp funksjonalitet
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    });
    
    // Fjern automatisk etter 5 sekund
    setTimeout(() => {
        if (alert.parentNode) {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
    
    // Legg til animasjonar
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}