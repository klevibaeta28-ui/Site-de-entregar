/* ==========================================================
   Trilha: Python (até Flask)
   Atenção ao escrever código aqui dentro de `crases`:
   - barra invertida precisa ser dobrada: \\n, \\Scripts
   ========================================================== */

window.TRILHAS = window.TRILHAS || [];

window.TRILHAS.push({
  id: "python",
  nome: "Python",
  descricao: "Da primeira linha de código até o seu primeiro site com Flask.",
  aulas: [
    /* ---------------------------------------------------- 1 */
    {
      id: "primeiro-programa",
      titulo: "Primeiro programa",
      resumo: "Mostre texto na tela e leia o que a pessoa digita.",
      blocos: [
        { t: "p", x: "Python é conhecido por ser direto. Não existe classe obrigatória, nem `main`, nem ponto e vírgula: o programa começa na primeira linha do arquivo." },
        {
          t: "code",
          arquivo: "ola.py",
          x: `print("Olá, mundo!")

nome = input("Qual é o seu nome? ")
print("Bem-vindo(a),", nome)`
        },
        { t: "p", x: "Para rodar, use o interpretador no terminal:" },
        { t: "code", arquivo: "Terminal", x: "python ola.py" },
        { t: "saida", x: "Olá, mundo!\nQual é o seu nome? Ana\nBem-vindo(a), Ana" },
        { t: "dica", x: "Em Python a indentação (os espaços no começo da linha) define os blocos de código. Misturar tabs e espaços causa `IndentationError`. Use sempre 4 espaços." }
      ],
      quiz: {
        pergunta: "Qual função mostra um texto na tela em Python?",
        opcoes: ["`echo()`", "`print()`", "`show()`", "`write()`"],
        correta: 1,
        explicacao: "`print()` escreve na tela e pula a linha ao final."
      }
    },

    /* ---------------------------------------------------- 2 */
    {
      id: "variaveis-tipos",
      titulo: "Variáveis e tipos",
      resumo: "Guarde valores sem precisar declarar o tipo.",
      blocos: [
        { t: "p", x: "Em Python você não declara o tipo: basta dar um nome e atribuir um valor. O tipo é descoberto na hora (tipagem dinâmica)." },
        {
          t: "code",
          arquivo: "variaveis.py",
          x: `idade = 17
nota = 8.5
aprovado = nota >= 7
curso = "Python"

print(type(idade), type(nota))
print(f"{curso}: nota {nota}")
print(f"Aprovado? {aprovado}")
print(10 / 4, 10 // 4, 10 % 4, 2 ** 3)`
        },
        { t: "saida", x: "<class 'int'> <class 'float'>\nPython: nota 8.5\nAprovado? True\n2.5 2 2 8" },
        {
          t: "lista",
          itens: [
            "`int`: inteiros; `float`: decimais",
            "`bool`: `True` ou `False`, sempre com a primeira letra maiúscula",
            "`str`: texto entre aspas simples ou duplas",
            "`/` divide e devolve decimal, `//` divide e descarta a fração, `**` é potência"
          ]
        },
        { t: "p", x: "O `f` antes das aspas cria uma f-string: o que estiver entre `{ }` é substituído pelo valor da variável." },
        { t: "dica", x: "`input()` sempre devolve texto (`str`). Para fazer contas, converta: `idade = int(input(\"Idade: \"))`." }
      ],
      quiz: {
        pergunta: "O que a função `input()` devolve?",
        opcoes: ["Sempre um `int`", "Sempre um texto (`str`)", "Sempre um `float`", "Depende do que for digitado"],
        correta: 1,
        explicacao: "Mesmo que a pessoa digite `42`, `input()` entrega o texto \"42\". Use `int()` ou `float()` para converter."
      }
    },

    /* ---------------------------------------------------- 3 */
    {
      id: "decisoes",
      titulo: "Tomando decisões",
      resumo: "if, elif e else para escolher caminhos.",
      blocos: [
        { t: "p", x: "A estrutura é a mesma de outras linguagens, mas sem parênteses obrigatórios e sem chaves: os dois-pontos abrem o bloco e a indentação o delimita." },
        {
          t: "code",
          arquivo: "decisao.py",
          x: `nota = 6

if nota >= 7:
    print("Aprovado")
elif nota >= 5:
    print("Recuperação")
else:
    print("Reprovado")

if nota > 0 and nota <= 10:
    print("Nota válida")`
        },
        { t: "saida", x: "Recuperação\nNota válida" },
        {
          t: "lista",
          itens: [
            "`==` e `!=` comparam igualdade",
            "`and`, `or`, `not` combinam condições (em palavras, não em símbolos)",
            "`in` verifica se algo está dentro de uma coleção: `\"a\" in \"banana\"`"
          ]
        },
        { t: "dica", x: "O \"senão se\" é `elif`, não `else if`. E não esqueça os dois-pontos no fim de cada linha de `if`, `elif` e `else`." }
      ],
      quiz: {
        pergunta: "Como se escreve \"senão se\" em Python?",
        opcoes: ["`else if`", "`elseif`", "`elif`", "`otherwise`"],
        correta: 2,
        explicacao: "`elif` é a forma abreviada de \"else if\" em Python."
      }
    },

    /* ---------------------------------------------------- 4 */
    {
      id: "repeticao",
      titulo: "Repetindo tarefas",
      resumo: "for e while, com a ajuda do range.",
      blocos: [
        { t: "p", x: "O `for` do Python percorre uma sequência. Para repetir um número de vezes, usamos `range`. O `while` repete enquanto a condição for verdadeira." },
        {
          t: "code",
          arquivo: "repeticao.py",
          x: `for i in range(1, 4):
    print("Linha", i)

contador = 3
while contador > 0:
    print(contador)
    contador -= 1
print("Fogo!")`
        },
        { t: "saida", x: "Linha 1\nLinha 2\nLinha 3\n3\n2\n1\nFogo!" },
        { t: "p", x: "`range(1, 4)` gera 1, 2 e 3: o valor final nunca entra. `range(3)` gera 0, 1 e 2. Dentro de qualquer laço, `break` interrompe tudo e `continue` pula para a próxima volta." },
        { t: "dica", x: "Python não tem `i++`. Para somar 1, escreva `i += 1`." }
      ],
      quiz: {
        pergunta: "Quais valores gera `range(3)`?",
        opcoes: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "1, 2"],
        correta: 1,
        explicacao: "Com um só argumento, `range` começa em 0 e vai até o número anterior ao informado."
      }
    },

    /* ---------------------------------------------------- 5 */
    {
      id: "listas-dicionarios",
      titulo: "Listas e dicionários",
      resumo: "Guarde coleções de valores e de pares chave e valor.",
      blocos: [
        { t: "p", x: "A lista guarda itens em ordem e pode crescer. O dicionário guarda pares: você consulta o valor pela chave, não pela posição." },
        {
          t: "code",
          arquivo: "colecoes.py",
          x: `frutas = ["maçã", "banana", "uva"]
frutas.append("manga")
print(frutas[0], len(frutas))

for fruta in frutas:
    print(fruta.upper())

aluno = {"nome": "Ana", "nota": 9}
aluno["turma"] = "3A"
print(aluno["nome"], aluno.get("idade", "sem idade"))

for chave, valor in aluno.items():
    print(chave, "=", valor)`
        },
        { t: "saida", x: "maçã 4\nMAÇÃ\nBANANA\nUVA\nMANGA\nAna sem idade\nnome = Ana\nnota = 9\nturma = 3A" },
        {
          t: "lista",
          itens: [
            "`append(x)` adiciona ao fim; `len(lista)` dá o tamanho",
            "`aluno.get(chave, padrao)` evita erro quando a chave não existe",
            "`.items()` percorre chave e valor ao mesmo tempo"
          ]
        },
        { t: "dica", x: "Índices negativos contam do fim: `frutas[-1]` é o último item da lista." }
      ],
      quiz: {
        pergunta: "Qual estrutura do Python guarda pares de chave e valor?",
        opcoes: ["Lista (`list`)", "Dicionário (`dict`)", "Texto (`str`)", "Intervalo (`range`)"],
        correta: 1,
        explicacao: "O dicionário associa cada chave a um valor, como `{\"nome\": \"Ana\"}`."
      }
    },

    /* ---------------------------------------------------- 6 */
    {
      id: "funcoes",
      titulo: "Funções",
      resumo: "Agrupe instruções sob um nome e reutilize.",
      blocos: [
        { t: "p", x: "Funções são definidas com `def`. Elas podem receber parâmetros, ter valores padrão e devolver um resultado com `return`." },
        {
          t: "code",
          arquivo: "funcoes.py",
          x: `def dobro(n):
    return n * 2


def saudar(nome, formal=False):
    if formal:
        return f"Prezado(a) {nome}"
    return f"Oi, {nome}!"


print(dobro(21))
print(saudar("Ana"))
print(saudar("Ana", formal=True))`
        },
        { t: "saida", x: "42\nOi, Ana!\nPrezado(a) Ana" },
        { t: "p", x: "`formal=False` é um parâmetro com valor padrão: se você não informar, vale `False`. Ao chamar, dá para nomear o argumento (`formal=True`) e deixar a leitura bem clara." },
        { t: "dica", x: "Uma função sem `return` devolve `None`, o valor que representa \"nada\" em Python." }
      ],
      quiz: {
        pergunta: "Qual palavra define uma função em Python?",
        opcoes: ["`function`", "`func`", "`def`", "`fn`"],
        correta: 2,
        explicacao: "`def nome(parametros):` é a forma de declarar uma função."
      }
    },

    /* ---------------------------------------------------- 7 */
    {
      id: "classes-objetos",
      titulo: "Classes e objetos",
      resumo: "Orientação a objetos do jeito Python.",
      blocos: [
        { t: "p", x: "Classes funcionam como em Java, com menos cerimônia. O construtor é o método `__init__` e o primeiro parâmetro de todo método é `self`, que representa o próprio objeto." },
        {
          t: "code",
          arquivo: "aluno.py",
          x: `class Aluno:
    def __init__(self, nome, nota):
        self.nome = nome
        self.nota = nota

    def passou(self):
        return self.nota >= 7

    def __str__(self):
        return f"{self.nome} ({self.nota})"


ana = Aluno("Ana", 9)
print(ana)
print(ana.passou())`
        },
        { t: "saida", x: "Ana (9)\nTrue" },
        { t: "p", x: "A herança também é simples: coloque a superclasse entre parênteses e use `super()` para chamar o construtor dela." },
        {
          t: "code",
          arquivo: "monitor.py",
          x: `class Monitor(Aluno):
    def __init__(self, nome, nota, disciplina):
        super().__init__(nome, nota)
        self.disciplina = disciplina`
        },
        { t: "dica", x: "Não se escreve `new` em Python: `Aluno(\"Ana\", 9)` já cria o objeto. E `self` é obrigatório como primeiro parâmetro, mas você não o passa na chamada." }
      ],
      quiz: {
        pergunta: "Qual método especial funciona como construtor de uma classe?",
        opcoes: ["`__init__`", "`__new__`", "`constructor`", "`__start__`"],
        correta: 0,
        explicacao: "`__init__` roda automaticamente quando o objeto é criado e inicializa os seus atributos."
      }
    },

    /* ---------------------------------------------------- 8 */
    {
      id: "modulos-venv",
      titulo: "Módulos, pip e ambiente virtual",
      resumo: "Use código de outras pessoas e isole cada projeto.",
      blocos: [
        { t: "p", x: "Um módulo é um arquivo `.py` que você pode importar. Python já vem com muitos prontos (a biblioteca padrão), e milhares de outros ficam disponíveis pelo `pip`." },
        {
          t: "code",
          arquivo: "sorteio.py",
          x: `import math
from random import randint

print(math.sqrt(81))
print(randint(1, 6) in range(1, 7))`
        },
        { t: "saida", x: "9.0\nTrue" },
        { t: "p", x: "Para organizar o seu código, crie outro arquivo, como `util.py`, e importe de lá: `from util import dobro`. Para instalar pacotes de terceiros, crie antes um ambiente virtual, uma pasta isolada só para o projeto:" },
        {
          t: "code",
          arquivo: "Terminal",
          x: `python -m venv venv
source venv/bin/activate        # Linux e Mac
venv\\Scripts\\activate           # Windows
pip install flask
pip freeze > requirements.txt`
        },
        { t: "dica", x: "Use um ambiente virtual por projeto. O `requirements.txt` registra as dependências, e quem baixar o projeto instala tudo com `pip install -r requirements.txt`." }
      ],
      quiz: {
        pergunta: "Qual comando instala o pacote Flask?",
        opcoes: ["`python install flask`", "`pip install flask`", "`import flask`", "`venv flask`"],
        correta: 1,
        explicacao: "`pip` é o gerenciador de pacotes do Python. `pip install nome` baixa e instala o pacote."
      }
    },

    /* ---------------------------------------------------- 9 */
    {
      id: "erros-arquivos",
      titulo: "Erros e arquivos",
      resumo: "Trate falhas sem derrubar o programa e leia e grave arquivos.",
      blocos: [
        { t: "p", x: "Quando algo dá errado, o Python lança uma exceção. Com `try` e `except` você decide o que fazer em vez de deixar o programa quebrar." },
        {
          t: "code",
          arquivo: "erros.py",
          x: `try:
    numero = int(input("Digite um número: "))
    print(100 / numero)
except ValueError:
    print("Isso não é um número.")
except ZeroDivisionError:
    print("Não dá para dividir por zero.")
finally:
    print("Fim.")`
        },
        { t: "p", x: "Digitando `0`:" },
        { t: "saida", x: "Digite um número: 0\nNão dá para dividir por zero.\nFim." },
        { t: "p", x: "Para arquivos, o `with` abre e fecha automaticamente, mesmo se ocorrer um erro no meio:" },
        {
          t: "code",
          arquivo: "arquivos.py",
          x: `with open("notas.txt", "w", encoding="utf-8") as arq:
    arq.write("Ana;9\\nBruno;7\\n")

with open("notas.txt", encoding="utf-8") as arq:
    for linha in arq:
        nome, nota = linha.strip().split(";")
        print(nome, "tirou", nota)`
        },
        { t: "saida", x: "Ana tirou 9\nBruno tirou 7" },
        { t: "dica", x: "O bloco `finally` roda sempre, com ou sem erro. É o lugar certo para liberar recursos." }
      ],
      quiz: {
        pergunta: "Qual bloco é executado sempre, haja erro ou não?",
        opcoes: ["`try`", "`except`", "`finally`", "`else`"],
        correta: 2,
        explicacao: "`finally` roda no final de qualquer jeito, o que o torna ideal para limpeza."
      }
    },

    /* ---------------------------------------------------- 10 */
    {
      id: "flask-rotas",
      titulo: "Flask: a primeira rota",
      resumo: "Crie um servidor web com poucas linhas de código.",
      blocos: [
        { t: "p", x: "Flask é um micro-framework: um conjunto pequeno de ferramentas para criar sites com Python. A ideia central é a rota, que liga um endereço (URL) a uma função." },
        { t: "code", arquivo: "Terminal", x: "pip install flask" },
        {
          t: "code",
          arquivo: "app.py",
          x: `from flask import Flask

app = Flask(__name__)


@app.route("/")
def inicio():
    return "Olá do Flask!"


@app.route("/aluno/<nome>")
def aluno(nome):
    return f"Perfil de {nome}"


if __name__ == "__main__":
    app.run(debug=True)`
        },
        { t: "code", arquivo: "Terminal", x: "python app.py" },
        { t: "saida", x: " * Running on http://127.0.0.1:5000" },
        {
          t: "lista",
          itens: [
            "`@app.route(\"/\")` é um decorador: liga o endereço `/` à função logo abaixo",
            "`<nome>` na rota é uma parte dinâmica, recebida como parâmetro: `/aluno/Ana` mostra \"Perfil de Ana\"",
            "`debug=True` reinicia o servidor a cada alteração e mostra erros detalhados no navegador"
          ]
        },
        { t: "p", x: "Este próprio site roda assim: abra o `app.py` do projeto e você vai encontrar uma rota `/` que entrega a página que você está lendo." },
        { t: "dica", x: "Nunca nomeie o seu arquivo como `flask.py`: ele conflita com a biblioteca e o `import` falha." }
      ],
      quiz: {
        pergunta: "O que faz o decorador `@app.route(\"/sobre\")`?",
        opcoes: [
          "Liga o endereço `/sobre` à função escrita logo abaixo",
          "Cria um arquivo chamado `sobre`",
          "Apaga a rota `/sobre`",
          "Instala o Flask"
        ],
        correta: 0,
        explicacao: "A rota diz ao Flask qual função executar quando alguém acessa aquele endereço."
      }
    },

    /* ---------------------------------------------------- 11 */
    {
      id: "flask-templates",
      titulo: "Flask: templates com Jinja",
      resumo: "Separe o HTML do Python e preencha a página com dados.",
      blocos: [
        { t: "p", x: "Escrever HTML dentro de strings não escala. No Flask, o HTML fica em arquivos na pasta `templates/`, e a linguagem de template Jinja preenche os dados que a função enviar." },
        {
          t: "code",
          arquivo: "app.py",
          x: `from flask import Flask, render_template

app = Flask(__name__)

ALUNOS = [
    {"nome": "Ana", "nota": 9},
    {"nome": "Bruno", "nota": 6},
]


@app.route("/")
def lista():
    return render_template("lista.html", titulo="Minha turma", alunos=ALUNOS)`
        },
        {
          t: "code",
          arquivo: "templates/lista.html",
          x: `<h1>{{ titulo }}</h1>

<ul>
  {% for aluno in alunos %}
    <li>
      {{ aluno.nome }}:
      {% if aluno.nota >= 7 %}aprovado{% else %}recuperação{% endif %}
    </li>
  {% endfor %}
</ul>`
        },
        { t: "saida", x: "Minha turma\n• Ana: aprovado\n• Bruno: recuperação" },
        {
          t: "lista",
          itens: [
            "`{{ ... }}` imprime o valor de uma variável",
            "`{% ... %}` executa lógica, como `for` e `if`, e sempre precisa ser fechado (`endfor`, `endif`)",
            "Arquivos CSS e JS ficam na pasta `static/` e são ligados com `url_for('static', filename='...')`"
          ]
        },
        { t: "dica", x: "O Jinja escapa HTML automaticamente. Se alguém enviar `<script>` num formulário, o texto aparece como texto e não executa. Isso protege contra um ataque chamado XSS." }
      ],
      quiz: {
        pergunta: "Em qual pasta o Flask procura os templates por padrão?",
        opcoes: ["`templates`", "`static`", "`html`", "`views`"],
        correta: 0,
        explicacao: "`render_template(\"x.html\")` busca o arquivo dentro da pasta `templates`, ao lado do `app.py`."
      }
    },

    /* ---------------------------------------------------- 12 */
    {
      id: "flask-formularios",
      titulo: "Flask: formulários e POST",
      resumo: "Receba dados enviados pelas pessoas e mostre na página.",
      blocos: [
        { t: "p", x: "Uma mesma rota pode atender dois métodos: `GET`, quando a pessoa abre a página, e `POST`, quando envia um formulário. O objeto `request` entrega o que foi enviado." },
        {
          t: "code",
          arquivo: "app.py",
          x: `from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

recados = []


@app.route("/", methods=["GET", "POST"])
def mural():
    if request.method == "POST":
        autor = request.form["autor"]
        texto = request.form["texto"]
        recados.append({"autor": autor, "texto": texto})
        return redirect(url_for("mural"))

    return render_template("mural.html", recados=recados)`
        },
        {
          t: "code",
          arquivo: "templates/mural.html",
          x: `<form method="post">
  <input name="autor" placeholder="Seu nome" required>
  <textarea name="texto" placeholder="Seu recado" required></textarea>
  <button type="submit">Enviar</button>
</form>

{% for r in recados %}
  <p><strong>{{ r.autor }}:</strong> {{ r.texto }}</p>
{% endfor %}`
        },
        {
          t: "lista",
          itens: [
            "`request.form[\"autor\"]` lê o campo cujo atributo `name` é `autor`",
            "`redirect(url_for(\"mural\"))` volta para a página depois do envio, o que evita reenviar o formulário ao atualizar (o padrão Post/Redirect/Get)",
            "`url_for(\"mural\")` gera o endereço a partir do nome da função, sem escrever a URL à mão"
          ]
        },
        { t: "dica", x: "Os recados ficam numa lista na memória e somem quando o servidor reinicia. Para guardar de verdade, o próximo passo é um banco de dados, como o SQLite com Flask-SQLAlchemy." }
      ],
      quiz: {
        pergunta: "Qual objeto do Flask dá acesso aos dados enviados por um formulário?",
        opcoes: ["`request`", "`render_template`", "`redirect`", "`app.run`"],
        correta: 0,
        explicacao: "`request.form` guarda os campos enviados por um formulário `POST`."
      }
    }
  ]
});
