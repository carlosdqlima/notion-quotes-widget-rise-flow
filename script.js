function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    const quote = getRandomQuote();
    document.getElementById('quote-text').textContent = quote.text;
    document.getElementById('quote-author').textContent = `— ${quote.author}`;
}

// Detectar mudanças no tema do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    // A mudança de tema será automática devido às variáveis CSS
    console.log('Tema do sistema alterado');
});

displayQuote();