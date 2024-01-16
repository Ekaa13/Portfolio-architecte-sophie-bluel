const gallery = document.querySelector(".gallery");


//création fonction avec  async await qui sont des delay, pour retourner le tableau des works
async function fetchWorks() {
const response = await fetch("http://localhost:5678/api/works")
//incorpo tableau
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


async function displayWorks() {
    //création d'une constante works quui appelle fw
  const works = await fetchWorks()
  //chaque travail on appelle la fonction generateworks 
  works.forEach((work) => {
    generateWorks(work)

  }) 
}

displayWorks()

function generateWorks(work) {
    //on créer une figure pour chaque élément
    const figure = document.createElement(figure);
    gallery.appendChild(figure);
    //idem images
    const img = document.createElement(img);
    //là on va prendre les images et le titre dans l'api
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);
    //idem figcaption, on relie la fc au titre de l'image
    const figcaption = document.createElement(figcaption);
    figcaption.textContent = work.title;
    figure.appendChild(figcaption)
};