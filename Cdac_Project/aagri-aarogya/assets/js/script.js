let users = JSON.parse(localStorage.getItem("users")) || [];

// console.log(users.find((user) => user.email === 'ulhasjohari269@gmail.com'));
const person = users.find((user) => user.lastName === "deshmukh");
// console.log(person);

function login() {
  const identifier = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("loginPassword").value;
  const user = users.find(
    (user) =>
      (user.email === identifier || user.mobile === identifier) &&
      user.password === password
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("firstName", user.firstName);
    console.log(user.firstName);
    
    window.location.href = "index.html";
    const name = localStorage.getItem('firstName');
    console.log(name);
  } else {
    document.getElementById("loginError").style.display = "block";
  }
}

function register() {
  const firstName = document.getElementById("registerFirstName").value;
  const lastName = document.getElementById("registerLastName").value;
  const email = document.getElementById("registerEmail").value;
  const mobile = document.getElementById("registerMobile").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    document.getElementById("registerError").textContent =
      "Passwords do not match";
    document.getElementById("registerError").style.display = "block";
    return;
  }

  const user = { firstName, lastName, email, mobile, password };

  if (firstName && lastName && email && mobile && password && confirmPassword) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("registerError").style.display = "none";
    alert("Registration successful");
    window.location.href = "login.html";
  } else {
    document.getElementById("registerError").textContent =
      "Please fill all fields";
    document.getElementById("registerError").style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

window.onload = function () {
  if (
    window.location.pathname.endsWith("index.html") &&
    !localStorage.getItem("isLoggedIn")
  ) {
    window.location.href = "login.html";
  }
};

// animation js
const AnimateOnScroll = function ({ offset } = { offset: 10 }) {
  // Define a dobra superior, inferior e laterais da tela
  const windowTop = (offset * window.innerHeight) / 100;
  const windowBottom = window.innerHeight - windowTop;
  const windowLeft = 0;
  const windowRight = window.innerWidth;

  this.start = (element) => {
    window.requestAnimationFrame(() => {
      // Seta os atributos customizados
      element.style.animationDelay = element.dataset.animationDelay;
      element.style.animationDuration = element.dataset.animationDuration;

      // Inicia a animacao setando a classe para animar
      element.classList.add(element.dataset.animation);

      // Seta o elemento como animado
      element.dataset.animated = "true";
    });
  };

  this.inViewport = (element) => {
    // Obtem o boundingbox do elemento
    const elementRect = element.getBoundingClientRect();
    const elementTop =
      elementRect.top + parseInt(element.dataset.animationOffset) ||
      elementRect.top;
    const elementBottom =
      elementRect.bottom - parseInt(element.dataset.animationOffset) ||
      elementRect.bottom;
    const elementLeft = elementRect.left;
    const elementRight = elementRect.right;

    // Verifica se o elemento esta na tela
    return (
      elementTop <= windowBottom &&
      elementBottom >= windowTop &&
      elementLeft <= windowRight &&
      elementRight >= windowLeft
    );
  };

  // Percorre o array de elementos, verifica se o elemento está na tela e inicia animação
  this.verifyElementsInViewport = (els = elements) => {
    for (let i = 0, len = els.length; i < len; i++) {
      // Passa para o proximo laço se o elemento ja estiver animado
      if (els[i].dataset.animated) continue;

      this.inViewport(els[i]) && this.start(els[i]);
    }
  };

  // Obtem todos os elementos a serem animados
  this.getElements = () =>
    document.querySelectorAll("[data-animation]:not([data-animated])");

  // Atualiza a lista de elementos a serem animados
  this.update = () => {
    elements = this.getElements();
    elements && this.verifyElementsInViewport(elements);
  };

  // Inicia os eventos
  window.addEventListener("load", this.update, false);
  window.addEventListener(
    "scroll",
    () => this.verifyElementsInViewport(elements),
    { passive: true }
  );
  window.addEventListener(
    "resize",
    () => this.verifyElementsInViewport(elements),
    { passive: true }
  );
};

// Initialize
const options = {
  offset: 15, // percentage of the window
};

const animation = new AnimateOnScroll(options);

document.addEventListener("DOMContentLoaded", function () {
  // make it as accordion for smaller screens
  if (window.innerWidth < 992) {
    // close all inner dropdowns when parent is closed
    document
      .querySelectorAll(".navbar .dropdown")
      .forEach(function (everydropdown) {
        everydropdown.addEventListener("hidden.bs.dropdown", function () {
          // after dropdown is hidden, then find all submenus
          this.querySelectorAll(".submenu").forEach(function (everysubmenu) {
            // hide every submenu as well
            everysubmenu.style.display = "none";
          });
        });
      });

    document.querySelectorAll(".dropdown-menu a").forEach(function (element) {
      element.addEventListener("click", function (e) {
        let nextEl = this.nextElementSibling;
        if (nextEl && nextEl.classList.contains("submenu")) {
          // prevent opening link if link needs to open dropdown
          e.preventDefault();
          if (nextEl.style.display == "block") {
            nextEl.style.display = "none";
          } else {
            nextEl.style.display = "block";
          }
        }
      });
    });
  }
  // end if innerWidth
});
// DOMContentLoaded  end
