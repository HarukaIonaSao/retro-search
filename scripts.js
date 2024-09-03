let hits = 0; // Variável para contar o número de tiros acertados no alien

// Carregar os sons
const collisionSound = document.getElementById('collision-sound');
const deathSound = document.getElementById('death-sound');

// Função para criar os tiros da nave
function criarTiro() {
    const nave = document.querySelector('.nave');
    const tiro = document.createElement('div');
    tiro.classList.add('tiro');
    tiro.style.left = `${nave.offsetLeft + nave.offsetWidth / 2 - 1}px`;
    document.body.appendChild(tiro);

    // Verifica se o tiro colide com o alien
    const checkCollision = setInterval(() => {
        const tiroRect = tiro.getBoundingClientRect();
        const alien = document.querySelector('.alien');
        const alienRect = alien.getBoundingClientRect();

        if (tiroRect.top <= alienRect.bottom &&
            tiroRect.bottom >= alienRect.top &&
            tiroRect.left >= alienRect.left &&
            tiroRect.right <= alienRect.right) {

            hits += 1; // Incrementa o contador de hits
            collisionSound.play(); // Toca o som de colisão
            tiro.remove(); // Remove o tiro
            clearInterval(checkCollision); // Para de checar a colisão para esse tiro

            // Verifica se o alien atingiu o limite de hits e o remove
            if (hits >= 10) { // Pode ajustar o número de hits conforme necessário
                deathSound.play(); // Toca o som de morte
                alien.remove();
            }
        }
    }, 50);

    // Remover o tiro depois que ele sai da tela
    setTimeout(() => {
        tiro.remove();
        clearInterval(checkCollision); // Para de checar a colisão se o tiro sair da tela
    }, 2000);
}

// Disparar tiros quando o usuário clica
document.addEventListener('click', criarTiro);

// Desbloquear áudio na primeira interação do usuário
document.addEventListener('mousemove', function() {
    // Desbloqueia a reprodução de áudio no navegador após a primeira interação
    collisionSound.play().catch(() => {});
    deathSound.play().catch(() => {});
    // Remove o listener após a primeira tentativa
    document.removeEventListener('mousemove', arguments.callee);
});

// Função para criar as estrelas
function criarEstrelas(quantidade) {
    const estrelasDiv = document.querySelector('.estrelas');
    for (let i = 0; i < quantidade; i++) {
        const estrela = document.createElement('div');
        estrela.classList.add('estrela');
        estrela.style.top = `${Math.random() * 100}%`;
        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.animationDelay = `${Math.random() * 2}s`; // Adiciona um delay aleatório para o piscar
        estrelasDiv.appendChild(estrela);
    }
}

// Chamando a função para criar 200 estrelas
criarEstrelas(200);

// Função para mover a nave junto com o mouse
document.addEventListener('mousemove', function(event) {
    const nave = document.querySelector('.nave');
    const x = event.clientX; // Pega a posição X do mouse
    nave.style.left = `${x}px`; // Move a nave na posição X do mouse
});