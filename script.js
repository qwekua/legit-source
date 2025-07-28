// Courses data
const courses = [
    "Clothing and Textiles",
    "Food & Nutrition Plan",
    "GKA 1&2",
    "English Orals and English Language",
    "ICT Practicals",
    "Food and Nutrition",
    "Social Studies",
    "Financial Accounting",
    "Physics Alt A, B & C",
    "Management in Living",
    "Cost Accounting",
    "History",
    "Literature 1&2",
    "Government",
    "Core Maths",
    "Elective Maths",
    "French",
    "Chemistry Alt A, B & C",
    "Ewe/Twi/Fante",
    "Music",
    "Chemistry",
    "Geography 1, 2 & 3",
    "Business Management",
    "Physics",
    "CRS/IRS",
    "Biology Alt A, B & C",
    "Integrated Science",
    "ICT 1&2",
    "Economics"
];

// DOM Elements
const splashLoader = document.getElementById('splashLoader');
const loginForm = document.getElementById('loginForm');
const courseSelection = document.getElementById('courseSelection');
const paymentConfirmation = document.getElementById('paymentConfirmation');
const registrationForm = document.getElementById('registrationForm');
const courseList = document.getElementById('courseList');
const totalPriceElement = document.getElementById('totalPrice');
const makePaymentBtn = document.getElementById('makePaymentBtn');
const returnToCoursesBtn = document.getElementById('returnToCoursesBtn');

// Variables
let selectedCourses = [];
const coursePrice = 500;

// Initialize the page
function init() {
    // Hide all sections except splash loader
    loginForm.style.display = 'none';
    courseSelection.style.display = 'none';
    paymentConfirmation.style.display = 'none';
    
    // Show splash loader for 2 seconds
    setTimeout(() => {
        splashLoader.style.opacity = '0';
        setTimeout(() => {
            splashLoader.style.display = 'none';
            showLoginForm();
        }, 500);
    }, 2000);
    
    // Populate course list
    populateCourseList();
    
    // Event listeners
    registrationForm.addEventListener('submit', handleRegistration);
    makePaymentBtn.addEventListener('click', handlePayment);
    returnToCoursesBtn.addEventListener('click', returnToCourses);
}

// Show login form
function showLoginForm() {
    loginForm.style.display = 'block';
}

// Handle registration form submission
function handleRegistration(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const indexNumber = document.getElementById('indexNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // In a real app, you would validate and send to server here
    console.log('Registration data:', { fullName, indexNumber, phoneNumber, email, password });
    
    // Hide login form and show course selection
    loginForm.style.display = 'none';
    courseSelection.style.display = 'block';
}

// Populate course list
function populateCourseList() {
    courseList.innerHTML = '';
    
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = course.replace(/\s+/g, '-').toLowerCase();
        checkbox.value = course;
        checkbox.addEventListener('change', updateTotal);
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = course;
        
        courseItem.appendChild(checkbox);
        courseItem.appendChild(label);
        courseList.appendChild(courseItem);
    });
}


// Update total price
function updateTotal() {
    selectedCourses = [];
    const checkboxes = document.querySelectorAll('.course-item input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedCourses.push(checkbox.value);
    });
    
    const total = selectedCourses.length * coursePrice;
    totalPriceElement.textContent = `₵${total}`;
}

// Handle payment
function handlePayment() {
    if (selectedCourses.length === 0) {
        alert('Please select at least one course');
        return;
    }
    
    // In a real app, you would process payment here
    console.log('Selected courses:', selectedCourses);
    console.log('Total amount:', `₵${selectedCourses.length * coursePrice}`);
    
    // Show payment confirmation
    courseSelection.style.display = 'none';
    paymentConfirmation.style.display = 'flex';
}

// Return to courses from confirmation
function returnToCourses() {
    paymentConfirmation.style.display = 'none';
    courseSelection.style.display = 'block';
    
    // Clear selections
    document.querySelectorAll('.course-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    selectedCourses = [];
    totalPriceElement.textContent = '₵0';
}

// Initialize the app
init();




// Replace the handlePayment function with this updated version
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

// Generate unique payment reference
function generatePaymentReference() {
    return 'EVP_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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