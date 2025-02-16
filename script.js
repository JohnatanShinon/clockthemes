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

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Define o tema com base no horário ao carregar a página
    setThemeBasedOnTime();

    // Atualiza o tema automaticamente a cada minuto (opcional)
    setInterval(setThemeBasedOnTime, 60000); // 60000ms = 1 minuto
});
