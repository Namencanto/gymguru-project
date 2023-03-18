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

const signupTel = document.querySelector("#register-input-tel");

const buttonRegister = document.querySelector(".button-register");
const buttonLogin = document.querySelector(".button-login");
const buttonSubmitRegister = document.querySelector(".btn-register");

const registerPassword = document.querySelector("#register-input-password");
const registerPasswordCheck = document.querySelector(
  "#register-input-password-check"
);

const allInputs = document.querySelectorAll("input");

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
    wrap.style.opacity = 0;
    setTimeout(() => {
      signupForm.classList.add("hidden");
      loginForm.classList.add("hidden");
      wrap.style.zIndex = -5;

      //clearing inputs
      allInputs.forEach((e) => {
        e.value = "";
      });
    }, 400);
  });
});

const invalidLogin = function (error, form, focus) {
  document.querySelector(error).classList.remove("hidden");

  wrap.style.zIndex = 5;
  wrap.style.opacity = 100;
  form.classList.remove("hidden");
  focus.focus();

  //Media query  if (form === loginForm)
  wrap.classList.remove("signup-small");
  wrap.classList.add("login-small");
  // Looping all buttons and give class which give property of unactive button
  for (let i = 0; i < btnLoginToggle.length; i++) {
    btnSignupToggle[i].classList.add("btn-unactive");
    btnLoginToggle[i].classList.remove("btn-unactive");
  }

  if (form === signupForm) {
    wrap.classList.remove("login-small");
    wrap.classList.add("signup-small");

    for (let i = 0; i < btnSignupToggle.length; i++) {
      btnLoginToggle[i].classList.add("btn-unactive");
      btnSignupToggle[i].classList.remove("btn-unactive");
    }
  }
};

// invalid input message
const invalidEmail = function () {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  //checking cookie exist from node server

  if (getCookie("emailInUse")) {
    // //setting information about email is already used
    // document.querySelector(".emailInUse").classList.remove("hidden");

    // //display register form
    // signupForm.classList.remove("hidden");
    // signupEmail.focus();

    // wrap.classList.remove("login-small");
    // wrap.classList.add("signup-small");

    // for (let i = 0; i < btnSignupToggle.length; i++) {
    //   btnLoginToggle[i].classList.add("btn-unactive");
    //   btnSignupToggle[i].classList.remove("btn-unactive");
    // }
    invalidLogin(".emailInUse", signupForm, signupEmail);
  }
  if (getCookie("invalidLoginPassword")) {
    //setting information about email is already used
    // document
    //   .querySelector(".invalidLoginPassword")
    //   .classList.remove("hidden");

    // loginForm.classList.remove("hidden");
    // loginEmail.focus();

    // //Media query
    // wrap.classList.remove("signup-small");
    // wrap.classList.add("login-small");

    // // Looping all buttons and give class which give property of unactive button
    // for (let i = 0; i < btnLoginToggle.length; i++) {
    //   btnSignupToggle[i].classList.add("btn-unactive");
    //   btnLoginToggle[i].classList.remove("btn-unactive");
    // }

    invalidLogin(".emailInUse", loginForm, loginEmail);
  }
  if (getCookie("NumberInUse")) {
    invalidLogin(".numberInUse", signupForm, signupTel);
  }
};

//Checking passwords
buttonSubmitRegister.addEventListener("click", function () {
  invalidPasswords.forEach((input) => {
    console.log(input);
    if (!input.classList.contains("hidden")) {
      registerPassword.setCustomValidity(
        "It looks like your password doesn't meet the criteria, change it"
      );
    } else {
      registerPassword.setCustomValidity("");
    }
  });
  if (registerPassword.value != registerPasswordCheck.value) {
    registerPasswordCheck.setCustomValidity("Passwords are not the same");
  } else {
    registerPasswordCheck.setCustomValidity("");
  }
});

const invalidPasswordLength = document.querySelector(
  ".invalid-password-length"
);
const invalidPasswordLowercase = document.querySelector(
  ".invalid-password-lowercase"
);
const invalidPasswordUppercase = document.querySelector(
  ".invalid-password-uppercase"
);
const invalidPasswordNumber = document.querySelector(
  ".invalid-password-number"
);
const invalidPasswordSpecial = document.querySelector(
  ".invalid-password-special"
);
const invalidPasswords = document.querySelectorAll(".invalid-password");

const clearInvalids = function () {
  invalidPasswordLength.classList.add("hidden");
  invalidPasswordLowercase.classList.add("hidden");
  invalidPasswordUppercase.classList.add("hidden");
  invalidPasswordNumber.classList.add("hidden");
  invalidPasswordSpecial.classList.add("hidden");
};

registerPassword.addEventListener("input", function () {
  if (registerPassword.value.length < 8) {
    clearInvalids();
    invalidPasswordLength.classList.remove("hidden");
  } else if (!registerPassword.value.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
    clearInvalids();
    invalidPasswordSpecial.classList.remove("hidden");
  } else if (!registerPassword.value.match(/[a-z]/)) {
    clearInvalids();
    invalidPasswordLowercase.classList.remove("hidden");
  } else if (!registerPassword.value.match(/[A-Z]/)) {
    clearInvalids();
    invalidPasswordUppercase.classList.remove("hidden");
  } else if (!registerPassword.value.match(/[0-9]/)) {
    clearInvalids();
    invalidPasswordNumber.classList.remove("hidden");
  } else {
    clearInvalids();
  }
});

// FUNCTIONS END

// CALLING FUNCTIONS
loginbtn(btnLoginToggle);
loginbtn(btnSignupToggle);

login(buttonRegister, "register", signupForm, signupEmail);
login(buttonLogin, "login", loginForm, loginEmail);

invalidEmail();
