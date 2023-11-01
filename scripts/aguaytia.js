const url = "https://beautycodez.github.io/aguaytiamotors/data/data.json";
let productData = [];
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const primaryNav = document.querySelector(".navBar");
const selectProduct = document.querySelector("#select-product");

const productSection = document.querySelector(".productos");
const pageNumbers = document.querySelector(".page-numbers");

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data.products);
      displayName(data.products);
      productData = [...data.products];
    } else {
      console.log("not work");
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  data.forEach((product) => {
    const sectionElement = document.createElement("section");

    const pictureElement = document.createElement("picture");
    const imgElement = document.createElement("img");

    imgElement.setAttribute("src", product.link);
    imgElement.setAttribute("alt", "my product");
    imgElement.setAttribute("class", "productImgs");

    pictureElement.setAttribute("class", "productPictures");
    sectionElement.setAttribute("class", "productSections");

    pictureElement.appendChild(imgElement);
    sectionElement.appendChild(pictureElement);

    productSection.appendChild(sectionElement);
  });
  var productSections = document.querySelectorAll(".productSections")
  console.log(productSections);
  displayPage(1, productSections);
}

// ------------------------ hamburguer--------------------------------------------------------------

function toggleMenu() {
  primaryNav.classList.toggle("open");
}
hamburgerBtn.addEventListener("click", toggleMenu);

// -----------------------Display Name---------------------------------------------------------------------------
function displayName(data) {
  // creo un nuevo array con todos los nombres de los productos.
  let myNewArrayProductsName = [];
  data.forEach((product) => {
    myNewArrayProductsName.push(product.nombre);
  });

  // filtro los nombres repetidos y creo una lista con los nombres.
  console.log(myNewArrayProductsName);
  const nombresUnicos = {};
  const arraySinRepetir = [];

  for (let nombre of myNewArrayProductsName) {
    if (!nombresUnicos[nombre]) {
      arraySinRepetir.push(nombre);
      nombresUnicos[nombre] = true;
    }
  }

  // agregar los nombres de los productos como opciones del Select element
  arraySinRepetir.forEach((nombre) => {
    const option = document.createElement("option");
    option.innerHTML = nombre;

    selectProduct.appendChild(option);
  });
}

// -----------------------------------------------------------filtrar los productos por nombre---------------------
function filtrarProductos() {
  console.log(productData);
  const productosFiltrados = productData.filter(
    (product) => product.nombre == selectProduct.value
  );
  console.log(selectProduct.value); // Test
  console.log(productosFiltrados); // Test
  // Limpia el contenedor de productos antes de agregar nuevos elementos
  productSection.innerHTML = "";

  productosFiltrados.forEach((producto) => {
    const sectionProductA = document.createElement("section");
    sectionProductA.setAttribute("class", "productSections");

    const h3ProductA = document.createElement("h3");
    h3ProductA.innerHTML = producto.nombre;

    const pictureProductA = document.createElement("picture");
    pictureProductA.setAttribute("class", "productPictures");
    const imgProductA = document.createElement("img");
    imgProductA.setAttribute("class", "productImgs");
    imgProductA.setAttribute("src", producto.link);
    pictureProductA.appendChild(imgProductA);

    sectionProductA.appendChild(pictureProductA);
    sectionProductA.appendChild(h3ProductA);

    productSection.appendChild(sectionProductA);
  });
  var filterProductSections = document.querySelectorAll(".productSections");
  displayPage(1, filterProductSections)
}

// ---------------------------------------------------showslide-------------------------
let slideIndex = 1;
var slides = document.querySelector(".mySlides");
var intervalId;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  clearInterval(intervalId);
  showSlides((slideIndex += n));
  startInterval();
}

// Thumbnail image controls
function currentSlide(n) {
  clearInterval(intervalId);
  showSlides((slideIndex = n));
  startInterval();
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  //   delete all the slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  //   show only one slide
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function startInterval() {
  intervalId = setInterval(function () {
    plusSlides(1);
  }, 8000);
}

startInterval();
// ----------------------------------------------dividir los productos en varias pestañas---------------

function displayPage(page, productSections) {
  const productsPerPage = 10; // Puedes ajustar la cantidad de productos por página según tus necesidades.
  const totalPages = Math.ceil(productSections.length / productsPerPage);
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  

  productSections.forEach((product, index) => {
    if (index >= start && index < end) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
  // Genera los números de página
  // pageNumbers.innerHTML = ""
  pageNumbers.innerHTML = ""; // Limpia el contenedor de números de página antes de agregar nuevos elementos
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement("span");
    pageNumber.textContent = i;
    pageNumber.addEventListener("click", () => displayPage(i, productSections));
    pageNumbers.appendChild(pageNumber);
  }
}

// Muestra la primera página por defecto

// Tu código JavaScript aquí
