
const productSection = document.querySelector(".productos");

const url = "https://beautycodez.github.io/aguaytiamotors/data/data.json"
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
    // const productosFiltrados = data.products.filter(product => product.nombre == selectProduct.value)
    // console.log(data.products);
    // console.log(selectProduct.value);
    // console.log(productosFiltrados);

    // const sectionProductA = document.createElement("section");
    // const h3ProductA = document.createElement("h3");

    // const pictureProductA = document.createElement("picture");
    //   const imgProductA = document.createElement("img");
    //   imgProductA.setAttribute()
}
