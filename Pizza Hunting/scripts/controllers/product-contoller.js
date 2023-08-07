//Product Controller - It is a Glue between View and Model
// Controller - Input/Output View Layer
//Data exchange between View and Model

import Product from "../models/product.js";
import productOperations from "../services/product-operations.js";

async function loadPizzas() {
    const pizzas = await productOperations.loadProducts();
    console.log("Pizzas are ", pizzas);
    pizzas.forEach(pizza => {
        preparePizzaCard(pizza);
    });
}
loadPizzas();

function preparePizzaCard(pizza) {
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card alert alert-info m-2';
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addpizzaToCart);
    button.className = 'btn btn-outline-success';
    button.innerText = 'Add-to-Cart';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
    return outputDiv;
}

function addpizzaToCart() {
    const pizzaId = this.getAttribute('product-id');
    console.log('Current Button Clicked', pizzaId);
    const pizze = productOperations.searchProducts(pizzaId);
    console.log('Pizza ', pizze);
    pizze.isAddedInCart = !pizze.isAddedInCart;
    if (pizze.isAddedInCart) {
        this.className = 'btn btn-outline-danger';
        this.innerText = 'Remove to Cart';
        productOperations.addToCart(pizze);
    }
    else {
        this.className = 'btn btn-outline-success';
        this.innerText = 'Add from Cart';
        productOperations.removeFromCart(pizze);
    }
    printCart();
}

function printCart(pizza) {
    const cartProducts = productOperations.getProductsInCarts();
    console.log(cartProducts);
    const cart = document.querySelector('#basket');
    cart.innerHTML = '';
    if (cartProducts.length == 0) {
        const pirow = document.createElement('div');
        pirow.className = 'row';
        const cartz = document.createElement('p');
        cartz.innerText = 'Cart is Empty!';
        pirow.appendChild(cartz);
        cart.appendChild(pirow);
    }
    else {
        cartProducts.forEach(el => {
            const pizrow = document.createElement('div');
            pizrow.className = 'row';
            const pizname = document.createElement('li');
            pizname.className = 'col-7 text-left';
            pizname.innerText = el.name;
            const pizquant = document.createElement('div');
            pizquant.className = 'col-2 text-center';
            pizquant.innerText = '1';
            const pizprice = document.createElement('div');
            pizprice.className = 'col-3 text-right'
            pizprice.innerText = `$ ${el.price}`;
            pizrow.appendChild(pizname);
            pizrow.appendChild(pizquant);
            pizrow.appendChild(pizprice);
            cart.appendChild(pizrow);
            // const li = document.createElement('li');
            // li.className = 'card';
            // li.innerText = `Pizza: ${el.name} Price:$${el.price}`;
            // cart.appendChild(li);
        });
    }


    const totalPizza = cartProducts.length;
    const total = document.querySelector('#total');
    total.innerHTML = '';
    total.innerText = totalPizza;

    var amount = cartProducts.reduce((total, p) => total + parseFloat(p.price), 0);
    var totalAmount = amount + amount * (0.18);
    const pizzaAmount = document.querySelector('#amount');
    pizzaAmount.innerHTML = '';
    pizzaAmount.innerText = `$ ${amount}`;
    const gstamount = document.querySelector('#gst');
    gstamount.innerHTML = '';
    gstamount.innerText = `$ ${amount * (0.18)}`;
    const totamount = document.querySelector('#totamount');
    totamount.innerHTML = '';
    totamount.innerText = `$ ${totalAmount}`;
}

// var rzp1 = new Razorpay(options);
// document.getElementById('clickme').onclick = function (e) {
//     rzp1.open();
//     e.preventDefault();
// }