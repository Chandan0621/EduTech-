document.addEventListener('DOMContentLoaded', () => {

    // View Switching Logic
    const navItems = document.querySelectorAll('.nav-item');
    const viewSections = document.querySelectorAll('.view-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            switchView(target);
        });
    });

    window.switchView = function (viewId) {
        // Update Nav Active State
        navItems.forEach(nav => {
            if (nav.getAttribute('data-target') === viewId) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });

        // Update View Visibility
        viewSections.forEach(section => {
            if (section.id === `view-${viewId}`) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Scroll to top
        document.getElementById('mainContent').scrollTo(0, 0);
    };

    // Language Toggle Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLang) {
                // Update Button Active State
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Set Lang and Apply
                currentLang = lang;
                applyTranslations(currentLang);
            }
        });
    });

    function applyTranslations(lang) {
        const transData = translations[lang];
        if (!transData) return;

        // Apply HTML content translations
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (transData[key]) {
                el.innerHTML = transData[key];
            }
        });

        // Apply Placeholder translations
        const placeholders = document.querySelectorAll('[data-key-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-key-placeholder');
            if (transData[key]) {
                el.setAttribute('placeholder', transData[key]);
            }
        });
    }

    // Modal Logic
    window.openModal = function (modalId) {
        document.getElementById(modalId).classList.add('active');
    };

    window.closeModal = function (modalId) {
        document.getElementById(modalId).classList.remove('active');
    };

    // Close modal on outside click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // Set Initial Date in Dashboard
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateElem = document.getElementById('currentDate');
    if (dateElem) dateElem.textContent = new Date().toLocaleDateString('en-US', dateOptions);

    // ==========================================
    // DEMO LOGIN LOGIC
    // ==========================================
    const googleBtn = document.getElementById('googleSignInBtn');
    const emailBtn = document.getElementById('emailSignInBtn');

    function handleDemoLogin() {
        // Change button text to show loading state
        const originalText = emailBtn.innerHTML;
        emailBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
        if (googleBtn) googleBtn.style.opacity = '0.5';

        // Simulate network request delay (1.5 seconds)
        setTimeout(() => {
            // Update UI to reflect logged-in state
            const headerGreeting = document.querySelector('.welcome-banner h1');
            if (headerGreeting) headerGreeting.innerHTML = 'Hello, Student! <span>👋</span>';

            // Change profile icon to green to indicate active session
            const profileIcon = document.querySelector('.profile-pic i');
            if (profileIcon) {
                profileIcon.classList.remove('fa-regular');
                profileIcon.classList.add('fa-solid');
                document.querySelector('.profile-pic').style.color = 'var(--secondary)';
                document.querySelector('.profile-pic').style.borderColor = 'var(--secondary)';
            }

            // Close modal and reset buttons
            closeModal('authModal');
            emailBtn.innerHTML = originalText;
            if (googleBtn) googleBtn.style.opacity = '1';

            // Show a simple alert welcoming the user
            alert("Demo Login Successful! Your progress will now be tracked locally during this session.");
        }, 1500);
    }

    if (googleBtn) googleBtn.addEventListener('click', handleDemoLogin);
    if (emailBtn) emailBtn.addEventListener('click', handleDemoLogin);

});
