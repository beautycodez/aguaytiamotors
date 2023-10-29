
const productSection = document.querySelector(".productos");

const url = "https://beautycodez.github.io/aguaytiamotors/data/data2.json"
let productData = []

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
        console.log("not work")
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
apiFetch();

function displayResults (data){

        data.forEach((product) =>{
            const sectionElement = document.createElement("section");

                const pictureElement = document.createElement("picture");
                    const imgElement = document.createElement("img");

            imgElement.setAttribute("src",product.link);
            imgElement.setAttribute("alt", "my product");
            imgElement.setAttribute("class", "productImgs");

            pictureElement.setAttribute("class", "productPictures")
            sectionElement.setAttribute("class", "productSections")

            pictureElement.appendChild(imgElement);
            sectionElement.appendChild(pictureElement);

            productSection.appendChild(sectionElement);
        })
        
}




// ------------------------ hamburguer--------------------------------------------------------------
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const primaryNav= document.querySelector(".navBar");
function toggleMenu() {
    primaryNav.classList.toggle("open")
}
hamburgerBtn.addEventListener("click", toggleMenu);




// -----------------------Display Name---------------------------------------------------------------------------
const selectProduct = document.querySelector("#select-product");
function displayName(data) {
  // creo un nuevo array con todos los nombres de los productos.
  let myNewArrayProductsName = []
  data.forEach(product => {
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
  arraySinRepetir.forEach(nombre => {
    const option = document.createElement("option");
    option.innerHTML = nombre;

    selectProduct.appendChild(option);
  })
}




// -----------------------------------------------------------filtrar los productos por nombre---------------------
function filtrarProductos() {
  console.log(productData);
  const productosFiltrados = productData.filter(product => product.nombre == selectProduct.value);
  console.log(selectProduct.value); // Test
  console.log(productosFiltrados); // Test

  // Limpia el contenedor de productos antes de agregar nuevos elementos
  productSection.innerHTML = "";

  productosFiltrados.forEach(producto => {
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
}


// ---------------------------------------------------showslide-------------------------
let slideIndex = 1;
var slides = document.querySelector(".mySlides");
var intervalId;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    clearInterval(intervalId);
    showSlides(slideIndex += n);
    startInterval();
}

// Thumbnail image controls
function currentSlide(n) {
    clearInterval(intervalId);
    showSlides(slideIndex = n);
    startInterval();
}
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
//   delete all the slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
//   show only one slide
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

function startInterval() {
    intervalId = setInterval(function() {
      plusSlides(1);
    }, 8000);
  }

  startInterval();