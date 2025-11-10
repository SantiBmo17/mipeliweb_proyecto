const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

const searchIcon = document.getElementById("searchIcon");
const searchContainer = document.getElementById("searchContainer");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

//BUSCADOR

searchIcon.addEventListener("click", () => {
  searchContainer.classList.toggle("hidden");
  resultsDiv.innerHTML = "";
});

searchButton.addEventListener("click", buscarPelicula);

async function buscarPelicula() {
  const query = document.getElementById("searchInput").value;
  if (!query) return alert("Escribe algo para buscar");

  const response = await fetch(`http://127.0.0.1:8000/api/peliculas?titulo=${encodeURIComponent(query)}`);
  const data = await response.json();

  resultsDiv.innerHTML = "";

  if (data.mensaje) {
    resultsDiv.innerHTML = `<p>${data.mensaje}</p>`;
  } else {
    data.forEach(p => {
      const item = document.createElement("div");
      item.innerHTML = `<strong>${p.titulo}</strong> (${p.anio})`;
      resultsDiv.appendChild(item);
    });
  }
}

//ARROW
arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    //const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});
