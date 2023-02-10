const bBack = document.querySelector("[data-back-button]");
const bSettings = document.querySelector("[data-settings-button]");

// Form Control
const formSnippets = document.querySelector("[data-form-snippets]");
const iTitle = document.querySelector("[data-input-title]");
const iPrefix = document.querySelector("[data-input-prefix]");
const iType = document.querySelector("[data-input-type]");
const bSubmit = document.querySelector("[data-button-submit]");
const bRead = document.querySelector("[data-button-read]");

const buttonNav = document.querySelectorAll("[data-button-nav]");

const db = firebase.firestore();
const main = new Swiper("[data-main]", {
  direction: "horizontal",
  history: {
    replaceState: true,
    key: "",
  },
  freeMode: {
    enable: true,
    minimumVelocity: 0.0,
    momentum: true,
    momentumBounce: true,
    momentumBounceRatio: true,
    momentumRatio: 0.1,
    momentumVelocityRatio: 0.1,
    sticky: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    enabled: true,
  },
  parallax: true,
  on: {
    init(e) {
      if (e.activeIndex !== 0) {
        bBack.classList.remove("d-none");
        bSettings.classList.add("d-none");
      } else {
        bBack.classList.add("d-none");
        bSettings.classList.remove("d-none");
      }
    },
  },
  onAny(eventName, ...args) {
    if (eventName === "touchEnd") {
      tfs();
    }
  },
  allowTouchMove: false,
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-20%", 0, -1],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
});

buttonNav.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(button.dataset);
    switch (button.dataset.buttonNav) {
      case "home":
        main.slideTo(0, 200);
        break;
      case "news":
        main.slideTo(1, 200);
        break;
      case "travel":
        main.slideTo(2, 200);
        break;
      case "shop":
        main.slideTo(3, 200);
        break;
      case "ticket":
        main.slideTo(4, 200);
        break;
      case "gallery":
        main.slideTo(5, 200);
        break;
      case "code":
        main.slideTo(6, 200);
        break;
      case "settings":
        main.slideTo(7, 200);
        break;

      default:
        main.slideTo(0, 200);
        break;
    }
  });
});

function tfs() {
  if (!document.fullscreenElement) {
    if (location.hostname !== "localhost") {
      document.documentElement.requestFullscreen();
    }
  }
}

main.on("activeIndexChange", (e) => {
  if (e.activeIndex !== 0) {
    bBack.classList.remove("d-none");
    bSettings.classList.add("d-none");
  } else {
    bBack.classList.add("d-none");
    bSettings.classList.remove("d-none");
  }
});

const topNews = new Swiper("[data-top-news]", {
  direction: "vertical",
  freeMode: {
    enable: true,
    // minimumVelocity: 0.0,
    // momentum: true,
    // momentumBounce: true,
    // momentumBounceRatio: true,
    // momentumRatio: 0.1,
    // momentumVelocityRatio: 0.1,
    // sticky: true,
  },
  mousewheel: {
    invert: false,
  },
  parallax: true,
  onAny(eventName, ...args) {
    if (eventName === "touchEnd") {
      tfs();
    }
  },
  allowTouchMove: true,
  autoplay: {
    delay: 3000,
  },
  autoHeight: true,
  slidesPerView: "auto",
  spaceBetween: 1,
});

topNews.updateAutoHeight(100);

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

formSnippets.addEventListener("submit", async (e) => {
  e.preventDefault();
  db.collection("parameters")
    .doc(iTitle.value.toString().trim().replaceAll("/", " or "))
    .set(
      {
        prefix: `!param.${iPrefix.value.toString().trim()}`,
        body: [`${iPrefix.value.toString().trim()}: ${iType.value.toString().trim()};`],
        description: iTitle.value.toString().trim().replaceAll("/", " or "),
      },
      { merge: true }
    )
    .then(() => {
      console.log("Berhasil!");
    })
    .catch((error) => {
      console.log(error.errorMessage);
    });

  bSubmit.setAttribute("disabled", true);
  bSubmit.textContent = "Sending...";
  bSubmit.textContent = "Send";
  bSubmit.removeAttribute("disabled");
  formSnippets.reset();

  return false;
});

bRead.addEventListener("click", (e) => {
  e.preventDefault();
  db.collection("parameters")
    .get()
    .then((result) => {
      const object = {};
      result.forEach((element) => {
        object[element.id] = element.data();
      });
      console.log(object);
    });
  return false;
});
