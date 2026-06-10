// ============================================
// AGROFORTE - JOGO EDUCATIVO
// Funcionalidade principal: Escolhas do dia a dia
// ============================================

// --- Dados do jogo ---
// Array com as perguntas, opções e respostas corretas (0 = primeira opção, 1 = segunda)
const perguntas = [
    {
        texto: "🌳 Você precisa de madeira para construir uma mesa. O que você faz?",
        opcoes: [
            "Compro madeira de reflorestamento certificado",
            "Derribo árvores nativas da floresta"
        ],
        correta: 0,
        explicacao: "✅ Madeira de reflorestamento vem de árvores plantadas especialmente para isso. Assim, não prejudicamos as florestas nativas!"
    },
    {
        texto: "📄 Você usou papel no colégio. O que fazer com ele?",
        opcoes: [
            "Jogo no lixo comum",
            "Coloco no lixo de reciclagem"
        ],
        correta: 1,
        explicacao: "✅ Reciclar papel evita que mais árvores sejam cortadas. Uma atitude simples que ajuda muito o planeta!"
    },
    {
        texto: "🏠 Uma fazenda quer aumentar sua plantação. Qual a melhor opção?",
        opcoes: [
            "Desmatar uma nova área de floresta",
            "Usar uma área já aberta e melhorar o solo"
        ],
        correta: 1,
        explicacao: "✅ Usar áreas já abertas evita o desmatamento. Assim, produzimos alimentos sem destruir novas florestas!"
    }
];

// Variáveis de controle do jogo
let perguntaAtual = 0;
let pontuacao = 0;

// Função para carregar a pergunta atual
function carregarPergunta() {
    // Verifica se o jogo já terminou
    if (perguntaAtual >= perguntas.length) {
        finalizarJogo();
        return;
    }
    
    // Pega a pergunta atual
    const p = perguntas[perguntaAtual];
    
    // Cria o HTML da pergunta
    const areaJogo = document.getElementById("area-jogo");
    areaJogo.innerHTML = `
        <div class="pergunta">${p.texto}</div>
        <div class="opcoes">
            <button class="opcao" data-opcao="0">✅ ${p.opcoes[0]}</button>
            <button class="opcao" data-opcao="1">❌ ${p.opcoes[1]}</button>
        </div>
        <div class="barra-progresso">
            <div class="progresso" style="width: ${(perguntaAtual / perguntas.length) * 100}%"></div>
        </div>
        <div class="pontuacao">⭐ Pontos: ${pontuacao}</div>
        <div class="feedback"></div>
    `;
    
    // Adiciona eventos aos botões
    document.querySelectorAll(".opcao").forEach(botao => {
        botao.addEventListener("click", () => {
            const opcaoEscolhida = parseInt(botao.dataset.opcao);
            verificarResposta(opcaoEscolhida);
        });
    });
}

// Função para verificar a resposta
function verificarResposta(opcaoEscolhida) {
    const p = perguntas[perguntaAtual];
    const feedbackDiv = document.querySelector(".feedback");
    
    if (opcaoEscolhida === p.correta) {
        // Resposta correta
        pontuacao++;
        feedbackDiv.innerHTML = `<div class="feedback correto">🎉 CORRETO! ${p.explicacao}</div>`;
    } else {
        // Resposta errada
        const opcaoCorretaTexto = p.opcoes[p.correta];
        feedbackDiv.innerHTML = `<div class="feedback errado">❌ ERRADO! A opção correta era: "${opcaoCorretaTexto}".<br>${p.explicacao}</div>`;
    }
    
    // Atualiza pontuação na tela
    document.querySelector(".pontuacao").innerHTML = `⭐ Pontos: ${pontuacao}`;
    
    // Avança para a próxima pergunta depois de 2 segundos
    perguntaAtual++;
    
    // Desabilita os botões temporariamente
    document.querySelectorAll(".opcao").forEach(botao => {
        botao.disabled = true;
    });
    
    // Carrega a próxima pergunta ou finaliza
    setTimeout(() => {
        carregarPergunta();
    }, 2000);
}

// Função para finalizar o jogo
function finalizarJogo() {
    const areaJogo = document.getElementById("area-jogo");
    const resultadoDiv = document.getElementById("resultado-jogo");
    const mensagemFinal = document.getElementById("mensagem-final");
    
    // Esconde a área do jogo
    areaJogo.style.display = "none";
    
    // Mostra o resultado
    resultadoDiv.style.display = "block";
    
    // Calcula porcentagem de acertos
    const percentual = (pontuacao / perguntas.length) * 100;
    
    // Gera mensagem personalizada
    let mensagem = "";
    if (percentual === 100) {
        mensagem = "🌟 PARABÉNS! Você acertou tudo! Você é um verdadeiro defensor do meio ambiente! Continue assim!";
    } else if (percentual >= 66) {
        mensagem = "👍 Muito bem! Você já sabe bastante sobre como ajudar o planeta. Estude as dicas e melhore ainda mais!";
    } else if (percentual >= 33) {
        mensagem = "📚 Bom esforço! Você está no caminho certo. Releia as informações do site e tente novamente!";
    } else {
        mensagem = "🌱 Vamos estudar mais? O site tem muitas informações importantes. Leia com atenção e jogue de novo!";
    }
    
    mensagemFinal.innerHTML = `${mensagem}<br><br>Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Reinicia as variáveis
    perguntaAtual = 0;
    pontuacao = 0;
    
    // Esconde o resultado
    document.getElementById("resultado-jogo").style.display = "none";
    
    // Mostra a área do jogo
    const areaJogo = document.getElementById("area-jogo");
    areaJogo.style.display = "block";
    
    // Recarrega a primeira pergunta
    carregarPergunta();
}

// --- ACESSIBILIDADE ---
// Botão para abrir/fechar opções
const btnAcessibilidade = document.getElementById("btnAcessibilidade");
const opcoesAcessibilidade = document.getElementById("opcoesAcessibilidade");

btnAcessibilidade.addEventListener("click", () => {
    if (opcoesAcessibilidade.style.display === "none") {
        opcoesAcessibilidade.style.display = "flex";
    } else {
        opcoesAcessibilidade.style.display = "none";
    }
});

// Aumentar fonte
document.getElementById("aumentarFonte").addEventListener("click", () => {
    const body = document.body;
    let tamanhoAtual = parseFloat(window.getComputedStyle(body).fontSize);
    if (tamanhoAtual < 28) {
        body.style.fontSize = (tamanhoAtual + 2) + "px";
    }
});

// Diminuir fonte
document.getElementById("diminuirFonte").addEventListener("click", () => {
    const body = document.body;
    let tamanhoAtual = parseFloat(window.getComputedStyle(body).fontSize);
    if (tamanhoAtual > 12) {
        body.style.fontSize = (tamanhoAtual - 2) + "px";
    }
});

// Alto contraste
let contrasteAtivo = false;
document.getElementById("altoContraste").addEventListener("click", () => {
    if (!contrasteAtivo) {
        document.body.classList.add("alto-contraste");
        contrasteAtivo = true;
    } else {
        document.body.classList.remove("alto-contraste");
        contrasteAtivo = false;
    }
});

// --- INICIALIZAÇÃO DO JOGO ---
// Garante que o jogo comece quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
    carregarPergunta();
});

// Botão reiniciar jogo
document.getElementById("reiniciarJogo").addEventListener("click", reiniciarJogo);
