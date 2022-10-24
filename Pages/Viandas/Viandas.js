const btnCarrito = document.querySelector("#cart");
const ventanaCarrito = document.querySelector(".cart-modal-overlay");
const cerrarCarrito = document.querySelector("#close-btn");
const botonesComprar = document.querySelectorAll(".add-to-cart");
const contenedorCarrito = document.querySelector(".product-rows");
const totalCarrito = document.querySelector('.total-price');
const totalProducto = document.querySelector(".cart-quantity");
const borrarItem = document.querySelector('#delete-cart-item');
const guardarCarritoBtn = document.querySelector('#store-cart');
const cartItemsContainer = document.querySelector('.product-rows');
let carrito = [];
const localStorageCart = localStorage.getItem('cart');

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

if(localStorageCart){
    const saveCart = JSON.parse(localStorageCart);
    carrito = saveCart;
    popularCarrito();
    ActualizarCantidadCarrito();
}


btnCarrito.addEventListener("click", ()=> {
    ventanaCarrito.classList.add("open");
})


cerrarCarrito.addEventListener("click", ()=> {
    ventanaCarrito.classList.remove("open");
})

guardarCarritoBtn.addEventListener('click', () => {
    localStorage.setItem('cart', JSON.stringify(carrito))
})

cartItemsContainer.addEventListener('click', (e) => {
    if(e.target.id.includes('delete-cart-item')){
        const idToDelete = e.target.id.split('delete-cart-item-')[1];
        carrito = carrito.filter((item) => item.id !== idToDelete)
        popularCarrito();
        ActualizarCantidadCarrito();
    }
})

botonesComprar.forEach(boton => {
    boton.addEventListener("click", agregarCarrito);
})

function agregarCarrito(e){
    boton = e.target;
    let padre = boton.parentElement;
    let prodID = padre.getAttribute("id");
    let nombreProd = padre.querySelector("h3").textContent;
    let precio = parseFloat(padre.querySelector('.product-price').textContent.replace("$", ""));
    let imagen = padre.querySelector('.product-image').src;
    
    const prodCarrito = new Producto(prodID,nombreProd, precio, imagen);

    const itemIndex = carrito.findIndex((item) => item.id === prodCarrito.id)

    if(itemIndex >= 0){
        console.log(carrito[itemIndex])
        carrito[itemIndex].cantidad =  carrito[itemIndex].cantidad + 1;
    } else {
        carrito.push(prodCarrito);
    }

    popularCarrito();
    ActualizarCantidadCarrito();
}

function popularCarrito(){
    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto => {
        contenedorCarrito.innerHTML += `
            <div class='product-row' id='${producto.id}'>
                <img src='${producto.imagen}' class='cart-image' />
                <div class='product-data'>
                    <div class='product-info'>
                        <span>${producto.nombre}</span>
                        <span class='cart-price'>$${producto.precio}</span>
                    </div>
                    <div class='product-actions'>
                        <input type='number' value='${producto.cantidad}' class="product-quantity" />
                        <button id='delete-cart-item-${producto.id}' >Borrar </button>
                    </div>
                </div>
            </div>
        `
    })
    actualizarTotal();
    
}

function actualizarTotal() {
    let total = carrito.reduce((acc, producto)=>{ 
        return acc + producto.precio 
    },0)
 
    totalCarrito.innerHTML = `$${total}`
}

function ActualizarCantidadCarrito () {
    let total = 0

    carrito.forEach((item) => {
        total = total + item.cantidad;
    })

    totalProducto.textContent = total;
}
