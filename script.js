document.getElementById('makePaymentBtn').addEventListener('click', function () {
    alert("Redirecting to Eversend for payment...");
    document.getElementById("paymentConfirmation").style.display = "flex";
});

document.getElementById('returnToCoursesBtn').addEventListener('click', function () {
    document.getElementById("paymentConfirmation").style.display = "none";
});
