document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    setCurrentYear();
    setupMobileMenu();
    setupHeaderScrollEffect();
    setupDarkModeToggle();
    loadSkillsData();
    setupSmoothScrolling();
    setupProjectFilter();
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Mobile menu toggle with enhanced functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                document.body.classList.remove('no-scroll');
            });
        });
    }
}

// Header scroll effect with throttle for performance
function setupHeaderScrollEffect() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    const scrollThreshold = 50;

    if (header) {
        window.addEventListener('scroll', throttle(function() {
            const currentScroll = window.scrollY;
            
            // Scroll down effect
            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
                
                // Hide header on scroll down
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, 100));
    }
}

// Dark mode toggle with localStorage persistence
function setupDarkModeToggle() {
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (!toggleBtn) return;

    // Check for saved user preference or system preference
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (localStorage.getItem('darkMode') !== 'disabled' && prefersDarkScheme.matches)) {
        enableDarkMode();
    }

    // Toggle dark mode
    toggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Watch for system preference changes
    prefersDarkScheme.addListener(e => {
        if (localStorage.getItem('darkMode') === null) {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Skills data loading with dynamic rendering
function loadSkillsData() {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;

    const skillsData = [
        { icon: 'fab fa-html5', name: 'HTML5', level: '90%' },
        { icon: 'fab fa-css3-alt', name: 'CSS3', level: '85%' },
        { icon: 'fab fa-js', name: 'JavaScript', level: '80%' },
        { icon: 'fab fa-java', name: 'Java', level: '75%' },
        { icon: 'fab fa-python', name: 'Python', level: '70%' },
        { icon: 'fab fa-react', name: 'React', level: '75%' },
        { icon: 'fas fa-database', name: 'SQL', level: '80%' },
        { icon: 'fab fa-node-js', name: 'Node.js', level: '70%' }
    ];

    skillsData.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        skillElement.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3>${skill.name}</h3>
            <div class="skill-progress">
                <div class="progress-bar" style="width: ${skill.level}"></div>
            </div>
            <span class="skill-level">${skill.level}</span>
        `;
        skillsContainer.appendChild(skillElement);
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Project filtering functionality
function setupProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Throttle function for performance optimization
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations after everything is loaded
window.addEventListener('load', function() {
    setupScrollAnimations();
});