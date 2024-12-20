function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    const quote = getRandomQuote();
    document.getElementById('quote-text').textContent = quote.text;
    document.getElementById('quote-author').textContent = `— ${quote.author}`;
}

displayQuote(); // Exibe a primeira citação ao carregar a página