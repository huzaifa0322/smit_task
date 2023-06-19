
var container = document.getElementById('container');
var chips = document.getElementById('chips');
var products = [];
var filteredProducts = []; // Store the currently filtered products
var debounceTimeout; // Store the timeout ID for debounce

async function getPorducts() {
  const productsResponse = await fetch('https://dummyjson.com/products')
    .then(res => res.json())

  products = productsResponse.products;
  filteredProducts = products; // Initialize filtered products with all products

  displayProducts(filteredProducts);

  var categories = getCategories();
  displayCategoryChips(categories);

  var chipButtons = document.getElementsByClassName('chip');
  for (var i = 0; i < chipButtons.length; i++) {
    chipButtons[i].addEventListener('click', handleClick);
  }
}

function displayProducts(products) {
  container.innerHTML = '';
  products.forEach(data => {
    const card = `<div class='card'>
      <img class='img' src=${data.thumbnail} />
      <h4>${data.title}</h4>
      <br>    
      <h4>${data.price}</h4>
    </div>`;
    container.innerHTML += card;
  });
}

function getCategories() {
  var categories = [];
  products.forEach(obj => {
    if (!categories.includes(obj.category)) {
      categories.push(obj.category);
    }
  });
  return categories;
}

function displayCategoryChips(categories) {
  chips.innerHTML = '';

  // Add the "All" chip button
  const allChip = `<button class="chip active" data-category="All"><span>All</span></button>`;
  chips.innerHTML += allChip;

  // Add the remaining category chip buttons
  categories.forEach(cat => {
    const chip = `<button class="chip" data-category="${cat}"><span>${cat}</span></button>`;
    chips.innerHTML += chip;
  });
}

function handleClick(event) {
  var category = event.target.dataset.category;
  if (category === 'All') {
    filteredProducts = products; // Set filtered products to all products
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }
  displayProducts(filteredProducts);
}

function fetchProducts() {
  var searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', handleSearch);
}

function debounce(func, delay) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
}

function handleSearch() {
  debounce(filterProducts, 300);
}

function filterProducts() {
  var searchBar = document.getElementById('searchBar');
  var searchQuery = searchBar.value.toLowerCase().trim();

  filteredProducts = products.filter(product => {
    var title = product.title.toLowerCase();
    var category = product.category.toLowerCase();
    return title.includes(searchQuery) || category.includes(searchQuery);
  });

  displayProducts(filteredProducts);
}

getPorducts();
fetchProducts();