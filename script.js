document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const loginBtn = document.querySelector('.login-button');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Clone and show login button in mobile menu
        if (navMenu.classList.contains('active')) {
            const mobileLoginBtn = loginBtn.cloneNode(true);
            mobileLoginBtn.classList.add('mobile');
            if (!document.querySelector('.login-button.mobile')) {
                navMenu.appendChild(mobileLoginBtn);
            }
        } else {
            const mobileBtn = document.querySelector('.login-button.mobile');
            if (mobileBtn) {
                mobileBtn.remove();
            }
        }
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
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
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Function to show a specific slide
    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
            dots[index].classList.toggle('active', index === slideIndex);
        });
        currentSlide = slideIndex;
        resetAutoSlide();
    }

    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function pauseAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null; // Clear the reference
        }
    }
    // Pause on hover
    slider.addEventListener('mouseenter', pauseAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Button events
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Initialize
    startAutoSlide();
});