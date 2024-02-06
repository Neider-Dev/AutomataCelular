// let cells = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

let intervalo = 200;

function crearArregloInicial(Filas, Columnas) {
  let inicial = [];
  for (let f = 0; f < Filas; f++) {
    let Fila = [];
    for (let c = 0; c < Columnas; c++) {
      Fila.push(0);
    }
    inicial.push(Fila);
  }
  return inicial;
}

let cells = crearArregloInicial(100, 100);

function dibujarCuadricula(Filas, Columnas) {
  const canva = document.createElement('section');
  canva.setAttribute('class', 'Canva');
  const contenedor = document.getElementById('Contenedor');
  contenedor.insertAdjacentElement('beforeend', canva);
  for (let i = 0; i < Filas; i++) {
    const Fila = document.createElement('div');
    Fila.setAttribute('class', 'Fila');
    for (let j = 0; j < Columnas; j++) {
      const celula = document.createElement('div');
      celula.setAttribute('id', `cel_${i}_${j}`);
      celula.classList.add('Celula', 'CelulaMuerta');
      Fila.insertAdjacentElement('beforeend', celula);
    }
    canva.insertAdjacentElement('beforeend', Fila);
  }
  asignarEventoClick();
}

dibujarCuadricula(cells.length, cells[0].length);
pintarCelulas(cells);

function asignarEventoClick() {
  document.querySelectorAll('.Celula').forEach((el) => {
    el.addEventListener('click', (e) => {
      pintarPorClicks(e);
    });
  });
}

function pintarPorClicks(e) {
  const id = e.target.getAttribute('id');
  let id_array = id.split('_');
  let fila = parseInt(id_array[1]);
  let columna = parseInt(id_array[2]);
  if (cells[fila][columna] == 0) cells[fila][columna] = 1;
  else cells[fila][columna] = 0;
  pintarCelulas(cells);
}

function pintarCelulas(arreglo) {
  for (let _j = 0; _j < arreglo.length; _j++) {
    for (let _k = 0; _k < arreglo[_j].length; _k++) {
      let celula = document.getElementById(`cel_${_j}_${_k}`);
      if (arreglo[_j][_k] == 1) {
        celula.classList.replace('CelulaMuerta', 'CelulaViva');
      } else {
        celula.classList.replace('CelulaViva', 'CelulaMuerta');
      }
    }
  }
}

function calcularCelulas(celulas) {
  let cellsFuturo = [];
  let vecinas = 0;
  celulas.forEach((filaCelulas, iterador_Fila) => {
    let Fila = [];
    filaCelulas.forEach((celula, iterador_Columna) => {
      vecinas = revisarAdyacentes(celulas, iterador_Fila, iterador_Columna);
      if (celula === 0) {
        if (vecinas === 3) {
          Fila.push(1);
        } else {
          Fila.push(0);
        }
      } else {
        if (vecinas == 2 || vecinas == 3) {
          Fila.push(1);
        } else {
          Fila.push(0);
        }
      }
    });
    cellsFuturo.push(Fila);
  });
  return cellsFuturo;
}

function revisarAdyacentes(arreglo, Fila, Columna) {
  //NOTE: En el arreglo primero es el eje y
  let contadorVivas = 0;
  if (Columna != 0) {
    for (let _i = 0; _i < 3; _i++) {
      if (Fila - 1 + _i > -1 && Fila - 1 + _i < arreglo.length) {
        if (arreglo[Fila - 1 + _i][Columna - 1] == 1) {
          contadorVivas++;
        }
      }
    }
  }

  if (Columna < arreglo[0].length) {
    for (let _i = 0; _i < 3; _i++) {
      if (Fila - 1 + _i > -1 && Fila - 1 + _i < arreglo.length) {
        if (arreglo[Fila - 1 + _i][Columna + 1] == 1) {
          contadorVivas++;
        }
      }
    }
  }

  if (Fila != 0) {
    if (arreglo[Fila - 1][Columna] == 1) {
      contadorVivas++;
    }
  }

  if (Fila < arreglo.length - 1) {
    if (arreglo[Fila + 1][Columna] == 1) {
      contadorVivas++;
    }
  }
  return contadorVivas;
}

let main;
let bandera = 1; //NOTE: Esta bandera impide que se repita la inicializacion del intervalo.

botonIniciar = document.getElementById('BtnIniciar');
botonIniciar.onclick = () => {
  if (bandera == 1) {
    main = setInterval(() => {
      pintarCelulas(cells);
      cells = calcularCelulas(cells);
    }, intervalo);
    bandera = 0;
  }
};

botonPausar = document.getElementById('BtnPausar');
botonPausar.onclick = () => {
  clearInterval(main);
  bandera = 1;
};
