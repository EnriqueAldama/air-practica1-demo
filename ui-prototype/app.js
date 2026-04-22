document.addEventListener('DOMContentLoaded', () => {
    function showDemoToast(message) {
        const existing = document.querySelector('.login-demo-toast');
        if (existing) {
            existing.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'login-demo-toast';
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            left: '50%',
            bottom: '18px',
            transform: 'translateX(-50%)',
            background: 'rgba(17, 24, 39, 0.95)',
            color: '#ffffff',
            borderLeft: '4px solid #cb0017',
            padding: '10px 12px',
            borderRadius: '10px',
            font: "600 13px/1.35 'Inter', sans-serif",
            zIndex: '9999',
            boxShadow: '0 8px 22px rgba(0, 0, 0, 0.35)'
        });

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2200);
    }

    
    // Toggle Fallback logic
    const toggleBtn = document.getElementById('toggle-fallback');
    const fallbackContainer = document.getElementById('fallback-container');
    const ssoButtons = document.querySelector('.sso-buttons');
    
    if(toggleBtn && fallbackContainer && ssoButtons) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (fallbackContainer.classList.contains('hidden')) {
                fallbackContainer.classList.remove('hidden');
                ssoButtons.style.display = 'none';
                toggleBtn.textContent = 'Volver a Opciones SSO';
            } else {
                fallbackContainer.classList.add('hidden');
                ssoButtons.style.display = 'flex';
                toggleBtn.textContent = '¿No puedes acceder al SSO?';
            }
        });
    }

    const languageOptions = document.querySelectorAll('.lang-selector span');
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            languageOptions.forEach(item => item.classList.remove('active'));
            option.classList.add('active');
            showDemoToast(`Idioma de demo cambiado a ${option.textContent.trim()}`);
        });
    });

    const loginHelpLinks = document.querySelectorAll('.text-link.dark-link, .app-footer a');
    loginHelpLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoToast('Opcion informativa disponible en la version final.');
        });
    });

    // Interactive Ripple Effect
    const buttons = document.querySelectorAll('.ripple');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const circle = document.createElement('span');
            circle.classList.add('ripple-circle');
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            this.appendChild(circle);

            setTimeout(() => {
                circle.remove();
            }, 600);
        });
    });

    // Loading overlay logic for SSO Buttons
    const ssoBtns = document.querySelectorAll('.sso-btn, .primary-btn');
    const loadingOverlay = document.getElementById('loading-overlay');

    ssoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loading
            loadingOverlay.classList.remove('hidden');

            // Simulate SSO Redirect or auth process
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');

                const acceptedTerms = localStorage.getItem('sendaTermsAccepted') === 'true';
                if (acceptedTerms) {
                    window.location.href = 'mockup_rutas.html';
                    return;
                }

                window.location.href = 'mockup_terminos.html';
            }, 2000);
        });
    });
});
