//Firebase Required
import "../firebase/9.14.0/firebase-app-compat.js";
import "../firebase/9.14.0/firebase-auth-compat.js";
import "../firebase/9.14.0/firebase-database-compat.js";
import "../firebase/9.14.0/firebase-firestore-compat.js";
import "../firebase/9.14.0/firebase-storage-compat.js";
import "../firebase/6.0.1/firebase-ui-auth.js";


// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBMRXu6aFr-NJqXku01NupJQ267pAW3rsU",
  authDomain: "karim-roy-f39b4.firebaseapp.com",
  projectId: "karim-roy",
  storageBucket: "karim-roy.appspot.com",
  messagingSenderId: "328356575445",
  appId: "1:328356575445:web:aa5d89c7e240560ed6ca5c"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

self.notif = ([color, title, body]) => {
  const alert = document.createElement("div");
  alert.innerHTML = `
    <div class="d-flex justify-content-between">
      <p class="mb-0"><strong>${title}</strong><br>${body}</p>
      <button type="button" class="btn-close" data-mdb-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  alert.classList.add("alert", "fade");

  document.body.appendChild(alert);

  const alertInstance = new mdb.Alert(alert, {
    color,
    // stacking: true,
    hidden: true,
    width: "250px",
    position: "top-right",
    autohide: true,
    delay: 2000,
  });

  alertInstance.show();
};

const btnSignout = document.querySelector("[data-button-signout]");
if (btnSignout) {
  btnSignout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      location.href = "/";
    });
  });
}
