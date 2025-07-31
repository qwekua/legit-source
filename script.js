<script>
  window.addEventListener("load", function () {
    const splash = document.getElementById("splashLoader");
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
      document.querySelector(".form-container").style.display = "block";
    }, 500);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const courseData = [
      "English Language",
      "Mathematics (Core)",
      "Integrated Science",
      "Social Studies",
      "Biology",
      "Chemistry",
      "Physics",
      "Elective Maths",
      "Economics",
      "Geography",
      "Government",
      "Business Management",
      "Accounting"
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
