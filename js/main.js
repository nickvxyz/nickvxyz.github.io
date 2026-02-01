/**
 * ============================================
 * BRUTALIST PORTFOLIO - MAIN JAVASCRIPT
 * ============================================
 * Handles:
 * - Theme switching (light/dark) with localStorage persistence
 * - Banner rotation with alert shake animation
 * ============================================
 */

(function() {
    'use strict';

    // =========================================
    // THEME SWITCHER
    // =========================================

    const THEME_KEY = 'portfolio-theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    /**
     * Get the current theme from localStorage or system preference
     * @returns {string} 'dark' or 'light'
     */
    function getStoredTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) {
            return stored;
        }
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }
        return LIGHT_THEME;
    }

    /**
     * Apply theme to the document
     * @param {string} theme - 'dark' or 'light'
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButton(theme);
    }

    /**
     * Update the toggle button text based on current theme
     * @param {string} theme - 'dark' or 'light'
     */
    function updateToggleButton(theme) {
        const toggleText = document.querySelector('.theme-toggle__text');
        if (toggleText) {
            toggleText.textContent = theme === DARK_THEME ? 'LIGHT' : 'DARK';
        }
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    }

    /**
     * Initialize theme switcher
     */
    function initThemeSwitcher() {
        // Apply stored/system theme on load
        const theme = getStoredTheme();
        applyTheme(theme);

        // Bind toggle button
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only update if user hasn't manually set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                }
            });
        }
    }

    // =========================================
    // BANNER ROTATION
    // =========================================

    const BANNER_DISPLAY_TIME = 2500;  // How long each banner shows (ms)
    const BANNER_FADE_TIME = 300;      // Fade transition duration (ms)
    const SHAKE_DURATION = 300;        // Shake animation duration (ms)

    let banners = [];
    let currentBannerIndex = 0;
    let isTransitioning = false;
    let rotationInterval = null;

    /**
     * Show a specific banner with shake animation
     * @param {number} index - Index of banner to show
     */
    function showBanner(index) {
        if (isTransitioning || banners.length === 0) return;
        isTransitioning = true;

        // Hide current active banner
        const currentBanner = document.querySelector('.banner.active');
        if (currentBanner) {
            currentBanner.classList.remove('active');
            currentBanner.classList.remove('shake');
        }

        // Show new banner after brief delay for fade
        setTimeout(() => {
            const nextBanner = banners[index];
            if (!nextBanner) {
                isTransitioning = false;
                return;
            }

            nextBanner.classList.add('active');

            // Trigger shake animation after the element is visible
            // Using double requestAnimationFrame to ensure the browser has painted
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    nextBanner.classList.add('shake');

                    // Remove shake class after animation completes
                    setTimeout(() => {
                        nextBanner.classList.remove('shake');
                        isTransitioning = false;
                    }, SHAKE_DURATION);
                });
            });
        }, BANNER_FADE_TIME / 2);
    }

    /**
     * Advance to the next banner
     */
    function nextBanner() {
        currentBannerIndex = (currentBannerIndex + 1) % banners.length;
        showBanner(currentBannerIndex);
    }

    /**
     * Initialize banner rotation
     */
    function initBannerRotation() {
        banners = document.querySelectorAll('.banner');

        if (banners.length === 0) return;

        // Show first banner immediately
        banners[0].classList.add('active');

        // Trigger initial shake after a brief delay
        setTimeout(() => {
            banners[0].classList.add('shake');
            setTimeout(() => {
                banners[0].classList.remove('shake');
            }, SHAKE_DURATION);
        }, 100);

        // Start rotation interval
        rotationInterval = setInterval(nextBanner, BANNER_DISPLAY_TIME + BANNER_FADE_TIME);
    }

    /**
     * Clean up banner rotation (for SPAs or page unload)
     */
    function destroyBannerRotation() {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationInterval = null;
        }
    }

    // =========================================
    // INITIALIZATION
    // =========================================

    /**
     * Initialize all functionality when DOM is ready
     */
    function init() {
        initThemeSwitcher();
        initBannerRotation();
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Clean up on page unload
    window.addEventListener('beforeunload', destroyBannerRotation);

})();
