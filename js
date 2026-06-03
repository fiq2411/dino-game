let cart = [];

function addToCart(item) {
  cart.push(item);
  document.getElementById("cart").innerText =
    "Cart: " + cart.join(", ");
}
