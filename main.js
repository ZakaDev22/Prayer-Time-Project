import axios from "./node_modules/axios/dist/axios.min.js";
export default axios;

let div = document.createElement("div");
div.classList.add("alert alert-danger");
div.innerHTML ="Error fetching cities. Please try again later. Please Look at the console for more details.";

div.classList.add("hidden");
function FillTheSelectWithTheCities() {
  axios
    .get("https://habous-prayer-times-api.onrender.com/api/v1/available-cities")
    .then((data) => {
      div.classList.add("alert alert-danger");
      div.classList.remove("hidden");
      const select = document.getElementById("citySelect");
      data.forEach((city) => {
        let option = document.createElement("option");
        option.value = city.id;
        option.text = city.name;
        select.add(option);
      });
    })
    .catch((error) => {
      div.classList.remove("hidden");
      console.error("Error fetching cities:", error);
    });
}
