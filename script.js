// Função para definir o tema com base no horário local
function setThemeBasedOnTime() {
    const hour = new Date().getHours();
    const isLightTheme = hour >= 6 && hour < 18; // Define o tema claro entre 06h e 17h59

    if (isLightTheme) {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
}

// Função para formatar a data no formato DD/MM/AAAA
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Dia com dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês com dois dígitos (getMonth é base 0)
    const year = date.getFullYear(); // Ano completo
    return `${day}/${month}/${year}`;
}

// Função para formatar o horário no formato HH:MM:SS
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0'); // Horas com dois dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos com dois dígitos
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Segundos com dois dígitos
    return `${hours}:${minutes}:${seconds}`;
}

// Função para atualizar o relógio e a data
function updateClockAndDate() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    clockElement.textContent = formatTime(now); // Atualiza o relógio
    dateElement.textContent = formatDate(now); // Atualiza a data
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Define o tema com base no horário ao carregar a página
    setThemeBasedOnTime();

    // Atualiza o tema automaticamente a cada minuto (opcional)
    setInterval(setThemeBasedOnTime, 60000); // 60000ms = 1 minuto

    // Atualiza o relógio e a data imediatamente ao carregar a página
    updateClockAndDate();

    // Atualiza o relógio e a data a cada segundo
    setInterval(updateClockAndDate, 1000); // 1000ms = 1 segundo
});
