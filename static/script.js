/* ==========================================================
   Giz & Java — comportamento do site
   Depende de static/aulas/*.js (que preenchem window.TRILHAS)
   ========================================================== */

(() => {
  "use strict";

  const TRILHAS = window.TRILHAS || [];
  if (TRILHAS.length === 0) return;

  const CHAVE_PROGRESSO = "giz-java-progresso";
  const CHAVE_CELEBROU = "giz-java-celebrou";
  const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilidades de texto ---------- */

  const escapar = (t) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // `código` vira <code>, **negrito** vira <strong> (após escapar o HTML)
  const comCodigoInline = (t) =>
    escapar(t)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  /* ==========================================================
     Destaque de sintaxe
     Cada linguagem é uma união de padrões; o grupo que casou
     decide a cor (com = comentário, str = texto, kw = palavra
     reservada, tipo = tipos e classes, num = número,
     met = chamadas de função).
     ========================================================== */

  const uniao = (...padroes) =>
    new RegExp(padroes.map((p) => `(${p.source})`).join("|"), "gm");

  const palavras = (lista) => new RegExp(`\\b(?:${lista})\\b`);

  function colorir(codigo, regex, classificar) {
    let saida = "";
    let ultimo = 0;
    let m;
    regex.lastIndex = 0;
    while ((m = regex.exec(codigo)) !== null) {
      saida += escapar(codigo.slice(ultimo, m.index));
      saida += `<span class="${classificar(m)}">${escapar(m[0])}</span>`;
      ultimo = m.index + m[0].length;
    }
    return saida + escapar(codigo.slice(ultimo));
  }

  /* ----- Java ----- */
  const RX_JAVA = uniao(
    /\/\/.*$/,
    /"(?:[^"\\\n]|\\.)*"/,
    /'(?:[^'\\\n]|\\.)'/,
    palavras("abstract|boolean|break|case|catch|char|class|continue|default|do|double|else|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|new|private|protected|public|return|static|super|switch|this|throw|try|void|while|true|false|null"),
    /\b[A-Z][A-Za-z0-9_]*\b/,
    /\b\d+(?:\.\d+)?\b/,
    /\b[a-z_][A-Za-z0-9_]*(?=\()/
  );
  const classeJava = (m) =>
    m[1] ? "com" : (m[2] || m[3]) ? "str" : m[4] ? "kw" : m[5] ? "tipo" : m[6] ? "num" : "met";

  /* ----- Python ----- */
  const RX_PYTHON = uniao(
    /#.*$/,
    /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/,
    /@[A-Za-z_][\w.]*/,
    palavras("and|as|break|class|continue|def|elif|else|except|finally|for|from|if|import|in|is|lambda|not|or|pass|raise|return|self|try|while|with|None|True|False"),
    /\b[A-Z][A-Za-z0-9_]*\b/,
    /\b\d+(?:\.\d+)?\b/,
    /\b[A-Za-z_]\w*(?=\()/
  );
  const classePython = (m) =>
    m[1] ? "com" : m[2] ? "str" : m[3] ? "met" : m[4] ? "kw" : m[5] ? "tipo" : m[6] ? "num" : "met";

  /* ----- JavaScript ----- */
  const RX_JS = uniao(
    /\/\/.*$/,
    /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/,
    palavras("async|await|break|case|catch|class|const|continue|default|else|false|for|function|if|in|let|new|null|of|return|switch|this|throw|true|try|typeof|undefined|var|while"),
    /\b(?:[A-Z][A-Za-z0-9_]*|document|console|window)\b/,
    /\b\d+(?:\.\d+)?\b/,
    /\b[A-Za-z_]\w*(?=\()/
  );
  const classeJs = (m) =>
    m[1] ? "com" : m[2] ? "str" : m[3] ? "kw" : m[4] ? "tipo" : m[5] ? "num" : "met";

  /* ----- CSS ----- */
  // 1 comentário | 2 cabeçalho de regra (seletor + "{") | 3 texto | 4 cor hex | 5 número | 6 propriedade
  const RX_CSS = uniao(
    /\/\*[\s\S]*?\*\//,
    /(?:(?!\/\*)[^{}])*\{/,
    /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/,
    /#[0-9a-fA-F]{3,8}\b/,
    /-?\d*\.?\d+(?:px|rem|em|vh|vw|fr|deg|s|%)?/,
    /-{0,2}[a-z][a-z-]*(?=\s*:)/
  );

  function destacarCss(codigo) {
    let saida = "";
    let ultimo = 0;
    let m;
    RX_CSS.lastIndex = 0;
    while ((m = RX_CSS.exec(codigo)) !== null) {
      saida += escapar(codigo.slice(ultimo, m.index));
      if (m[2]) {
        const corpo = m[0].slice(0, -1);
        const espaco = corpo.match(/^\s*/)[0];
        saida += escapar(espaco) +
          `<span class="tipo">${escapar(corpo.slice(espaco.length))}</span>{`;
      } else {
        const classe = m[1] ? "com" : m[3] ? "str" : (m[4] || m[5]) ? "num" : "kw";
        saida += `<span class="${classe}">${escapar(m[0])}</span>`;
      }
      ultimo = m.index + m[0].length;
    }
    return saida + escapar(codigo.slice(ultimo));
  }

  /* ----- HTML (inclui {{ }} e {% %} do Jinja) ----- */
  const RX_HTML = /(<!--[\s\S]*?-->)|(\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\})|(<!DOCTYPE[^>]*>)|(<\/?[A-Za-z][^>]*>)/gi;

  function colorirTag(tag) {
    const p = /^(<\/?)([A-Za-z][\w-]*)([\s\S]*?)(\/?>)$/.exec(tag);
    if (!p) return escapar(tag);

    let saida = escapar(p[1]) + `<span class="kw">${escapar(p[2])}</span>`;
    const resto = p[3];
    const attr = /([A-Za-z_:@][\w:.-]*)(=)?("[^"]*"|'[^']*')?/g;
    let ultimo = 0;
    let a;
    while ((a = attr.exec(resto)) !== null) {
      saida += escapar(resto.slice(ultimo, a.index));
      saida += `<span class="tipo">${escapar(a[1])}</span>`;
      if (a[2]) saida += "=";
      if (a[3]) saida += `<span class="str">${escapar(a[3])}</span>`;
      ultimo = a.index + a[0].length;
    }
    return saida + escapar(resto.slice(ultimo)) + escapar(p[4]);
  }

  function destacarHtml(codigo) {
    let saida = "";
    let ultimo = 0;
    let m;
    RX_HTML.lastIndex = 0;
    while ((m = RX_HTML.exec(codigo)) !== null) {
      saida += escapar(codigo.slice(ultimo, m.index));
      if (m[1]) saida += `<span class="com">${escapar(m[0])}</span>`;
      else if (m[2]) saida += `<span class="num">${escapar(m[0])}</span>`;
      else if (m[3]) saida += `<span class="com">${escapar(m[0])}</span>`;
      else saida += colorirTag(m[0]);
      ultimo = m.index + m[0].length;
    }
    return saida + escapar(codigo.slice(ultimo));
  }

  const EXTENSOES = { java: "java", py: "python", js: "js", css: "css", html: "html" };

  function destacar(codigo, lang) {
    switch (lang) {
      case "java":   return colorir(codigo, RX_JAVA, classeJava);
      case "python": return colorir(codigo, RX_PYTHON, classePython);
      case "js":     return colorir(codigo, RX_JS, classeJs);
      case "css":    return destacarCss(codigo);
      case "html":   return destacarHtml(codigo);
      default:       return escapar(codigo);
    }
  }

  const linguagemDe = (arquivo) =>
    EXTENSOES[arquivo.split(".").pop().toLowerCase()] || null;

  /* ==========================================================
     Progresso (salvo no navegador)
     Chaves no formato "trilha/aula", ex.: "java/ola-mundo"
     ========================================================== */

  let feitas = new Set();
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || "[]");
    // compatibilidade: versão antiga guardava só "ola-mundo" (era só Java)
    feitas = new Set(salvo.map((k) => (k.includes("/") ? k : `java/${k}`)));
  } catch (_) { /* sem armazenamento: segue sem salvar */ }

  const salvarProgresso = () => {
    try { localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify([...feitas])); } catch (_) { /* ignora */ }
  };

  const chave = (trilha, aula) => `${trilha.id}/${aula.id}`;
  const contagem = (trilha) => trilha.aulas.filter((a) => feitas.has(chave(trilha, a))).length;

  const jaCelebrou = () => {
    try { return localStorage.getItem(CHAVE_CELEBROU) === "1"; } catch (_) { return false; }
  };
  const marcarCelebrou = () => {
    try { localStorage.setItem(CHAVE_CELEBROU, "1"); } catch (_) { /* ignora */ }
  };

  /* ---------- Estado e rotas (#/trilha/aula) ---------- */

  const estado = { trilha: 0, aula: 0 };

  function lerHash() {
    const partes = location.hash.replace(/^#\//, "").split("/");
    let ti = TRILHAS.findIndex((t) => t.id === partes[0]);
    let ai = -1;
    if (ti >= 0) {
      ai = TRILHAS[ti].aulas.findIndex((a) => a.id === partes[1]);
    } else {
      // links antigos: #/ola-mundo (eram só de Java)
      ti = 0;
      ai = TRILHAS[0].aulas.findIndex((a) => a.id === partes[0]);
    }
    return { trilha: ti, aula: ai >= 0 ? ai : 0 };
  }

  const href = (trilha, aula) => `#/${trilha.id}/${aula.id}`;

  function destinoDaTrilha(trilha) {
    const proxima = trilha.aulas.find((a) => !feitas.has(chave(trilha, a)));
    return href(trilha, proxima || trilha.aulas[0]);
  }

  /* ==========================================================
     Renderização
     ========================================================== */

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
        const lang = b.lang || (terminal ? null : linguagemDe(b.arquivo));
        return `<figure class="codigo${terminal ? " terminal" : ""}">
                  <figcaption>
                    <span>${escapar(b.arquivo)}</span>
                    <button type="button" class="copiar" data-copiar>Copiar</button>
                  </figcaption>
                  <pre><code>${destacar(b.x, lang)}</code></pre>
                </figure>`;
      }
      default:
        return "";
    }
  }

  function renderTrilhas() {
    $("#trilhas").innerHTML = TRILHAS.map(
      (t) => `<li><a class="trilha-link" data-trilha="${t.id}" href="${destinoDaTrilha(t)}">
                <span>${escapar(t.nome)}</span>
                <span class="trilha-contagem"></span>
              </a></li>`
    ).join("");
  }

  function renderIndiceAulas() {
    const trilha = TRILHAS[estado.trilha];
    $("#trilha-nome").textContent = trilha.nome;
    $("#trilha-descricao").textContent = trilha.descricao;
    $("#indice").innerHTML = trilha.aulas
      .map(
        (a) => `<li><a class="indice-link" href="${href(trilha, a)}" data-id="${a.id}">
                  <span class="indice-marca" aria-hidden="true">•</span>
                  <span>${escapar(a.titulo)}</span>
                </a></li>`
      )
      .join("");
  }

  function renderAula() {
    const trilha = TRILHAS[estado.trilha];
    const aula = trilha.aulas[estado.aula];
    const anterior = trilha.aulas[estado.aula - 1];
    const proxima = trilha.aulas[estado.aula + 1];
    const proximaTrilha = TRILHAS[estado.trilha + 1];
    const feita = feitas.has(chave(trilha, aula));

    let botaoSeguinte = "";
    if (proxima) {
      botaoSeguinte = `<a class="botao" href="${href(trilha, proxima)}">Próxima: ${escapar(proxima.titulo)}</a>`;
    } else if (proximaTrilha) {
      botaoSeguinte = `<a class="botao" href="${destinoDaTrilha(proximaTrilha)}">Próxima trilha: ${escapar(proximaTrilha.nome)}</a>`;
    }

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
          ? `<a class="botao secundario" href="${href(trilha, anterior)}">Anterior: ${escapar(anterior.titulo)}</a>`
          : "<span></span>"}
        ${botaoSeguinte}
      </div>
    `;

    ligarQuiz(trilha, aula);
  }

  function atualizarProgresso() {
    const trilha = TRILHAS[estado.trilha];
    const total = trilha.aulas.length;
    const n = contagem(trilha);

    $("#progresso-barra").style.width = `${(n / total) * 100}%`;
    $("#progresso-texto").textContent = `${trilha.nome}: ${n} de ${total} aulas`;

    document.querySelectorAll(".trilha-link").forEach((link) => {
      const t = TRILHAS.find((x) => x.id === link.dataset.trilha);
      const feitasNaTrilha = contagem(t);
      $(".trilha-contagem", link).textContent = `${feitasNaTrilha}/${t.aulas.length}`;
      link.classList.toggle("completa", feitasNaTrilha === t.aulas.length);
      link.setAttribute("href", destinoDaTrilha(t));
      if (t.id === trilha.id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    document.querySelectorAll(".indice-link").forEach((link) => {
      const feita = feitas.has(`${trilha.id}/${link.dataset.id}`);
      link.classList.toggle("feita", feita);
      $(".indice-marca", link).textContent = feita ? "✓" : "•";
      if (link.dataset.id === trilha.aulas[estado.aula].id) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  /* ---------- Quiz ---------- */

  function concluir(trilha, aula) {
    const k = chave(trilha, aula);
    if (feitas.has(k)) return;
    feitas.add(k);
    salvarProgresso();
    atualizarProgresso();

    const selo = $("#selo-aula");
    if (selo) selo.hidden = false;

    // Recompensa escondida: terminar uma trilha inteira revela a mensagem (só na primeira vez)
    if (contagem(trilha) === trilha.aulas.length && !jaCelebrou()) {
      marcarCelebrou();
      setTimeout(abrirHomenagem, 1400);
    }
  }

  function ligarQuiz(trilha, aula) {
    const botoes = [...document.querySelectorAll(".opcao")];
    const retorno = $("#retorno");

    botoes.forEach((botao, i) => {
      botao.addEventListener("click", () => {
        if (i === aula.quiz.correta) {
          botao.classList.add("certa");
          botoes.forEach((b) => (b.disabled = true));
          retorno.className = "retorno ok";
          retorno.textContent = "Correto! " + aula.quiz.explicacao.replace(/`/g, "");
          concluir(trilha, aula);
        } else {
          botao.classList.add("errada");
          botao.disabled = true;
          retorno.className = "retorno erro";
          retorno.textContent = "Ainda não. Releia a aula e tente outra opção.";
        }
      });
    });
  }

  /* ---------- Navegação ---------- */

  function navegar() {
    const anterior = estado.trilha;
    Object.assign(estado, lerHash());
    if (document.querySelector(".indice-link") === null || anterior !== estado.trilha) {
      renderIndiceAulas();
    }
    renderAula();
    atualizarProgresso();
    $("#aula").focus({ preventScroll: true });
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
       3) concluir todas as aulas de uma trilha (só na primeira vez)
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
        <pre><code>${destacar(CODIGO_FINAL, "java")}</code></pre>
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
      location.hash = destinoDaTrilha(TRILHAS[0]);
    }
  });

  /* ---------- Início ---------- */

  renderTrilhas();
  window.addEventListener("hashchange", navegar);
  navegar();

  console.log(
    "%cPsiu...%c há uma mensagem escondida neste site. Quem programa também sabe procurar.",
    "color:#f4cf5d;font-size:16px;font-weight:bold",
    "color:inherit"
  );
})();
