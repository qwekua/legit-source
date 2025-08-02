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
const coursePrice = 250;

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
    
    // Payment screenshot upload handler
    const paymentScreenshot = document.getElementById('paymentScreenshot');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (paymentScreenshot) {
        paymentScreenshot.addEventListener('change', handleFileSelection);
    }
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', handleScreenshotUpload);
    }
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
    
    // Update payment amount in MoMo section
    const paymentAmountElement = document.getElementById('paymentAmount');
    if (paymentAmountElement) {
        paymentAmountElement.textContent = total;
    }
}

// Handle payment
function handlePayment() {
    if (selectedCourses.length === 0) {
        alert('Please select at least one course');
        return;
    }
    
    // Show MoMo payment section
    const momoSection = document.getElementById('momoSection');
    momoSection.style.display = 'block';
    
    // Scroll to payment section
    momoSection.scrollIntoView({ behavior: 'smooth' });
    
    console.log('Selected courses:', selectedCourses);
    console.log('Total amount:', `₵${selectedCourses.length * coursePrice}`);
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

// Handle file selection (enable/disable upload button)
function handleFileSelection(e) {
    const file = e.target.files[0];
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            showMessage('Please upload a valid image file (JPEG, PNG, or GIF)', 'error');
            e.target.value = '';
            uploadBtn.disabled = true;
            return;
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            showMessage('File size must be less than 5MB', 'error');
            e.target.value = '';
            uploadBtn.disabled = true;
            return;
        }
        
        // Enable upload button if file is valid
        uploadBtn.disabled = false;
        uploadBtn.textContent = '📤 Submit Payment Proof';
        
        // Remove any existing error messages
        const existingMessages = document.querySelectorAll('.error-message');
        existingMessages.forEach(msg => msg.remove());
        
    } else {
        uploadBtn.disabled = true;
    }
}

// Handle screenshot upload
function handleScreenshotUpload() {
    const paymentScreenshot = document.getElementById('paymentScreenshot');
    const uploadBtn = document.getElementById('uploadBtn');
    const file = paymentScreenshot.files[0];
    
    if (!file) {
        showMessage('Please select a file first', 'error');
        return;
    }
    
    // Show loading state
    uploadBtn.disabled = true;
    uploadBtn.textContent = '⏳ Uploading...';
    paymentScreenshot.classList.add('file-uploading');
    
    // Simulate upload process
    setTimeout(() => {
        paymentScreenshot.classList.remove('file-uploading');
        uploadBtn.textContent = '✅ Uploaded Successfully';
        uploadBtn.style.backgroundColor = '#4caf50';
        
        showMessage('Payment screenshot uploaded successfully! We will verify your payment shortly.', 'success');
        
        // Show confirmation after a delay
        setTimeout(() => {
            courseSelection.style.display = 'none';
            paymentConfirmation.style.display = 'flex';
        }, 2000);
    }, 1500);
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    // Insert message before MoMo section
    const momoSection = document.getElementById('momoSection');
    momoSection.parentNode.insertBefore(messageDiv, momoSection);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Initialize the app
init();
