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


const prayerTimesApi =
  "https://habous-prayer-times-api.onrender.com/api/v1/prayer-times?cityId=";
const citiesApi =
  "https://habous-prayer-times-api.onrender.com/api/v1/available-cities";
function FillTheSelectWithTheCities() {
  axios
    .get(citiesApi)
    .then((response) => {
      AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
      const cities = response.data.cities;
      const select = document.getElementById("citySelect");

      // Populate the select element with city options
      cities.forEach((city) => {
        let option = document.createElement("option");
        option.value = city.id;
        option.text = city.arabicCityName;
        if (city.id === "104") {
          option.selected = true; // Set Marrakesh as the default selected option
        }
        select.add(option);
      });

      // Add event listener to the select element
      select.addEventListener("change", (event) => {
        const selectedCityId = event.target.value; // Get the selected city's ID
        FillTheTabelWithTheCityPrayers(selectedCityId); // Call the function to fill the table
      });

      // Call the function initially for the default selected city (Marrakesh)
      FillTheTabelWithTheCityPrayers("104");
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

function FillTheTabelWithTheCityPrayers(CityId) {
  const tableBody = document.querySelector("#prayerTable tbody");
  tableBody.innerHTML = ""; 
  axios
    .get(prayerTimesApi + CityId)
    .then((response) => {
      AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
      const timings = response.data.data.timings; // Access the timings array
      timings.forEach((timing) => {
        const prayers = timing.prayers; // Access the prayers object
        const date = timing.date.readable; // Get the readable date

        // Create a row for each prayer time
        for (const [prayerName, prayerTime] of Object.entries(prayers)) {
          let row = document.createElement("tr");

          // Create cells for prayer name, time, and date
          let prayerNameCell = document.createElement("td");
          let prayerTimeCell = document.createElement("td");
          let dateCell = document.createElement("td");

          prayerNameCell.innerText = prayerName; // e.g., "fajr", "dhuhr"
          prayerTimeCell.innerText = prayerTime; // e.g., "05:52"
          dateCell.innerText = date; // e.g., "31 Mar 2025"

          row.appendChild(prayerNameCell);
          row.appendChild(prayerTimeCell);
          row.appendChild(dateCell);

          tableBody.appendChild(row);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching prayer times:", error);
      showError("Error fetching prayer times. Please check the console for details.!!!");
    });
    
}


document.addEventListener("DOMContentLoaded", () => {
  FillTheSelectWithTheCities();
});
