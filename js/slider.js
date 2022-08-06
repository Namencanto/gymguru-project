const slider = function () {
  const slides = document.querySelectorAll(".opinion__carousel-inner-item");
  const btnLeft = document.querySelector(".opinion__carousel-prev");
  const btnRight = document.querySelector(".opinion__carousel-next");

  const dotContainer = document.querySelector(".opinion__carousel-dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots")

      .forEach((dot) => dot.classList.remove("dots-active"));

    document
      .querySelector(`.opinion__carousel-dots-${slide + 1}`)
      .classList.add("dots-active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    // createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", function (e) {
    e.preventDefault();
    nextSlide();
  });
  btnLeft.addEventListener("click", function (e) {
    e.preventDefault();
    prevSlide();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  let slideAuto = 1;
  dotContainer.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("opinion__carousel-dots-1")) {
      const slide = 0;
      slideAuto = slide;
      goToSlide(slide);
      activateDot(slide);
    }
    if (e.target.classList.contains("opinion__carousel-dots-2")) {
      const slide = 1;
      slideAuto = slide;
      goToSlide(slide);
      activateDot(slide);
    }
    if (e.target.classList.contains("opinion__carousel-dots-3")) {
      const slide = 2;
      slideAuto = slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  //Automatic part of slider

  setInterval(() => {
    goToSlide(slideAuto);
    activateDot(slideAuto);
    slideAuto++;
    if (slideAuto > 2) slideAuto = 0;
  }, 5000);
};

slider();
// Yeah i know this code sucks, but... i just tired
/////////////////////////////////////////////
/////////////////////////////////////////////
