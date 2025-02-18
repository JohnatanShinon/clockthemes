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
