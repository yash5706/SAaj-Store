/* =========================
   PRODUCTS
========================= */

const products = [];


// 46 clothing products - ₹250

for (let i = 0; i < 46; i++) {

    let image;

    if (i === 0) {

        image = "images/cloth.jpeg";

    } else {

        image = `images/cloth (${i}).jpeg`;

    }


    products.push({

        category: "clothes",

        price: 250,

        image: image,

        sizes: ["S", "M", "L", "XL"]

    });

}

// 6 clothing products - ₹300 each
products.push(
    {
        category: "clothes",
        price: 300,
        image: "images/cloth (51).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        category: "clothes",
        price: 300,
        image: "images/cloth (52).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        category: "clothes",
        price: 300,
        image: "images/cloth (53).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        category: "clothes",
        price: 300,
        image: "images/cloth (54).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        category: "clothes",
        price: 300,
        image: "images/cloth (55).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        category: "clothes",
        price: 300,
        image: "images/cloth (56).jpeg",
        sizes: ["S", "M", "L", "XL"]
    }
);
// 4 clothing products - ₹350

products.push(

    {
        category: "clothes",
        price: 350,
        image: "images/cloth (47).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        category: "clothes",
        price: 350,
        image: "images/cloth (48).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        category: "clothes",
        price: 350,
        image: "images/cloth (49).jpeg",
        sizes: ["S", "M", "L", "XL"]
    },

    {
        category: "clothes",
        price: 350,
        image: "images/cloth (50).jpeg",
        sizes: ["S", "M", "L", "XL"]
    }

);



/* =========================
   CART
========================= */

let cart = [];

let selectedCategory = "all";

let quickProductIndex = null;



/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    const noProducts =
        document.getElementById("noProducts");

    const searchValue =
        document
            .getElementById("priceSearch")
            .value
            .trim();


    container.innerHTML = "";


    /* JEWELLERY */

    if (selectedCategory === "jewellery") {

        container.innerHTML = `

            <div class="coming-soon">

                <div class="coming-icon">
                    💎
                </div>

                <h2>
                    Jewellery Collection Coming Soon
                </h2>

                <p>
                    We're preparing something beautiful for you.
                </p>

                <strong>
                    Stay tuned!
                </strong>

            </div>

        `;

        noProducts.style.display = "none";

        return;
    }



    /* COSMETICS */

    if (selectedCategory === "cosmetics") {

        container.innerHTML = `

            <div class="coming-soon">

                <div class="coming-icon">
                    💄
                </div>

                <h2>
                    Cosmetics Collection Coming Soon
                </h2>

                <p>
                    Our beauty collection is arriving soon.
                </p>

                <strong>
                    Stay tuned!
                </strong>

            </div>

        `;

        noProducts.style.display = "none";

        return;
    }



    /* FILTER */

    const filteredProducts =
        products.filter(function(product) {

            const categoryMatch =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            const priceMatch =
                searchValue === "" ||
                product.price.toString() === searchValue;


            return categoryMatch && priceMatch;

        });



    /* NO PRODUCTS */

    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";

        return;
    }


    noProducts.style.display = "none";



    /* DISPLAY */

    filteredProducts.forEach(function(product) {

        const productIndex =
            products.indexOf(product);


        const productBox =
            document.createElement("div");


        productBox.className = "product";


        productBox.innerHTML = `

            <div
                class="product-image-wrapper"
                onclick="openQuickView(${productIndex})">

                <img
                    src="${product.image}"
                    alt="SAaj Product">

                <div class="image-view-icon">
                    🔍
                </div>

            </div>


            <div class="price">
                ₹${product.price}
            </div>


            <select
                class="size-select"
                id="size-${productIndex}">

                <option value="">
                    Select Size
                </option>

                <option value="S">
                    S
                </option>

                <option value="M">
                    M
                </option>

                <option value="L">
                    L
                </option>

                <option value="XL">
                    XL
                </option>

            </select>


            <button
                class="add-cart"
                onclick="addToCart(${productIndex})">

                Add to Cart

            </button>


            <button
                class="whatsapp-btn"
                onclick="orderProduct(${productIndex})">

                💬 Order on WhatsApp

            </button>

        `;


        container.appendChild(productBox);

    });

}



/* =========================
   QUICK VIEW
========================= */

function openQuickView(index) {

    quickProductIndex = index;


    const product =
        products[index];


    document.getElementById("quickImage").src =
        product.image;


    document.getElementById("quickPrice").innerText =
        "₹" + product.price;


    document.getElementById("quickSize").value =
        "";


    const quickView =
        document.getElementById("quickView");


    quickView.style.display =
        "flex";


    document.body.style.overflow =
        "hidden";

}



/* =========================
   CLOSE QUICK VIEW
========================= */

function closeQuickView() {

    document.getElementById("quickView").style.display =
        "none";


    document.body.style.overflow =
        "auto";


    quickProductIndex = null;

}



/* =========================
   CLOSE QUICK VIEW
   WHEN CLICK OUTSIDE
========================= */

document
    .getElementById("quickView")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeQuickView();

        }

    });



/* =========================
   QUICK VIEW ADD TO CART
========================= */

function addQuickToCart() {

    if (quickProductIndex === null) {

        return;
    }


    const selectedSize =
        document.getElementById("quickSize").value;


    if (selectedSize === "") {

        alert("Please select a size.");

        return;
    }


    const index =
        quickProductIndex;


    const existingProduct =
        cart.find(function(item) {

            return (
                item.productIndex === index &&
                item.size === selectedSize
            );

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            productIndex: index,

            price: products[index].price,

            image: products[index].image,

            size: selectedSize,

            quantity: 1

        });

    }


    updateCart();


    showToast();


    closeQuickView();

}



/* =========================
   QUICK VIEW WHATSAPP
========================= */

function orderQuickProduct() {

    if (quickProductIndex === null) {

        return;
    }


    const selectedSize =
        document.getElementById("quickSize").value;


    if (selectedSize === "") {

        alert("Please select a size.");

        return;
    }


    const product =
        products[quickProductIndex];


    const message =
        "Hello SAaj! I want to order this product.%0A%0A" +

        "Price: Rs. " +
        product.price +

        "%0ASize: " +
        encodeURIComponent(selectedSize);


    window.open(

        "https://wa.me/919764063326?text=" +
        message,

        "_blank"

    );

}



/* =========================
   ADD TO CART
========================= */

function addToCart(index) {

    const sizeSelect =
        document.getElementById("size-" + index);


    if (!sizeSelect) {

        alert("Size selector not found.");

        return;
    }


    const selectedSize =
        sizeSelect.value;


    if (selectedSize === "") {

        alert("Please select a size.");

        return;
    }


    const existingProduct =
        cart.find(function(item) {

            return (
                item.productIndex === index &&
                item.size === selectedSize
            );

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            productIndex: index,

            price: products[index].price,

            image: products[index].image,

            size: selectedSize,

            quantity: 1

        });

    }


    updateCart();


    showToast();

}



/* =========================
   TOAST
========================= */

function showToast() {

    const toast =
        document.getElementById("cartToast");


    if (!toast) {

        return;
    }


    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 2000);

}



/* =========================
   DIRECT WHATSAPP
========================= */

function orderProduct(index) {

    const sizeSelect =
        document.getElementById("size-" + index);


    if (!sizeSelect) {

        alert("Size selector not found.");

        return;
    }


    const selectedSize =
        sizeSelect.value;


    if (selectedSize === "") {

        alert("Please select a size.");

        return;
    }


    const message =
        "Hello SAaj! I want to order this product.%0A%0A" +

        "Price: Rs. " +
        products[index].price +

        "%0ASize: " +
        encodeURIComponent(selectedSize);


    window.open(

        "https://wa.me/919764063326?text=" +
        message,

        "_blank"

    );

}



/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    let totalItems = 0;

    let total = 0;


    cartItems.innerHTML = "";


    cart.forEach(function(item, index) {

        totalItems += item.quantity;


        total +=
            item.price *
            item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="SAaj Product">


                <div class="cart-details">

                    <div class="cart-price">
                        ₹${item.price}
                    </div>


                    <div class="cart-size">

                        Size:
                        <strong>
                            ${item.size}
                        </strong>

                    </div>


                    <div class="quantity-box">

                        <button
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})">

                            +

                        </button>

                    </div>


                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})">

                        🗑 Remove

                    </button>

                </div>

            </div>

        `;

    });


    cartCount.innerText =
        totalItems;


    cartTotal.innerText =
        total;

}



/* =========================
   REMOVE
========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}



/* =========================
   INCREASE
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}



/* =========================
   DECREASE
========================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}



/* =========================
   OPEN CART
========================= */

function openCart() {

    document.getElementById("cartBox").style.display =
        "block";

}



/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document.getElementById("cartBox").style.display =
        "none";

}



/* =========================
   ORDER CART
========================= */

function orderCart() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    const name =
        document
            .getElementById("customerName")
            .value
            .trim();


    const phone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    const address =
        document
            .getElementById("customerAddress")
            .value
            .trim();


    const city =
        document
            .getElementById("customerCity")
            .value
            .trim();


    const pincode =
        document
            .getElementById("customerPincode")
            .value
            .trim();



    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert(
            "Please fill in all customer details."
        );

        return;
    }



    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }



    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return;
    }



    let message =
        "Hello SAaj! I want to order:%0A%0A";


    let total = 0;



    cart.forEach(function(item, index) {

        const itemTotal =
            item.price *
            item.quantity;


        message +=

            "Product " +
            (index + 1) +

            "%0A" +

            "Price: Rs. " +
            item.price +

            "%0A" +

            "Size: " +
            encodeURIComponent(item.size) +

            "%0A" +

            "Quantity: " +
            item.quantity +

            "%0A" +

            "Item Total: Rs. " +
            itemTotal +

            "%0A%0A";


        total += itemTotal;

    });



    message +=

        "Total: Rs. " +
        total +

        "%0A%0A" +

        "Customer Details:%0A" +

        "Name: " +
        encodeURIComponent(name) +

        "%0APhone: " +
        encodeURIComponent(phone) +

        "%0AAddress: " +
        encodeURIComponent(address) +

        "%0ACity: " +
        encodeURIComponent(city) +

        "%0APincode: " +
        encodeURIComponent(pincode);



    window.open(

        "https://wa.me/919764063326?text=" +
        message,

        "_blank"

    );


    alert(
        "Your order details have been sent to WhatsApp. Thank you for shopping with SAaj! ❤️"
    );

}



/* =========================
   PRICE SEARCH
========================= */

document
    .getElementById("priceSearch")
    .addEventListener(
        "input",
        function() {

            displayProducts();

        }
    );



/* =========================
   CATEGORY FILTER
========================= */

function filterCategory(category, button) {

    selectedCategory =
        category;


    document
        .querySelectorAll(".category-btn")
        .forEach(function(btn) {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    displayProducts();

}



/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeQuickView();

            closeCart();

        }

    }
);



/* =========================
   INITIAL DISPLAY
========================= */

displayProducts();