// The SAGE Blueprint - Main JavaScript Functionality - Gold Color Scheme

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeInteractiveComponents();
    initializeScrollEffects();
    initializeForms();
});

// Animation initialization using Anime.js
function initializeAnimations() {
    // Hero section fade-in animation
    anime({
        targets: '.hero-content',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutQuart',
        delay: 300
    });

    // Value proposition cards animation
    anime({
        targets: '.value-card',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutQuart',
        delay: anime.stagger(200, {start: 600})
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Navigation functionality
function initializeNavigation() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Sticky navigation
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Interactive components
function initializeInteractiveComponents() {
    // Sage directory search functionality
    initializeSageSearch();
    
    // Home assessment quiz
    initializeAssessmentQuiz();
    
    // Book preview functionality
    initializeBookPreview();
    
    // Certification application form
    initializeCertificationForm();
    
    // Image galleries
    initializeImageGalleries();
}

// Sage directory search
function initializeSageSearch() {
    const searchForm = document.querySelector('#sage-search-form');
    const searchResults = document.querySelector('#sage-search-results');
    const sageDatabase = [
        {
            id: 1,
            name: "Sarah Mitchell",
            credentials: "CAPS, LEED AP",
            location: "Portland, OR",
            specialties: ["Bathroom Design", "Kitchen Modifications", "Smart Home Tech"],
            distance: "2.3 miles",
            rating: 4.9,
            image: "resources/designer-avatar-1.jpg",
            portfolio: ["resources/sage-portfolio-1.jpg", "resources/sage-portfolio-2.jpg"],
            bio: "Certified Aging in Place Specialist with 15 years of experience creating beautiful, accessible homes.",
            contact: "sarah@sagemitchell.com"
        },
        {
            id: 2,
            name: "Robert Chen",
            credentials: "CAPS, AIA",
            location: "Seattle, WA",
            specialties: ["Universal Design", "New Construction", "Renovations"],
            distance: "8.7 miles",
            rating: 4.8,
            image: "resources/designer-avatar-2.jpg",
            portfolio: ["resources/sage-portfolio-2.jpg", "resources/sage-portfolio-3.jpg"],
            bio: "Architect specializing in universal design principles for aging in place.",
            contact: "robert@rchendesign.com"
        },
        {
            id: 3,
            name: "Emma Rodriguez",
            credentials: "CAPS, ASID",
            location: "San Francisco, CA",
            specialties: ["Interior Design", "Lighting Design", "Technology Integration"],
            distance: "12.1 miles",
            rating: 4.9,
            image: "resources/designer-avatar-3.jpg",
            portfolio: ["resources/sage-portfolio-3.jpg", "resources/sage-portfolio-1.jpg"],
            bio: "Interior designer focused on creating beautiful, functional spaces for aging in place.",
            contact: "emma@rodriguezdesign.com"
        }
    ];

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const zipCode = document.querySelector('#zip-code').value;
            const radius = document.querySelector('#radius').value;
            const specialty = document.querySelector('#specialty').value;
            
            // Filter results based on search criteria
            let filteredSages = sageDatabase;
            
            if (specialty && specialty !== 'all') {
                filteredSages = filteredSages.filter(sage => 
                    sage.specialties.includes(specialty)
                );
            }
            
            displaySageResults(filteredSages);
        });
    }

    function displaySageResults(sages) {
        if (!searchResults) return;
        
        searchResults.innerHTML = '';
        
        if (sages.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <h3>No Sages found in your area</h3>
                    <p>Would you like to expand your search radius or join our waitlist?</p>
                    <button onclick="expandSearch()" class="btn btn-secondary">Expand Search</button>
                    <button onclick="joinWaitlist()" class="btn btn-primary">Join Waitlist</button>
                </div>
            `;
            return;
        }
        
        sages.forEach(sage => {
            const sageCard = document.createElement('div');
            sageCard.className = 'sage-card';
            sageCard.innerHTML = `
                <div class="sage-card-header">
                    <img src="${sage.image}" alt="${sage.name}" class="sage-avatar">
                    <div class="sage-info">
                        <h3>${sage.name}</h3>
                        <p class="credentials">${sage.credentials}</p>
                        <p class="location">${sage.location} • ${sage.distance}</p>
                        <div class="rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-value">${sage.rating}</span>
                        </div>
                    </div>
                </div>
                <div class="sage-specialties">
                    ${sage.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
                <p class="sage-bio">${sage.bio}</p>
                <div class="sage-actions">
                    <button onclick="viewPortfolio(${sage.id})" class="btn btn-secondary">View Portfolio</button>
                    <button onclick="requestConsultation(${sage.id})" class="btn btn-primary">Request Consultation</button>
                </div>
            `;
            searchResults.appendChild(sageCard);
        });
    }
}

// Home assessment quiz
function initializeAssessmentQuiz() {
    const quizContainer = document.querySelector('#assessment-quiz');
    if (!quizContainer) return;

    const questions = [
        {
            id: 1,
            question: "Does your home have any steps at the main entrance?",
            options: ["Yes, multiple steps", "Yes, one step", "No, it's step-free", "Not sure"],
            category: "accessibility"
        },
        {
            id: 2,
            question: "Are your doorways at least 32 inches wide?",
            options: ["Yes, all doorways", "Most doorways", "Some doorways", "No, they're narrower"],
            category: "accessibility"
        },
        {
            id: 3,
            question: "Do you have grab bars in your bathroom?",
            options: ["Yes, in shower and by toilet", "Only in the shower", "Planning to install", "No"],
            category: "safety"
        },
        {
            id: 4,
            question: "Is your lighting adequate for nighttime navigation?",
            options: ["Excellent throughout", "Good in main areas", "Needs improvement", "Poor"],
            category: "lighting"
        },
        {
            id: 5,
            question: "Do you have non-slip flooring in wet areas?",
            options: ["Yes, throughout", "In bathroom only", "In kitchen only", "No"],
            category: "safety"
        }
    ];

    let currentQuestion = 0;
    let answers = {};

    function renderQuestion() {
        const question = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <div class="quiz-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentQuestion + 1) / questions.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">Question ${currentQuestion + 1} of ${questions.length}</span>
                </div>
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <label class="quiz-option">
                            <input type="radio" name="question-${question.id}" value="${index}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="quiz-navigation">
                    ${currentQuestion > 0 ? '<button type="button" onclick="previousQuestion()" class="btn btn-secondary">Previous</button>' : ''}
                    <button type="button" onclick="nextQuestion()" class="btn btn-primary" ${currentQuestion === questions.length - 1 ? 'onclick="finishQuiz()"' : ''}>
                        ${currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                    </button>
                </div>
            </div>
        `;
    }

    window.nextQuestion = function() {
        const selectedAnswer = document.querySelector(`input[name="question-${questions[currentQuestion].id}"]:checked`);
        if (selectedAnswer) {
            answers[questions[currentQuestion].id] = parseInt(selectedAnswer.value);
            currentQuestion++;
            if (currentQuestion < questions.length) {
                renderQuestion();
            }
        } else {
            alert('Please select an answer before continuing.');
        }
    };

    window.previousQuestion = function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    };

    window.finishQuiz = function() {
        const results = calculateResults();
        displayResults(results);
    };

    function calculateResults() {
        let scores = { accessibility: 0, safety: 0, lighting: 0 };
        let maxScores = { accessibility: 8, safety: 6, lighting: 4 };
        
        questions.forEach(question => {
            const answer = answers[question.id] || 0;
            scores[question.category] += (4 - answer) * 2;
        });
        
        return {
            accessibility: Math.round((scores.accessibility / maxScores.accessibility) * 100),
            safety: Math.round((scores.safety / maxScores.safety) * 100),
            lighting: Math.round((scores.lighting / maxScores.lighting) * 100),
            overall: Math.round(((scores.accessibility + scores.safety + scores.lighting) / (maxScores.accessibility + maxScores.safety + maxScores.lighting)) * 100)
        };
    }

    function displayResults(results) {
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <h3>Your Home Assessment Results</h3>
                <div class="results-overview">
                    <div class="overall-score">
                        <div class="score-circle">
                            <svg viewBox="0 0 36 36" class="circular-chart">
                                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                <path class="circle" stroke-dasharray="${results.overall}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                            </svg>
                            <div class="score-text">${results.overall}%</div>
                        </div>
                        <p>Overall Home Readiness</p>
                    </div>
                </div>
                <div class="category-scores">
                    <div class="category-score">
                        <span class="category-name">Accessibility</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${results.accessibility}%"></div>
                        </div>
                        <span class="score-value">${results.accessibility}%</span>
                    </div>
                    <div class="category-score">
                        <span class="category-name">Safety</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${results.safety}%"></div>
                        </div>
                        <span class="score-value">${results.safety}%</span>
                    </div>
                    <div class="category-score">
                        <span class="category-name">Lighting</span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${results.lighting}%"></div>
                        </div>
                        <span class="score-value">${results.lighting}%</span>
                    </div>
                </div>
                <div class="results-actions">
                    <p>Get a detailed report with personalized recommendations</p>
                    <form class="email-capture">
                        <input type="email" placeholder="Enter your email for detailed results" required>
                        <button type="submit" class="btn btn-primary">Get My Report</button>
                    </form>
                    <button onclick="findSages()" class="btn btn-secondary">Find Certified Sages</button>
                </div>
            </div>
        `;
    }

    // Start the quiz
    renderQuestion();
}

// Book preview functionality
function initializeBookPreview() {
    const previewButton = document.querySelector('#book-preview-btn');
    const previewModal = document.querySelector('#book-preview-modal');
    
    if (previewButton && previewModal) {
        previewButton.addEventListener('click', function() {
            previewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        previewModal.addEventListener('click', function(e) {
            if (e.target === previewModal) {
                previewModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Certification application form
function initializeCertificationForm() {
    const applicationForm = document.querySelector('#certification-application');
    if (!applicationForm) return;

    let currentStep = 1;
    const totalSteps = 4;

    function showStep(step) {
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        document.querySelector(`#step-${step}`).classList.add('active');
        
        // Update progress
        document.querySelector('.progress-fill').style.width = `${(step / totalSteps) * 100}%`;
        document.querySelector('.step-indicator').textContent = `Step ${step} of ${totalSteps}`;
    }

    window.nextStep = function() {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    };

    window.prevStep = function() {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    };

    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission
        showSuccessMessage();
    });
}

// Image galleries
function initializeImageGalleries() {
    const galleries = document.querySelectorAll('.image-gallery');
    
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        let currentImage = 0;
        
        // Add navigation if multiple images
        if (images.length > 1) {
            const prevBtn = document.createElement('button');
            const nextBtn = document.createElement('button');
            
            prevBtn.className = 'gallery-nav prev';
            nextBtn.className = 'gallery-nav next';
            prevBtn.innerHTML = '‹';
            nextBtn.innerHTML = '›';
            
            gallery.appendChild(prevBtn);
            gallery.appendChild(nextBtn);
            
            prevBtn.addEventListener('click', () => {
                currentImage = (currentImage - 1 + images.length) % images.length;
                updateGalleryDisplay();
            });
            
            nextBtn.addEventListener('click', () => {
                currentImage = (currentImage + 1) % images.length;
                updateGalleryDisplay();
            });
            
            function updateGalleryDisplay() {
                images.forEach((img, index) => {
                    img.style.display = index === currentImage ? 'block' : 'none';
                });
            }
            
            updateGalleryDisplay();
        }
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Parallax effect for hero sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImages = document.querySelectorAll('.hero-image');
        
        heroImages.forEach(img => {
            const speed = 0.5;
            img.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Form handling
function initializeForms() {
    // Email capture forms
    document.querySelectorAll('.email-capture').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            showSuccessMessage('Thank you! We\'ll send you the detailed report shortly.');
        });
    });

    // Contact forms
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage('Thank you for your message. We\'ll get back to you soon!');
        });
    });
}

// Utility functions
function showSuccessMessage(message) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-content">
            <h3>Success!</h3>
            <p>${message}</p>
            <button onclick="closeModal()" class="btn btn-primary">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
    }
}

function expandSearch() {
    alert('Search radius expanded to 100 miles. More Sages may be available.');
}

function joinWaitlist() {
    const email = prompt('Enter your email to join our waitlist:');
    if (email) {
        showSuccessMessage('You\'ve been added to our waitlist. We\'ll notify you when Sages are available in your area.');
    }
}

function viewPortfolio(sageId) {
    alert(`Viewing portfolio for Sage ${sageId}. This would open a detailed portfolio view.`);
}

function requestConsultation(sageId) {
    alert(`Requesting consultation with Sage ${sageId}. This would open a consultation booking form.`);
}

function findSages() {
    window.location.href = 'find-sage.html';
}