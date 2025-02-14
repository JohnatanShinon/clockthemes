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

    // Define a cor da bolinha do toggle switch
    updateToggleColor();
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

    // Atualiza a cor da bolinha do toggle switch
    updateToggleColor();
}

// Função para atualizar a cor da bolinha do toggle switch
function updateToggleColor() {
    const currentHour = new Date().getHours();
    const userThemePreference = localStorage.getItem('userThemePreference');

    // Determina o tema esperado com base no horário atual
    const expectedTheme = currentHour >= 6 && currentHour < 18 ? 'light' : 'dark';

    // Seleciona o slider do toggle switch
    const slider = document.querySelector('.theme-switch .slider');

    // Define a cor da bolinha
    if (userThemePreference && userThemePreference !== expectedTheme) {
        // Se o tema salvo for diferente do esperado, a bolinha fica vermelha
        slider.style.backgroundColor = '#ff0000';
    } else {
        // Caso contrário, a bolinha volta ao branco
        slider.style.backgroundColor = '#ffffff';
    }
}

// Espera o DOM ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Atualiza o relógio a cada segundo
    setInterval(updateClock, 1000);

    // Chama a função uma vez ao carregar a página para evitar atraso inicial
    updateClock();

    // Adiciona evento de mudança ao toggle switch para alternar o tema
    document.querySelector('.theme-switch input').addEventListener('change', toggleTheme);

    // Aplica o tema correto ao carregar a página
    applyThemeBasedOnTime();
});
