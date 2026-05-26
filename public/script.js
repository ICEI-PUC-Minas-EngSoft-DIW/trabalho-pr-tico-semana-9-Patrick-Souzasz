const data = {
    produtos: [
      {
        id: 1,
        nome: "Smartphone Galaxy S23",
        preco: 3499.90,
        categoria: "Celulares",
        imagem: "https://images.samsung.com/is/image/samsung/p6pim/br/2302/gallery/br-galaxy-s23-s911-sm-s911bzekzto-thumb-534840704",
        descricao: "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
        emEstoque: true
      },
      {
        id: 2,
        nome: "Notebook Dell Inspiron 15",
        preco: 4599.00,
        categoria: "Notebooks",
        imagem: "https://d30u9wim1barf6.cloudfront.net/Custom/Content/Products/98/72/987206_notebook-dell-inspiron-15-7580-15-6-fhd-i7-8565u-1tbplus128gb-ssd-16gb-nvidia-2gb-linux-pratanac005885_m1_637135786673158817.webp",
        descricao: "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
        emEstoque: false
      },
      {
      id: 3,
      nome: "Notebook Dell",
      preco: 3800,
      categoria: "Notebooks",
      imagem: "https://cdn.awsli.com.br/2500x2500/19/19974/produto/399297133/notebook-dell-pro-14-ryzen-7-pro-16gb-512gb-ssd-c6c1a774-jp6v6cho1p.jpg",
      descricao: "Notebook ideal para estudos.",
      emEstoque: false
    },
    {
      id: 4,
      nome: "MacBook Air",
      preco: 8500,
      categoria: "Notebooks",
      imagem: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-air-size-unselect-202601-gallery-1_FMT_WHH?wid=690&hei=720&fmt=jpeg&qlt=90&.v=1767638908527",
      descricao: "Notebook leve e poderoso.",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Mouse Gamer",
      preco: 250,
      categoria: "Acessórios",
      imagem: "https://http2.mlstatic.com/D_NQ_NP_691264-MLA109735456848_042026-O.webp",
      descricao: "Mouse RGB com alta precisão.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Teclado Mecânico",
      preco: 450,
      categoria: "Acessórios",
      imagem: "https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/298694352/k642-rgb-8708-pt--7-e9zokgneq4.jpg",
      descricao: "Teclado mecânico para games.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 4200,
      categoria: "Games",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5V8a_KVFbZmgInQlRhNJLeUDZg5Gkw8NbBA&s.placeholder.com/200x150",
      descricao: "Console de última geração.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Xbox Series X",    
      preco: 4100,
      categoria: "Games",
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxCXd5cQt-GJREvBFPMGnLoop9hlwVLcUtw&s",
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
  card.style.background = "#ffffff";
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
      card.style.background = "#ffffff";
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



  