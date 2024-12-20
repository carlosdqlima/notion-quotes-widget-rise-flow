class QuotesService {
  constructor() {
    this.CACHE_KEY = "cached_quotes";
    this.CACHE_TIMESTAMP = "quotes_timestamp";
    this.API_ENDPOINTS = [
      "https://api.quotable.io/quotes/random?limit=10",
      "https://stoicquotesapi.com/v1/api/quotes/random",
      "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
    ];
  }

  async fetchQuotes() {
    try {
      const response = await fetch(this.API_ENDPOINTS[0]);
      const quotes = await response.json();
      return quotes.map((quote) => ({
        text: quote.content,
        author: quote.author,
      }));
    } catch (error) {
      console.error("Erro ao buscar citações:", error);
      return this.getFallbackQuotes();
    }
  }

  getFallbackQuotes() {
    return [
      {
        text: "A persistência é o caminho do êxito.",
        author: "Charles Chaplin",
      },
      {
        text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
        author: "Robert Collier",
      },
    ];
  }

  async getQuotes() {
    const cached = localStorage.getItem(this.CACHE_KEY);
    const timestamp = localStorage.getItem(this.CACHE_TIMESTAMP);
    const now = new Date().getTime();

    // Verificar se precisa atualizar (24 horas)
    if (
      cached &&
      timestamp &&
      now - parseInt(timestamp) < 24 * 60 * 60 * 1000
    ) {
      return JSON.parse(cached);
    }

    // Buscar novas citações
    const quotes = await this.fetchQuotes();

    // Atualizar cache
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(quotes));
    localStorage.setItem(this.CACHE_TIMESTAMP, now.toString());

    return quotes;
  }
}
