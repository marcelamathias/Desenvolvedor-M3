import { Product, ProductDetails } from "./types";
import Swal from "sweetalert2";

const serverUrl = "http://localhost:5000/products";

function updateMiniCartCount(): void {
  const cartData = localStorage.getItem("cart");
  const cart = cartData ? JSON.parse(cartData) : [];

  const minicartCount = document.querySelector(".minicart__count");

  if (minicartCount) {
    minicartCount.textContent = cart.length.toString();
  }
}

function addToCart(productDetails: ProductDetails): void {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(productDetails);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateMiniCartCount();

  Swal.fire({
    icon: "success",
    title: "Produto Adicionado ao Carrinho",
    showConfirmButton: true,
    timer: 3000,
  });
}

function renderProduct(
  product: Product,
  productListContainer: Element | null
): void {
  const productItem = document.createElement("li");
  productItem.classList.add("catalog__product-item");
  productItem.dataset.productDetails = JSON.stringify({
    id: product.id,
    name: product.name,
    price: product.price,
    size: product.size,
    date: product.date,
  });

  productItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3 class="catalog__product-name">${product.name}</h3>
    <p class="catalog__product-price">R$ ${product.price
      .toFixed(2)
      .replace(".", ",")}</p>
    <p class="catalog__product-installments">até ${
      product.parcelamento[0]
    }x de R$ ${product.parcelamento[1].toFixed(2)}</p>
    <button class="buy-button" data-product-details='${JSON.stringify(
      product
    )}'>Comprar</button>
  `;

  const buyButton = productItem.querySelector(".buy-button") as HTMLElement;

  function addToCartHandler() {
    const productDetails = JSON.parse(buyButton.dataset.productDetails);
    addToCart(productDetails);
  }

  if (buyButton) {
    buyButton.addEventListener("click", addToCartHandler);
  }

  productListContainer?.appendChild(productItem);
}

let itemsVisible = 9;

function renderProducts(
  productList: Product[],
  productListContainer: HTMLElement
) {
  productListContainer.innerHTML = "";
  const itemsToDisplay = productList.slice(0, itemsVisible);

  itemsToDisplay.forEach((product) => {
    renderProduct(product, productListContainer);
  });

  if (itemsVisible < productList.length) {
    const showMoreButton = document.querySelector(
      ".catalog__show-more"
    ) as HTMLElement;
    if (showMoreButton) {
      showMoreButton.style.display = "flex";
      showMoreButton.addEventListener("click", () => {
        itemsVisible += 9;
        renderProducts(productList, productListContainer);
        showMoreButton.style.display = "none";
      });
    }
  }
}

function fetchDataAndRenderProducts(): void {
  fetch(serverUrl)
    .then((response) => response.json())
    .then((data: Product[]) => {
      const productListContainer = document.querySelector(
        ".catalog__products-list"
      ) as HTMLElement | null;
      if (productListContainer) {
        renderProducts(data, productListContainer);
      }
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
    });
}

function openModal(elementName: string): void {
  const modal = document.querySelector(elementName) as HTMLElement;
  modal.classList.toggle("is-open");
}

function toggleFilter(): void {
  const toggleFilterButtons = document.querySelectorAll(".js-toggle-filter");
  toggleFilterButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(".filter__main"));
  });
}

function toggleSort(): void {
  const toggleFilterButtons = document.querySelectorAll(".js-toggle-sort");
  toggleFilterButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(".sort__list"));
  });
}

function toggleOptions(): void {
  const toggleOptions = document.querySelectorAll(".js-toggle-filters-options");
  toggleOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      event.preventDefault();
      const filterItems = option.parentNode.querySelector(
        ".filter-group__items"
      );
      filterItems.classList.toggle("is-open");
    });
  });
}

function eventsDOM(): void {
  toggleFilter();
  toggleOptions();
  toggleSort();
}

function main() {
  fetchDataAndRenderProducts();
  updateMiniCartCount();
  eventsDOM();
}

document.addEventListener("DOMContentLoaded", main);
