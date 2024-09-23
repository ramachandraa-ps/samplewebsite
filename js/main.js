const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
// Main JavaScript logic for the News App

const apiKey = '9a1209ba371346bea763f576b2b1df36';
let currentPage = 1;
let selectedLanguage = 'en';
let selectedCategory = '';
let selectedCountry = 'us';
let searchQuery = '';

// Fetch News from API using NewsAPI module
async function fetchNews(page = 1) {
    let url = `https://newsapi.org/v2/top-headlines?language=${selectedLanguage}&country=${selectedCountry}&category=${selectedCategory}&q=${searchQuery}&page=${page}&pageSize=20&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    displayNews(data.articles);
    document.getElementById('resultsInfo').innerHTML = `Welcome to NewsAPP (${data.totalResults} results)`;
}

// Display News Cards (4 per row)
function displayNews(articles) {
    const newsContainer = document.getElementById('newsCards');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = `
            <div class="col-md-3">
                <div class="card">
                    <img src="${article.urlToImage}" class="card-img-top" alt="News Image">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read Article</a>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsCard;
    });
}

// Search Functionality
document.getElementById('searchButton').addEventListener('click', () => {
    searchQuery = document.getElementById('searchInput').value;
    fetchNews(currentPage);
});

// Country Selection
document.getElementById('countryDropdown').addEventListener('change', () => {
    selectedCountry = document.getElementById('countryDropdown').value;
    fetchNews(currentPage);
});

// Category Selection
document.querySelectorAll('[data-category]').forEach(categoryLink => {
    categoryLink.addEventListener('click', function () {
        selectedCategory = this.getAttribute('data-category');
        fetchNews(currentPage);
    });
});

// Language Selection
document.querySelectorAll('[data-language]').forEach(languageLink => {
    languageLink.addEventListener('click', function () {
        selectedLanguage = this.getAttribute('data-language');
        fetchNews(currentPage);
    });
});

// Light/Dark Mode Toggle
document.getElementById('toggleMode').addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Pagination Buttons
document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    fetchNews(currentPage);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNews(currentPage);
    }
});

// Initial Fetch
fetchNews();
