const birthTab = document.querySelectorAll(".date-field");

const autotab = function autotab(current) {
  current.forEach((el, i) => {
    el.addEventListener("input", function () {
      if (el.getAttribute && el.value.length == el.getAttribute("maxlength")) {
        if (i === 2) return;
        birthTab[i + 1].focus();
      }
    });
  });
};
autotab(birthTab);
