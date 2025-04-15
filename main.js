const AllertDiv = document.createElement("div");
AllertDiv.classList.add(
  "alert",
  "alert-danger",
  "position-fixed",
  "top-50",
  "start-50",
  "translate-middle",
  "w-50",
  "text-center",
  "shadow",
  "d-none"
);
AllertDiv.innerHTML = "Please Look Into The Console Log for More Details";
const body = document.querySelector("body");
body.appendChild(AllertDiv);

const citiesApi =
  "https://habous-prayer-times-api.onrender.com/api/v1/available-cities";
function FillTheSelectWithTheCities() {
  axios
    .get(citiesApi)
    .then((response) => {
      console.log(response.data);
      AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
      const cities = response.data.cities;
      const select = document.getElementById("citySelect");
      cities.forEach((city) => {
        let option = document.createElement("option");
        option.value = city.id;
        option.text = city.arabicCityName;
        if (city.id === "104") {
          option.selected = true; // Set Marrakesh as the default selected option
        }
        select.add(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching cities:", error);
      showError("Error fetching cities. Please check the console for details.!!!");
    });
}

function showError(message) {
  AllertDiv.innerHTML = message;
  AllertDiv.classList.remove("d-none");
  setTimeout(() => {
    AllertDiv.classList.add("d-none");
  }, 5000);
}


document.addEventListener("DOMContentLoaded", () => {
  FillTheSelectWithTheCities();
});
