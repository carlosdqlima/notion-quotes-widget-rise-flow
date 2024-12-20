const preview = document.getElementById("preview");
const urlInput = document.getElementById("widgetUrl");

function updatePreview() {
    const params = {
        textColor: document.getElementById('textColor').value,
        bgColor: document.getElementById('bgColor').value,
        bgOpacity: document.getElementById('bgOpacity').value,
        borderColor: document.getElementById('borderColor').value,
        borderWidth: document.getElementById('borderWidth').value,
        borderRadius: document.getElementById('borderRadius').value,
        fontSize: document.getElementById('fontSize').value
    };

    // Atualizar preview
    const preview = document.getElementById('preview');
    preview.innerHTML = generateQuoteHTML(params);

    // Atualizar URL
    const baseUrl = `${window.location.origin}${window.location.pathname.replace('index.html', 'widget.html')}`;
    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    
    document.getElementById('widgetUrl').value = `${baseUrl}?${queryString}`;

    // Atualizar valores exibidos
    document.getElementById('bgOpacityValue').textContent = `${params.bgOpacity}%`;
    document.getElementById('borderWidthValue').textContent = `${params.borderWidth}px`;
    document.getElementById('borderRadiusValue').textContent = `${params.borderRadius}px`;
    document.getElementById('fontSizeValue').textContent = `${params.fontSize}px`;
}

function generateQuoteHTML(params) {
    const quote = quotes[0]; // Usar primeira citação para preview
    const style = `
        color: ${params.textColor};
        background-color: ${params.bgColor}${Math.round(params.bgOpacity * 2.55).toString(16).padStart(2, '0')};
        border: ${params.borderWidth}px solid ${params.borderColor};
        border-radius: ${params.borderRadius}px;
        font-size: ${params.fontSize}px;
        padding: 20px;
        text-align: center;
    `;

    return `
        <div style="${style}">
            <div style="font-style: italic; margin-bottom: 10px;">${quote.text}</div>
            <div style="opacity: 0.8;">— ${quote.author}</div>
        </div>
    `;
}

function copyUrl() {
    const urlInput = document.getElementById('widgetUrl');
    urlInput.select();
    document.execCommand('copy');
    alert('Link copiado!');
}

// Adicionar listeners para todos os controles
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Inicializar preview
updatePreview();
