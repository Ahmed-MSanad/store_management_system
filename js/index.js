// all Inputs
var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var ProductCategoryInput = document.getElementById('productCategory');
var ProductDescInput = document.getElementById('productDescription');
var ProductImgInput = document.getElementById('ProductImg');
var ProductSearchInput = document.getElementById('ProductSearchInput');

// For Sure:
// console.log(productNameInput, productPriceInput, ProductCategoryInput, ProductDescInput, ProductImgInput);

// All buttons
var addProductBtn = document.getElementById('addProductBtn');
var updateBtn = document.getElementById('updateBtn');

// Put the products here
var placeHere = document.getElementById('placeHere');

// invalidFromAlert
var invalidFromAlert = document.getElementById('invalidFromAlert');

// List of all products
var productList;

// Global Code Starts >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if(localStorage.getItem('productList')){
    productList = JSON.parse(localStorage.getItem('productList'));
    displayProducts(productList);
}
else{
    productList = [];
}
clearData();

// Global Code ends <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function checkProduct(){
    return (
        productNameInput.value !== '' &&
        productPriceInput.value !== '' &&
        ProductCategoryInput.value !== '' &&
        ProductDescInput.value !== '' &&
        !productNameInput.classList.contains('is-invalid') && 
        !productPriceInput.classList.contains('is-invalid') && 
        !ProductCategoryInput.classList.contains('is-invalid') && 
        !ProductDescInput.classList.contains('is-invalid')
    );
}

function addProduct(){
    if(!checkProduct()){ // invalid Product
        invalidFromAlert.classList.remove('d-none');
    }
    else{
        invalidFromAlert.classList.add('d-none');
        var newProduct = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: ProductCategoryInput.value,
            desc: ProductDescInput.value,
            // img: '../images/' + ProductImgInput.value.substring(12),
            img: 'images/' + ProductImgInput.files[0]?.name,
        };

        productList.push(newProduct);
        localStorage.setItem('productList',JSON.stringify(productList));
        clearData();
        displayProducts(productList);
        resetInputs();
    }
}

function clearData(){
    productNameInput.value = '';
    productPriceInput.value = '';
    ProductDescInput.value = '';
    ProductCategoryInput.value = '';
    ProductImgInput.value = '';
}

function displayProducts(products){
    var container = '';
    for(var i = 0 ; i < products.length ; i++){
        container += `
        <div class="col-md-4 col-lg-3 p-3">
            <div class="card border-0">
                <img src="${products[i].img}" class="w-100" alt="...">
                <div class="card-body">
                    <h4 class="card-price">${products[i].category}</h4>
                    <h5 class="card-title">${products[i].name}</h5>
                    <h5 class="card-price">${products[i].price}</h5>
                    <p class="card-text">${products[i].desc}</p>
                    <button class="btn btn-outline-danger w-100" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-outline-primary mt-2 w-100" onclick="setFormForUpdate(${i})">Update</button>
                </div>
            </div>
        </div>
        `
    }
    placeHere.innerHTML = container;
}

function deleteProduct(indexDeleted){
    productList.splice(indexDeleted,1);
    localStorage.setItem('productList',JSON.stringify(productList));
    displayProducts(productList);
}

function setFormForUpdate(indexUpdated){
    // simply we can delete then when update -> call the addProduct function => BUT we want the updated product to be in it's same place.
    // deleteProduct(indexUpdated);

    productNameInput.value = productList[indexUpdated].name;
    productPriceInput.value = productList[indexUpdated].price;
    ProductDescInput.value = productList[indexUpdated].desc;
    ProductCategoryInput.value = productList[indexUpdated].category;

// save the Index of the product to be updated as an attribute in update button
    updateBtn.setAttribute('productIndex',indexUpdated);

    addProductBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

function updateImplementation(){
    // addProduct();
    var indexUpdated = Number(updateBtn.getAttribute('productIndex'));
    
    productList[indexUpdated].name = productNameInput.value;
    productList[indexUpdated].price = productPriceInput.value;
    productList[indexUpdated].desc = ProductDescInput.value;
    productList[indexUpdated].category = ProductCategoryInput.value;
    productList[indexUpdated].img = '../images/' + ProductImgInput.value.substring(12);

    clearData();
    localStorage.setItem('productList',JSON.stringify(productList));
    displayProducts(productList);

    addProductBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    resetInputs();
}

function searchProduct(){
    var searchWhat = ProductSearchInput.value;
    var searchedProducts = [];
    for(var i = 0 ; i < productList.length ; i++){
        if(productList[i].name.toLowerCase().includes(searchWhat.toLowerCase())){
            searchedProducts.push(productList[i]);
        }
    }
    displayProducts(searchedProducts);
}

function validateProductName(element){
    var regex = {
        productName: /^[A-Z]\w{3,5}\s?\w{0,10}$/,
        productPrice: /^([1-9][0-9]{3,4}|100000)$/,
        productCategory: /^(Tv|Electronics|Mobiles|Tablets|Pc|Laptop)$/,
        productDescription: /^.{4,300}$/,
    };

    // console.log(regex[element.id]);

    if(regex[element.id].test(element.value)){
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        element.nextElementSibling.classList.add('d-none');
    }
    else{
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
        element.nextElementSibling.classList.remove('d-none');
    }
}

function resetInputs(){
    productNameInput.classList.remove('is-valid');
    productPriceInput.classList.remove('is-valid');
    ProductCategoryInput.classList.remove('is-valid');
    ProductDescInput.classList.remove('is-valid');
}