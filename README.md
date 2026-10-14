# Giz & Java (Flask)

Site de aulas com cinco trilhas: Java (até associação), Python (até Flask),
HTML, CSS e JavaScript (noções básicas). 40 aulas, cada uma com exemplo,
saída do programa, dica e um quiz.

## Como rodar

    python -m venv venv
    # Windows: venv\Scripts\activate    |    Linux/Mac: source venv/bin/activate
    pip install -r requirements.txt
    python app.py

Abra http://127.0.0.1:5000 no navegador.

## Estrutura

    app.py                  servidor Flask
    templates/index.html    página única
    static/style.css        visual (tema lousa)
    static/script.js        comportamento: trilhas, quiz, progresso, destaque de código
    static/aulas/java.js    trilha de Java
    static/aulas/python.js  trilha de Python
    static/aulas/web.js     trilhas de HTML, CSS e JavaScript

## Como adicionar uma aula ou trilha

Abra o arquivo da trilha em static/aulas/ e copie um objeto de aula.
Para uma trilha nova, crie um arquivo com window.TRILHAS.push({...}) e
inclua o <script> dele no templates/index.html, antes do script.js.

Dentro de `crases` (blocos de código): dobre as barras invertidas (\\n)
e, em código JavaScript, escreva \` para uma crase e \${ } para ${ }.
