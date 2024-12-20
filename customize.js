const preview = document.getElementById("preview");
const urlInput = document.getElementById("widgetUrl");

function updatePreview() {
  const theme = document.getElementById("theme").value;
  const font = document.getElementById("font").value;
  const fontSize = document.getElementById("fontSize").value;

  preview.innerHTML = `<iframe src="widget.html?theme=${theme}&font=${font}&size=${fontSize}" 
        style="width: 100%; height: 150px; border: none;"></iframe>`;

  const baseUrl = window.location.href.replace("index.html", "widget.html");
  const widgetUrl = `${baseUrl}?theme=${theme}&font=${font}&size=${fontSize}`;
  urlInput.value = widgetUrl;
}

function copyUrl() {
  urlInput.select();
  document.execCommand("copy");
  alert("Link copiado!");
}

document.querySelectorAll("select, input").forEach((el) => {
  el.addEventListener("change", updatePreview);
});

updatePreview();
