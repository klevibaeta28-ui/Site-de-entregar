/* ==========================================================
   Trilhas de front-end: HTML, CSS e JavaScript (básico)
   Atenção ao escrever código aqui dentro de `crases`:
   - uma crase do código vira \`   e   ${ }  vira  \${ }
   ========================================================== */

window.TRILHAS = window.TRILHAS || [];

/* ========================================================== HTML */
window.TRILHAS.push({
  id: "html",
  nome: "HTML",
  descricao: "A estrutura de qualquer página web.",
  aulas: [
    {
      id: "estrutura",
      titulo: "Estrutura de uma página",
      resumo: "O esqueleto que toda página HTML precisa ter.",
      blocos: [
        { t: "p", x: "HTML descreve a estrutura e o conteúdo de uma página usando tags. A maioria das tags tem uma abertura (`<p>`) e um fechamento (`</p>`), com o conteúdo no meio." },
        {
          t: "code",
          arquivo: "index.html",
          x: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Minha primeira página</title>
</head>
<body>
  <h1>Olá, web!</h1>
  <p>Esta é a minha primeira página.</p>
</body>
</html>`
        },
        {
          t: "lista",
          itens: [
            "`<head>` guarda informações sobre a página (título, codificação) que não aparecem na tela",
            "`<body>` guarda tudo o que a pessoa vê",
            "`lang=\"pt-BR\"` é um atributo: informa o idioma para navegadores e leitores de tela"
          ]
        },
        { t: "p", x: "Salve o código como `index.html` e abra o arquivo no navegador (dois cliques ou arrastando para a janela)." },
        { t: "dica", x: "Feche sempre as tags que abriu e escreva em minúsculas por convenção. Tags mal fechadas geram resultados estranhos, sem aviso de erro." }
      ],
      quiz: {
        pergunta: "Onde fica o conteúdo visível da página?",
        opcoes: ["`<head>`", "`<body>`", "`<title>`", "`<meta>`"],
        correta: 1,
        explicacao: "Tudo o que aparece na janela do navegador está dentro de `<body>`."
      }
    },

    {
      id: "texto-links-imagens",
      titulo: "Texto, links e imagens",
      resumo: "Títulos, parágrafos, ênfase, links e figuras.",
      blocos: [
        {
          t: "code",
          arquivo: "pagina.html",
          x: `<h1>Título principal</h1>
<h2>Subtítulo</h2>
<p>Texto com <strong>destaque</strong> e <em>ênfase</em>.</p>

<a href="https://developer.mozilla.org/pt-BR/" target="_blank">Documentação MDN</a>

<img src="gato.jpg" alt="Gato dormindo no sofá" width="300">`
        },
        {
          t: "lista",
          itens: [
            "`<h1>` a `<h6>` são títulos em ordem de importância; use um `<h1>` por página",
            "`<strong>` marca importância e `<em>` marca ênfase",
            "`<a href=\"...\">` cria um link; `target=\"_blank\"` abre em outra aba",
            "`<img>` não precisa de fechamento; `src` é o arquivo e `alt` descreve a imagem"
          ]
        },
        { t: "dica", x: "Nunca deixe o `alt` de fora: ele é lido por leitores de tela e aparece se a imagem não carregar." }
      ],
      quiz: {
        pergunta: "Qual atributo guarda o endereço de destino de um link?",
        opcoes: ["`src`", "`href`", "`link`", "`url`"],
        correta: 1,
        explicacao: "`href` (hypertext reference) diz para onde o link leva. O `src` é usado em imagens e scripts."
      }
    },

    {
      id: "listas-tabelas",
      titulo: "Listas e tabelas",
      resumo: "Organize itens em sequência e dados em linhas e colunas.",
      blocos: [
        {
          t: "code",
          arquivo: "dados.html",
          x: `<ul>
  <li>Java</li>
  <li>Python</li>
</ul>

<ol>
  <li>Instalar</li>
  <li>Programar</li>
</ol>

<table>
  <thead>
    <tr><th>Aluno</th><th>Nota</th></tr>
  </thead>
  <tbody>
    <tr><td>Ana</td><td>9</td></tr>
    <tr><td>Bruno</td><td>7</td></tr>
  </tbody>
</table>`
        },
        {
          t: "lista",
          itens: [
            "`<ul>` é lista com marcadores e `<ol>` é lista numerada; cada item fica em um `<li>`",
            "`<table>` cria a tabela, `<tr>` é uma linha, `<th>` é cabeçalho e `<td>` é célula"
          ]
        },
        { t: "dica", x: "Use tabelas só para dados que realmente formam linhas e colunas. Para posicionar elementos na tela, use CSS." }
      ],
      quiz: {
        pergunta: "Qual tag cria uma lista numerada?",
        opcoes: ["`<ul>`", "`<ol>`", "`<li>`", "`<nl>`"],
        correta: 1,
        explicacao: "`<ol>` (ordered list) numera os itens automaticamente. `<ul>` usa marcadores."
      }
    },

    {
      id: "formularios",
      titulo: "Formulários",
      resumo: "Colete informações das pessoas.",
      blocos: [
        { t: "p", x: "Um formulário agrupa campos e os envia para um endereço quando a pessoa clica em enviar. É a ponte entre o HTML e o servidor, como a rota Flask que você viu na trilha de Python." },
        {
          t: "code",
          arquivo: "formulario.html",
          x: `<form action="/enviar" method="post">
  <label for="nome">Nome</label>
  <input type="text" id="nome" name="nome" required>

  <label for="email">E-mail</label>
  <input type="email" id="email" name="email" required>

  <label for="nivel">Nível</label>
  <select id="nivel" name="nivel">
    <option value="iniciante">Iniciante</option>
    <option value="avancado">Avançado</option>
  </select>

  <label>
    <input type="checkbox" name="aceito"> Aceito os termos
  </label>

  <button type="submit">Enviar</button>
</form>`
        },
        {
          t: "lista",
          itens: [
            "`action` é o endereço que recebe os dados e `method` é `get` ou `post`",
            "`name` é a chave com a qual o servidor recebe o valor (`request.form[\"nome\"]` no Flask)",
            "`<label for=\"id\">` liga o texto ao campo: clicar no texto foca o campo",
            "`required` e `type=\"email\"` fazem o navegador validar antes de enviar"
          ]
        },
        { t: "dica", x: "Um campo sem o atributo `name` simplesmente não é enviado ao servidor." }
      ],
      quiz: {
        pergunta: "O que garante que o servidor receba o valor de um campo?",
        opcoes: ["O atributo `id`", "O atributo `name`", "O atributo `class`", "A tag `<label>`"],
        correta: 1,
        explicacao: "O `name` é o rótulo usado na hora do envio. Sem ele, o campo fica de fora."
      }
    },

    {
      id: "semantica",
      titulo: "HTML semântico",
      resumo: "Tags com significado, para pessoas e para máquinas.",
      blocos: [
        { t: "p", x: "Em vez de usar `<div>` para tudo, o HTML moderno tem tags que dizem o papel de cada parte. Isso ajuda leitores de tela, mecanismos de busca e quem for ler o seu código." },
        {
          t: "code",
          arquivo: "semantica.html",
          x: `<header>
  <nav>
    <a href="/">Início</a>
    <a href="/sobre">Sobre</a>
  </nav>
</header>

<main>
  <article>
    <h1>Título do artigo</h1>
    <p>Conteúdo...</p>
  </article>
  <aside>Links relacionados</aside>
</main>

<footer>Feito com HTML</footer>`
        },
        {
          t: "lista",
          itens: [
            "`<header>` e `<footer>` são o topo e o rodapé",
            "`<nav>` agrupa os links de navegação",
            "`<main>` é o conteúdo principal (um por página)",
            "`<article>` é um conteúdo independente e `<aside>` é um conteúdo lateral"
          ]
        },
        { t: "p", x: "Quando nenhuma tag semântica servir, `<div>` (bloco) e `<span>` (trecho de texto) continuam valendo. Combine com os atributos `class` e `id` para o CSS e o JavaScript encontrarem cada elemento." },
        { t: "dica", x: "Uma boa pergunta antes de usar `<div>`: existe uma tag que descreve melhor o que isso é?" }
      ],
      quiz: {
        pergunta: "Qual tag representa o conteúdo principal da página?",
        opcoes: ["`<body>`", "`<section>`", "`<main>`", "`<content>`"],
        correta: 2,
        explicacao: "`<main>` marca o conteúdo central, o que ajuda leitores de tela a pular direto para ele."
      }
    }
  ]
});

/* ========================================================== CSS */
window.TRILHAS.push({
  id: "css",
  nome: "CSS",
  descricao: "Cores, espaços e layout para as suas páginas.",
  aulas: [
    {
      id: "seletores-cores",
      titulo: "Seletores, cores e texto",
      resumo: "Escolha elementos e mude a aparência deles.",
      blocos: [
        { t: "p", x: "Uma regra CSS tem um seletor, que diz quem será estilizado, e um bloco de declarações, no formato `propriedade: valor;`." },
        {
          t: "code",
          arquivo: "style.css",
          x: `body {
  font-family: system-ui, sans-serif;
  color: #222;
  background-color: #f5f5f5;
}

h1 {
  color: rebeccapurple;
  font-size: 2.5rem;
}

.destaque {
  background: yellow;
  font-weight: bold;
}

#topo {
  text-align: center;
}

a:hover {
  color: tomato;
}`
        },
        { t: "p", x: "Para o navegador usar o arquivo, ligue-o dentro do `<head>` da página:" },
        {
          t: "code",
          arquivo: "index.html",
          x: `<link rel="stylesheet" href="style.css">`
        },
        {
          t: "lista",
          itens: [
            "`h1` atinge todos os elementos `<h1>`",
            "`.destaque` atinge elementos com `class=\"destaque\"`",
            "`#topo` atinge o único elemento com `id=\"topo\"`",
            "`a:hover` atinge o link quando o mouse passa por cima"
          ]
        },
        { t: "dica", x: "Quando duas regras disputam o mesmo elemento, vence a mais específica (`id` ganha de classe, que ganha de tag). Em caso de empate, vence a que vem por último." }
      ],
      quiz: {
        pergunta: "Qual seletor atinge os elementos com `class=\"aviso\"`?",
        opcoes: ["`#aviso`", "`.aviso`", "`aviso`", "`*aviso`"],
        correta: 1,
        explicacao: "Classes usam um ponto antes do nome. O `#` é reservado para `id`."
      }
    },

    {
      id: "modelo-caixa",
      titulo: "O modelo de caixa",
      resumo: "Todo elemento é uma caixa com espaços por dentro e por fora.",
      blocos: [
        { t: "p", x: "Para o CSS, cada elemento é uma caixa com quatro camadas, de dentro para fora: conteúdo, `padding` (espaço interno), `border` (borda) e `margin` (espaço externo)." },
        {
          t: "code",
          arquivo: "style.css",
          x: `.cartao {
  width: 300px;
  padding: 16px;
  border: 2px solid #333;
  margin: 24px auto;
  border-radius: 8px;
  box-sizing: border-box;
}`
        },
        {
          t: "lista",
          itens: [
            "`padding` afasta o conteúdo da borda",
            "`margin` afasta a caixa dos vizinhos; `auto` nas laterais centraliza o elemento",
            "`box-sizing: border-box` faz a largura já incluir `padding` e borda, o que deixa as contas previsíveis",
            "`border-radius` arredonda os cantos"
          ]
        },
        { t: "dica", x: "Quase todo projeto começa com `* { box-sizing: border-box; }` para evitar surpresas no tamanho das caixas." }
      ],
      quiz: {
        pergunta: "Qual propriedade cria espaço DENTRO da caixa, entre o conteúdo e a borda?",
        opcoes: ["`margin`", "`padding`", "`gap`", "`spacing`"],
        correta: 1,
        explicacao: "`padding` é o espaço interno. `margin` é o espaço externo."
      }
    },

    {
      id: "flexbox-grid",
      titulo: "Flexbox e Grid",
      resumo: "Organize elementos lado a lado sem sofrimento.",
      blocos: [
        { t: "p", x: "Com `display: flex`, os filhos de um elemento passam a se alinhar em linha (ou coluna) e você controla o espaço entre eles." },
        {
          t: "code",
          arquivo: "menu.html",
          x: `<nav class="menu">
  <a href="/">Início</a>
  <a href="/aulas">Aulas</a>
  <a href="/contato">Contato</a>
</nav>`
        },
        {
          t: "code",
          arquivo: "style.css",
          x: `.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}`
        },
        {
          t: "lista",
          itens: [
            "`justify-content` distribui os itens no eixo principal (por padrão, na horizontal)",
            "`align-items` alinha no eixo cruzado (na vertical)",
            "`gap` cria espaço entre os itens, sem depender de margens",
            "`grid` organiza em linhas e colunas ao mesmo tempo: `repeat(3, 1fr)` cria três colunas iguais"
          ]
        },
        { t: "dica", x: "Flexbox funciona numa dimensão (uma linha ou uma coluna). Grid trabalha em duas. Para menus e barras use flex; para galerias e páginas inteiras, grid." }
      ],
      quiz: {
        pergunta: "Qual declaração ativa o flexbox em um container?",
        opcoes: ["`display: flex;`", "`flex: on;`", "`layout: flex;`", "`position: flex;`"],
        correta: 0,
        explicacao: "`display: flex` transforma o elemento em container flexível e os filhos viram itens flex."
      }
    },

    {
      id: "responsivo",
      titulo: "Layout responsivo",
      resumo: "Faça a mesma página funcionar no celular e no computador.",
      blocos: [
        { t: "p", x: "Responsivo é o design que se adapta à largura da tela. A receita é começar pelo celular (mobile first) e ir acrescentando regras para telas maiores com media queries." },
        {
          t: "code",
          arquivo: "style.css",
          x: `.grade {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 700px) {
  .grade {
    grid-template-columns: repeat(3, 1fr);
  }
}

img {
  max-width: 100%;
  height: auto;
}`
        },
        {
          t: "lista",
          itens: [
            "A `.grade` começa com uma coluna e vira três colunas quando a tela tem 700px ou mais",
            "`max-width: 100%` impede que imagens estourem o espaço disponível",
            "Prefira unidades relativas: `rem` (relativa ao texto), `%` (relativa ao pai) e `vw` (largura da tela)"
          ]
        },
        { t: "dica", x: "Sem a tag `<meta name=\"viewport\" ...>` no `<head>`, os celulares fingem ter uma tela larga e o layout responsivo não funciona." }
      ],
      quiz: {
        pergunta: "O que faz `@media (min-width: 700px)`?",
        opcoes: [
          "Aplica as regras só quando a tela tiver pelo menos 700px de largura",
          "Limita a largura da página a 700px",
          "Aplica as regras só em telas menores que 700px",
          "Cria uma imagem de 700px"
        ],
        correta: 0,
        explicacao: "`min-width` define a largura mínima para a regra valer: telas de 700px ou mais."
      }
    }
  ]
});

/* ========================================================== JavaScript */
window.TRILHAS.push({
  id: "javascript",
  nome: "JavaScript",
  descricao: "Deixe a página viva: cálculos, dados e interação.",
  aulas: [
    {
      id: "variaveis",
      titulo: "Variáveis e tipos",
      resumo: "Seus primeiros comandos no navegador.",
      blocos: [
        { t: "p", x: "JavaScript roda no navegador e dá comportamento à página. Para usá-lo, ligue um arquivo no HTML, de preferência no fim do `<body>`:" },
        { t: "code", arquivo: "index.html", x: `<script src="script.js"></script>` },
        {
          t: "code",
          arquivo: "script.js",
          x: `const curso = "JavaScript";
let nota = 8.5;
nota = nota + 1;

const aprovado = nota >= 7;

console.log(curso, nota, aprovado);
console.log(typeof nota, typeof curso);
console.log(\`Nota final: \${nota}\`);`
        },
        { t: "saida", x: "JavaScript 9.5 true\nnumber string\nNota final: 9.5" },
        {
          t: "lista",
          itens: [
            "`const` declara uma variável que não pode ser reatribuída",
            "`let` declara uma variável que pode mudar",
            "Evite o antigo `var`",
            "Tipos básicos: `number`, `string` e `boolean`",
            "Texto entre crases (template literal) aceita `${ }` para inserir valores"
          ]
        },
        { t: "dica", x: "Abra o console do navegador com F12 para ver o resultado do `console.log` e as mensagens de erro." }
      ],
      quiz: {
        pergunta: "Qual palavra declara uma variável que NÃO pode ser reatribuída?",
        opcoes: ["`let`", "`var`", "`const`", "`final`"],
        correta: 2,
        explicacao: "`const` cria uma constante: tentar atribuir outro valor gera erro."
      }
    },

    {
      id: "decisoes-lacos",
      titulo: "Decisões e laços",
      resumo: "if, else, for e while.",
      blocos: [
        { t: "p", x: "A sintaxe é parecida com a do Java: condições entre parênteses e blocos entre chaves." },
        {
          t: "code",
          arquivo: "script.js",
          x: `const nota = 6;

if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 5) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}

for (let i = 1; i <= 3; i++) {
  console.log("Linha " + i);
}

let contador = 3;
while (contador > 0) {
  console.log(contador);
  contador--;
}`
        },
        { t: "saida", x: "Recuperação\nLinha 1\nLinha 2\nLinha 3\n3\n2\n1" },
        { t: "dica", x: "Compare sempre com `===` (igualdade estrita). Com `==`, o JavaScript converte tipos e dá resultados surpreendentes: `\"5\" == 5` é `true`, mas `\"5\" === 5` é `false`." }
      ],
      quiz: {
        pergunta: "Qual operador compara o valor E o tipo?",
        opcoes: ["`=`", "`==`", "`===`", "`=>`"],
        correta: 2,
        explicacao: "`===` só dá `true` quando valor e tipo são iguais, por isso é o mais seguro."
      }
    },

    {
      id: "funcoes",
      titulo: "Funções",
      resumo: "Reaproveite lógica e passe funções como valores.",
      blocos: [
        { t: "p", x: "Há duas formas comuns de criar funções: a declaração tradicional e a função de seta (arrow function), mais curta." },
        {
          t: "code",
          arquivo: "script.js",
          x: `function dobro(n) {
  return n * 2;
}

const saudar = (nome) => \`Olá, \${nome}!\`;

console.log(dobro(21));
console.log(saudar("Ana"));`
        },
        { t: "saida", x: "42\nOlá, Ana!" },
        { t: "p", x: "Em JavaScript, funções são valores: você pode guardá-las em variáveis e entregá-las a outras funções. Esse é o segredo dos eventos, que você verá na última aula." },
        { t: "dica", x: "Uma função sem `return` devolve `undefined`. Se o resultado vier \"vazio\", confira se esqueceu o `return`." }
      ],
      quiz: {
        pergunta: "Como se chama a sintaxe `(nome) => ...`?",
        opcoes: ["Função de seta (arrow function)", "Função anônima proibida", "Construtor", "Template literal"],
        correta: 0,
        explicacao: "A função de seta é uma forma curta de escrever funções, muito usada com callbacks."
      }
    },

    {
      id: "arrays-objetos",
      titulo: "Arrays e objetos",
      resumo: "Listas, e coleções de pares chave e valor.",
      blocos: [
        { t: "p", x: "O array é a lista do JavaScript. O objeto agrupa dados nomeados e se parece com o dicionário do Python; é também a base do formato JSON, usado na troca de dados entre sites e servidores." },
        {
          t: "code",
          arquivo: "script.js",
          x: `const frutas = ["maçã", "banana", "uva"];
frutas.push("manga");

console.log(frutas.length, frutas[0]);

const maiusculas = frutas.map((f) => f.toUpperCase());
console.log(maiusculas);

const aluno = { nome: "Ana", nota: 9 };
aluno.turma = "3A";
console.log(aluno.nome, aluno["turma"]);

for (const f of frutas) {
  console.log(f);
}`
        },
        { t: "saida", x: "4 maçã\n[ 'MAÇÃ', 'BANANA', 'UVA', 'MANGA' ]\nAna 3A\nmaçã\nbanana\nuva\nmanga" },
        {
          t: "lista",
          itens: [
            "`push(x)` adiciona ao fim do array",
            "`map(fn)` cria um novo array aplicando a função a cada item",
            "`filter(fn)` cria um novo array só com os itens que passam no teste",
            "Acesse propriedades de objetos com ponto (`aluno.nome`) ou colchetes (`aluno[\"nome\"]`)"
          ]
        },
        { t: "dica", x: "O `const` impede reatribuir a variável, mas não impede mudar o conteúdo: dá para dar `push` num array `const`." }
      ],
      quiz: {
        pergunta: "Qual método adiciona um item ao final de um array?",
        opcoes: ["`add()`", "`append()`", "`push()`", "`insert()`"],
        correta: 2,
        explicacao: "`push()` coloca o novo item no final do array."
      }
    },

    {
      id: "dom-eventos",
      titulo: "DOM e eventos",
      resumo: "Mude a página quando a pessoa clicar, digitar ou rolar.",
      blocos: [
        { t: "p", x: "O navegador transforma o HTML numa árvore de objetos chamada DOM. Com JavaScript você encontra elementos nessa árvore, muda o texto e as classes deles e reage a eventos, como o clique." },
        {
          t: "code",
          arquivo: "index.html",
          x: `<button id="botao">Clique aqui</button>
<p id="mensagem"></p>

<script src="script.js"></script>`
        },
        {
          t: "code",
          arquivo: "script.js",
          x: `const botao = document.querySelector("#botao");
const mensagem = document.querySelector("#mensagem");
let cliques = 0;

botao.addEventListener("click", () => {
  cliques++;
  mensagem.textContent = \`Você clicou \${cliques} vez(es)\`;
  mensagem.classList.toggle("destaque");
});`
        },
        {
          t: "lista",
          itens: [
            "`document.querySelector(\"#botao\")` acha o primeiro elemento que combina com o seletor CSS",
            "`addEventListener(\"click\", função)` executa a função a cada clique",
            "`textContent` troca o texto do elemento",
            "`classList.toggle(\"destaque\")` liga e desliga uma classe, e o CSS faz o resto"
          ]
        },
        { t: "p", x: "É assim que este site funciona: o `script.js` da página escuta cliques nos botões do quiz e atualiza o progresso na tela." },
        { t: "dica", x: "Coloque o `<script>` no fim do `<body>` (ou use o atributo `defer`). Se ele rodar antes dos elementos existirem, o `querySelector` devolve `null` e dá erro." }
      ],
      quiz: {
        pergunta: "Qual método liga uma função a um evento, como o clique?",
        opcoes: ["`addEventListener()`", "`onEvent()`", "`document.listen()`", "`querySelector()`"],
        correta: 0,
        explicacao: "`addEventListener(\"click\", fn)` registra a função para ser chamada quando o evento acontecer."
      }
    }
  ]
});
