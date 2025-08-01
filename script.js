// Trishul Advanced Systems - Interactive JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormHandling();
    initModalSystem();
    initPerformanceOptimizations();
}

// ===========================
// NAVIGATION SYSTEM
// ===========================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional - uncomment if desired)
        /*
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
    }, { passive: true });
    
    // Active navigation link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// SCROLL EFFECTS
// ===========================

function initScrollEffects() {
    // Smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect for hero section
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        }, { passive: true });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.tech-card, .usecase-card, .command-feature, .mission-point');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===========================
// DYNAMIC ANIMATIONS
// ===========================

function initAnimations() {
    // Enhanced radar animation with dynamic elements
    createDynamicRadarElements();
    
    // Typing effect for hero title
    initTypingEffect();
    
    // Counter animation for stats
    initCounterAnimations();
    
    // Command center data stream animation
    initCommandCenterAnimations();
}

function createDynamicRadarElements() {
    const radarContainer = document.querySelector('.radar-container');
    if (!radarContainer) return;
    
    // Add more dynamic radar dots
    const existingDots = radarContainer.querySelectorAll('.radar-dot');
    const additionalDots = [
        { top: '15%', left: '60%', delay: '0.5s' },
        { top: '80%', left: '40%', delay: '1s' },
        { top: '35%', left: '15%', delay: '1.5s' },
        { top: '55%', left: '85%', delay: '2s' }
    ];
    
    additionalDots.forEach((dotData, index) => {
        const dot = document.createElement('div');
        dot.className = 'radar-dot';
        dot.style.top = dotData.top;
        dot.style.left = dotData.left;
        dot.style.animationDelay = dotData.delay;
        radarContainer.querySelector('.radar-dots').appendChild(dot);
    });
}

function initTypingEffect() {
    const titleMain = document.querySelector('.title-main');
    const titleHighlight = document.querySelector('.title-highlight');
    
    if (titleMain && titleHighlight) {
        const mainText = titleMain.textContent;
        const highlightText = titleHighlight.textContent;
        
        titleMain.textContent = '';
        titleHighlight.textContent = '';
        
        let i = 0, j = 0;
        
        function typeMainText() {
            if (i < mainText.length) {
                titleMain.textContent += mainText.charAt(i);
                i++;
                setTimeout(typeMainText, 100);
            } else {
                setTimeout(typeHighlightText, 300);
            }
        }
        
        function typeHighlightText() {
            if (j < highlightText.length) {
                titleHighlight.textContent += highlightText.charAt(j);
                j++;
                setTimeout(typeHighlightText, 120);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeMainText, 1000);
    }
}

function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    if (text === '24/7') {
        animateTimeCounter(element);
    } else if (text === '360°') {
        animateAngleCounter(element);
    } else if (text === 'AI') {
        animateAICounter(element);
    }
}

function animateTimeCounter(element) {
    let current = 0;
    const target = 24;
    const increment = target / 50;
    
    function update() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '/7';
            requestAnimationFrame(update);
        } else {
            element.textContent = '24/7';
        }
    }
    update();
}

function animateAngleCounter(element) {
    let current = 0;
    const target = 360;
    const increment = target / 50;
    
    function update() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '°';
            requestAnimationFrame(update);
        } else {
            element.textContent = '360°';
        }
    }
    update();
}

function animateAICounter(element) {
    const letters = ['A', 'I'];
    let currentIndex = 0;
    
    element.textContent = '';
    
    function addLetter() {
        if (currentIndex < letters.length) {
            element.textContent += letters[currentIndex];
            currentIndex++;
            setTimeout(addLetter, 500);
        }
    }
    
    addLetter();
}

function initCommandCenterAnimations() {
    const threatIndicators = document.querySelectorAll('.threat-indicator');
    
    // Randomly activate threat indicators
    setInterval(() => {
        threatIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        const randomCount = Math.floor(Math.random() * 3) + 1;
        const randomIndicators = Array.from(threatIndicators)
            .sort(() => 0.5 - Math.random())
            .slice(0, randomCount);
        
        randomIndicators.forEach(indicator => {
            indicator.classList.add('active');
        });
    }, 3000);
}

// ===========================
// MODAL SYSTEM
// ===========================

function initModalSystem() {
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id.replace('-modal', ''));
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal.id.replace('-modal', ''));
            }
        }
    });
}

function openModal(modalType) {
    const modal = document.getElementById(`${modalType}-modal`);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(`${modalType}-modal`);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===========================
// FORM HANDLING
// ===========================

function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Enhanced form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    if (!validateForm(form)) {
    return; // Prevent submission if validation fails
}
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success feedback
            showNotification('Message sent successfully! We\'ll contact you within 24 hours.', 'success');
            form.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear floating labels
            const labels = form.querySelectorAll('label');
            labels.forEach(label => {
                label.style.transform = '';
                label.style.fontSize = '';
                label.style.color = '';
            });
            
        }, 2000);
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(event) {
    const field = event.target || event;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error styling
    field.classList.remove('error');
    removeFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    // Organization validation
    if (fieldName === 'organization' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Organization name must be at least 2 characters long';
        }
    }
    
    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    
    // Add error styling to CSS if not present
    if (!document.querySelector('#error-styles')) {
        const style = document.createElement('style');
        style.id = 'error-styles';
        style.textContent = `
            .form-group input.error,
            .form-group textarea.error {
                border-color: #ff4444 !important;
                box-shadow: 0 0 10px rgba(255, 68, 68, 0.2) !important;
            }
            .field-error {
                color: #ff4444;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                padding-left: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
}

function removeFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearFieldError(event) {
    const field = event.target;
    if (field.classList.contains('error')) {
        field.classList.remove('error');
        removeFieldError(field);
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'organization': 'Organization',
        'email': 'Email Address',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles if not present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: var(--surface-dark);
                border: 1px solid var(--border-accent);
                border-radius: 8px;
                padding: 1rem;
                color: var(--text-primary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            .notification-success {
                border-color: #4caf50;
                background: linear-gradient(135deg, #1a1a1a 0%, #1e3a1e 100%);
            }
            .notification i {
                color: var(--text-accent);
                font-size: 1.2rem;
            }
            .notification-success i {
                color: #4caf50;
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                margin-left: auto;
                padding: 0.2rem;
            }
            .notification-close:hover {
                color: var(--text-accent);
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function downloadConcept() {
    // Simulate concept note download
    showNotification('Concept note download initiated. Please check your downloads folder.', 'success');
    
    // In a real implementation, you would trigger an actual file download
    // const link = document.createElement('a');
    // link.href = './assets/Trishul_Concept_Note.pdf';
    // link.download = 'Trishul_Advanced_Systems_Concept_Note.pdf';
    // link.click();
}

// ===========================
// PERFORMANCE OPTIMIZATIONS
// ===========================

function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Optimize animations for performance
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Video loading optimization
    const heroVideo = document.querySelector('.hero-video video');
    if (heroVideo) {
        heroVideo.addEventListener('loadstart', function() {
            this.play().catch(error => {
                console.log('Auto-play prevented:', error);
            });
        });
    }
}

// ===========================
// GLOBAL FUNCTIONS
// ===========================

// Make functions available globally for HTML onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.downloadConcept = downloadConcept;

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', function(event) {
    console.error('Website Error:', event.error);
    // In production, you might want to send errors to a logging service
});

// ===========================
// INITIALIZATION COMPLETE
// ===========================

console.log('🚀 Trishul Advanced Systems - Website Initialized');
console.log('🛡️ Defense-grade user experience activated');

// Easter egg for developers
console.log(`
    ████████╗██████╗ ██╗███████╗██╗  ██╗██╗   ██╗██╗     
    ╚══██╔══╝██╔══██╗██║██╔════╝██║  ██║██║   ██║██║     
       ██║   ██████╔╝██║███████╗███████║██║   ██║██║     
       ██║   ██╔══██╗██║╚════██║██╔══██║██║   ██║██║     
       ██║   ██║  ██║██║███████║██║  ██║╚██████╔╝███████╗
       ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                         
    Advanced Systems - Autonomy Across Air, Land & Water
`); 
