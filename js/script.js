"use strict";

///////////////////////////
// digital clock part
function displayDigital() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.querySelector("[data-date]").textContent = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(new Date());

  document.querySelector("[data-time]").textContent = new Intl.DateTimeFormat(
    navigator.language,
    { timeStyle: "medium" }
  ).format(new Date());
}

displayDigital();
setInterval(displayDigital, 1000);

///////////////////////////
// analogue clock part
function displayAnalogue() {
  const now = new Date();
  const seconds = now.getSeconds() / 60;
  const minutes = (seconds + now.getMinutes()) / 60;
  const hours = (minutes + now.getHours()) / 12;
  const handHours = document.querySelector("[data-hours]");
  const handMinutes = document.querySelector("[data-minutes]");
  const handSeconds = document.querySelector("[data-seconds]");

  // clock hand functionality
  function setRotation(element, value) {
    element.style.transform = `rotate(${value * 360}deg)`;
  }
  setRotation(handHours, hours);
  setRotation(handMinutes, minutes);
  setRotation(handSeconds, seconds);

  // number formatting
  document
    .querySelectorAll("[data-number]")
    .forEach(
      (element, index) =>
        (element.textContent = new Intl.NumberFormat(navigator.language).format(
          index + 1
        ))
    );
}

displayAnalogue();
setInterval(displayAnalogue, 1000);

///////////////////////////
// button functionality
document.querySelector("[data-button]").addEventListener("click", function () {
  document.querySelector("[data-analogue]").classList.toggle("hidden");
  document.querySelector("[data-digital]").classList.toggle("hidden");

  // change button text
  this.textContent.includes("analogue?")
    ? (this.textContent = "digital?")
    : (this.textContent = "analogue?");

  // remove focus from the button after click
  this.blur();
});
