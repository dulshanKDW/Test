// This script handles the functionality of the cart page
const prices = {
    "Intel Core Ultra 9": 500,
    "Intel Core i7": 350,
    "Intel Core i5": 250,
    "AMD Ryzen 9": 450,
    "AMD Ryzen 5": 300,
    "AMD Ryzen 7": 400,
    "Graphic Card 1": 1000,
    "Graphic Card 2": 950,
    "Graphic Card 3": 900,
    "Graphic Card 4": 850,
    "Graphic Card 5": 800,
    "Intel Arc B580": 750,
    "ASRock X670E(AMD)": 200,
    "Gigabyte Aorus X870(AMD)": 180,
    "Motherboard 3": 150,
    "Motherboard 4": 140,
    "Motherboard 5": 130,
    "Motherboard 6": 120,
    "RAM 1": 100,
    "RAM 2": 90,
    "RAM 3": 80,
    "RAM 4": 70,
    "Storage 1": 160,
    "Storage 2": 150,
    "Storage 3": 140,
    "Storage 4": 130,
    "Storage 5": 120,
    "Storage 6": 110
};

const cart = [];

function addToCart(itemName) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, quantity: 1, price: prices[itemName] });
    }
    renderCart();
}

function renderCart() {
    const tbody = document.querySelector("#cart-table tbody");
    tbody.innerHTML = "";
    let grandTotal = 0;

    cart.forEach(item => {
        const total = item.quantity * item.price;
        grandTotal += total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${total}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById("grand-total").textContent = `$${grandTotal}`;
}

function saveToFavorites() {
    localStorage.setItem("favoriteOrder", JSON.stringify(cart));
    alert("Order saved as favorite!");
}

function applyFavorites() {
    const favoriteOrder = JSON.parse(localStorage.getItem("favoriteOrder"));
    if (favoriteOrder) {
        cart.length = 0;
        favoriteOrder.forEach(item => cart.push(item));
        renderCart();
    } else {
        alert("No favorite order found!");
    }
}

function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    localStorage.setItem("currentOrder", JSON.stringify(cart));
    window.location.href = "order-page.html";
}

document.getElementById("add-to-favorites").addEventListener("click", saveToFavorites);
document.getElementById("apply-favorites").addEventListener("click", applyFavorites);
document.getElementById("buy-now").addEventListener("click", buyNow);

document.querySelectorAll("button[id^='add-']").forEach(button => {
    button.addEventListener("click", () => {
        const itemName = button.parentElement.querySelector("p").textContent;
        addToCart(itemName);
    });
});


// This script handles the functionality of the order page
const order = JSON.parse(localStorage.getItem("currentOrder")); 

document.getElementById("order-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const deliveryDate = document.getElementById("delivery-date").value;

    alert(`Thank you for your purchase, ${name}! Your order will be delivered on ${deliveryDate}.`);
});