export default class Drag {
    constructor() {
        const searchBtn = document.getElementById("search-btn");
        const resultContainer = document.getElementById("result-container");
        const countryIpInput = document.getElementById("country-ip");
        
        searchBtn.addEventListener("click", () => {
          const city = encodeURIComponent(countryIpInput.value.toLowerCase().replace(' ', '-'));
            const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;
        
            fetch(url)
            .then(response => {
                if (!response.ok || response.status !== 200) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                resultContainer.innerHTML = 
                `
                <h1>Data scores of: ${city.charAt(0).toUpperCase() + city.slice(1).replace('-',' ')}</h1>
                  ${data.categories
                   .sort((a, b) => a.score_out_of_10 - b.score_out_of_10)
                   .map(category => `<li>${category.name}: ${category.score_out_of_10.toFixed(2).slice(0, 4)}</li>`)
                   .join('')}
                <p>${data.summary}</p>
                `;
                resultContainer.classList.remove("hidden");
        
                const footer = document.querySelector('footer');
                footer.classList.add("footer-relative");
            })
            .catch(error => {
                resultContainer.innerHTML = `
                    <p>Error: ${error.message}, Try to rewrite the name of the city in English. If the application doesn't find the city probably it doesn't exist in our database.</p>
                `;
                resultContainer.classList.remove("hidden");
              
                const footer = document.querySelector('footer');
                footer.classList.remove("footer-relative");            
            });
        });
        
        
        countryIpInput.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                searchBtn.click();
            }
        });
    }
}