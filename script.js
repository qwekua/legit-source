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

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const splashLoader = document.getElementById('splashLoader');
    const loginForm = document.getElementById('loginForm');
    const courseSelection = document.getElementById('courseSelection');
    const momoSection = document.getElementById('momoSection');
    const paymentConfirmation = document.getElementById('paymentConfirmation');
    const registrationForm = document.getElementById('registrationForm');
    const courseList = document.getElementById('courseList');
    const totalPriceElement = document.getElementById('totalPrice');
    const makePaymentBtn = document.getElementById('makePaymentBtn');
    const returnToCoursesBtn = document.getElementById('returnToCoursesBtn');
    const paymentScreenshot = document.getElementById('paymentScreenshot');

    let selectedCourses = [];
    const coursePrice = 250;
    let momoShown = false;

    // Hide splash screen after 2 seconds, show login
    setTimeout(() => {
        splashLoader.style.display = 'none';
        loginForm.style.display = 'block';
    }, 2000);

    // Render course checkboxes dynamically
    courses.forEach(course => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = course;
        checkbox.id = course;

        const label = document.createElement('label');
        label.htmlFor = course;
        label.textContent = course;

        const container = document.createElement('div');
        container.appendChild(checkbox);
        container.appendChild(label);

        courseList.appendChild(container);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedCourses.push(course);
            } else {
                selectedCourses = selectedCourses.filter(c => c !== course);
            }
            totalPriceElement.textContent = `₵${selectedCourses.length * coursePrice}`;
        });
    });

    // Registration submit: go to course selection
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        courseSelection.style.display = 'block';
    });

    // Make Payment button logic
    if (makePaymentBtn) {
        makePaymentBtn.addEventListener('click', () => {
            if (selectedCourses.length === 0) {
                alert("Please select at least one course before proceeding.");
                return;
            }

            if (!momoShown) {
                momoSection.style.display = 'block';
                momoShown = true;
                window.scrollTo({ top: momoSection.offsetTop, behavior: 'smooth' });
                return;
            }

            if (!paymentScreenshot.files[0]) {
                alert("Please upload a screenshot of your MoMo payment.");
                return;
            }

            // Simulate success
            courseSelection.style.display = 'none';
            paymentConfirmation.style.display = 'block';
        });
    }

    // Return to course selection
    if (returnToCoursesBtn) {
        returnToCoursesBtn.addEventListener('click', () => {
            paymentConfirmation.style.display = 'none';
            courseSelection.style.display = 'block';
        });
    }
});
