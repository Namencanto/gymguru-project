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

discountsTab.focus = true;
mainDiscounts.classList.remove("hidden");

const optionsFunc = function () {
  allOptions.forEach((option) => {
    option.addEventListener("click", function () {
      for (const main of allMains) {
        main.classList.add("hidden");
      }

      if (
        event.target == discountsTab ||
        event.target == discountsTab.querySelector("h4") ||
        event.target == discountsTab.querySelector("i")
      ) {
        if (mainDiscounts.classList.contains("hidden")) {
          mainDiscounts.classList.remove("hidden");
        }
      }
      if (
        event.target == productsTab ||
        event.target == productsTab.querySelector("h4") ||
        event.target == productsTab.querySelector("i")
      ) {
        if (mainProducts.classList.contains("hidden")) {
          mainProducts.classList.remove("hidden");
        }
      }
      if (
        event.target == goalsTab ||
        event.target == goalsTab.querySelector("h4") ||
        event.target == goalsTab.querySelector("i")
      ) {
        if (mainGoals.classList.contains("hidden")) {
          mainGoals.classList.remove("hidden");
        }
      }
      if (
        event.target == settingsTab ||
        event.target == settingsTab.querySelector("h4") ||
        event.target == settingsTab.querySelector("i")
      ) {
        if (mainSettings.classList.contains("hidden")) {
          mainSettings.classList.remove("hidden");
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
const notificationsSettingsMain = document.querySelector(
  ".settings-main-notifications"
);
const accountSettingsMain = document.querySelector(".settings-main-account");
const helpSettingsMain = document.querySelector(".settings-main-help");
const personalizationsSettingsMain = document.querySelector(
  ".settings-main-personalizations"
);
const allSettingsMains = document.querySelectorAll(".all-tab");

///

const referralsSettingsTab = document.querySelector(".settings-tab-referrals");
const notificationsSettingsTab = document.querySelector(
  ".settings-tab-notifications"
);
const accountSettingsTab = document.querySelector(".settings-tab-account");
const helpSettingsTab = document.querySelector(".settings-tab-help");
const personalizationsSettingsTab = document.querySelector(
  ".settings-tab-personalizations"
);
const allSettingsTabs = document.querySelectorAll(".settings-tab");

const settingsOptionFunc = function () {
  allSettingsTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      for (const main of allSettingsMains) {
        main.classList.add("hidden");
      }

      if (event.target == referralsSettingsTab) {
        if (referralsSettingsMain.classList.contains("hidden")) {
          referralsSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == notificationsSettingsTab) {
        if (notificationsSettingsMain.classList.contains("hidden")) {
          notificationsSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == accountSettingsTab) {
        if (accountSettingsMain.classList.contains("hidden")) {
          accountSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == helpSettingsTab) {
        if (helpSettingsMain.classList.contains("hidden")) {
          helpSettingsMain.classList.remove("hidden");
        }
      }
      if (event.target == personalizationsSettingsTab) {
        if (personalizationsSettingsMain.classList.contains("hidden")) {
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
const parsingLocalStorageItems =
  JSON.parse(localStorage.getItem("items")) || [];

function listItemsFn(e) {
  e.preventDefault();
  const itemText = this.querySelector("[name=item]").value;
  const item = {
    itemText,
    checkedOff: false,
    deleted: false,
  };
  parsingLocalStorageItems.push(item);
  populateList(parsingLocalStorageItems, listOfItemsID);
  localStorage.setItem("items", JSON.stringify(parsingLocalStorageItems));
  this.reset();
}

function populateList(itemArray = [], itemList) {
  if (parsingLocalStorageItems.length > 4) {
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
  parsingLocalStorageItems[index].checkedOff =
    !parsingLocalStorageItems[index].checkedOff;
  localStorage.setItem("items", JSON.stringify(parsingLocalStorageItems));
  populateList(parsingLocalStorageItems, listOfItemsID);
}

function removeItemFn(e) {
  if (!e.target.matches("span")) return;
  const element = e.target;
  console.log(element);
  const ind = element.dataset.index;
  parsingLocalStorageItems[ind].deleted =
    !parsingLocalStorageItems[ind].deleted;
  console.log(parsingLocalStorageItems[ind].deleted);
  parsingLocalStorageItems.splice([ind], 1);
  localStorage.setItem("items", JSON.stringify(parsingLocalStorageItems));
  populateList(parsingLocalStorageItems, listOfItemsID);
}

formToAddItemsID.addEventListener("submit", listItemsFn);
listOfItemsID.addEventListener("click", checkedOffFn);
listOfItemsID.addEventListener("click", removeItemFn);

populateList(parsingLocalStorageItems, listOfItemsID);

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
const userAvatar = document.querySelector("#file");
const userNavAvatar = document.querySelector(
  ".user-account__panel-info-avatar"
);
let image = document.querySelector("#output");

const changeUserAvatar = function () {
  if (localStorage.hasOwnProperty("userAvatar")) {
    image.src = localStorage.getItem("userAvatar");
    userNavAvatar.src = localStorage.getItem("userAvatar");
  }

  userAvatar.addEventListener("change", function (event) {
    const tgt = event.target || window.event.srcElement,
      files = tgt.files;

    const fr = new FileReader();
    fr.addEventListener("load", function () {
      userNavAvatar.src = fr.result;
      image.src = fr.result;
      localStorage.setItem("userAvatar", fr.result);
    });
    fr.readAsDataURL(files[0]);
  });
};

changeUserAvatar();
