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

async function FillTheSelectWithTheCities() {
  try {
    const response = await axios.get(citiesApi);
    AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
    const cities = response.data.cities;
    const select = document.getElementById("citySelect");
    select.innerHTML = ""; // Clear existing options

    // Populate the select element with city options
    cities.forEach((city) => {
      let option = document.createElement("option");
      option.value = city.id;
      option.text = `${city.arabicCityName} (${city.frenshCityName})`;
      if (city.id === "104") {
        option.selected = true; // Set Marrakesh as the default selected option
      }
      select.add(option);
    });

    // Add an event listener to detect changes in the selected city
    select.addEventListener("change", async (event) => {
      const selectedCityId = event.target.value;
      await FillTheTabelWithTheCityPrayers(selectedCityId); // Update the table with the new city's prayer times
    });

    // Load the default city's prayer times
    await FillTheTabelWithTheCityPrayers("104"); // Default city ID for Marrakesh
  } catch (error) {
    console.error("Error fetching cities:", error);
    showError("Error fetching cities. Please check the console for details.!!!");
  }
}

function showError(message) {
  AllertDiv.innerHTML = message;
  AllertDiv.classList.remove("d-none");
  setTimeout(() => {
    AllertDiv.classList.add("d-none");
  }, 5000);
}

async function FillTheTabelWithTheCityPrayers(CityId) {
  const tableBody = document.querySelector("#prayerTable tbody");
  tableBody.innerHTML = ""; // Clear the table body before adding new rows

  const today = new Date();
  const todayDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // Format: "31 Mar 2025"

  try {
    const response = await axios.get(prayerTimesApi + CityId);
    AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
    const timings = response.data.data.timings; // Access the timings array

    timings.forEach((timing) => {
      const prayers = timing.prayers; // Access the prayers object
      const date = timing.date.readable; // Get the readable Gregorian date
      const hijriDate = `${timing.date.hijri.day}-${timing.date.hijri.month}`; // Get the Hijri date

      // Create a new row for the table
      let row = document.createElement("tr");

      // Highlight the row if it matches today's date
      if (date === todayDate) {
        row.classList.add("table-warning");
        row.id = "todayRow"; // Assign an id to the row for easy access
      }

      // Create cells for each column
      let dateCell = document.createElement("td");
      let hijriCell = document.createElement("td");
      let fajrCell = document.createElement("td");
      let dhuhrCell = document.createElement("td");
      let asrCell = document.createElement("td");
      let maghribCell = document.createElement("td");
      let ishaCell = document.createElement("td");
      let btnDetails = document.createElement("td");
      btnDetails.innerHTML = `<button class="btn btn-info" onclick='showDetails("${date}", "${hijriDate}", ${JSON.stringify(
        prayers
      )})'>Details</button>`;

      // Populate the cells with data
      dateCell.innerText = date;
      hijriCell.innerText = hijriDate;
      fajrCell.innerText = prayers.fajr;
      dhuhrCell.innerText = prayers.dhuhr;
      asrCell.innerText = prayers.asr;
      maghribCell.innerText = prayers.maghrib;
      ishaCell.innerText = prayers.ishaa;

      // Append the cells to the row
      row.appendChild(dateCell);
      row.appendChild(hijriCell);
      row.appendChild(fajrCell);
      row.appendChild(dhuhrCell);
      row.appendChild(asrCell);
      row.appendChild(maghribCell);
      row.appendChild(ishaCell);
      row.appendChild(btnDetails);

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    showError("Error fetching prayer times. Please check the console for details.!!!");
  }
}

function showDetails(date, hijriDate, prayers) {
  const detailsDiv = document.createElement("div");
  detailsDiv.id = "Prayerdetails";

  detailsDiv.classList.add(
    "details-div",
    "position-fixed",
    "top-50",
    "start-50",
    "translate-middle",
    "bg-light",
    "p-4",
    "shadow",
    "rounded",
    "text-center",
    "borderGlow"
  );
  detailsDiv.style.zIndex = "1050";

  detailsDiv.innerHTML = `
    <h4 class="mb-3">Prayer Times</h4>
    <p class="mb-1"><strong>Date:</strong> ${date}</p>
    <p class="mb-3"><strong>Hijri Date:</strong> ${hijriDate}</p>
    <div class="row text-start">
      <div class="col-6"><strong>Fajr:</strong></div>
      <div class="col-6">${prayers.fajr}</div>
      <div class="col-6"><strong>Dhuhr:</strong></div>
      <div class="col-6">${prayers.dhuhr}</div>
      <div class="col-6"><strong>Asr:</strong></div>
      <div class="col-6">${prayers.asr}</div>
      <div class="col-6"><strong>Maghrib:</strong></div>
      <div class="col-6">${prayers.maghrib}</div>
      <div class="col-6"><strong>Isha:</strong></div>
      <div class="col-6">${prayers.ishaa}</div>
    </div>
  `;

  // Create the "Close" button
  const closeButton = document.createElement("button");
  closeButton.classList.add("btn", "btn-danger", "mt-4");
  closeButton.textContent = "Close";

  // Attach the event listener directly to the button
  closeButton.addEventListener("click", () => {
    detailsDiv.remove();
  });

  // Append the button to the detailsDiv
  detailsDiv.appendChild(closeButton);

  // Append the detailsDiv to the body
  body.appendChild(detailsDiv);
}


document.addEventListener("DOMContentLoaded", () => {
   FillTheSelectWithTheCities();
});
