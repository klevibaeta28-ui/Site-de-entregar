from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Cardápio simulado
CARDAPIO = [
    {
        "id": 1,
        "nome": "Burger Wilker Special",
        "categoria": "burgers",
        "preco": 32.90,
        "avaliacao": "5.0",
        "tempo": "20-30 min",
        "imagem": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        "descricao": "Pão brioche, 2x hambúrguer artesanal 160g, muito queijo e molho especial."
    },
    {
        "id": 2,
        "nome": "Pizza Suprema de Calabresa",
        "categoria": "pizzas",
        "preco": 49.90,
        "avaliacao": "4.9",
        "tempo": "30-40 min",
        "imagem": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
        "descricao": "Massa artesanal assada no forno a lenha com molho de tomate e muçarela."
    },
    {
        "id": 3,
        "nome": "Combo Açaí Supremo 700ml",
        "categoria": "sobremesas",
        "preco": 24.50,
        "avaliacao": "4.8",
        "tempo": "15-25 min",
        "imagem": "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80",
        "descricao": "Açaí puro com banana, morango, leite em pó e leite condensado."
    },
    {
        "id": 4,
        "nome": "Milkshake de Nutella Gelado",
        "categoria": "bebidas",
        "preco": 18.90,
        "avaliacao": "4.9",
        "tempo": "10-20 min",
        "imagem": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80",
        "descricao": "Batido com sorvete de baunilha, Nutella e cobertura de chantilly."
    }
]

@app.route('/')
def index():
    return render_template('index.html', produtos=CARDAPIO)

@app.route('/api/finalizar-pedido', methods=['POST'])
def finalizar_pedido():
    dados = request.get_json()
    if not dados or 'itens' not in dados or len(dados['itens']) == 0:
        return jsonify({"success": False, "message": "O carrinho está vazio!"}), 400
    
    return jsonify({
        "success": True,
        "message": "Pedido realizado com sucesso!",
        "codigo": "#WILKER-1010",
        "tempo_estimado": "25 a 35 minutos"
    })

if __name__ == '__main__':
    print("🚀 Servidor Flask rodando em http://127.0.0.1:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)