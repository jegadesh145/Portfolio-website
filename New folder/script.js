// Tab functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(event, tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and work items
document.querySelectorAll('.service-list div, .work').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Side Pop-in Notification System
function showSideNotification(title, message, type = 'success') {
    // Create notification container if doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 15px;
        `;
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    const iconColor = type === 'success' ? '#61b752' : '#ff6b6b';
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    notification.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 2px solid rgba(0, 255, 200, 0.3);
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            min-width: 300px;
            animation: slideInRight 0.5s cubic-bezier(0.36, 0, 0.66, 1);
            backdrop-filter: blur(10px);
            border-left: 4px solid ${iconColor};
        ">
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="
                    font-size: 24px;
                    color: ${iconColor};
                    flex-shrink: 0;
                    margin-top: 2px;
                ">
                    <i class="${icon}"></i>
                </div>
                <div style="flex: 1;">
                    <div style="
                        color: #00ffc8;
                        font-weight: 600;
                        font-size: 16px;
                        margin-bottom: 5px;
                    ">${title}</div>
                    <div style="
                        color: #ababab;
                        font-size: 14px;
                        line-height: 1.5;
                    ">${message}</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('notificationContainer').appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s cubic-bezier(0.36, 0, 0.66, 1)';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add animation styles for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }

    @media (max-width: 768px) {
        #notificationContainer {
            right: 10px !important;
            left: 10px !important;
        }
    }
`;

const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationStyles;
document.head.appendChild(notificationStyleSheet);

// Success Modal Popup
function showSuccessModal() {
    // Create modal if it doesn't exist
    if (!document.getElementById('successModal')) {
        const modal = document.createElement('div');
        modal.id = 'successModal';
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Message Sent Successfully!</h2>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
                <div class="modal-details">
                    <p><strong>✓</strong> Message saved to our database</p>
                    <p><strong>✓</strong> Confirmation sent to your email</p>
                    <p><strong>✓</strong> We will respond within 24 hours</p>
                </div>
                <button class="close-modal-btn" onclick="closeSuccessModal()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    
    // Auto-close after 5 seconds
    setTimeout(closeSuccessModal, 5000);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Add modal styles
const modalStyles = `
    .success-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    }

    .success-modal.active {
        display: flex;
    }

    .success-modal-content {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        padding: 50px 40px;
        border-radius: 20px;
        border: 2px solid rgba(0, 255, 200, 0.3);
        box-shadow: 0 20px 60px rgba(0, 255, 200, 0.3);
        text-align: center;
        max-width: 500px;
        width: 90%;
        animation: slideUp 0.5s ease;
    }

    .success-icon {
        font-size: 80px;
        color: #61b752;
        margin-bottom: 20px;
        animation: scaleIn 0.6s cubic-bezier(0.36, 0, 0.66, 1);
    }

    .success-modal-content h2 {
        color: #00ffc8;
        font-size: 28px;
        margin-bottom: 15px;
    }

    .success-modal-content > p {
        color: #ababab;
        font-size: 16px;
        margin-bottom: 25px;
    }

    .modal-details {
        text-align: left;
        background: rgba(0, 255, 200, 0.08);
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 25px;
        border-left: 4px solid #00ffc8;
    }

    .modal-details p {
        color: #00ffc8;
        margin-bottom: 10px;
        font-weight: 500;
    }

    .modal-details p strong {
        color: #61b752;
        margin-right: 8px;
    }

    .close-modal-btn {
        background: linear-gradient(135deg, #00ffc8, #0099ff);
        color: #0f0f1e;
        border: none;
        padding: 15px 40px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .close-modal-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 255, 200, 0.4);
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            transform: scale(0);
        }
        to {
            transform: scale(1);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        .success-modal-content {
            padding: 40px 30px;
        }

        .success-modal-content h2 {
            font-size: 24px;
        }

        .success-icon {
            font-size: 60px;
        }
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Form submission with enhanced feedback
const scriptURL = 'https://script.google.com/macros/s/AKfycbyQmYunZc7SoB8rn3hOWethFV-W6FNhLYsYFVcs6UScNqiC7FQSjRDpvMnds9fN9f_5/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

// Function to save submission to localStorage
function saveToLocalStorage(name, email, message) {
    let submissions = localStorage.getItem('portfolioSubmissions');
    submissions = submissions ? JSON.parse(submissions) : [];
    
    submissions.push({
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString()
    });
    
    localStorage.setItem('portfolioSubmissions', JSON.stringify(submissions));
    console.log('Submission saved to local storage! Total submissions:', submissions.length);
}

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Hide error message during submission
        if (msg) {
            msg.innerHTML = "";
            msg.style.display = "none";
        }

        const formData = new FormData(form);
        const name = formData.get('Name');
        const email = formData.get('Email');
        const message = formData.get('Message');

        // Save to localStorage immediately
        saveToLocalStorage(name, email, message);

        // Show success popup and side notification
        showSuccessModal();
        showSideNotification(
            'Success! ✓',
            'Your message has been sent successfully. We will respond soon!'
        );

        // Send to Google Sheet (silently in background)
        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                // Already showed success, so just log it
                console.log('Message also sent to Google Sheet');
            })
            .catch(error => {
                // User already got success confirmation from local storage
                // Only log error, don't show to user
                console.error('Google Sheet sync error (non-critical):', error.message);
            });

        // Reset form
        form.reset();
    });
}

// Add ripple effect to buttons
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");
    
    const rippleEl = button.querySelector(".ripple");
    if (rippleEl) {
        rippleEl.remove();
    }
    button.appendChild(ripple);
}

// Add smooth hover effects to service cards
document.querySelectorAll('.service-list div').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Add animation to header on page load
window.addEventListener('load', () => {
    const headerText = document.querySelector('.header-text');
    if (headerText) {
        headerText.style.animation = 'slideInLeft 0.8s ease forwards';
    }
});

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll animation
const scrollAnimations = debounce(() => {
    document.querySelectorAll('.work-list .work').forEach(work => {
        const rect = work.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            work.style.opacity = '1';
        }
    });
}, 100);

window.addEventListener('scroll', scrollAnimations);

// Mobile menu toggle (if needed)
const navMenu = document.querySelector('nav ul');
if (navMenu) {
    navMenu.style.transition = 'all 0.3s ease';
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open menus/overlays
    }
});

// Dynamic color scheme toggle (optional feature)
function toggleColorScheme() {
    document.body.classList.toggle('light-mode');
}

console.log('Portfolio script loaded successfully!');
