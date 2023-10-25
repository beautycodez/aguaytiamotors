// Prueba 
const h1 = document.querySelector("h1");
h1.style.color = "red"

const productSection = document.querySelector(".productos");

const url = "https://beautycodez.github.io/aguaytiamotors/data/data.json"

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data.products);
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

            pictureElement.appendChild(imgElement);
            sectionElement.appendChild(pictureElement);

            productSection.appendChild(sectionElement);
        })
        
}
