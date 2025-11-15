// Controle do leitor de tela
let readerIsActive = false;
let currentUtterance = null;

// Ativa/desativa modo alto contraste
export function toggleHighContrast() {
  const active = document.body.classList.toggle("high-contrast");
  localStorage.setItem("high-contrast", active ? "true" : "false");
}

// Aumenta o tamanho da fonte geral
export function increaseFontSize() {
  const currentSize = parseFloat(localStorage.getItem("font-scale") || "1");
  const newSize = Math.min(currentSize + 0.1, 1.5);
  document.body.style.transform = `scale(${newSize})`;
  document.body.style.transformOrigin = "top left";
  localStorage.setItem("font-scale", newSize.toString());
}

// Diminui o tamanho da fonte geral
export function decreaseFontSize() {
  const currentSize = parseFloat(localStorage.getItem("font-scale") || "1");
  const newSize = Math.max(currentSize - 0.1, 0.8);
  document.body.style.transform = `scale(${newSize})`;
  document.body.style.transformOrigin = "top left";
  localStorage.setItem("font-scale", newSize.toString());
}

// INICIA leitura de tela
export function startScreenReader() {
  if (!window.speechSynthesis) {
    alert("Seu navegador não suporta leitura de tela.");
    return;
  }

  // Se já estiver lendo, não inicia outra
  if (readerIsActive) {
    alert("O leitor já está ativo. Clique em 'Parar Leitura' para interromper.");
    return;
  }

  const text = document.body.innerText;
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "pt-BR";
  currentUtterance.rate = 1;

  // Quando terminar a leitura, reseta estado
  currentUtterance.onend = () => {
    readerIsActive = false;
    localStorage.setItem("screen-reader", "false");
  };

  readerIsActive = true;
  localStorage.setItem("screen-reader", "true");
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(currentUtterance);
}

// PARA a leitura de tela
export function stopScreenReader() {
  if (!readerIsActive) return;

  window.speechSynthesis.cancel();
  readerIsActive = false;
  localStorage.setItem("screen-reader", "false");
}

// Reaplica preferências ao carregar
export function applyAccessibilityPreferences() {
  if (localStorage.getItem("high-contrast") === "true") {
    document.body.classList.add("high-contrast");
  }

  const fontScale = parseFloat(localStorage.getItem("font-scale") || "1");
  document.body.style.transform = `scale(${fontScale})`;
  document.body.style.transformOrigin = "top left";
}
