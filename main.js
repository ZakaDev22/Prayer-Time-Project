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
  "d-none",
);
AllertDiv.innerHTML = "Please  Look Into The Console Log for More Details";
const body = document.querySelector("body");
body.appendChild(AllertDiv);

const prayerTimesApi = "https://api.aladhan.com/v1/calendarByCity";
const cities = [
  { id: "Marrakech|MA", arabicCityName: "مراكش", frenshCityName: "Marrakech" },
  {
    id: "Casablanca|MA",
    arabicCityName: "الدار البيضاء",
    frenshCityName: "Casablanca",
  },
  { id: "Rabat|MA", arabicCityName: "الرباط", frenshCityName: "Rabat" },
  { id: "Tangier|MA", arabicCityName: "طنجة", frenshCityName: "Tangier" },
  { id: "Meknes|MA", arabicCityName: "مكناس", frenshCityName: "Meknes" },
  { id: "Fes|MA", arabicCityName: "فاس", frenshCityName: "Fes" },
  { id: "Agadir|MA", arabicCityName: "أكادير", frenshCityName: "Agadir" },
  { id: "Oujda|MA", arabicCityName: "وجدة", frenshCityName: "Oujda" },
  { id: "Kenitra|MA", arabicCityName: "القنيطرة", frenshCityName: "Kenitra" },
  { id: "Tetouan|MA", arabicCityName: "تطوان", frenshCityName: "Tetouan" },
  { id: "Safi|MA", arabicCityName: "اسفي", frenshCityName: "Safi" },
  {
    id: "El Jadida|MA",
    arabicCityName: "الجديدة",
    frenshCityName: "El Jadida",
  },
  {
    id: "Beni Mellal|MA",
    arabicCityName: "بني ملال",
    frenshCityName: "Beni Mellal",
  },
  {
    id: "Errachidia|MA",
    arabicCityName: "الرشيدية",
    frenshCityName: "Errachidia",
  },
  { id: "Khouribga|MA", arabicCityName: "خريبكة", frenshCityName: "Khouribga" },
  { id: "Laayoune|MA", arabicCityName: "العيون", frenshCityName: "Laayoune" },
  { id: "Dakhla|MA", arabicCityName: " الداخلة", frenshCityName: "Dakhla" },
  { id: "Settat|MA", arabicCityName: "سطات", frenshCityName: "Settat" },
  { id: "Nador|MA", arabicCityName: "الناظور", frenshCityName: "Nador" },
  {
    id: "Khemisset|MA",
    arabicCityName: "الخميسات",
    frenshCityName: "Khemisset",
  },
  { id: "Berkane|MA", arabicCityName: "بركان", frenshCityName: "Berkane" },
  { id: "Taza|MA", arabicCityName: " تازة", frenshCityName: "Taza" },
  {
    id: "Taroudant|MA",
    arabicCityName: "تارودانت",
    frenshCityName: "Taroudant",
  },
  { id: "Guelmim|MA", arabicCityName: "كلميم", frenshCityName: "Guelmim" },
  {
    id: "Fquih Ben Salah|MA",
    arabicCityName: "الفقيه بن صالح",
    frenshCityName: "Fquih Ben Salah",
  },
  {
    id: "Sidi Slimane|MA",
    arabicCityName: "سيدي سليمان",
    frenshCityName: "Sidi Slimane",
  },
  {
    id: "Youssoufia|MA",
    arabicCityName: "اليوسفية",
    frenshCityName: "Youssoufia",
  },
  {
    id: "Al Hoceima|MA",
    arabicCityName: "الحسيمة",
    frenshCityName: "Al Hoceima",
  },
  { id: "Taourirt|MA", arabicCityName: "تاوريرت", frenshCityName: "Taourirt" },
  {
    id: "Chefchaouen|MA",
    arabicCityName: "شفشاون",
    frenshCityName: "Chefchaouen",
  },
];

function getCityDetails(cityId) {
  const [cityName, countryCode] = cityId.split("|");
  return { cityName, countryCode };
}

async function FillTheSelectWithTheCities() {
  try {
    AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
    clearFooterError();
    const select = document.getElementById("citySelect");
    select.innerHTML = ""; // Clear existing options

    const cityFilter = document.getElementById("citySearchInput");
    if (cityFilter) {
      cityFilter.value = "";
    }

    // Populate the select element with city options
    cities.forEach((city) => {
      let option = document.createElement("option");
      option.value = city.id;
      option.text = `${city.arabicCityName} (${city.frenshCityName})`;
      if (city.id === "Marrakech|MA") {
        option.selected = true; // Set Marrakesh as the default selected option
      }
      select.add(option);
    });

    // Add an event listener to detect changes in the selected city
    select.addEventListener("change", async (event) => {
      const selectedCityId = event.target.value;
      await FillTheTabelWithTheCityPrayers(selectedCityId); // Update the table with the new city's prayer times
    });

    if (cityFilter) {
      const filterCityOptions = () => {
        const searchValue = cityFilter.value.trim().toLowerCase();
        let matchedOption = null;

        Array.from(select.options).forEach((option) => {
          if (!option.value) {
            option.hidden = false;
            return;
          }

          const text = option.text.toLowerCase();
          const isMatch = text.includes(searchValue);
          option.hidden = !isMatch;

          if (isMatch && !matchedOption) {
            matchedOption = option;
          }
        });

        if (
          searchValue &&
          matchedOption &&
          matchedOption.value !== select.value
        ) {
          select.value = matchedOption.value;
          FillTheTabelWithTheCityPrayers(matchedOption.value);
        }
      };

      cityFilter.addEventListener("input", filterCityOptions);
      cityFilter.addEventListener("keydown", async (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const visibleOptions = Array.from(select.options).filter(
            (option) => option.value && !option.hidden,
          );

          if (visibleOptions.length === 1) {
            select.value = visibleOptions[0].value;
            await FillTheTabelWithTheCityPrayers(visibleOptions[0].value);
          }
        }
      });
    }

    // Load the default city's prayer times
    await FillTheTabelWithTheCityPrayers("Marrakech|MA"); // Default city for Marrakesh
  } catch (error) {
    console.error("Error fetching cities:", error);
    showError(
      "Error fetching prayer times. Please Find Your City Directly From The Yellow Button, And check the console for details.!!!",
    );
  }
}

function showError(message) {
  AllertDiv.innerHTML = message;
  AllertDiv.classList.remove("d-none");
  // Add a one-line error message to the footer so users see it persistently
  const footerContent = document.getElementById("footerContent");
  if (footerContent) {
    let footerErr = document.getElementById("footerError");
    if (!footerErr) {
      footerErr = document.createElement("div");
      footerErr.id = "footerError";
      footerErr.classList.add("text-danger", "mt-2");
      footerContent.appendChild(footerErr);
    }
    // Insert message and a stacked button that triggers the main 'Find Your City' action
    footerErr.innerHTML = `<div class="footerMsg">${message}</div><div><button id="footerFindCityBtn" class="btn btn-warning footerFindBtn">Find Your City</button></div>`;
    const footerBtn = document.getElementById("footerFindCityBtn");
    if (footerBtn) {
      footerBtn.addEventListener("click", () => {
        const target = document.getElementById("findCity-link");
        if (target) target.click();
      });
    }
  }

  setTimeout(() => {
    AllertDiv.classList.add("d-none");
    // leave footer error visible until cleared by a successful fetch
  }, 5000);
}

function clearFooterError() {
  const footerErr = document.getElementById("footerError");
  if (footerErr) footerErr.remove();
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
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const { cityName, countryCode } = getCityDetails(CityId);

  try {
    const response = await axios.get(
      `${prayerTimesApi}?city=${encodeURIComponent(cityName)}&country=${countryCode}&method=4&month=${month}&year=${year}`,
    );
    AllertDiv.classList.add("d-none"); // Hide the alert if the request is successful
    clearFooterError();
    const timings = response.data.data; // Access the calendar array

    timings.forEach((timing) => {
      const prayers = timing.timings; // Access the prayer timings object
      const date = timing.date.readable; // Get the readable Gregorian date
      const hijriDate = `${timing.date.hijri.day}-${timing.date.hijri.month.en}`; // Get the Hijri date

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
        prayers,
      )})'>Details</button>`;

      // Populate the cells with data
      dateCell.innerText = date;
      hijriCell.innerText = hijriDate;
      fajrCell.innerText = prayers.Fajr;
      dhuhrCell.innerText = prayers.Dhuhr;
      asrCell.innerText = prayers.Asr;
      maghribCell.innerText = prayers.Maghrib;
      ishaCell.innerText = prayers.Isha;

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
    console.error("Error fetching prayer times", error);
    showError(
      "Error fetching prayer times. Please Find Your City Directly From The Yellow Button, And check the console for details.!!!",
    );
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
    "borderGlow",
  );
  detailsDiv.style.zIndex = "1050";

  detailsDiv.innerHTML = `
    <h4 class="mb-3">Prayer Times</h4>
    <p class="mb-1"><strong>Date:</strong> ${date}</p>
    <p class="mb-3"><strong>Hijri Date:</strong> ${hijriDate}</p>
    <div class="row text-start">
      <div class="col-6"><strong>Fajr:</strong></div>
      <div class="col-6">${prayers.Fajr}</div>
      <div class="col-6"><strong>Dhuhr:</strong></div>
      <div class="col-6">${prayers.Dhuhr}</div>
      <div class="col-6"><strong>Asr:</strong></div>
      <div class="col-6">${prayers.Asr}</div>
      <div class="col-6"><strong>Maghrib:</strong></div>
      <div class="col-6">${prayers.Maghrib}</div>
      <div class="col-6"><strong>Isha:</strong></div>
      <div class="col-6">${prayers.Isha}</div>
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
