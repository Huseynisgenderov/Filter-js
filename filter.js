const data = [
  {
    id: 1,
    name: "Invinca Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71PheBE+IQL._AC_UX466_.jpg",
    price: 250,
    cat: "Luxury",
  },
  {
    id: 1,
    name: "Invinca Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/81La7n76pxL._AC_UY606_.jpg",
    price: 100,
    cat: "Casually",
  },
  {
    id: 1,
    name: "Timex Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71qforFXzmL._AC_UY606_.jpg",
    price: 300,
    cat: "Luxury",
  },
  {
    id: 1,
    name: "Breitling Superocean",
    img: "https://m.media-amazon.com/images/I/61fy5-XCQIL._AC_UX679_.jpg",
    price: 160,
    cat: "Sport",
  },
  {
    id: 1,
    name: "Superocean Men's",
    img: "	https://m.media-amazon.com/images/I/61fy5-XCQIL._AC_UX679_.jpg",
    price: 150,
    cat: "Dress",
  },
  {
    id: 1,
    name: "Pro Diver",
    img: "	https://m.media-amazon.com/images/I/71wFhkGIl9L._AC_UY606_.jpg",
    price: 200,
    cat: "Sport",
  },
];

const productContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".categories");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
  productContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
        <div class="product">
            <img src=${product.img} alt="" />
            <span class="name">${product.name}</span>
            <span class="priceText">${product.price}$</span>
          </div> 
        `
    )
    .join("");
};
displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else displayProducts(data);
});

const setCatogories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];
  categoriesContainer.innerHTML = categories
    .map(
      (cat) => `
  <span class="cat">${cat}</span>`
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;
    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCat));
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};
setPrices();

setCatogories();
