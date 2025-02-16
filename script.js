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

// Função para formatar a data no formato DD/MM/AAAA com o nome do dia da semana
function formatDate(date) {
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dayName = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0'); // Dia com dois dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês com dois dígitos (getMonth é base 0)
    const year = date.getFullYear(); // Ano completo
    return `${dayName}, ${day}/${month}/${year}`;
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

    if (!clockElement || !dateElement) {
        console.error("Elementos 'clock' ou 'date' não encontrados!");
        return;
    }

    clockElement.textContent = formatTime(now); // Atualiza o relógio
    dateElement.textContent = formatDate(now); // Atualiza a data
}

// Função para detectar o fuso horário e localização
function detectTimezoneAndLocation() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Detecta o fuso horário
    document.getElementById('timezone').textContent = timezone;

    // Simula a localização (substitua por uma API real se necessário)
    document.getElementById('location').textContent = "Brasil";
}

// Função para alternar o tema manualmente
function toggleThemeManually() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark'); // Salva a preferência no localStorage
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light'); // Salva a preferência no localStorage
        }
    });
}

// Função para carregar a preferência de tema salva
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        document.getElementById('theme-toggle').checked = true;
    } else if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        document.getElementById('theme-toggle').checked = false;
    } else {
        setThemeBasedOnTime(); // Define o tema com base no horário se não houver preferência salva
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página carregada. Iniciando script...");

    // Carrega a preferência de tema salva
    loadSavedTheme();

    // Detecta o fuso horário e localização
    detectTimezoneAndLocation();

    // Atualiza o relógio e a data imediatamente ao carregar a página
    updateClockAndDate();

    // Atualiza o relógio e a data a cada segundo
    setInterval(updateClockAndDate, 1000); // 1000ms = 1 segundo

    // Configura o toggle switch para alternar o tema manualmente
    toggleThemeManually();
});
