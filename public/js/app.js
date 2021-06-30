console.log("Clint side js file is loaded....");

const weatherForm = document.querySelector("#address-form");
const search = document.querySelector("#address-input");
const msg1 = document.querySelector("#address-msg-1");
const msg2 = document.querySelector("#address-msg-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;

  msg1.textContent = "Loading...";
  msg2.textContent = "";

  console.log(location);

  if (location) {
    fetch(`http://localhost:3000/weather?address=${location}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          msg1.textContent = data.forecast;
          msg2.textContent = data.location;
        }
      });
  } else {
    alert("Enter a valid address");
    msg1.textContent = "";
  }
});
