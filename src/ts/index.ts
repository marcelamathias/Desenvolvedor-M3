import { Product } from "./types";
import Swal from "sweetalert2";

const serverUrl = "http://localhost:5000/products";

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

function main() {
  fetchDataAndRenderProducts();
}

document.addEventListener("DOMContentLoaded", main);
