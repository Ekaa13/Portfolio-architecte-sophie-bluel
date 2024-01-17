const gallery = document.querySelector(".gallery");


//création fonction avec  async await qui sont des delay, pour retourner le tableau des works
async function fetchWorks() {
const response = await fetch("http://localhost:5678/api/works")
const responseJson = await response.json();
console.log(responseJson)
}
fetchWorks();


//création fonction pour retourner le tableau des catégories
async function fetchCategories() {
    const responseCategories = await fetch("http://localhost:5678/api/categories")
    const responseCategoriesJson = await responseCategories.json();
    console.log(responseCategoriesJson)
}
fetchCategories();


async function main() {
  displayWorks();
  generateWorks();
}

async function displayWorks() {
  fetchWorks().then((data) => {
    data.forEach((work) => {
      generateWorks(work);
    });
  });
}


function generateWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}