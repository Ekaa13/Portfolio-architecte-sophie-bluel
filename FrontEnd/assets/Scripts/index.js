const gallery = document.querySelector(".gallery");
const filtersContainer = document.querySelector(".filtres");
const filtreBtn = document.querySelectorAll(".filtres-btn");

let works = [];
let categories = [];
let selectedFilter = null;
// Récupération des projets

function fetchWork() {
    fetch("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {
            works = data
            const Works = data;
            displayWorks(Works);
        })
};
fetchWork();
// Affichage des projets
function displayWorks(i) {
    i.forEach(work => {
        const figureElement = document.createElement("figure");
        gallery.appendChild(figureElement);
        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;
        figureElement.appendChild(imgElement);
        const figCaptionElement = document.createElement("figcaption");
        figCaptionElement.textContent = work.title;
        figureElement.appendChild(figCaptionElement);
    });
}
// Récupération des catégories
fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        categories = data;
        const filters = data;
//Création d'une div des différentes catégories
        filters.forEach(filterName => {
            const filterElement = document.createElement("div");
            filterElement.className = "filtres-btn";
            filtersContainer.appendChild(filterElement);
            filterElement.textContent = filterName.name;

            filterElement.addEventListener("click", () => {
// Suppression de la classe "filtres-btn-selected" lorsque pas sélectionnés 
                if (selectedFilter) {
                    selectedFilter.classList.remove("filtres-btn-selected");
                }

// Ajout de la classe "filtres-btn-selected" lorsque les boutons sont sélectionnés
                filterElement.classList.add("filtres-btn-selected");
                selectedFilter = filterElement;

// Affichage de la galerie en fonction du filtre sélectionné 
                gallery.innerHTML = "";
                const filtreWorks = works.filter(function (category) {
                    return category.categoryId === filterName.id;
                });
                displayWorks(filtreWorks);
            });
        });
    });

// Création et affichage du bouton filtre "tous" 
function createAll() {
    const filterTous = document.createElement("div");
    filterTous.className = "filtres-btn";
    filterTous.setAttribute("id", "tous");
    filterTous.textContent = "Tous";
    filtersContainer.appendChild(filterTous);

    filterTous.addEventListener("click", () => {
// Suppression de la classe "filtres-btn-selected" sur les boutons non sélectionnés 
        if (selectedFilter) {
            selectedFilter.classList.remove("filtres-btn-selected");
        }

// Ajout de la classe "btn-selected" au bouton "tous" 
        filterTous.classList.add("filtres-btn-selected");
        selectedFilter = filterTous;

        gallery.innerHTML = "";
        fetchWork();
    });
}
createAll();


//Mode Edition**//

// Affichage des fonctionnalités d'édition quand l'utilisateur est connecté // 

const token = localStorage.getItem("token");
const editBanner = document.querySelector(".edit-banner");
const modifier = document.querySelector(".modifier");
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const projectTitle = document.querySelector(".projets-titre")

function adminMode() {
    console.log("Token:", token);
    if (token !== null) {
        console.log("Admin mode active");
        editBanner.style.display = "flex";
        modifier.style.display = "flex";
        filtersContainer.style.display = "none";
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
        projectTitle.style.display = "none";
    } else {
        console.log("Admin mode inactive");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    adminMode();
});

// Retour à la page initiale lors de la déconnexion //

function adminLogout() {
    editBanner.style.display = "none";
    modifier.style.display = "none";
    filtersContainer.style.display = "flex";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    projectTitle.style.display = "flex";
}


logoutBtn.addEventListener("click", () => {
    console.log("Logout button clicked");
    localStorage.removeItem("token");
    adminLogout();
});
