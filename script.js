const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

//* Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://api.quotable.io/random';
    try {
        const response = await fetch(apiUrl);
        const apiQuotes = await response.json();
        //* Condition If Author Unknown
        if (apiQuotes.author === '') {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = apiQuotes.author;
        }
        // * Condition If Long Quote
        if (apiQuotes.content.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=apiQuotes.content
        console.log(`${apiQuotes.content} ${apiQuotes.author}`);
        removeLoadingSpinner();
    } catch (error) {
     getQuote();
    }
}

//* Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank');
}

//* Even Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//* On Load
getQuote();