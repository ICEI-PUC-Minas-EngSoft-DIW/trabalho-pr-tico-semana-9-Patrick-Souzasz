const data = {
    produtos: [
      {
        id: 1,
        nome: "Smartphone Galaxy S23",
        preco: 3499.90,
        categoria: "Celulares",
        imagem: "https://example.com/imagens/galaxy-s23.jpg",
        descricao: "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
        emEstoque: true
      },
      {
        id: 2,
        nome: "Notebook Dell Inspiron 15",
        preco: 4599.00,
        categoria: "Notebooks",
        imagem: "https://example.com/imagens/dell-inspiron-15.jpg",
        descricao: "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
        emEstoque: false
      },
      {
      id: 3,
      nome: "Notebook Dell",
      preco: 3800,
      categoria: "Notebooks",
      imagem: "https://via.placeholder.com/200x150",
      descricao: "Notebook ideal para estudos.",
      emEstoque: false
    },
    {
      id: 4,
      nome: "MacBook Air",
      preco: 8500,
      categoria: "Notebooks",
      imagem: "https://via.placeholder.com/200x150",
      descricao: "Notebook leve e poderoso.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 250,
      categoria: "Acessórios",
      imagem: "https://via.placeholder.com/200x150",
      descricao: "Mouse RGB com alta precisão.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 450,
      categoria: "Acessórios",
      imagem: "https://via.placeholder.com/200x150",
      descricao: "Teclado mecânico para games.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4200,
      categoria: "Games",
      imagem: "https://via.placeholder.com/200x150",
      descricao: "Console de última geração.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox Series X",
      preco: 4100,
      categoria: "Games",
      imagem: "https://via.placeholder.com/200x150",
      descricao: "Console Microsoft poderoso.",
      emEstoque: true
    }
  ]
};

// getElementById
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

// querySelector
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const renderButton = document.querySelector("#btnRender");

// 1. formatPrice(preco)
function formatPrice(preco) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// 2. createProductCard(produto)
function createProductCard(produto) {

  // createElement
  const card = document.createElement("div");

  // setAttribute
  card.setAttribute("data-id", produto.id);

  // classList.add
  card.classList.add("card");

  // style obrigatório
  card.style.border = "1px solid #ccc";
  card.style.padding = "10px";
  card.style.margin = "10px";
  card.style.borderRadius = "8px";
  card.style.background = "#f9f9f9";
  card.style.width = "220px";

  // Conteúdo
  card.innerHTML = `
    <img src="${produto.imagem}" width="200">
    <h3 class="card-title">${produto.nome}</h3>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>

    <button class="details-btn">Ver detalhes</button>
    <button class="highlight-btn">Destacar</button>
  `;

  // Botão detalhes
  const detailsBtn = card.querySelector(".details-btn");

  detailsBtn.addEventListener("click", () => {
    showProductDetails(produto);
  });

  // Botão destacar
  const highlightBtn = card.querySelector(".highlight-btn");

  highlightBtn.addEventListener("click", () => {
    card.classList.toggle("highlight");

    if (card.classList.contains("highlight")) {
      card.style.border = "3px solid red";
      card.style.background = "#ffe5e5";
    } else {
      card.style.border = "1px solid #ccc";
      card.style.background = "#f9f9f9";
    }
  });

  return card;
}

// 3. renderProducts(produtos)
function renderProducts(produtos) {

  // limpa lista
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);

    // appendChild
    productList.appendChild(card);
  });

  // B.5 querySelectorAll obrigatório
  const allCards = document.querySelectorAll(".card");

  allCards.forEach(card => {
    console.log(card.dataset.id);

    // pequeno efeito visual
    card.style.boxShadow = "2px 2px 5px rgba(0,0,0,0.2)";
  });
}

// 4. renderCategories()
function renderCategories() {

  categorySelect.innerHTML = "";

  // opção Todas
  const optionAll = document.createElement("option");
  optionAll.value = "Todas";
  optionAll.textContent = "Todas";

  categorySelect.appendChild(optionAll);

  // categorias únicas
  const categorias = [
    ...new Set(data.produtos.map(produto => produto.categoria))
  ];

  categorias.forEach(categoria => {
    const option = document.createElement("option");

    option.value = categoria;
    option.textContent = categoria;

    categorySelect.appendChild(option);
  });
}

// 5. showProductDetails(produto)
function showProductDetails(produto) {

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>

    <img src="${produto.imagem}" width="250">

    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>

    <p><strong>Categoria:</strong> ${produto.categoria}</p>

    <p>
      <strong>Status:</strong>
      ${produto.emEstoque ? "Em estoque" : "Sem estoque"}
    </p>

    <p>${produto.descricao}</p>
  `;
}

// 6. filterProducts()
function filterProducts() {

  const textoBusca = searchInput.value.toLowerCase();

  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter(produto => {

    const nomeBate = produto.nome
      .toLowerCase()
      .includes(textoBusca);

    const categoriaBate =
      categoriaSelecionada === "Todas" ||
      produto.categoria === categoriaSelecionada;

    return nomeBate && categoriaBate;
  });

  renderProducts(produtosFiltrados);
}

// input busca
searchInput.addEventListener("input", filterProducts);

// select categoria
categorySelect.addEventListener("change", filterProducts);

// botão renderizar
renderButton.addEventListener("click", () => {
  renderProducts(data.produtos);
});

renderCategories();
renderProducts(data.produtos);



  