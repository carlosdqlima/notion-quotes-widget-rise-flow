const preview = document.getElementById("preview");
const urlInput = document.getElementById("widgetUrl");

function updatePreview() {
    const params = {
        textColor: document.getElementById('textColor').value.substring(1), // Remove o #
        bgColor: document.getElementById('bgColor').value.substring(1), // Remove o #
        bgOpacity: document.getElementById('bgOpacity').value,
        borderColor: document.getElementById('borderColor').value.substring(1), // Remove o #
        borderWidth: document.getElementById('borderWidth').value,
        borderRadius: document.getElementById('borderRadius').value,
        fontSize: document.getElementById('fontSize').value
    };

    // Atualizar preview
    preview.innerHTML = generateQuoteHTML(params);

    // Gerar URL absoluta para o widget
    const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/widget.html');
    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    
    urlInput.value = `${baseUrl}?${queryString}`;

    // Atualizar valores exibidos
    updateDisplayValues(params);
}

function generateQuoteHTML(params) {
    const quote = quotes[0];
    const style = `
        color: #${params.textColor};
        background-color: #${params.bgColor}${Math.round(params.bgOpacity * 2.55).toString(16).padStart(2, '0')};
        border: ${params.borderWidth}px solid #${params.borderColor};
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

function updateDisplayValues(params) {
    document.getElementById('bgOpacityValue').textContent = `${params.bgOpacity}%`;
    document.getElementById('borderWidthValue').textContent = `${params.borderWidth}px`;
    document.getElementById('borderRadiusValue').textContent = `${params.borderRadius}px`;
    document.getElementById('fontSizeValue').textContent = `${params.fontSize}px`;
}

// Adicionar listeners para todos os controles
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Inicializar preview
updatePreview();
