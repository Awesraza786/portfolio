// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function () {

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        if (mobileThemeToggle) {
            mobileThemeToggle.checked = savedTheme === 'dark';
        }
    } else {
        // Check if user prefers dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', prefersDark);
        if (mobileThemeToggle) {
            mobileThemeToggle.checked = prefersDark;
        }
    }

    // Toggle theme function
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        if (mobileThemeToggle) {
            mobileThemeToggle.checked = isDark;
        }
    }

    // Event listeners for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('change', function () {
            body.classList.toggle('dark-mode', this.checked);
            localStorage.setItem('theme', this.checked ? 'dark' : 'light');
        });
    }

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuIcon = mobileMenuBtn?.querySelector('i');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');

            // Toggle icon between bars and X
            if (mobileMenuIcon) {
                if (mobileMenu.classList.contains('active')) {
                    mobileMenuIcon.classList.remove('fa-bars');
                    mobileMenuIcon.classList.add('fa-times');
                } else {
                    mobileMenuIcon.classList.remove('fa-times');
                    mobileMenuIcon.classList.add('fa-bars');
                }
            }

            // Disable body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (mobileMenu && mobileMenuIcon) {
                mobileMenu.classList.remove('active');
                mobileMenuIcon.classList.remove('fa-times');
                mobileMenuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only process for in-page links, not links like "#" used for buttons
            const target = this.getAttribute('href');
            if (target !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    if (backToTopBtn) {
        window.addEventListener('scroll', toggleBackToTopButton);

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Update active state on buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-categories').split(' ');
                        if (categories.includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });

            // Validate name
            if (!name.value.trim() || name.value.length < 2) {
                document.getElementById('name-error').textContent = 'Name must be at least 2 characters';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }

            // Validate subject
            if (!subject.value.trim() || subject.value.length < 5) {
                document.getElementById('subject-error').textContent = 'Subject must be at least 5 characters';
                document.getElementById('subject-error').style.display = 'block';
                isValid = false;
            }

            // Validate message
            if (!message.value.trim() || message.value.length < 10) {
                document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }

            // If valid, simulate form submission
            if (isValid) {
                // In a real application, you would send this data to a server
                console.log('Form submitted:', {
                    name: name.value,
                    email: email.value,
                    subject: subject.value,
                    message: message.value
                });

                // Show success message (in a real app, this would be after receiving success response from server)
                alert('Thank you for your message! I will get back to you soon.');

                // Reset form
                contactForm.reset();
            }
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Animate skill bars on scroll
    const animateSkills = function () {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const parent = bar.parentElement.parentElement;
            const percent = parent.querySelector('.skill-info').querySelector('.skill-level').textContent;

            // Check if element is in viewport
            const position = bar.getBoundingClientRect();
            if (position.top < window.innerHeight && position.bottom >= 0) {
                // Animate the skill bar based on percentage
                bar.style.width = bar.style.width || bar.parentElement.getAttribute('style').match(/width: (\d+)%/)[1] + '%';
            }
        });
    };

    // Run animation on load and scroll
    window.addEventListener('scroll', animateSkills);
    animateSkills();



});


