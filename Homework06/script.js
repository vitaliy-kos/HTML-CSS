initializeCart();

const addElems = document.querySelectorAll('.add-to-cart'),
      removeElems = document.querySelectorAll('.ci-item .remove');

addElems.forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        const fullProd = el.closest('.fi-item'),
              product = {},
              isAdded = checkIfAdded(fullProd.dataset.id);

        product.id = fullProd.dataset.id;
        product.name = fullProd.querySelector('h4').innerText;
        product.color = "RED";
        product.price = fullProd.querySelector('.price').innerText;
        product.img = fullProd.querySelector('.background').src;
        
        isAdded ? alert("Товар уже добавлен в корзину!") 
                : addToCart(product);
    });
});

removeElems.forEach(el => createRemoveListner(el));

function addToCart(product) {
    const cart = getLocalCart();
    cart.push(product);
    updateLocalCart(cart);
    
    document.querySelector('.ci-items').insertAdjacentHTML('beforeend', generateProductCart(product));
    
    createRemoveListner(document.querySelector(`.ci-item[data-id="${product.id}"] .remove`));
    document.querySelector('.cart-items').classList.add('visible');

    window.scrollTo({
        top: document.querySelector(`.ci-item[data-id="${product.id}"]`).offsetTop - 100,
        left: 0,
        behavior: "smooth",
    });
}

function removeFromCart(id) {
    const cart = getLocalCart();
    cart.splice(cart.find(prod => prod.id == id), 1);
    updateLocalCart(cart);

    document.querySelectorAll('.ci-item').forEach(el => {
        if (el.dataset.id == id) el.remove();
    });

    if (document.querySelectorAll('.ci-item').length == 0)
        document.querySelector('.cart-items').classList.remove('visible');
}

function updateLocalCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getLocalCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function checkIfAdded(id) {
    const cart = getLocalCart();
    return cart.find(prod => prod.id == id) ? true : false;
}

function createRemoveListner(el) {
    el.addEventListener("click", () => {
        const cartProd = el.closest('.ci-item');
        removeFromCart(cartProd.dataset.id);
    });
}

function generateProductCart(product) {
    return `
        <div class="ci-item" data-id="${product.id}">
            <div class="ci-photo">
                <img src="${product.img}" alt="">
            </div>
            <div class="desc">
                <div class="remove">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                    </svg>
                </div>
                <h4>${product.name}</h4>
                <ul class="list">
                    <li class="price">Price: <span class="val">${product.price}</span></li>
                    <li>Color: <span class="val">${product.color}</span></li>
                    <li>Size: <span class="val">XL</span></li>
                    <li>Quantity: <input type="text" value="1" maxlength="2"></li>
                </ul>
            </div>
        </div>`;
}

function initializeCart() {
    const cart = getLocalCart();

    cart.forEach(product => {
        document.querySelector('.ci-items').insertAdjacentHTML('beforeend', generateProductCart(product));
    });

    if (document.querySelectorAll('.ci-item').length > 0) {
        document.querySelector('.cart-items').classList.add('visible');
    } else {
        document.querySelector('.cart-items').classList.remove('visible');
    }
}