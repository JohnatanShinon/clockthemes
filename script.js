// Função para atualizar o relógio
function updateClock() {
    const now = new Date(); // Obtém a data/hora atual
    const hours = String(now.getHours()).padStart(2, '0'); // Formata as horas com dois dígitos
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Formata os minutos com dois dígitos
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Formata os segundos com dois dígitos
    // Atualiza o elemento HTML com o horário formatado
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    // Atualiza a data no formato "Dia de Mês de Ano"
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('pt-BR', options);
    // Aplica o tema com base no horário
    applyThemeBasedOnTime();
}

// Função para aplicar o tema com base no horário
function applyThemeBasedOnTime() {
    const currentHour = new Date().getHours();
    // Aplica o tema claro ou escuro com base no horário
    if (currentHour >= 6 && currentHour < 18) {
        document.body.classList.remove('dark-theme'); // Tema claro
    } else {
        document.body.classList.add('dark-theme'); // Tema escuro
    }
}

// Espera o DOM ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza o relógio a cada segundo
    setInterval(updateClock, 1000);
    // Chama a função uma vez ao carregar a página para evitar atraso inicial
    updateClock();
});

// Função para obter o fuso horário
function getTimezone() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Obtém o fuso horário do navegador
    document.getElementById('timezone').textContent = timezone || 'Desconhecido';
}

// Função para obter a localização (cidade/país)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Usa uma API de geocodificação reversa para obter a cidade e o país
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        const location = data.address.city || data.address.town || data.address.village || 'Desconhecido';
                        const country = data.address.country || 'Desconhecido';
                        document.getElementById('location').textContent = `${location}, ${country}`;
                    })
                    .catch(error => {
                        console.error('Erro ao obter localização:', error);
                        document.getElementById('location').textContent = 'Desconhecido';
                    });
            },
            function (error) {
                console.error('Erro ao acessar geolocalização:', error.message);
                document.getElementById('location').textContent = 'Desconhecido';
            }
        );
    } else {
        document.getElementById('location').textContent = 'Geolocalização não suportada';
    }
}

// Espera o DOM ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza o relógio a cada segundo
    setInterval(updateClock, 1000);
    // Chama a função uma vez ao carregar a página para evitar atraso inicial
    updateClock();

    // Obtém e exibe o fuso horário
    getTimezone();

    // Obtém e exibe a localização
    getLocation();
});
