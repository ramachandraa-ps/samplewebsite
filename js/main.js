const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;
// Main JavaScript logic for the News App

const apiKey = '93d49685a5c74cc792d3d86c9e342dc3';
let currentPage = 1;
let selectedLanguage = 'en';
let selectedCategory = 'sports';
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

// Category Selection
document.querySelectorAll('[data-category]').forEach(categoryLink => {
    categoryLink.addEventListener('click', function () {
        selectedCategory = this.getAttribute('data-category');
        fetchNews(currentPage);
    });
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
