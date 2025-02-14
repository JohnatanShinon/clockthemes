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

    // Verifica e aplica o tema com base no horário (somente se não houver preferência salva)
    applyThemeBasedOnTime();
}

// Função para alternar o tema
function toggleTheme() {
    // Alterna o tema
    const isDarkTheme = document.body.classList.toggle('dark-theme');

    // Salva a preferência do usuário no localStorage
    localStorage.setItem('userThemePreference', isDarkTheme ? 'dark' : 'light');
}

// Função para aplicar o tema com base no horário (se não houver preferência salva)
function applyThemeBasedOnTime() {
    const currentHour = new Date().getHours();
    const userThemePreference = localStorage.getItem('userThemePreference');

    // Se o usuário já definiu uma preferência, mantém essa escolha
    if (userThemePreference === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (userThemePreference === 'light') {
        document.body.classList.remove('dark-theme');
    } else {
        // Caso contrário, aplica o tema com base no horário atual
        if (currentHour >= 6 && currentHour < 18) {
            document.body.classList.remove('dark-theme'); // Tema claro
        } else {
            document.body.classList.add('dark-theme'); // Tema escuro
        }
    }
}

// Função para resetar a preferência do usuário
function resetThemePreference() {
    localStorage.removeItem('userThemePreference'); // Remove a preferência salva
    applyThemeBasedOnTime(); // Aplica o tema com base no horário atual
    alert('Preferência de tema resetada! O sistema agora seguirá o horário.'); // Notifica o usuário
}

// Espera o DOM ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza o relógio a cada segundo
    setInterval(updateClock, 1000);

    // Chama a função uma vez ao carregar a página para evitar atraso inicial
    updateClock();

    // Adiciona evento de mudança ao toggle switch para alternar o tema
    document.querySelector('.theme-switch input').addEventListener('change', toggleTheme);

    // Cria o botão de reset
    const resetButton = document.createElement('button');
    resetButton.textContent = '🔄 Reset'; // Define o texto com um ícone de reciclagem
    resetButton.title = 'Resetar Preferência de Tema'; // Adiciona um tooltip explicativo
    resetButton.style.marginTop = '15px';
    resetButton.style.marginLeft = '20px';
    resetButton.style.padding = '10px 20px'; // Ajuste o padding para melhor visualização
    resetButton.style.backgroundColor = '#e74c3c'; // Cor de fundo vermelha
    resetButton.style.color = 'white'; // Cor do texto branca
    resetButton.style.border = 'none'; // Sem borda
    resetButton.style.borderRadius = '6px'; // Borda arredondada
    resetButton.style.cursor = 'pointer'; // Cursor de clique
    resetButton.style.fontSize = '16px'; // Tamanho da fonte
    resetButton.style.display = 'flex'; // Melhora a centralização do ícone e texto
    resetButton.style.alignItems = 'center'; // Centraliza verticalmente
    resetButton.style.gap = '5px'; // Espaçamento entre o ícone e o texto

    // Adiciona o evento de clique ao botão
    resetButton.addEventListener('click', resetThemePreference);

    // Adiciona o botão ao container
    document.querySelector('.container').appendChild(resetButton);

    // Aplica o tema correto ao carregar a página
    applyThemeBasedOnTime();
});