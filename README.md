# 🕌 Moroccan & Global Cities Prayer Times — Web App

A modern and simple **Prayer Time Application** designed for both **Moroccan cities** and now extended to support **global cities** using country ISO codes!  
This app helps you stay connected to your daily prayers by providing accurate times for **Fajr, Dhuhr, Asr, Maghrib, Isha**.

---

## 🌐 Live Demo

👉 [Check it here!](https://zakadev22.github.io/Prayer-Time-Project/)  

---

## 📌 Features

- 🇲🇦 **Moroccan Cities:** Select from a dropdown to view the prayer schedule for the entire month.
- 🌍 **Global Search:** Enter a **Country ISO Code** (like `MA`, `US`, `EG`, `SA`) and a **City Name** — fetch prayer times for any city worldwide using [Aladhan API](https://aladhan.com/prayer-times-api).
- 💡 Click on any day to view full **prayer details** in a smooth animated popup.
- 🎯 Today's date is highlighted in the table for easy reference.
- ⚡ Fast and real-time API fetching using **Axios**.
- 💻 Built with **Bootstrap 5** for a responsive and modern interface.
- 🎨 CSS animations and interactive hover effects for a better user experience.

---

## 🧑‍💻 Technologies Used

- **HTML5**  
- **CSS3 + Custom Animations**  
- **Bootstrap 5**  
- **JavaScript (Vanilla)**  
- **Axios** for API consumption.

---

## 🗺️ API Sources

This app fetches data from two APIs:

1️⃣ **Moroccan Cities Prayer Times**  
`https://habous-prayer-times-api.onrender.com/api/v1/`  
- `/available-cities` — returns Moroccan cities.  
- `/prayer-times?cityId=` — returns monthly prayer times by city.

2️⃣ **Global City Prayer Times**  
`https://api.aladhan.com/v1/timingsByCity`  
Example usage:  
`https://api.aladhan.com/v1/timingsByCity?city=Marrakech&country=MA`
This allows users to fetch prayer times for any city around the world by providing a **city name** and **country ISO code**.

---

## 💡 What I Learned

- Consuming APIs using **Axios**.
- Styling responsive web apps using **Bootstrap 5**.
- Handling user input and API responses for global search.
- Smooth DOM manipulation and event-driven popup designs.
- Writing user-friendly error handling for failed API requests.
- Using CSS animations for better UI feedback (`@keyframes`, hover, transitions).

---

## 🚀 How to Run Locally

1️⃣ Clone the repo:
```bash
git clone https://github.com/ZakaDev22/Prayer-Time-Project.git

