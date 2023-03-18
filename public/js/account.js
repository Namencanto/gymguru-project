const discountsTab = document.querySelector(".discounts-option");
const productsTab = document.querySelector(".products-option");
const goalsTab = document.querySelector(".goals-option");
const settingsTab = document.querySelector(".settings-option");
const allOptions = document.querySelectorAll(".option");

// const navTab = document.querySelector(".user-account__panel");

const mainDiscounts = document.querySelector(".discounts");
const mainProducts = document.querySelector(".products");
const mainGoals = document.querySelector(".goals");
const mainSettings = document.querySelector(".settings");
const allMains = document.querySelectorAll(".user-account__main");

const optionsFunc = function () {
  allOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // for (const main of allMains) {
      allMains.forEach((main, i) => {
        main.classList.add("hidden");
        allOptions[i].classList.remove("active-tab");
      });

      if (
        event.target == discountsTab ||
        event.target == discountsTab.querySelector("h4") ||
        event.target == discountsTab.querySelector("i")
      ) {
        if (mainDiscounts.classList.contains("hidden")) {
          mainDiscounts.classList.remove("hidden");
          discountsTab.classList.add("active-tab");
        }
      }
      if (
        event.target == productsTab ||
        event.target == productsTab.querySelector("h4") ||
        event.target == productsTab.querySelector("i")
      ) {
        if (mainProducts.classList.contains("hidden")) {
          mainProducts.classList.remove("hidden");
          productsTab.classList.add("active-tab");
        }
      }
      if (
        event.target == goalsTab ||
        event.target == goalsTab.querySelector("h4") ||
        event.target == goalsTab.querySelector("i")
      ) {
        if (mainGoals.classList.contains("hidden")) {
          mainGoals.classList.remove("hidden");
          goalsTab.classList.add("active-tab");
        }
      }
      if (
        event.target == settingsTab ||
        event.target == settingsTab.querySelector("h4") ||
        event.target == settingsTab.querySelector("i")
      ) {
        if (mainSettings.classList.contains("hidden")) {
          mainSettings.classList.remove("hidden");
          settingsTab.classList.add("active-tab");
        }
      }
    });
  });
};
optionsFunc();

///////////////////
//////////////
////// SETTINGS LOGIC

const referralsSettingsMain = document.querySelector(
  ".settings-main-referrals"
);
const deleteSettingsMain = document.querySelector(".settings-main-delete");
const accountSettingsMain = document.querySelector(".settings-main-account");
const helpSettingsMain = document.querySelector(".settings-main-help");
const personalizationsSettingsMain = document.querySelector(
  ".settings-main-personalizations"
);
const allSettingsMains = document.querySelectorAll(".all-tab");

///

const referralsSettingsTab = document.querySelector(".settings-tab-referrals");
const deleteSettingsTab = document.querySelector(".settings-tab-delete");
const accountSettingsTab = document.querySelector(".settings-tab-account");
const helpSettingsTab = document.querySelector(".settings-tab-help");
const personalizationsSettingsTab = document.querySelector(
  ".settings-tab-personalizations"
);
const allSettingsTabs = document.querySelectorAll(".settings-tab");

accountSettingsTab.classList.add("settings-tab-active");
accountSettingsMain.classList.remove("hidden");

const settingsOptionFunc = function () {
  allSettingsTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      allSettingsMains.forEach((main, i) => {
        main.classList.add("hidden");
        allSettingsTabs[i].classList.remove("settings-tab-active");
      });

      if (event.target == referralsSettingsTab) {
        if (referralsSettingsMain.classList.contains("hidden")) {
          referralsSettingsTab.classList.add("settings-tab-active");
          referralsSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == deleteSettingsTab) {
        if (deleteSettingsMain.classList.contains("hidden")) {
          deleteSettingsTab.classList.add("settings-tab-active");
          deleteSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == accountSettingsTab) {
        if (accountSettingsMain.classList.contains("hidden")) {
          accountSettingsTab.classList.add("settings-tab-active");
          accountSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == helpSettingsTab) {
        if (helpSettingsMain.classList.contains("hidden")) {
          helpSettingsTab.classList.add("settings-tab-active");
          helpSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == personalizationsSettingsTab) {
        if (personalizationsSettingsMain.classList.contains("hidden")) {
          personalizationsSettingsTab.classList.add("settings-tab-active");
          personalizationsSettingsMain.classList.remove("hidden");
        }
      }
    });
  });
};

settingsOptionFunc();
/////////////////////
///////////////
/////// TODO LIST LOGIC
const todoInput = document.querySelector("#todo-input");
const todoContainer = document.querySelector(".todo-container");
const formToAddItemsID = document.querySelector("#formToAddItemsID");
const listOfItemsID = document.getElementById("listOfItemsID");

function listItemsFn(e) {
  e.preventDefault();
  const itemText = this.querySelector("[name=item]").value;
  const item = {
    // id: document.querySelector(".account-id").textContent,
    itemText,
    checkedOff: false,
    deleted: false,
  };
  todoDataList.push(item);
  populateList(todoDataList, listOfItemsID);
  this.reset();
}

let todoData = document.querySelector(".todoData").textContent;
todoData = `,${todoData}`;

let todoDataList = [];

let itemText = [];
let checkedOff = [];
let deleted = [];
let id = [];

todoData = todoData.replaceAll("{", "").split("}");

todoData.forEach((arr, i) => {
  arr = arr.split("'");
  arr.forEach((el, i) => {
    if (el !== "") {
      if (i === 1) {
        if (el.length > 75) return;
        itemText.push(el);
      }
      if (i === 3) {
        checkedOff.push(el);
      }
      if (i === 5) {
        deleted.push(el);
      }
    }
  });
});

itemText.forEach((item, i) => {
  checkedOff[i] = checkedOff[i];
  checkedOff[i] === "true" ? (checkedOff[i] = true) : (checkedOff[i] = false);

  todoDataList.push({
    itemText: itemText[i],
    checkedOff: checkedOff[i],
    deleted: deleted[i],
    id: id[i],
  });
});

function countWords(str) {
  return str.trim().split(/\s+/).length;
}
function populateList(itemArray = [], itemList) {
  if (todoDataList.length > 4) {
    todoInput.setCustomValidity(
      "You have too much goals, delete something to add new"
    );
  } else {
    todoInput.setCustomValidity("");
  }

  itemList.innerHTML = itemArray
    .map((item, i) => {
      return `
		  <li>
		  <input type="checkbox" data-index=${i} id="item${i}" ${
        item.checkedOff ? "checked" : ""
      } />
		  <label for="item${i}">${
        item.itemText
      }</label><span data-index=${i} id="removed${i}" ${
        item.deleted ? true : false
      }>x</span>
		  </li>
	 `;
    })
    .join("");
}

function checkedOffFn(e) {
  if (!e.target.matches("input")) return;
  const el = e.target;
  const index = el.dataset.index;
  todoDataList[index].checkedOff = !todoDataList[index].checkedOff;
  // localStorage.setItem("items", JSON.stringify(todoDataList));
  populateList(todoDataList, listOfItemsID);
}

function removeItemFn(e) {
  if (!e.target.matches("span")) return;
  const element = e.target;

  const ind = element.dataset.index;
  todoDataList[ind].deleted = !todoDataList[ind].deleted;

  todoDataList.splice([ind], 1);

  // localStorage.setItem("items", JSON.stringify(todoDataList));
  populateList(todoDataList, listOfItemsID);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

formToAddItemsID.addEventListener("submit", listItemsFn, function () {
  const items = JSON.stringify(todoDataList);
  eraseCookie("todoList");
  setCookie("todoList", items);
});
formToAddItemsID.addEventListener("submit", function () {
  const items = JSON.stringify(todoDataList);
  eraseCookie("todoList");
  setCookie("todoList", items);
});
listOfItemsID.addEventListener("click", checkedOffFn, function () {
  const items = JSON.stringify(todoDataList);
  eraseCookie("todoList");
  setCookie("todoList", items);
});
listOfItemsID.addEventListener("click", removeItemFn, function () {});
document.addEventListener("click", function () {
  const items = JSON.stringify(todoDataList);
  eraseCookie("todoList");

  setCookie("todoList", items);
});
populateList(todoDataList, listOfItemsID);

/////////////////////////////////////////
////////////////////////
//////// FAQ LOGIC:
const faqInput = document.querySelectorAll(
  ".settings-main-help-content-faq > input[type=checkbox]"
);
for (const e of faqInput) {
  // loops all faq inputs
  e.addEventListener("click", function () {
    if (!event.target.classList.contains("faq-active")) {
      // if faq is not activated, active but before close all looping and giving them checked = false
      for (const e of faqInput) {
        e.checked = false;
        e.classList.remove("faq-active");
      }
      event.target.classList.add("faq-active");
      e.checked = true;
      // if user click active faq set checked to false and remove active class
    } else if (event.target.classList.contains("faq-active")) {
      event.target.classList.remove("faq-active");
      e.checked = false;
    }
  });
}

/////////////////////////////////////////
////////////////////////
//////// USER AVATAR LOGIC:
// const userAvatar = document.querySelector("#avatarek");
// const userNavAvatar = document.querySelector(
//   ".user-account__panel-info-avatar"
// );
// let image = document.querySelector("#output");

// const changeUserAvatar = function () {
//   if (localStorage.hasOwnProperty("userAvatar")) {
//     image.src = localStorage.getItem("userAvatar");
//     userNavAvatar.src = localStorage.getItem("userAvatar");
//   }

//   userAvatar.addEventListener("change", function (event) {
//     const tgt = event.target || window.event.srcElement,
//       files = tgt.files;

//     const fr = new FileReader();
//     fr.addEventListener("load", function () {
//       userNavAvatar.src = fr.result;
//       image.src = fr.result;
//       localStorage.setItem("userAvatar", fr.result);
//     });
//     fr.readAsDataURL(files[0]);
//   });
// };

// changeUserAvatar();

/////////////////////////////////////////
////////////////////////
//////// ACCOUNT FORM INVALID MESSAGE:

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const invalidAccountPasswordMessage = document.querySelector(
  ".invalidAccountPassword"
);
const invalidAccountDeletePasswordMessage = document.querySelector(
  ".invalidDeleteAccountPassword"
);
const invalidAccountNumberMessage = document.querySelector(
  ".invalidAccountNumber"
);
const invalidAccountEmailMessage = document.querySelector(
  ".invalidAccountEmail"
);
const invalidAccountFileMessage = document.querySelector(".invalidFileInput");
const invalidInputs = document.querySelectorAll(".invalidAccountInput");

const clearInputs = function () {
  invalidInputs.forEach((input) => {
    input.classList.add("hidden");
  });
};

if (getCookie("accountInvalid")) {
  settingsTab.focus();
  mainSettings.classList.remove("hidden");
} else {
  mainDiscounts.classList.remove("hidden");
  discountsTab.classList.add("active-tab");
}

if (getCookie("phoneDuplicate")) {
  clearInputs();
  invalidAccountNumberMessage.classList.remove("hidden");
  accountSettingsMain.classList.remove("hidden");
}
if (getCookie("emailDuplicate")) {
  clearInputs();
  invalidAccountEmailMessage.classList.remove("hidden");
  accountSettingsMain.classList.remove("hidden");
}
if (getCookie("invalidAccountPassword")) {
  clearInputs();
  invalidAccountPasswordMessage.classList.remove("hidden");
  accountSettingsMain.classList.remove("hidden");
}
if (getCookie("invalidImgFile")) {
  invalidAccountFileMessage.classList.remove("hidden");
  accountSettingsMain.classList.remove("hidden");
}
if (getCookie("invalidDeleteAccountPassword")) {
  invalidAccountDeletePasswordMessage.classList.remove("hidden");
  accountSettingsMain.classList.add("hidden");
  deleteSettingsMain.classList.remove("hidden");
}
