window.onload = function() {
  var fichas = document.querySelectorAll(".ficha");
  var heroesIniciales = document.querySelectorAll('.ficha[data-tipo="heroe"]').length;

  var contador = document.createElement("p");
  contador.textContent = "Héroes visibles: " + heroesIniciales;
  document.body.appendChild(contador);

  var botonFiltro = document.createElement("button");
  botonFiltro.textContent = "Mostrar sólo héroes";
  document.body.appendChild(botonFiltro);

  var soloHeroes = false;

  botonFiltro.addEventListener("click", function() {
    soloHeroes = !soloHeroes;
    var visibles = 0;

    for (var ficha of fichas) {
      if (ficha.getAttribute("data-tipo") === "villano") {
        ficha.style.display = soloHeroes ? "none" : "";
      } else {
        if (soloHeroes) {
          ficha.classList.add("resaltado");
        } else {
          ficha.classList.remove("resaltado");
        }
        visibles++;
      }
    }

    contador.textContent = "Héroes visibles: " + visibles;
    botonFiltro.textContent = soloHeroes ? "Mostrar todos" : "Mostrar sólo héroes";
  });

  for (var ficha of fichas) {
    ficha.addEventListener("mouseover", function() {
      this.style.backgroundColor = "#3a3a3a";
    });
    ficha.addEventListener("mouseout", function() {
      this.style.backgroundColor = "";
    });
  }

  var imagenes = document.querySelectorAll(".ficha img");
  for (var imagen of imagenes) {
    imagen.classList.add("borde-redondeado");
  }

  function cargarFraseDelDia(callback) {
    fetch("https://catfact.ninja/fact")
      .then(function(respuesta) { return respuesta.json(); })
      .then(function(datos) { callback(datos.fact); })
      .catch(function(error) { console.log("No se pudo cargar la frase:", error); });
  }

  var botonFrase = document.createElement("button");
  botonFrase.textContent = "Frase del día";
  document.body.appendChild(botonFrase);

  botonFrase.addEventListener("click", function() {
    cargarFraseDelDia(function(frase) {
      var p = document.createElement("p");
      p.textContent = frase;
      document.body.appendChild(p);
    });
  });

  function guardarFavorito(nombre) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        if (nombre) {
          resolve(nombre + " guardado como favorito");
        } else {
          reject("No se pudo guardar: falta el nombre");
        }
      }, 1000);
    });
  }

  for (var ficha of fichas) {
    var botonFav = document.createElement("button");
    botonFav.textContent = "⭐ Favorito";
    ficha.appendChild(botonFav);

    botonFav.addEventListener("click", function() {
      var fichaContenedor = this.closest(".ficha");
      var nombreEl = fichaContenedor ? fichaContenedor.querySelector(".nombre") : null;
      var nombreTexto = nombreEl ? nombreEl.textContent : "";

      guardarFavorito(nombreTexto)
        .then(function(mensaje) { console.log(mensaje); })
        .catch(function(error) { console.log(error); });
    });
  }
};
