const countryInput = document.getElementById("country");
const searchButton = document.getElementById("search");
const container = document.getElementById("container");

function formatIndianNumber(num) {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} Lakh`;
  } else {
    return num.toLocaleString("en-IN");
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const countryName = countryInput.value.trim();

  if (countryName) {
    const API_URL = `https://restcountries.com/v3.1/name/${countryName}`;

    async function getCountryData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Country not found");
        }

        const data = await response.json();
        console.log(data);

        const country = data[0];

        // Clear previous results
        container.innerHTML = "";

        const result = document.createElement("div");
        result.className = "result";

        const nameEl = document.createElement("h1");
        nameEl.textContent = country.name.common;

        const capital = document.createElement("p");
        capital.textContent = `Capital: ${
          country.capital ? country.capital[0] : "N/A"
        }`;

        const currencies = document.createElement("p");
        if (country.currencies) {
          const currencyNames = Object.values(country.currencies)
            .map((currency) => currency.name)
            .join(", ");
          currencies.textContent = `Currencies: ${currencyNames}`;
        } else {
          currencies.textContent = "Currencies: N/A";
        }

        const boderCountries = document.createElement("p");
        boderCountries.textContent = `Border Countries: ${
          country.borders ? country.borders.join(", ") : "None"
        }`;

        const populationEl = document.createElement("p");
        populationEl.textContent = `Population: ${formatIndianNumber(
          country.population
        )}`;

        const areaEl = document.createElement("p");
        areaEl.textContent = `Area: ${country.area.toLocaleString()} km²`;

        const regionEl = document.createElement("p");
        regionEl.textContent = `Region: ${country.region}`;

        const subregionEl = document.createElement("p");
        subregionEl.textContent = `Subregion: ${country.subregion}`;

        const flagEl = document.createElement("img");
        flagEl.src = country.flags.png;
        flagEl.alt = `Flag of ${country.name.common}`;
        flagEl.width = 200;

        result.append(
          nameEl,
          capital,
          currencies,
          boderCountries,
          populationEl,
          areaEl,
          regionEl,
          subregionEl,
          flagEl
        );
        container.appendChild(result);
      } catch (error) {
        container.innerHTML = `<p style="color:red;">${error.message}</p>`;
        console.error("Fetch error:", error);
      }
    }

    getCountryData();
  } else {
    alert("Please enter a country name");
  }
});
