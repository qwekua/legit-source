<script>
  window.addEventListener("load", function () {
    const splash = document.getElementById("splashLoader");

    // Keep splash fully visible initially
    setTimeout(() => {
      splash.style.opacity = 0; // Start fade out
    }, 3000); // Wait 3 seconds before starting fade

    // Hide after fade out completes
    setTimeout(() => {
      splash.style.display = "none";
      document.querySelector(".form-container").style.display = "block";
    }, 3500); // 0.5s fade + 3s wait
  });


  document.addEventListener("DOMContentLoaded", () => {
    const courseData = [
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

    const courseList = document.getElementById("courseList");
    const totalPriceEl = document.getElementById("totalPrice");
    const makePaymentBtn = document.getElementById("makePaymentBtn");
    const momoSection = document.getElementById("momoSection");
    const paymentConfirmation = document.getElementById("paymentConfirmation");

    // Populate course list
    courseData.forEach(course => {
      const label = document.createElement("label");
      label.className = "course-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "course";
      checkbox.value = 250;

      checkbox.addEventListener("change", updateTotal);
      label.appendChild(checkbox);
      label.append(` ${course}`);
      courseList.appendChild(label);
    });

    function updateTotal() {
      const selected = document.querySelectorAll(".course:checked");
      const total = Array.from(selected).reduce((sum, box) => sum + parseInt(box.value), 0);
      totalPriceEl.textContent = `₵${total}`;
    }

    // Handle registration form
    document.getElementById("registrationForm").addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("courseSelection").style.display = "block";
    });

    makePaymentBtn.addEventListener("click", () => {
      momoSection.style.display = "block";
    });

    document.getElementById("paymentScreenshot").addEventListener("change", () => {
      paymentConfirmation.style.display = "block";
    });

    document.getElementById("returnToCoursesBtn").addEventListener("click", () => {
      paymentConfirmation.style.display = "none";
      momoSection.style.display = "none";
    });
  });
</script>
