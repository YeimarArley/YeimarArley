// Referencias a elementos del DOM
const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productQuantityInput = document.getElementById('product-quantity');
const productPriceInput = document.getElementById('product-price');
const inventoryTableBody = document.querySelector('#inventory-table tbody');

// Cargar productos desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadInventory);

// Evento para agregar un nuevo producto
productForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const productName = productNameInput.value.trim();
    const productQuantity = parseInt(productQuantityInput.value.trim());
    const productPrice = parseFloat(productPriceInput.value.trim());
    
    if (productName && productQuantity > 0 && productPrice > 0) {
        const product = {
            name: productName,
            quantity: productQuantity,
            price: productPrice,
            total: (productQuantity * productPrice).toFixed(2)
        };
        
        addProductToTable(product);
        saveProductToLocalStorage(product);
        
        // Limpiar formulario
        productForm.reset();
    } else {
        alert('Por favor, complete todos los campos con valores válidos.');
    }
});

// Función para agregar producto a la tabla
function addProductToTable(product) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
        <td>${product.total}</td>
        <td class="actions">
            <button class="delete-btn" onclick="deleteProduct(this)">Eliminar</button>
        </td>
    `;
    
    inventoryTableBody.appendChild(row);
}

// Función para eliminar un producto de la tabla y del localStorage
function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    const productName = row.children[0].textContent;
    
    row.remove();
    deleteProductFromLocalStorage(productName);
}

// Guardar producto en localStorage
function saveProductToLocalStorage(product) {
    let products = getProductsFromLocalStorage();
    products.push(product);
    localStorage.setItem('inventory', JSON.stringify(products));
}

// Cargar productos guardados desde localStorage
function loadInventory() {
    const products = getProductsFromLocalStorage();
    products.forEach(product => addProductToTable(product));
}

// Obtener productos desde localStorage
function getProductsFromLocalStorage() {
    return localStorage.getItem('inventory') ? JSON.parse(localStorage.getItem('inventory')) : [];
}

// Eliminar producto de localStorage
function deleteProductFromLocalStorage(productName) {
    let products = getProductsFromLocalStorage();
    products = products.filter(product => product.name !== productName);
    localStorage.setItem('inventory', JSON.stringify(products));
}
