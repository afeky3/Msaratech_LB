document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // MODIFICATION: Select the container of the buttons instead of just one button
    const navButtons = document.querySelector('.nav-buttons');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Clone and show login/signup buttons in mobile menu
        if (navMenu.classList.contains('active')) {
            // Check if the buttons are already there to avoid duplicates
            if (!navMenu.querySelector('.nav-buttons')) {
                const mobileNavButtons = navButtons.cloneNode(true);
                navMenu.appendChild(mobileNavButtons);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; // Stop if no slider exists

    const dotsContainer = document.querySelector('.pagination-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slider = document.querySelector('.hero-slider');
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 5000; // 5 seconds

    // Create dots for each slide
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide(); // Reset timer when a dot is clicked
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to show a specific slide
    function goToSlide(slideIndex) {
        // Ensure slideIndex is valid
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        } else if (slideIndex >= slides.length) {
            slideIndex = 0;
        }

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        if(dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }
        currentSlide = slideIndex;
    }

    // Next slide function
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide function
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide functionality
    function startAutoSlide() {
        // Prevent multiple intervals from running
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // Button events
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        }
    });

    // Initialize
    startAutoSlide();
});