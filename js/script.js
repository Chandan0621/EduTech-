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
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', dateOptions);

});
