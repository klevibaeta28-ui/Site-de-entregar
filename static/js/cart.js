let carrinho = [];

function adicionarAoCarrinho(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
    }

    atualizarCarrinhoUI();
    exibirToast(`${nome} adicionado ao carrinho!`);
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(item => item.id === id);
    if (!item) return;

    item.quantidade += delta;

    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
    } else {
        atualizarCarrinhoUI();
    }
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
    const countBadge = document.getElementById('cart-count');
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    // Total de itens
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    countBadge.innerText = totalItens;

    // Calcular Subtotal
    const valorTotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    totalElement.innerText = `R$ ${valorTotal.toFixed(2)}`;

    // Renderizar Itens
    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-400">
                <i class="fa-solid fa-basket-shopping text-4xl mb-3 block opacity-50"></i>
                <p>Seu carrinho está vazio.</p>
            </div>`;
        return;
    }

    container.innerHTML = '';
    carrinho.forEach(item => {
        container.innerHTML += `
            <div class="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                <img src="${item.imagem}" alt="${item.nome}" class="w-14 h-14 object-cover rounded-lg">
                <div class="flex-1 ml-3">
                    <h5 class="font-bold text-sm text-gray-800 line-clamp-1">${item.nome}</h5>
                    <p class="text-red-600 font-extrabold text-sm">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="alterarQuantidade(${item.id}, -1)" class="w-7 h-7 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg flex items-center justify-center transition">-</button>
                    <span class="font-bold text-sm text-gray-800">${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${item.id}, 1)" class="w-7 h-7 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center justify-center transition">+</button>
                </div>
            </div>
        `;
    });
}

function toggleCarrinho() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    drawer.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
}

function exibirToast(mensagem) {
    const toast = document.getElementById('toast-notification');
    const toastText = document.getElementById('toast-message');

    toastText.innerText = mensagem;
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 2500);
}

function finalizarPedidoFront() {
    if (carrinho.length === 0) {
        exibirToast("Adicione produtos antes de finalizar!");
        return;
    }

    fetch('/api/finalizar-pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itens: carrinho })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            carrinho = [];
            atualizarCarrinhoUI();
            toggleCarrinho();
            exibirToast(`🎉 Pedido ${data.codigo} confirmado! Total de entrega: ${data.tempo_estimado}`);
        }
    })
    .catch(() => exibirToast("Erro ao processar o pedido."));
}