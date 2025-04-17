const WorldPrayerTimeAPI = "https://api.aladhan.com/v1/timingsByCity?";

function FindYourCity() {
  const detailsDiv = document.createElement("div");
  detailsDiv.id = "SearchdetailsPopup";

  detailsDiv.classList.add(
    "details-div",
    "position-fixed",
    "top-50",
    "start-50",
    "translate-middle",
    "bg-light",
    "p-5",
    "shadow",
    "rounded",
    "text-center",
    "w-75",
    "h-75",
  );

  detailsDiv.style.overflow = "auto"; // Enable vertical scrolling if content overflows
  
  detailsDiv.innerHTML = `
    <h4 class="mb-3">Find Prayer Times</h4>
    <p class="text-muted">
      Please enter the <strong>ISO country code (2 Characters)</strong> (e.g., <code>MA</code> for Morocco) and the city name. 
      You can find the list of ISO country codes 
      <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="_blank" rel="noopener noreferrer">here</a>.
    </p>
    <form id="searchForm">
      <div class="mb-3">
        <label for="countryInput" class="form-label">Country:</label>
        <input type="text" id="countryInput" class="form-control" placeholder="Enter country code (e.g., MA)" required>
      </div>
      <div class="mb-3">
        <label for="cityInput" class="form-label">City:</label>
        <input type="text" id="cityInput" class="form-control" placeholder="Enter city name (e.g., Marrakech)" required>
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
      <button type="button" class="btn btn-danger mt-2" onclick="closeDetails()">Close</button>
    </form>
    <div id="results" class="mt-4"></div>
  `;

  document.body.appendChild(detailsDiv);

  // Add event listener for the form submission
  document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const country = document.getElementById("countryInput").value.trim();
    const city = document.getElementById("cityInput").value.trim();
    if (country && city) {
      await fetchPrayerTimes(city, country);
    }
  });
}

async function fetchPrayerTimes(city, country) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await axios.get(`${WorldPrayerTimeAPI}city=${city}&country=${country}`);
    const data = response.data;

    if (data.code === 200) {
     
       const timings = data.data.timings;
      resultsDiv.innerHTML = `
        <h5>Prayer Times for ${city}, ${country}</h5>
        <p><strong>Date:</strong> ${data.data.date.readable}</p>
        <p><strong>Hijri Date:</strong> ${data.data.date.hijri.date}</p>
        <div class="row text-start">
          <div class="col-6"><strong>Fajr:</strong></div>
          <div class="col-6">${timings.Fajr}</div>
          <div class="col-6"><strong>Dhuhr:</strong></div>
          <div class="col-6">${timings.Dhuhr}</div>
          <div class="col-6"><strong>Asr:</strong></div>
          <div class="col-6">${timings.Asr}</div>
          <div class="col-6"><strong>Maghrib:</strong></div>
          <div class="col-6">${timings.Maghrib}</div>
          <div class="col-6"><strong>Isha:</strong></div>
          <div class="col-6">${timings.Isha}</div>
        </div>
      `;
    } else {
      resultsDiv.innerHTML = `<p class="text-danger">Error: ${data.data}</p>`;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p class="text-danger">An error occurred: ${error.response?.data?.message || error.message}</p>`;
  }
}

function closeDetails() {
  const detailsDiv = document.getElementById("SearchdetailsPopup");
  if (detailsDiv) {
    detailsDiv.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("findCity-link").addEventListener("click", FindYourCity);
});