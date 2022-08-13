// this js file is for create logic of login form

// QUERY SELECTORS START
const btnLogin = document.querySelector(".btn-confirm");
const btnCancel = document.querySelectorAll(".btn-cancel");

const btnLoginToggle = document.querySelectorAll(".input-button-box-login");
const btnSignupToggle = document.querySelectorAll(".input-button-box-signup");

const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");

const loginEmail = document.querySelector("#login-input-email");

const signupEmail = document.querySelector("#signup-input-email");

const buttonRegister = document.querySelector(".button-register");
const buttonLogin = document.querySelector(".button-login");

const wrap = document.querySelector("#wrap");
// QUERY SELECTORS END

// FUNCTIONS START
const login = function (button, type, form, focus = "") {
  const formFunc = function (x) {
    // this function specifies what form of function can be deployed login or register, and what to do.
    if (x === "login") {
      // gives class so that you can see the right one form

      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
      loginEmail.focus();

      //Media query
      wrap.classList.remove("signup-small");
      wrap.classList.add("login-small");

      // Looping all buttons and give class which give property of unactive button
      for (let i = 0; i < btnLoginToggle.length; i++) {
        btnSignupToggle[i].classList.add("btn-unactive");
        btnLoginToggle[i].classList.remove("btn-unactive");
      }
    } else if (x === "register") {
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      signupEmail.focus();

      wrap.classList.remove("login-small");
      wrap.classList.add("signup-small");

      for (let i = 0; i < btnSignupToggle.length; i++) {
        btnLoginToggle[i].classList.add("btn-unactive");
        btnSignupToggle[i].classList.remove("btn-unactive");
      }
    }
  };
  button.addEventListener("click", function () {
    //this listener is for give appropriate animations, focus, opacity, transition, etc. And display selected form
    if (button === buttonRegister) {
    } else if (button === buttonLogin) {
    }

    // button.classList.toggle("disabled");
    if (!form.classList.contains("hidden")) {
      focus.focus();
      return;
    }
    if (focus === "") return;

    if (wrap.style.opacity == 0) {
      formFunc(type);

      wrap.style.zIndex = 5;
      wrap.style.opacity = 100;
    } else wrap.style.opacity = 0;
    setTimeout(() => {
      formFunc(type);

      wrap.style.zIndex = 5;
      wrap.style.opacity = 100;
    }, 400);
  });
};

const loginbtn = function (button) {
  // this function loops selected button and specifies what form is to be displayed
  button.forEach((_, i) => {
    if (button == btnLoginToggle) {
      login(button[i], "login", loginForm, loginEmail);
    } else if (button == btnSignupToggle) {
      login(btnSignupToggle[i], "register", signupForm, signupEmail);
    }
  });
};

btnCancel.forEach((btn, i) => {
  // this function is for close form panel
  btn.addEventListener("click", function () {
    wrap.style.zIndex = -5;
    wrap.style.opacity = 0;
    setTimeout(() => {
      signupForm.classList.add("hidden");
      loginForm.classList.add("hidden");
    }, 400);
  });
});

// FUNCTIONS END

// CALLING FUNCTIONS
loginbtn(btnLoginToggle);
loginbtn(btnSignupToggle);

login(buttonRegister, "register", signupForm, signupEmail);
login(buttonLogin, "login", loginForm, loginEmail);

const loginMediaQuery = function () {
  if (!signupForm.classList.contains("hidden")) {
    wrap.classList.remove("login-small");
    wrap.classList.add("signup-small");
  } else if (!loginForm.classList.contains("hidden")) {
    wrap.classList.remove("signup-small");
    wrap.classList.add("login-small");
  } else {
    wrap.classList.remove("login-small");
    wrap.classList.remove("signup-small");
  }
};

loginMediaQuery();
