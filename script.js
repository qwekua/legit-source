// Course data
const courses = [
    "Clothing and Textiles", "Food & Nutrition Plan", "GKA 1&2",
    "English Orals and English Language", "ICT Practicals", "Food and Nutrition",
    "Social Studies", "Financial Accounting", "Physics Alt A, B & C",
    "Management in Living", "Cost Accounting", "History",
    "Literature 1&2", "Government", "Core Maths",
    "Elective Maths", "French", "Chemistry Alt A, B & C",
    "Ewe/Twi/Fante", "Music", "Chemistry",
    "Geography 1, 2 & 3", "Business Management", "Physics",
    "CRS/IRS", "Biology Alt A, B & C", "Integrated Science",
    "ICT 1&2", "Economics"
];

// DOM Elements
const splashLoader = document.getElementById('splashLoader');
const registrationCard = document.getElementById('registrationCard');
const courseCard = document.getElementById('courseCard');
const confirmationOverlay = document.getElementById('confirmationOverlay');
const registrationForm = document.getElementById('registrationForm');
const courseGrid = document.getElementById('courseGrid');
const courseSearch = document.getElementById('courseSearch');
const totalPrice = document.getElementById('totalPrice');
const proceedPaymentBtn = document.getElementById('proceedPaymentBtn');
const returnBtn = document.getElementById('returnBtn');

// State
let selectedCourses = [];
const coursePrice = 500;
let filteredCourses = [...courses];

// Initialize
function init() {
    // Show splash for 2.5 seconds
    setTimeout(() => {
        splashLoader.style.opacity = '0';
        setTimeout(() => {
            splashLoader.classList.add('hidden');
            registrationCard.classList.add('visible');
        }, 500);
    }, 2500);

    populateCourses();
    attachEventListeners();
}

function attachEventListeners() {
    registrationForm.addEventListener('submit', handleRegistration);
    courseSearch.addEventListener('input', handleSearch);
    proceedPaymentBtn.addEventListener('click', handlePayment);
    returnBtn.addEventListener('click', returnToCourses);
}

function handleRegistration(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        indexNumber: document.getElementById('indexNumber').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    
    // Log registration data (in a real app, this would be sent to a server)
    console.log('Registration data:', formData);
    
    // Validate form (basic validation)
    if (!formData.fullName || !formData.email || !formData.password) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Transition to course selection
    registrationCard.classList.remove('visible');
    courseCard.classList.add('visible');
}

function populateCourses() {
    courseGrid.innerHTML = '';
    
    filteredCourses.forEach((course, index) => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <input type="checkbox" class="course-checkbox" id="course-${index}" value="${course}">
            <label class="course-label" for="course-${index}">${course}</label>
            <span class="course-price">₵500</span>
        `;
        
        const checkbox = courseItem.querySelector('input');
        checkbox.addEventListener('change', handleCourseSelection);
        
        // Allow clicking on the entire course item to toggle selection
        courseItem.addEventListener('click', (e) => {
            if (e.target.type !== 'checkbox') {
                checkbox.checked = !checkbox.checked;
                handleCourseSelection({ target: checkbox });
            }
        });
        
        courseGrid.appendChild(courseItem);
    });
}

function handleSearch() {
    const searchTerm = courseSearch.value.toLowerCase();
    filteredCourses = courses.filter(course => 
        course.toLowerCase().includes(searchTerm)
    );
    populateCourses();
    
    // Restore selections for filtered courses
    selectedCourses.forEach(selectedCourse => {
        const checkbox = document.querySelector(`input[value="${selectedCourse}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.closest('.course-item').classList.add('selected');
        }
    });
}

function handleCourseSelection(e) {
    const course = e.target.value;
    const courseItem = e.target.closest('.course-item');
    
    if (e.target.checked) {
        selectedCourses.push(course);
        courseItem.classList.add('selected');
    } else {
        selectedCourses = selectedCourses.filter(c => c !== course);
        courseItem.classList.remove('selected');
    }
    
    updateTotal();
}

function updateTotal() {
    const total = selectedCourses.length * coursePrice;
    totalPrice.textContent = `₵${total.toLocaleString()}`;
    
    // Enable/disable payment button based on selection
    proceedPaymentBtn.disabled = selectedCourses.length === 0;
    if (selectedCourses.length === 0) {
        proceedPaymentBtn.style.opacity = '0.5';
        proceedPaymentBtn.style.cursor = 'not-allowed';
    } else {
        proceedPaymentBtn.style.opacity = '1';
        proceedPaymentBtn.style.cursor = 'pointer';
    }
}

async function handlePayment() {
    if (selectedCourses.length === 0) {
        alert('Please select at least one course');
        return;
    }
    
    try {
        // Disable button during processing
        proceedPaymentBtn.disabled = true;
        proceedPaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Get user data from registration form
        const userData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            indexNumber: document.getElementById('indexNumber').value
        };
        
        // Prepare payment data
        const paymentData = {
            reference: generatePaymentReference(),
            amount: selectedCourses.length * coursePrice,
            currency: 'GHS',
            courses: selectedCourses,
            ...userData
        };
        
        console.log('Initializing Eversend payment with data:', paymentData);
        
        // Initialize Eversend payment
        const paymentResult = await initializeEversendPayment(paymentData);
        
        if (paymentResult.success) {
            // Store successful payment data
            await storePaymentData({
                ...paymentData,
                transactionId: paymentResult.transactionId,
                gateway: 'eversend',
                status: 'completed',
                timestamp: new Date().toISOString()
            });
            
            // Send confirmation email (implement this function)
            await sendConfirmationEmail(paymentData);
            
            // Show success confirmation
            showPaymentSuccess();
        } else {
            throw new Error(paymentResult.message || 'Payment failed');
        }
        
    } catch (error) {
        console.error('Eversend error:', error);
        alert('Payment failed: ' + error.message);
        
        // Reset button on error
        proceedPaymentBtn.innerHTML = '<i class="fas fa-credit-card"></i> Pay with Eversend';
        proceedPaymentBtn.disabled = false;
    }
}

// Eversend Payment Integration
async function initializeEversendPayment(paymentData) {
    // In a production environment, you would typically:
    // 1. Create a payment request on your backend
    // 2. Get a payment link from Eversend
    // 3. Redirect the user to that link
    
    // For demo purposes, we'll simulate this flow
    console.log('Initializing Eversend payment for amount:', paymentData.amount);
    
    // Generate Eversend payment link
    const everSendLink = `https://eversend.me/qweku?amount=${paymentData.amount}&currency=${paymentData.currency}&email=${encodeURIComponent(paymentData.email)}&phone=${encodeURIComponent(paymentData.phoneNumber)}&name=${encodeURIComponent(paymentData.fullName)}&reference=${paymentData.reference}`;
    
    // Open Eversend payment in a new tab
    const paymentWindow = window.open(everSendLink, '_blank');
    
    // For demo purposes, we'll simulate a successful payment after 3 seconds
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real implementation, you would:
            // 1. Set up a webhook to receive payment confirmation
            // 2. Or poll your backend to check payment status
            
            resolve({ 
                success: true,
                transactionId: 'ev_' + Math.random().toString(36).substr(2, 16),
                reference: paymentData.reference,
                gateway: 'eversend'
            });
        }, 3000);
    });
}

// Store payment data (implement backend integration here)
async function storePaymentData(paymentData) {
    try {
        // Replace with your backend API endpoint
        const response = await fetch('/api/store-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to store payment data');
        }
        
        const result = await response.json();
        console.log('Payment data stored:', result);
        return result;
    } catch (error) {
        // For demo, just log to console
        console.log('Would store payment data:', paymentData);
        return { success: true };
    }
}

// Send confirmation email (implement backend integration here)
async function sendConfirmationEmail(paymentData) {
    try {
        // Replace with your backend API endpoint
        const response = await fetch('/api/send-confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: paymentData.email,
                fullName: paymentData.fullName,
                courses: paymentData.courses,
                amount: paymentData.amount,
                reference: paymentData.reference
            }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to send confirmation email');
        }
        
        console.log('Confirmation email sent');
    } catch (error) {
        console.log('Would send confirmation email to:', paymentData.email);
    }
}

// Show payment success animation
function showPaymentSuccess() {
    // Reset button
    proceedPaymentBtn.innerHTML = '<i class="fas fa-credit-card"></i> Pay with Eversend';
    proceedPaymentBtn.disabled = false;
    
    // Show success confirmation
    courseCard.classList.remove('visible');
    confirmationOverlay.classList.add('flex-visible');
}

function returnToCourses() {
    confirmationOverlay.classList.remove('flex-visible');
    courseCard.classList.add('visible');
    
    // Clear all selections
    selectedCourses = [];
    document.querySelectorAll('.course-checkbox').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.closest('.course-item').classList.remove('selected');
    });
    
    // Reset search
    courseSearch.value = '';
    filteredCourses = [...courses];
    populateCourses();
    
    // Update total
    updateTotal();
}

// Generate unique payment reference
function generatePaymentReference() {
    return 'EVP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Initialize the application
init();