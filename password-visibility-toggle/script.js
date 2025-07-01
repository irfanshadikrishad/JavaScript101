document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePasswordButton = document.getElementById("togglePassword");
  const showSpan = document.querySelector(".show");
  const hideSpan = document.querySelector(".hide");

  togglePasswordButton.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showSpan.style.display = "none";
      hideSpan.style.display = "inline";
    } else {
      passwordInput.type = "password";
      showSpan.style.display = "inline";
      hideSpan.style.display = "none";
    }
  });
});
