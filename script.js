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

// Run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
    const paymentProofForm = document.getElementById('paymentProofForm');

    let selectedCourses = [];
    const coursePrice = 500;

    // Hide all sections except splash loader
    loginForm.style.display = 'none';
    courseSelection.style.display = 'none';
    paymentConfirmation.style.display = 'none';

    // Splash delay
    setTimeout(() => {
        splashLoader.style.opacity = '0';
        setTimeout(() => {
            splashLoader.style.display = 'none';
            loginForm.style.display = 'block';
        }, 500);
    }, 2000);

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

    function updateTotal() {
        selectedCourses = [];
        const checkboxes = document.querySelectorAll('.course-item input[type="checkbox"]:checked');

        checkboxes.forEach(checkbox => {
            selectedCourses.push(checkbox.value);
        });

        const total = selectedCourses.length * coursePrice;
        totalPriceElement.textContent = `₵${total}`;
    }

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const indexNumber = document.getElementById('indexNumber').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Registration:', { fullName, indexNumber, phoneNumber, email, password });

        loginForm.style.display = 'none';
        courseSelection.style.display = 'block';
    });

    paymentProofForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fileInput = document.getElementById('paymentScreenshot');
        if (fileInput.files.length === 0) {
            alert('Please upload a screenshot of your MoMo transaction.');
            return;
        }

        alert('Payment proof submitted. We will verify and email your course PDFs shortly.');

        courseSelection.style.display = 'none';
        paymentConfirmation.style.display = 'block';
    });

    if (returnToCoursesBtn) {
        returnToCoursesBtn.addEventListener('click', function () {
            paymentConfirmation.style.display = 'none';
            courseSelection.style.display = 'block';

            document.querySelectorAll('.course-item input[type="checkbox"]').forEach(cb => cb.checked = false);
            selectedCourses = [];
            totalPriceElement.textContent = '₵0';
        });
    }

    populateCourseList();
});
