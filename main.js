
const div = document.createElement("div");
div.classList.add(
  "alert",
  "alert-danger",
  "position-fixed",
  "top-0",
  "start-50",
  "translate-middle-x",
  "w-50",
  "z-3",
  "d-none"
);
div.innerHTML = "Please Look Into The Console Log for More Details";
const body = document.querySelector("body");
body.appendChild(div);

function FillTheSelectWithTheCities() {
  axios
    .get("https://habous-prayer-times-api.onrender.com/api/v1/available-cities")
    .then((response) => {
      div.classList.add("d-none"); // Hide the alert if the request is successful
      const cities = response.data;
      const select = document.getElementById("citySelect");
      cities.forEach((city) => {
        let option = document.createElement("option");
        option.value = city.id;
        option.text = city.arabicCityName;
        select.add(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching cities:", error);
      div.classList.remove("d-none"); // Make the alert visible
    });
}

document.addEventListener("DOMContentLoaded", () => {
  FillTheSelectWithTheCities();
});
