// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Page Load Hone Par Bill Show Karo
window.onload = function () {
    updateBill();
};

// Add Item
function addItem() {

    let item = document.getElementById("item");

    let name = item.options[item.selectedIndex].text.split(" - ")[0];
    let price = Number(item.value);
    let quantity = Number(document.getElementById("quantity").value);

    if (quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Check if item already exists
    let existingItem = cart.find(product => product.name === name);

    if (existingItem) {

        existingItem.quantity += quantity;
        existingItem.total = existingItem.price * existingItem.quantity;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: quantity,
            total: price * quantity
        });

    }

    // Save Data
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("quantity").value = 1;

    updateBill();
}


// Update Bill
function updateBill() {

    let billBody = document.getElementById("billBody");

    billBody.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        subtotal += item.total;

        billBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${item.total.toFixed(2)}</td>
                <td>
                    <button class="removeBtn" onclick="removeItem(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;

    });

    let gst = subtotal * 0.05;
    let grandTotal = subtotal + gst;

    document.getElementById("subtotal").innerHTML =
        "₹" + subtotal.toFixed(2);

    document.getElementById("gst").innerHTML =
        "₹" + gst.toFixed(2);

    document.getElementById("grandTotal").innerHTML =
        "₹" + grandTotal.toFixed(2);

    // Save Updated Cart
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateBill();

}


// Clear Bill
function clearBill() {

    if (confirm("Are you sure you want to clear the bill?")) {

        cart = [];

        localStorage.removeItem("cart");

        updateBill();

    }

}