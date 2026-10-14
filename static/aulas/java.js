/* ==========================================================
   Trilha: Java
   Tipos de bloco: p | lista | code | saida | dica
   Em "code", a linguagem do destaque vem da extensão do
   arquivo (.java, .py, .html, .css, .js). "Terminal" = sem cor.
   ========================================================== */

window.TRILHAS = window.TRILHAS || [];

window.TRILHAS.push({
  id: "java",
  nome: "Java",
  descricao: "Do primeiro programa até associação, agregação e composição.",
  aulas: [
    /* ---------------------------------------------------- 1 */
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

    /* ---------------------------------------------------- 2 */
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

    /* ---------------------------------------------------- 3 */
    {
      id: "entrada",
      titulo: "Operadores e entrada de dados",
      resumo: "Faça contas e leia o que a pessoa digita no teclado.",
      blocos: [
        { t: "p", x: "Os operadores aritméticos são `+`, `-`, `*`, `/` e `%` (resto da divisão). Para ler dados do teclado, usamos a classe `Scanner`." },
        {
          t: "code",
          arquivo: "Calculadora.java",
          x: `import java.util.Scanner;

public class Calculadora {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        System.out.print("Primeiro número: ");
        int a = teclado.nextInt();
        System.out.print("Segundo número: ");
        int b = teclado.nextInt();

        System.out.println("Soma: " + (a + b));
        System.out.println("Divisão: " + (a / b));
        System.out.println("Resto: " + (a % b));

        teclado.close();
    }
}`
        },
        { t: "p", x: "Exemplo de execução, digitando `7` e `2`:" },
        { t: "saida", x: "Primeiro número: 7\nSegundo número: 2\nSoma: 9\nDivisão: 3\nResto: 1" },
        {
          t: "lista",
          itens: [
            "`nextInt()` lê um número inteiro",
            "`nextDouble()` lê um número decimal",
            "`nextLine()` lê uma linha inteira de texto",
            "`print` escreve sem pular linha; `println` pula"
          ]
        },
        { t: "dica", x: "Dividir dois `int` descarta a parte decimal: `7 / 2` dá `3`. Para obter `3.5`, use `7 / 2.0`." }
      ],
      quiz: {
        pergunta: "Quanto vale `10 % 3` em Java?",
        opcoes: ["`1`", "`3`", "`0`", "`3.33`"],
        correta: 0,
        explicacao: "`%` devolve o resto da divisão: 10 dividido por 3 dá 3, e sobra 1."
      }
    },

    /* ---------------------------------------------------- 4 */
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

    /* ---------------------------------------------------- 5 */
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

    /* ---------------------------------------------------- 6 */
    {
      id: "arrays",
      titulo: "Arrays",
      resumo: "Guarde vários valores do mesmo tipo em uma única variável.",
      blocos: [
        { t: "p", x: "Um array é uma sequência de posições do mesmo tipo. Cada posição tem um índice, e o primeiro índice é o `0`." },
        {
          t: "code",
          arquivo: "Notas.java",
          x: `public class Notas {
    public static void main(String[] args) {
        double[] notas = {7.5, 9.0, 6.0, 8.5};
        double soma = 0;

        for (int i = 0; i < notas.length; i++) {
            soma += notas[i];
        }

        System.out.println("Primeira nota: " + notas[0]);
        System.out.println("Média: " + soma / notas.length);

        for (double n : notas) {
            System.out.println(n);
        }
    }
}`
        },
        { t: "saida", x: "Primeira nota: 7.5\nMédia: 7.75\n7.5\n9.0\n6.0\n8.5" },
        {
          t: "lista",
          itens: [
            "`notas.length` é o tamanho do array (sem parênteses)",
            "O tamanho de um array é fixo: não cresce depois de criado",
            "O `for (double n : notas)` percorre todos os itens sem usar índice"
          ]
        },
        { t: "dica", x: "Acessar `notas[4]` num array de 4 itens lança `ArrayIndexOutOfBoundsException`. Os índices válidos vão de `0` até `length - 1`." }
      ],
      quiz: {
        pergunta: "Em `int[] v = {10, 20, 30};`, quanto vale `v[1]`?",
        opcoes: ["`10`", "`20`", "`30`", "Dá erro"],
        correta: 1,
        explicacao: "Os índices começam em 0: `v[0]` é 10, `v[1]` é 20 e `v[2]` é 30."
      }
    },

    /* ---------------------------------------------------- 7 */
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

    /* ---------------------------------------------------- 8 */
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
        { t: "dica", x: "Cada `new Aluno(...)` cria um objeto independente, com os seus próprios dados. Mudar a nota de um aluno não muda a dos outros." }
      ],
      quiz: {
        pergunta: "Qual palavra-chave cria um objeto a partir de uma classe?",
        opcoes: ["`this`", "`class`", "`new`", "`create`"],
        correta: 2,
        explicacao: "`new` reserva memória e chama o construtor da classe."
      }
    },

    /* ---------------------------------------------------- 9 */
    {
      id: "encapsulamento",
      titulo: "Encapsulamento",
      resumo: "Proteja os dados do objeto e controle como eles mudam.",
      blocos: [
        { t: "p", x: "Encapsular é esconder os atributos (`private`) e permitir o acesso só por métodos (`public`). Assim a própria classe garante que os dados continuem válidos." },
        {
          t: "code",
          arquivo: "ContaBancaria.java",
          x: `class Conta {
    private double saldo;

    public double getSaldo() {
        return saldo;
    }

    public void depositar(double valor) {
        if (valor > 0) {
            saldo += valor;
        }
    }

    public boolean sacar(double valor) {
        if (valor > 0 && valor <= saldo) {
            saldo -= valor;
            return true;
        }
        return false;
    }
}

public class ContaBancaria {
    public static void main(String[] args) {
        Conta c = new Conta();
        c.depositar(200);
        System.out.println(c.sacar(500));
        System.out.println(c.sacar(50));
        System.out.println(c.getSaldo());
    }
}`
        },
        { t: "saida", x: "false\ntrue\n150.0" },
        {
          t: "lista",
          itens: [
            "`private`: só a própria classe enxerga",
            "`public`: qualquer classe pode usar",
            "Getter (`getSaldo`) lê um atributo; setter altera, geralmente com validação"
          ]
        },
        { t: "dica", x: "Escrever `c.saldo = 1000000;` fora da classe `Conta` não compila. É exatamente essa trava que protege o saldo." }
      ],
      quiz: {
        pergunta: "Para que serve `private` em um atributo?",
        opcoes: [
          "Impedir que outras classes alterem o valor diretamente",
          "Deixar o programa mais rápido",
          "Fazer o atributo aparecer em todas as classes",
          "Apagar o atributo quando o programa termina"
        ],
        correta: 0,
        explicacao: "Com `private`, o valor só muda pelos métodos da própria classe, que podem validar a operação."
      }
    },

    /* ---------------------------------------------------- 10 */
    {
      id: "heranca",
      titulo: "Herança",
      resumo: "Reaproveite código criando classes a partir de outras.",
      blocos: [
        { t: "p", x: "Na herança, uma subclasse recebe os atributos e métodos de uma superclasse e ainda pode acrescentar os seus. A relação é do tipo \"é um\": um `Cachorro` é um `Animal`." },
        {
          t: "code",
          arquivo: "Zoologico.java",
          x: `class Animal {
    protected String nome;

    Animal(String nome) {
        this.nome = nome;
    }

    void apresentar() {
        System.out.println("Eu sou " + nome);
    }
}

class Cachorro extends Animal {
    Cachorro(String nome) {
        super(nome);
    }

    void latir() {
        System.out.println(nome + " diz: au au!");
    }
}

public class Zoologico {
    public static void main(String[] args) {
        Cachorro rex = new Cachorro("Rex");
        rex.apresentar();
        rex.latir();
    }
}`
        },
        { t: "saida", x: "Eu sou Rex\nRex diz: au au!" },
        {
          t: "lista",
          itens: [
            "`extends` declara quem é a superclasse",
            "`super(...)` chama o construtor da superclasse",
            "`protected` libera o atributo para as subclasses, mas não para o resto do programa"
          ]
        },
        { t: "dica", x: "Java só permite herdar de uma classe. Use herança quando a frase \"X é um Y\" fizer sentido. Se for \"X tem um Y\", o caminho é a associação, que vem no fim da trilha." }
      ],
      quiz: {
        pergunta: "Qual palavra faz uma classe herdar de outra?",
        opcoes: ["`inherits`", "`extends`", "`implements`", "`super`"],
        correta: 1,
        explicacao: "`class Cachorro extends Animal` faz `Cachorro` herdar tudo o que `Animal` tem."
      }
    },

    /* ---------------------------------------------------- 11 */
    {
      id: "polimorfismo",
      titulo: "Polimorfismo",
      resumo: "A mesma chamada, comportamentos diferentes.",
      blocos: [
        { t: "p", x: "Polimorfismo significa \"muitas formas\". Uma subclasse pode sobrescrever (`@Override`) um método da superclasse, e o Java escolhe a versão certa de acordo com o objeto que está de fato na variável." },
        {
          t: "code",
          arquivo: "Polimorfismo.java",
          x: `class Animal {
    void emitirSom() {
        System.out.println("Algum som...");
    }
}

class Cachorro extends Animal {
    @Override
    void emitirSom() {
        System.out.println("Au au!");
    }
}

class Gato extends Animal {
    @Override
    void emitirSom() {
        System.out.println("Miau!");
    }
}

public class Polimorfismo {
    public static void main(String[] args) {
        Animal[] bichos = { new Cachorro(), new Gato(), new Animal() };

        for (Animal a : bichos) {
            a.emitirSom();
        }
    }
}`
        },
        { t: "saida", x: "Au au!\nMiau!\nAlgum som..." },
        { t: "p", x: "O array é do tipo `Animal`, mas guarda um `Cachorro`, um `Gato` e um `Animal`. O laço chama sempre `emitirSom()`, e cada objeto responde do seu jeito." },
        { t: "dica", x: "`@Override` não é obrigatório, mas é valioso: se você errar o nome do método, o compilador avisa em vez de criar um método novo sem querer." }
      ],
      quiz: {
        pergunta: "O que acontece ao chamar `a.emitirSom()` quando `a` guarda um `Gato`?",
        opcoes: [
          "Executa a versão do `Gato`",
          "Executa sempre a versão de `Animal`",
          "Dá erro de compilação",
          "Executa as duas versões"
        ],
        correta: 0,
        explicacao: "O método executado depende do objeto real, não do tipo da variável. É isso que chamamos de polimorfismo."
      }
    },

    /* ---------------------------------------------------- 12 */
    {
      id: "interfaces",
      titulo: "Classes abstratas e interfaces",
      resumo: "Defina contratos que outras classes precisam cumprir.",
      blocos: [
        { t: "p", x: "Uma classe abstrata é um molde incompleto: não pode ser instanciada e pode ter métodos sem corpo (`abstract`) que as subclasses são obrigadas a implementar. Uma interface é um contrato puro: lista o que a classe sabe fazer." },
        {
          t: "code",
          arquivo: "Folha.java",
          x: `interface Pagavel {
    double calcularPagamento();
}

abstract class Funcionario {
    protected String nome;

    Funcionario(String nome) {
        this.nome = nome;
    }

    abstract double bonus();
}

class Gerente extends Funcionario implements Pagavel {
    Gerente(String nome) {
        super(nome);
    }

    double bonus() {
        return 1000;
    }

    public double calcularPagamento() {
        return 5000 + bonus();
    }
}

public class Folha {
    public static void main(String[] args) {
        Pagavel p = new Gerente("Marta");
        System.out.println(p.calcularPagamento());
    }
}`
        },
        { t: "saida", x: "6000.0" },
        {
          t: "lista",
          itens: [
            "`abstract class`: não aceita `new`, mas pode ter atributos e métodos prontos",
            "`interface`: só declara o que deve existir; uma classe pode implementar várias",
            "`implements` liga a classe à interface; `extends` liga a classe à superclasse"
          ]
        },
        { t: "dica", x: "Uma regra prática: classe abstrata descreve o que algo é, em parte; interface descreve o que algo sabe fazer." }
      ],
      quiz: {
        pergunta: "Qual afirmação sobre classes abstratas está correta?",
        opcoes: [
          "Não podem ser instanciadas com `new`",
          "Não podem ter atributos",
          "Todas as classes herdam delas",
          "Só podem ter métodos abstratos"
        ],
        correta: 0,
        explicacao: "Uma classe abstrata serve de base para outras. Só as subclasses concretas viram objetos."
      }
    },

    /* ---------------------------------------------------- 13 */
    {
      id: "arraylist",
      titulo: "ArrayList",
      resumo: "Listas que crescem e encolhem conforme a necessidade.",
      blocos: [
        { t: "p", x: "Um array tem tamanho fixo. O `ArrayList` é uma lista dinâmica: você adiciona e remove itens à vontade. O tipo dos itens vai entre `< >`." },
        {
          t: "code",
          arquivo: "Turma.java",
          x: `import java.util.ArrayList;

public class Turma {
    public static void main(String[] args) {
        ArrayList<String> alunos = new ArrayList<>();

        alunos.add("Ana");
        alunos.add("Bruno");
        alunos.add("Carla");
        alunos.remove("Bruno");

        System.out.println("Total: " + alunos.size());
        System.out.println("Primeiro: " + alunos.get(0));

        for (String nome : alunos) {
            System.out.println(nome);
        }
    }
}`
        },
        { t: "saida", x: "Total: 2\nPrimeiro: Ana\nAna\nCarla" },
        {
          t: "lista",
          itens: [
            "`add(x)` inclui, `remove(x)` retira, `get(i)` lê a posição `i`",
            "`size()` devolve a quantidade de itens",
            "A lista guarda objetos: use `ArrayList<Integer>` em vez de `ArrayList<int>`"
          ]
        },
        { t: "dica", x: "Atenção à diferença: array usa `v.length` (sem parênteses) e lista usa `lista.size()` (com parênteses)." }
      ],
      quiz: {
        pergunta: "Como descobrir quantos itens há em um `ArrayList`?",
        opcoes: ["`lista.length`", "`lista.size()`", "`lista.count()`", "`lista.total`"],
        correta: 1,
        explicacao: "No `ArrayList`, a quantidade vem do método `size()`."
      }
    },

    /* ---------------------------------------------------- 14 */
    {
      id: "associacao",
      titulo: "Associação, agregação e composição",
      resumo: "Faça objetos se relacionarem: a relação \"tem um\".",
      blocos: [
        { t: "p", x: "Na associação, um objeto guarda uma referência a outro. Enquanto a herança diz \"é um\", a associação diz \"tem um\" ou \"usa um\": um `Curso` tem um `Professor` e tem vários `Aluno`." },
        {
          t: "code",
          arquivo: "Matriculas.java",
          x: `import java.util.ArrayList;

class Professor {
    String nome;

    Professor(String nome) {
        this.nome = nome;
    }
}

class Aluno {
    String nome;

    Aluno(String nome) {
        this.nome = nome;
    }
}

class Curso {
    String titulo;
    Professor professor;                          // associação 1 para 1
    ArrayList<Aluno> alunos = new ArrayList<>();  // associação 1 para N

    Curso(String titulo, Professor professor) {
        this.titulo = titulo;
        this.professor = professor;
    }

    void matricular(Aluno aluno) {
        alunos.add(aluno);
    }

    void listar() {
        System.out.println(titulo + " | prof. " + professor.nome);
        for (Aluno a : alunos) {
            System.out.println("- " + a.nome);
        }
    }
}

public class Matriculas {
    public static void main(String[] args) {
        Professor prof = new Professor("Helena");
        Curso java = new Curso("Java Básico", prof);

        java.matricular(new Aluno("Ana"));
        java.matricular(new Aluno("Bruno"));
        java.listar();
    }
}`
        },
        { t: "saida", x: "Java Básico | prof. Helena\n- Ana\n- Bruno" },
        { t: "p", x: "O `Professor` foi criado fora do `Curso` e só entregue a ele. Se o curso acabar, o professor continua existindo. Essa é a **agregação**. Veja agora o oposto:" },
        {
          t: "code",
          arquivo: "Loja.java",
          x: `import java.util.ArrayList;

class ItemPedido {
    String produto;
    double preco;

    ItemPedido(String produto, double preco) {
        this.produto = produto;
        this.preco = preco;
    }
}

class Pedido {
    private ArrayList<ItemPedido> itens = new ArrayList<>();

    void adicionar(String produto, double preco) {
        itens.add(new ItemPedido(produto, preco));  // o Pedido cria e é dono dos itens
    }

    double total() {
        double soma = 0;
        for (ItemPedido i : itens) {
            soma += i.preco;
        }
        return soma;
    }
}

public class Loja {
    public static void main(String[] args) {
        Pedido p = new Pedido();
        p.adicionar("Caderno", 18.5);
        p.adicionar("Caneta", 3.5);
        System.out.println(p.total());
    }
}`
        },
        { t: "saida", x: "22.0" },
        {
          t: "lista",
          itens: [
            "Associação: um objeto conhece e usa outro (`Curso` e `Professor`)",
            "Agregação: relação todo e parte em que a parte existe sozinha (o `Professor` vive sem o `Curso`)",
            "Composição: o todo cria a parte e é dono dela (os `ItemPedido` não fazem sentido sem o `Pedido`)"
          ]
        },
        { t: "dica", x: "Um teste rápido: se o todo for apagado, a parte ainda faz sentido sozinha? Se sim, é agregação. Se não, é composição." }
      ],
      quiz: {
        pergunta: "Em qual relação a parte deixa de existir quando o todo é destruído?",
        opcoes: ["Associação simples", "Agregação", "Composição", "Herança"],
        correta: 2,
        explicacao: "Na composição o todo é dono da parte: quando o `Pedido` some, os seus itens vão junto."
      }
    }
  ]
});
