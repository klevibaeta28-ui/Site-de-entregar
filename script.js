/* ==========================================================
   Giz & Java — comportamento do site
   Depende de lessons.js (constante AULAS)
   ========================================================== */

(() => {
  "use strict";

  const CHAVE_PROGRESSO = "giz-java-progresso";
  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilidades ---------- */

  const escapar = (t) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Converte `trecho` em <code>trecho</code> (depois de escapar o HTML)
  const comCodigoInline = (t) =>
    escapar(t).replace(/`([^`]+)`/g, "<code>$1</code>");

  /* ---------- Destaque de sintaxe (Java) ---------- */

  const PALAVRAS =
    "abstract|boolean|break|case|catch|char|class|continue|default|do|double|else|extends|final|finally|float|for|if|implements|import|int|long|new|private|protected|public|return|static|super|switch|this|throw|try|void|while|true|false|null";

  // Grupos: 1 comentário | 2 string | 3 char | 4 palavra-chave | 5 tipo | 6 número | 7 método
  const REGEX_JAVA = new RegExp(
    "(\\/\\/.*$)|" +
      '("(?:[^"\\\\]|\\\\.)*")|' +
      "('(?:[^'\\\\]|\\\\.)')|" +
      "\\b(" + PALAVRAS + ")\\b|" +
      "\\b([A-Z][A-Za-z0-9_]*)\\b|" +
      "\\b(\\d+(?:\\.\\d+)?)\\b|" +
      "\\b([a-z_][A-Za-z0-9_]*)(?=\\()",
    "gm"
  );

  function destacar(codigo) {
    let saida = "";
    let ultimo = 0;
    let m;
    REGEX_JAVA.lastIndex = 0;
    while ((m = REGEX_JAVA.exec(codigo)) !== null) {
      saida += escapar(codigo.slice(ultimo, m.index));
      const classe = m[1] ? "com"
        : (m[2] || m[3]) ? "str"
        : m[4] ? "kw"
        : m[5] ? "tipo"
        : m[6] ? "num"
        : "met";
      saida += `<span class="${classe}">${escapar(m[0])}</span>`;
      ultimo = m.index + m[0].length;
    }
    return saida + escapar(codigo.slice(ultimo));
  }

  /* ---------- Progresso ---------- */

  let concluidas = new Set();
  try {
    concluidas = new Set(JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || "[]"));
  } catch (_) { /* sem armazenamento: segue sem salvar */ }

  function salvarProgresso() {
    try {
      localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify([...concluidas]));
    } catch (_) { /* ignora */ }
  }

  function atualizarProgresso() {
    const total = AULAS.length;
    const feitas = AULAS.filter((a) => concluidas.has(a.id)).length;
    $("#progresso-barra").style.width = `${(feitas / total) * 100}%`;
    $("#progresso-texto").textContent = `${feitas} de ${total} ${total === 1 ? "aula" : "aulas"}`;
    document.querySelectorAll(".indice-link").forEach((link) => {
      const feita = concluidas.has(link.dataset.id);
      link.classList.toggle("feita", feita);
      $(".indice-marca", link).textContent = feita ? "✓" : "•";
    });
  }

  function concluir(id) {
    if (concluidas.has(id)) return;
    concluidas.add(id);
    salvarProgresso();
    atualizarProgresso();
    const selo = $("#selo-aula");
    if (selo) selo.hidden = false;

    // Recompensa escondida: terminar todas as aulas revela a mensagem
    if (concluidas.size === AULAS.length) {
      setTimeout(abrirHomenagem, 1400);
    }
  }

  /* ---------- Renderização ---------- */

  function renderBloco(b) {
    switch (b.t) {
      case "p":
        return `<p>${comCodigoInline(b.x)}</p>`;

      case "lista":
        return `<ul>${b.itens.map((i) => `<li>${comCodigoInline(i)}</li>`).join("")}</ul>`;

      case "dica":
        return `<aside class="dica"><strong>Atenção</strong><p>${comCodigoInline(b.x)}</p></aside>`;

      case "saida":
        return `<div class="saida" role="group" aria-label="Saída do programa">
                  <span class="rotulo">Saída</span><pre>${escapar(b.x)}</pre>
                </div>`;

      case "code": {
        const terminal = b.arquivo === "Terminal";
        const corpo = terminal ? escapar(b.x) : destacar(b.x);
        return `<figure class="codigo${terminal ? " terminal" : ""}">
                  <figcaption>
                    <span>${escapar(b.arquivo)}</span>
                    <button type="button" class="copiar" data-copiar>Copiar</button>
                  </figcaption>
                  <pre><code>${corpo}</code></pre>
                </figure>`;
      }
      default:
        return "";
    }
  }

  function renderAula(indice) {
    const aula = AULAS[indice];
    const anterior = AULAS[indice - 1];
    const proxima = AULAS[indice + 1];
    const feita = concluidas.has(aula.id);

    $("#aula").innerHTML = `
      <p class="aula-selo" id="selo-aula" ${feita ? "" : "hidden"}>Aula concluída</p>
      <h1>${escapar(aula.titulo)}</h1>
      <p class="aula-resumo">${escapar(aula.resumo)}</p>

      ${aula.blocos.map(renderBloco).join("")}

      <section class="quiz" aria-labelledby="quiz-titulo">
        <h2 id="quiz-titulo">${comCodigoInline(aula.quiz.pergunta)}</h2>
        <ul class="opcoes">
          ${aula.quiz.opcoes
            .map((o) => `<li><button type="button" class="opcao">${comCodigoInline(o)}</button></li>`)
            .join("")}
        </ul>
        <p class="retorno" id="retorno" role="status"></p>
      </section>

      <div class="navegacao">
        ${anterior
          ? `<a class="botao secundario" href="#/${anterior.id}">Anterior: ${escapar(anterior.titulo)}</a>`
          : "<span></span>"}
        ${proxima
          ? `<a class="botao" href="#/${proxima.id}">Próxima: ${escapar(proxima.titulo)}</a>`
          : ""}
      </div>
    `;

    ligarQuiz(aula);

    document.querySelectorAll(".indice-link").forEach((link) => {
      if (link.dataset.id === aula.id) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function renderIndice() {
    $("#indice").innerHTML = AULAS.map(
      (a) => `<li><a class="indice-link" href="#/${a.id}" data-id="${a.id}">
                <span class="indice-marca" aria-hidden="true">•</span>
                <span>${escapar(a.titulo)}</span>
              </a></li>`
    ).join("");
  }

  /* ---------- Quiz ---------- */

  function ligarQuiz(aula) {
    const botoes = [...document.querySelectorAll(".opcao")];
    const retorno = $("#retorno");

    botoes.forEach((botao, i) => {
      botao.addEventListener("click", () => {
        if (i === aula.quiz.correta) {
          botao.classList.add("certa");
          botoes.forEach((b) => (b.disabled = true));
          retorno.className = "retorno ok";
          retorno.textContent = "Correto! " + aula.quiz.explicacao.replace(/`/g, "");
          concluir(aula.id);
        } else {
          botao.classList.add("errada");
          botao.disabled = true;
          retorno.className = "retorno erro";
          retorno.textContent = "Ainda não. Releia a aula e tente outra opção.";
        }
      });
    });
  }

  /* ---------- Roteamento por hash (#/id-da-aula) ---------- */

  function aulaDoHash() {
    const id = location.hash.replace(/^#\//, "");
    const i = AULAS.findIndex((a) => a.id === id);
    return i >= 0 ? i : 0;
  }

  function navegar() {
    renderAula(aulaDoHash());
    const lousa = $("#aula");
    lousa.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }

  /* ---------- Copiar código ---------- */

  document.addEventListener("click", async (e) => {
    const botao = e.target.closest("[data-copiar]");
    if (!botao) return;
    const codigo = $("code", botao.closest(".codigo")).textContent;
    try {
      await navigator.clipboard.writeText(codigo);
      botao.textContent = "Copiado!";
    } catch (_) {
      botao.textContent = "Não foi possível";
    }
    setTimeout(() => (botao.textContent = "Copiar"), 1600);
  });

  /* ==========================================================
     Mensagem escondida
     Como abrir:
       1) digitar "wilker" ou "professor" em qualquer lugar da página
       2) clicar 5 vezes seguidas no logotipo
       3) concluir as 6 aulas
     ========================================================== */

  const MENSAGEM = [
    "Hoje é Dia do Professor, e este site existe por causa de uma ideia que você ensinou: ninguém nasce sabendo programar, mas todo mundo consegue aprender um passo de cada vez.",
    "Obrigado por não entregar só a resposta, e sim ensinar a ler o erro, desconfiar do próprio código e tentar de novo. Isso vale para qualquer linguagem, e para a vida.",
    "Que cada aluno seu escreva códigos que compilem de primeira. E, quando não compilarem, que lembrem de você e de como corrigir. Feliz Dia do Professor!"
  ];

  const CODIGO_FINAL = `public class Homenagem {
    public static void main(String[] args) {
        String professor = "Wilker Luz";
        System.out.println("Obrigado, professor " + professor + "!");
    }
}`;

  let temporizador = null;
  let sessaoEscrita = 0;

  function finalizarMensagem() {
    const extra = $("#extra");
    extra.innerHTML = `
      <figure class="codigo">
        <figcaption><span>Homenagem.java</span></figcaption>
        <pre><code>${destacar(CODIGO_FINAL)}</code></pre>
      </figure>
      <div class="saida"><span class="rotulo">Saída</span><pre>Obrigado, professor Wilker Luz!</pre></div>`;
    extra.hidden = false;
    soltarConfete();
  }

  function escreverMensagem() {
    const corpo = $("#mensagem");
    const extra = $("#extra");
    corpo.textContent = "";
    extra.hidden = true;
    clearTimeout(temporizador);
    const sessao = ++sessaoEscrita;

    const paragrafos = MENSAGEM.map(() => {
      const p = document.createElement("p");
      corpo.appendChild(p);
      return p;
    });

    const mostrarTudo = () => {
      clearTimeout(temporizador);
      sessaoEscrita++;
      paragrafos.forEach((p, i) => (p.textContent = MENSAGEM[i]));
      if (extra.hidden) finalizarMensagem();
    };

    corpo.onclick = mostrarTudo; // clicar no texto pula a animação

    if (reduzMovimento) { mostrarTudo(); return; }

    let i = 0;
    let j = 0;
    const passo = () => {
      if (sessao !== sessaoEscrita) return;
      if (i >= MENSAGEM.length) { finalizarMensagem(); return; }
      j += 1;
      paragrafos[i].textContent = MENSAGEM[i].slice(0, j);
      if (j >= MENSAGEM[i].length) {
        i += 1;
        j = 0;
        temporizador = setTimeout(passo, 450);
      } else {
        temporizador = setTimeout(passo, 22);
      }
    };
    passo();
  }

  function soltarConfete() {
    if (reduzMovimento) return;
    const area = $("#confete");
    const cores = ["#f4cf5d", "#8fd0e8", "#f2a1b5", "#b6e3a8", "#eeeadf"];
    area.innerHTML = "";
    for (let n = 0; n < 48; n++) {
      const pedaco = document.createElement("span");
      pedaco.style.setProperty("--x", `${Math.random() * 100}%`);
      pedaco.style.setProperty("--t", `${4 + Math.random() * 5}px`);
      pedaco.style.setProperty("--cor", cores[n % cores.length]);
      pedaco.style.setProperty("--d", `${2.8 + Math.random() * 2.2}s`);
      pedaco.style.setProperty("--atraso", `${Math.random() * 1.2}s`);
      pedaco.style.setProperty("--giro", `${(Math.random() - 0.5) * 900}deg`);
      area.appendChild(pedaco);
    }
    setTimeout(() => (area.innerHTML = ""), 6000);
  }

  function abrirHomenagem() {
    const dialogo = $("#homenagem");
    if (dialogo.open) return;
    dialogo.showModal();
    escreverMensagem();
  }

  const dialogo = $("#homenagem");
  $("#fechar-homenagem").addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
  dialogo.addEventListener("close", () => {
    sessaoEscrita++;
    clearTimeout(temporizador);
    $("#confete").innerHTML = "";
  });

  // Gatilho 1: digitar a palavra secreta
  let teclas = "";
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    teclas = (teclas + e.key.toLowerCase()).slice(-12);
    if (teclas.endsWith("wilker") || teclas.endsWith("professor")) {
      teclas = "";
      abrirHomenagem();
    }
  });

  // Gatilho 2: cinco cliques seguidos no logotipo
  let cliquesLogo = 0;
  let relogioLogo = null;
  $("#marca").addEventListener("click", () => {
    cliquesLogo += 1;
    clearTimeout(relogioLogo);
    relogioLogo = setTimeout(() => (cliquesLogo = 0), 2500);
    if (cliquesLogo >= 5) {
      cliquesLogo = 0;
      abrirHomenagem();
    } else if (cliquesLogo === 1) {
      location.hash = `#/${AULAS[0].id}`;
    }
  });

  /* ---------- Início ---------- */

  renderIndice();
  atualizarProgresso();
  window.addEventListener("hashchange", navegar);
  renderAula(aulaDoHash());

  console.log(
    "%cPsiu...%c há uma mensagem escondida neste site. Quem programa também sabe procurar.",
    "color:#f4cf5d;font-size:16px;font-weight:bold",
    "color:inherit"
  );
})();
