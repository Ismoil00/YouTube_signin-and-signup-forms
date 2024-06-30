const form = document.getElementById("log");
const goToLogin = document.getElementById("goToLogin");
const otherPages = document.querySelectorAll(".otherPages");
const passIcons = document.querySelectorAll(".log__inputPasswordIcon");
const toggleForms = document.getElementById("toggleForms");
const navbar = document.getElementById("navbar");
const menu = document.getElementById("menu");
let isLogin = true;

form.addEventListener("submit", (e) => e.preventDefault());

goToLogin.addEventListener("click", () => {
  form.style.display = "flex";
  isLogin = true;
  conversion();

  if (window.innerWidth > 640) return;

  openAndCloseMenu(false);
});

otherPages.forEach((page) => {
  page.addEventListener("click", () => {
    form.style.display = "none";

    if (window.innerWidth > 640) return;

    openAndCloseMenu(false);
  });
});

menu.addEventListener("click", () =>
  openAndCloseMenu(menu.classList.contains("fa-bars"))
);

function openAndCloseMenu(isClosed) {
  navbar.classList.remove(isClosed ? "moveUpNavbar" : "moveDownNavbar");
  navbar.classList.add(isClosed ? "moveDownNavbar" : "moveUpNavbar");

  menu.classList.remove(isClosed ? "counterClockwise" : "clockwise");
  menu.classList.add(isClosed ? "clockwise" : "counterClockwise");

  menu.classList.toggle("fa-bars");
  menu.classList.toggle("fa-x");
}

toggleForms.addEventListener("click", conversion);

function conversion() {
  if (toggleForms.classList.contains("reveal")) return;

  const logText = document.getElementById("logText");
  const submitBtnText = document.getElementById("submitBtnText");
  const otherLogText = document.getElementById("otherLogMethodsText");
  const haveAccount = document.getElementById("haveAccount");
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const passConf = document.getElementById("passConf");
  const actions = document.getElementById("actions");

  cleanInputsValues();

  [logText, submitBtnText, otherLogText, toggleForms, haveAccount].forEach(
    (el) => el.classList.add("reveal")
  );

  logText.textContent = isLogin ? "Login" : "Register";
  submitBtnText.textContent = isLogin ? "Sign in" : "Sign up";
  otherLogText.textContent = `— or sign ${isLogin ? "in" : "up"} with —`;
  toggleForms.textContent = isLogin ? "create an account!" : "sign in";
  haveAccount.textContent = isLogin
    ? "Don't have an account?"
    : "Already have an account?";

  [fullname, email, passConf].forEach((el, i) => {
    el.style.display = isLogin ? "none" : "block";
    el.classList.toggle(i === 0 ? "moveUp" : "moveDown", !isLogin);
  });

  actions.style.display = isLogin ? "flex" : "none";
  actions.classList.toggle("reveal", isLogin);

  isLogin = !isLogin;

  setTimeout(() => {
    [logText, submitBtnText, otherLogText, toggleForms, haveAccount].forEach(
      (el) => el.classList.remove("reveal")
    );
  }, 1000);
}

function cleanInputsValues() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) =>
    input.id === "theCheckbox" ? (input.checked = false) : (input.value = "")
  );
}

/* Password Display */
passIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("fa-eye-slash");
    icon.classList.toggle("fa-eye");
    icon.previousElementSibling.type =
      icon.previousElementSibling.type === "password" ? "text" : "password";
  });
});
