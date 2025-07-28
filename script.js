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
