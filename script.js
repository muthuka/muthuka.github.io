// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number.loaded');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Remove the automatic trigger - we'll call this after data loads
const statsSection = document.querySelector('.stats');
// Note: Animation will now be triggered from loadGitHubStats()

// Fade in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items animation
document.querySelectorAll('.skill-item').forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(loadingStyle);

// GitHub API Configuration
const GITHUB_USERNAME = 'muthuka';
const GITHUB_API_BASE = 'https://api.github.com';

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_KEY_PREFIX = 'github_stats_';

// Cache helper functions
function getCachedData(key) {
    try {
        const cached = localStorage.getItem(CACHE_KEY_PREFIX + key);
        if (cached) {
            const data = JSON.parse(cached);
            if (Date.now() - data.timestamp < CACHE_DURATION) {
                return data.value;
            }
            localStorage.removeItem(CACHE_KEY_PREFIX + key);
        }
    } catch (error) {
        console.warn('Error reading from cache:', error);
    }
    return null;
}

function setCachedData(key, value) {
    try {
        const data = {
            value: value,
            timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(data));
    } catch (error) {
        console.warn('Error writing to cache:', error);
    }
}

// GitHub API functions
async function fetchGitHubUser() {
    const cacheKey = 'user';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
        const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const userData = await response.json();
        setCachedData(cacheKey, userData);
        return userData;
    } catch (error) {
        console.error('Error fetching GitHub user:', error);
        return null;
    }
}

async function fetchGitHubRepos() {
    const cacheKey = 'repos';
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    try {
        let allRepos = [];
        let page = 1;
        const perPage = 100;

        while (true) {
            const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?page=${page}&per_page=${perPage}&type=public&sort=updated`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const repos = await response.json();
            
            if (repos.length === 0) break;
            allRepos = allRepos.concat(repos);
            
            if (repos.length < perPage) break;
            page++;
        }

        setCachedData(cacheKey, allRepos);
        return allRepos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

async function fetchGitHubStats() {
    try {
        // Fetch user data and repositories in parallel
        const [userData, repos] = await Promise.all([
            fetchGitHubUser(),
            fetchGitHubRepos()
        ]);

        if (!userData || !repos) {
            throw new Error('Failed to fetch GitHub data');
        }

        // Calculate stats
        const stats = {
            publicRepos: userData.public_repos || repos.length,
            totalStars: repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0),
            languages: new Set(repos.map(repo => repo.language).filter(lang => lang !== null)).size,
            commits: 0 // We'll calculate this differently as it requires more API calls
        };

        // For commits, we'll use a simpler approach or estimate
        // Getting exact commit count would require many API calls per repo
        const currentYear = new Date().getFullYear();
        const estimatedCommits = repos.filter(repo => {
            const updatedYear = new Date(repo.updated_at).getFullYear();
            return updatedYear === currentYear;
        }).length * 10; // Rough estimate: 10 commits per updated repo this year

        stats.commits = estimatedCommits;

        return stats;
    } catch (error) {
        console.error('Error calculating GitHub stats:', error);
        // Return fallback stats
        return {
            publicRepos: 0,
            totalStars: 0,
            languages: 0,
            commits: 0
        };
    }
}

// Update stats display
function updateStatDisplay(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        const spinner = element.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
        element.classList.add('loaded');
        element.setAttribute('data-count', value);
        element.textContent = '0'; // Start from 0 for animation
    }
}

// Load and display GitHub stats
async function loadGitHubStats() {
    try {
        const stats = await fetchGitHubStats();
        
        // Update each stat
        updateStatDisplay('repos-count', stats.publicRepos);
        updateStatDisplay('stars-count', stats.totalStars);
        updateStatDisplay('commits-count', stats.commits);
        updateStatDisplay('languages-count', stats.languages);

        // Trigger animation after data is loaded
        setTimeout(() => {
            animateStats();
        }, 100);

    } catch (error) {
        console.error('Error loading GitHub stats:', error);
        
        // Show error state or fallback values
        updateStatDisplay('repos-count', 0);
        updateStatDisplay('stars-count', 0);
        updateStatDisplay('commits-count', 0);
        updateStatDisplay('languages-count', 0);
    }
}

// Initialize GitHub stats when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadGitHubStats();
});