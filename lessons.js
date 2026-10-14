/* ==========================================================
   Conteúdo das aulas.
   Para adicionar uma aula nova, copie um objeto abaixo e
   preencha os campos. Tipos de bloco aceitos:
     p      -> parágrafo (use `crase` para código no meio do texto)
     lista  -> lista com marcadores (campo "itens")
     code   -> bloco de código (campos "arquivo" e "x");
               use arquivo: "Terminal" para comandos de terminal
     saida  -> o que o programa imprime
     dica   -> aviso destacado
   ========================================================== */

const AULAS = [
  {
    id: "ola-mundo",
    titulo: "Olá, mundo",
    resumo: "Escreva, compile e rode o seu primeiro programa em Java.",
    blocos: [
      { t: "p", x: "Todo programa Java começa em uma classe. Dentro dela, o método `main` é a porta de entrada: é por ele que a execução começa." },
      {
        t: "code",
        arquivo: "Ola.java",
        x: `public class Ola {
    public static void main(String[] args) {
        System.out.println("Olá, mundo!");
    }
}`
      },
      { t: "p", x: "`System.out.println` escreve um texto na tela e pula uma linha. O texto entre aspas é uma `String`. Cada instrução termina com ponto e vírgula." },
      { t: "p", x: "Para rodar, compile o arquivo e depois execute a classe:" },
      {
        t: "code",
        arquivo: "Terminal",
        x: `javac Ola.java
java Ola`
      },
      { t: "saida", x: "Olá, mundo!" },
      { t: "dica", x: "O nome do arquivo precisa ser igual ao nome da classe pública: `Ola.java` guarda a classe `Ola`. Java diferencia maiúsculas de minúsculas." }
    ],
    quiz: {
      pergunta: "Qual método é o ponto de partida de um programa Java?",
      opcoes: ["`start()`", "`main()`", "`run()`", "`init()`"],
      correta: 1,
      explicacao: "O `main` é o método que a JVM procura para iniciar o programa."
    }
  },

  {
    id: "variaveis",
    titulo: "Variáveis e tipos",
    resumo: "Guarde informações na memória e dê um nome a elas.",
    blocos: [
      { t: "p", x: "Uma variável é uma caixa com nome e com tipo. O tipo diz o que cabe dentro dela, e em Java você precisa declará-lo." },
      {
        t: "lista",
        itens: [
          "`int`: números inteiros, como `17`",
          "`double`: números decimais, como `8.5`",
          "`boolean`: verdadeiro ou falso (`true` ou `false`)",
          "`char`: um único caractere entre aspas simples, como `'J'`",
          "`String`: texto entre aspas duplas, como `\"Java\"`"
        ]
      },
      {
        t: "code",
        arquivo: "Variaveis.java",
        x: `public class Variaveis {
    public static void main(String[] args) {
        int idade = 17;
        double nota = 8.5;
        boolean aprovado = nota >= 7;
        char letra = 'J';
        String curso = "Java";

        System.out.println(curso + ": nota " + nota);
        System.out.println("Aprovado? " + aprovado);
    }
}`
      },
      { t: "saida", x: "Java: nota 8.5\nAprovado? true" },
      { t: "dica", x: "Decimais usam ponto, não vírgula: `8.5`. E o `+` entre textos junta os pedaços, o que se chama concatenação." }
    ],
    quiz: {
      pergunta: "Qual tipo guarda apenas `true` ou `false`?",
      opcoes: ["`int`", "`String`", "`boolean`", "`char`"],
      correta: 2,
      explicacao: "`boolean` representa verdadeiro ou falso e é a base de qualquer decisão no código."
    }
  },

  {
    id: "decisoes",
    titulo: "Tomando decisões",
    resumo: "Faça o programa escolher caminhos com if e else.",
    blocos: [
      { t: "p", x: "Com `if`, o programa só executa um trecho quando uma condição é verdadeira. Com `else if` e `else`, você cobre os outros casos." },
      {
        t: "code",
        arquivo: "Decisao.java",
        x: `public class Decisao {
    public static void main(String[] args) {
        int nota = 6;

        if (nota >= 7) {
            System.out.println("Aprovado");
        } else if (nota >= 5) {
            System.out.println("Recuperação");
        } else {
            System.out.println("Reprovado");
        }
    }
}`
      },
      { t: "saida", x: "Recuperação" },
      { t: "p", x: "Operadores que você vai usar o tempo todo:" },
      {
        t: "lista",
        itens: [
          "`==` igual a, `!=` diferente de",
          "`<`, `>`, `<=`, `>=` para comparar tamanhos",
          "`&&` (e), `||` (ou), `!` (não) para combinar condições"
        ]
      },
      { t: "dica", x: "Um `=` guarda um valor e dois `==` comparam. Para comparar `String`, use `texto.equals(outro)` em vez de `==`." }
    ],
    quiz: {
      pergunta: "Qual operador verifica se dois números são iguais?",
      opcoes: ["`=`", "`==`", "`=>`", "`!=`"],
      correta: 1,
      explicacao: "`==` compara. O `=` sozinho faz atribuição."
    }
  },

  {
    id: "repeticao",
    titulo: "Repetindo tarefas",
    resumo: "Use for e while para não escrever a mesma linha várias vezes.",
    blocos: [
      { t: "p", x: "O `for` é ideal quando você sabe quantas vezes repetir. O `while` repete enquanto uma condição for verdadeira." },
      {
        t: "code",
        arquivo: "Repeticao.java",
        x: `public class Repeticao {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            System.out.println("Linha " + i);
        }

        int contador = 3;
        while (contador > 0) {
            System.out.println(contador);
            contador--;
        }
        System.out.println("Fogo!");
    }
}`
      },
      { t: "saida", x: "Linha 1\nLinha 2\nLinha 3\n3\n2\n1\nFogo!" },
      { t: "p", x: "No `for`, as três partes entre parênteses são: o começo (`int i = 1`), a condição para continuar (`i <= 3`) e o passo a cada volta (`i++`, que soma 1)." },
      { t: "dica", x: "Se a condição do `while` nunca ficar falsa, o programa entra em laço infinito. Sempre confira se algo dentro do laço muda a condição." }
    ],
    quiz: {
      pergunta: "Quantas vezes roda `for (int i = 0; i < 3; i++)`?",
      opcoes: ["2 vezes", "3 vezes", "4 vezes", "Infinitas vezes"],
      correta: 1,
      explicacao: "Com `i` valendo 0, 1 e 2 a condição é verdadeira. Quando chega a 3, o laço termina."
    }
  },

  {
    id: "metodos",
    titulo: "Métodos",
    resumo: "Dê nome a um pedaço de código e reutilize quando quiser.",
    blocos: [
      { t: "p", x: "Um método agrupa instruções sob um nome. Ele pode receber valores (parâmetros) e devolver um resultado com `return`." },
      {
        t: "code",
        arquivo: "Metodos.java",
        x: `public class Metodos {

    static int dobro(int n) {
        return n * 2;
    }

    static void saudar(String nome) {
        System.out.println("Olá, " + nome + "!");
    }

    public static void main(String[] args) {
        saudar("Ana");
        System.out.println(dobro(21));
    }
}`
      },
      { t: "saida", x: "Olá, Ana!\n42" },
      { t: "p", x: "`dobro` devolve um `int`, então ele declara esse tipo antes do nome. `saudar` só imprime algo e não devolve nada, por isso usa `void`." },
      { t: "dica", x: "Bons métodos fazem uma coisa só e têm nomes que dizem o que fazem: `calcularMedia` é melhor que `fazTudo`." }
    ],
    quiz: {
      pergunta: "Qual palavra indica que um método não devolve valor?",
      opcoes: ["`null`", "`static`", "`void`", "`return`"],
      correta: 2,
      explicacao: "`void` significa \"vazio\": o método executa algo, mas não devolve resultado."
    }
  },

  {
    id: "classes-objetos",
    titulo: "Classes e objetos",
    resumo: "Modele coisas do mundo real: o coração da orientação a objetos.",
    blocos: [
      { t: "p", x: "Uma classe é o molde; um objeto é uma peça feita a partir dele. A classe define os dados (atributos) e as ações (métodos)." },
      {
        t: "code",
        arquivo: "Escola.java",
        x: `class Aluno {
    String nome;
    int nota;

    Aluno(String nome, int nota) {
        this.nome = nome;
        this.nota = nota;
    }

    boolean passou() {
        return nota >= 7;
    }
}

public class Escola {
    public static void main(String[] args) {
        Aluno a = new Aluno("Ana", 9);
        System.out.println(a.nome + " passou? " + a.passou());
    }
}`
      },
      { t: "saida", x: "Ana passou? true" },
      {
        t: "lista",
        itens: [
          "`Aluno(...)` é o construtor: roda quando o objeto nasce",
          "`this` aponta para o próprio objeto",
          "`new` cria o objeto na memória"
        ]
      },
      { t: "dica", x: "Você acabou de ver os quatro pilares do começo de tudo: variáveis, decisões, repetição e métodos, agora reunidos em objetos." }
    ],
    quiz: {
      pergunta: "Qual palavra-chave cria um objeto a partir de uma classe?",
      opcoes: ["`this`", "`class`", "`new`", "`create`"],
      correta: 2,
      explicacao: "`new` reserva memória e chama o construtor da classe."
    }
  }
];
