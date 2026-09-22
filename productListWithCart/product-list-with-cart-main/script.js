const productCart = document.querySelector(".product__cart");
const dessertsList = document.querySelector(".desserts__list");
const cartList = document.querySelector(".cart__list");
const cartContainer = document.querySelector(".cart__container");
const cartItemsContainer = document.querySelector(".cart__items-container");
const dialog = document.querySelector(".dialog");
const dialogList = document.querySelector(".dialog__list");
let dessertItems = [];
let cartItems = [];

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("./data.json");
        const data = await res.json();
        dessertItems = [...data];
        dessertItems.forEach(dessert => {
            const li = document.createElement("li");
            li.classList.add("desserts__list-item");
            li.innerHTML = `<div class="list__item-container">
            <picture class="list__item-picture">
              <source srcset="${dessert.image.desktop}" media="(min-width: 1024px)" class="list__desktop-picture" />
              <source srcset="${dessert.image.tablet}" media="(min-width: 1024px)" class="list__desktop-picture" />
              <img src="${dessert.image.mobile}" alt="${dessert.name}" class="list__desktop-picture" />
            </picture>
            <button type="button" class="list__item-btn">
              <img src="./assets/images/icon-add-to-cart.svg" alt="" width="21" height="20" class="item__btn-icon" />
              <span class="item__btn-label">
                Add to Cart
              </span>
            </button>
            <div class="list__btn-container" hidden>
              <button type="button" class="list__decrement-btn" aria-label="decrement">
                <svg class="decrement__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
              </button>
              <span class="list__item-quantity">
                1
              </span>
              <button type="button" class="list__increment-btn" aria-label="increment">
                <svg class="increment__btn-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </button>
            </div>
          </div>
          <p class="list__item-info">
            <span class="list__item-category">
              ${dessert.category}
            </span>
            <b class="list__item-name">
              ${dessert.name}
            </b>
            <span class="list__item-price">
              &dollar;${dessert.price.toFixed(2)}
            </span>
          </p>`;
          dessertsList.appendChild(li);
        })
    } catch(err) {
        console.error(err);
    }
})

const toggleCartUI = () => {
  if (!cartContainer.hidden) {
      cartContainer.classList.add("hide");
      cartContainer.hidden = true;
      cartItemsContainer.classList.add("show");
      cartItemsContainer.hidden = false;
  } else {
      cartContainer.classList.remove("hide");
      cartContainer.hidden = false;
      cartItemsContainer.classList.remove("show");
      cartItemsContainer.hidden = true;
  }
}

const toggleAddCartBtn = (name) => {
    const list = [...document.querySelectorAll(".list__item-name")];
    const listItemContainer = list.find(item => item.innerText === name).closest("p").previousElementSibling;
    const addBtn = listItemContainer.querySelector(".list__item-btn");
    const listBtnContainer = listItemContainer.querySelector(".list__btn-container");
    if (!addBtn.hidden) {
        addBtn.classList.add("hide");
        addBtn.hidden = true;
        listBtnContainer.classList.add("show");
        listBtnContainer.hidden = false;
        listBtnContainer.querySelector(".list__item-quantity").innerHTML = "1";
    } else {
        addBtn.classList.remove("hide");
        addBtn.hidden = false;
        listBtnContainer.classList.remove("show");
        listBtnContainer.hidden = true;
    }
}

const addToCart = (name) => {
    let itemInfo = dessertItems.find(dessert => dessert.name === name);
    cartItems.push({quantity: 1, ...itemInfo});
    cartItems.sort((a,b) => a.name.localeCompare(b.name));
}

const updateCart = (name, isIncrement, listItemQuantity) => {
    cartItems.forEach(item => {
        if (item.name === name) {
            isIncrement ? item.quantity++ : item.quantity--;
            listItemQuantity.innerHTML = item.quantity;
        }
    });
}

const removeFromCart = (name) => {
    cartItems = cartItems.filter(item => item.name!==name);
}

const showCart = () => {
    if (!cartContainer.classList.contains("hide") && cartItems.length) {
        toggleCartUI();
    }
    cartList.innerHTML = "";
    let numberOfItems = 0;
    let total = 0;
    cartItems.forEach(item => {
        numberOfItems+=item.quantity;
        total+=item.price*item.quantity;
        const li = document.createElement("li");
        li.classList.add("cart__list-item");
        li.innerHTML = `<div class="cart__list-container">
        <h3 class="list__item-title">${item.name}</h3>
        <div class="list__item-description">
          <p class="cart__item-quantity">
            ${item.quantity}x
          </p>
          <p class="list__item-cost">
            @ &dollar;${item.price}
            <b class="list__item-total">&dollar;${(item.quantity*item.price).toFixed(2)}</b>
          </p>
        </div>
      </div>
      <button class="cart__list-btn" aria-label="remove item">
        <svg class="cart__list-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
      </button>`;
      cartList.appendChild(li);
    })
    cartItemsContainer.querySelector(".cart__title").innerHTML = `Your Cart (${numberOfItems})`;
    document.querySelector(".cart__total > strong").innerHTML = `&dollar;${total.toFixed(2)}`;
}

dessertsList.addEventListener("click", e => {
    if (e.target.classList.contains("list__item-btn")) {
        const name = e.target.closest("li").querySelector(".list__item-name").innerText;
        addToCart(name);
        toggleAddCartBtn(name);
        showCart();
    }
    if (e.target.classList.contains("list__decrement-btn")) {
        const name = e.target.closest("li").querySelector(".list__item-name").innerText;
        if (e.target.nextElementSibling.innerText === '1') {
            toggleAddCartBtn(e.target.closest(".desserts__list-item").querySelector(".list__item-name").innerText);
            removeFromCart(name);
            toggleCartUI();
          } else {
            updateCart(name, false, e.target.nextElementSibling);
        }
        showCart();
    }
    if (e.target.classList.contains("list__increment-btn")) {
        updateCart(e.target.closest("li").querySelector(".list__item-name").innerText, true, e.target.previousElementSibling);
        showCart();
    }
})

cartItemsContainer.addEventListener("click", e => {
  if (e.target.classList.contains("cart__list-btn")) {
    removeFromCart(e.target.previousElementSibling.firstElementChild.innerText);
    showCart();
    toggleAddCartBtn(e.target.previousElementSibling.firstElementChild.innerText);
    if (!cartItems.length) {
      toggleCartUI();
    }
  }
  if (e.target.classList.contains("cart__btn")) {
    if (!cartItems.length) return;
    dialog.showModal();
    let total = 0;
    dialogList.innerHTML = "";
    cartItems.forEach(item => {
      total+=item.price*item.quantity;
      const li = document.createElement("li");
      li.classList.add("dialog__list-item");
      li.innerHTML = `<div class="dialog__list-container">
      <img src="${item.image.thumbnail}" alt=""
      width="100" height="96" loading="lazy" class="dialog__item-thumbnail">
      <div class="dialog__item-info">
        <h3 class="dialog__item-name">
          ${item.name}
        </h3>
        <p class="dialog__item-details">
          <b>${item.quantity}x</b>
          @ &dollar;${item.price.toFixed(2)}
        </p>
      </div>
    </div>
    <p class="dialog__item-total">
      &dollar;${(item.price * item.quantity).toFixed(2)}
    </p>`;
      dialogList.appendChild(li);
    })
    dialogList.nextElementSibling.innerHTML = `Order Total
    <strong>&dollar;${total.toFixed(2)}</strong>`;
  }
})

dialog.addEventListener("click", e => {
  if (e.target.classList.contains("dialog__btn")) {
    cartItems.forEach(item => {
      item.quantity = 1;
      removeFromCart(item.name);
      toggleAddCartBtn(item.name);
      toggleCartUI();
    })
    dialog.close();
    cartItems = [];
  }
})