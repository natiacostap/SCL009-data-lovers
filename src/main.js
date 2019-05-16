 // /* Manejo del DOM */
 const arrBtn = ['Fire', 'Bug', 'Water', 'Fighting', 'Poison', 'Ground', 'Fairy', 'Rock', 'Ghost', 'Ice', 'Electric', 'Steel', 'Dragon', 'Flying', 'Grass', 'Dark', 'Psychic', 'Normal'];
 let card = '';
 let modal = '';
 let btnType = '';
 let btnWeak = '';
 let btnFilters = '';
 let buscadorNombre = '';
 google.load('visualization', '1.0', { 'packages': ['corechart'] });
 window.onload
 fetch('https://raw.githubusercontent.com/natiacostap/SCL009-data-lovers/master/src/data/pokemon/pokemon.json').then((response) => {
     return response.json();
 }).then((data) => {
     const listaPokemones = data.pokemon;
     //
     let datatype = listaPokemones;
     //
     const imprimir = (arr) => {
         createCards(arr);
         createModal(arr);
         createBtnOfWeak(arr);
         createBtnOfType(arr);
         createEvolution(arr);
     };
     // creamos tarjetas          
     const createCards = (arr) => {
         arr.forEach((element) => {
             card += `<div class="card">

                     <img class="${element.type[0]}" alt="foto-pokemon" class="card-img-top" src=${element.img}>
                     <div class = "card-body">
                         <h5 class = "card-title">
                             ${element.name}
                         </h5>
                         <p class="card-text">
                             Nº${element.num}
                         </p>
                         <a class = "btn btn-primary btn-tarjeta" data-target="#modal${element.id}" data-toggle="modal" href="#">
                         <i class="fas fa-angle-double-right"></i></i><span class="descripcion">Ver</span>
                         </a>
                     </div>
                 </div>`;
         })
         document.getElementById('tarjetas').innerHTML = card;
     }
     // creamos modales de tarjetas
     const createModal = (arr) => {
         arr.forEach((element) => {
             if (element.candy_count === undefined) {
                 element.candy_count = 'No come candies'
             }
             if (element.egg === 'Not in Eggs') {
                 element.egg = 'No nace en huevos'
             }
             modal += `<div aria-hidden="true" aria-labelledby="exampleModalCenterTitle" class="modal fade" id="modal${element.id}" role="dialog" tabindex="-1">
                     <div class="modal-dialog modal-dialog-centered" role="document">
                         <div class="modal-content">
                             <div class="modal-header ${element.type[0]}">
                                 <ul>
                                     <li>
                                     </li>
                                 </ul>
                                 <h4 class="modal-title" id="exampleModalLongTitle">
                                 ${element.name} N° ${element.num} 
                                 </h4>
                                 <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                                     <span aria-hidden="true">
                                         ×
                                     </span>
                                 </button>
                             </div>
                             <div class="modal-body">
                                 <div class="grid">
                                     <div class="row row__modal">
                                         <div class="col-md-4">
                                             <img alt="pokemon" class="imagen-pokemon" src="${element.img}"/>
                                         </div>
                                         <div class="col-md-8 pokeinfo">
                                             <ul>
                                                 <li>
                                                     <i class="fas fa-arrows-alt-v">
                                                     </i><span class="descripcion">Altura: </span>
                                                     ${element.height}
                                                 </li>
                                                 <li>
                                                     <i class="fas fa-weight "> 
                                                     </i><span class="descripcion">Peso:</span>
                                                     ${element.weight}
                                                 </li>
                                                 <li>
                                                     <i class="fas fa-candy-cane"> 
                                                     </i><span class="descripcion">Candy:</span>
                                                     ${element.candy_count}
                                                 </li>
                                                 <li>
                                                     <i class="fas fa-egg">
                                                     </i> <span class="descripcion">Huevos:</span>
                                                     ${element.egg}
                                                 </li>
                                             </ul>
                                         </div>
                                     </div>
                                     <h5>
                                         Evoluciones:
                                     </h5>
                                     <div class="row container" id="evoluciones${element.id}">
                                         <p class="container p__nombre">
                                           - No tiene más evoluciones -
                                         </p>
                                     </div>
                                     <div class="tipos__debilidades">
                                        <h5>
                                             Tipos:
                                         </h5>
                                         <div id="type${element.id}">
                                         </div>
                                     </div>
                                     <div class="tipos__debilidades">
                                        <h5>
                                            Debilidades:
                                         </h5>
                                         <div id= "weak${element.id}"> 
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>`
         })
         document.getElementById('modal').innerHTML = modal;
     }
     // creamos botones de debilidades dentro de modal
     const createBtnOfWeak = (arr) => {
         arr.forEach((element) => {
             element.weaknesses.forEach((weakness) => {
                 btnWeak += `<button value="${weakness}"  class="btnWeakModal btn btn-primary ${weakness} filter-list" href="#">
                             ${weakness}
                         </button>`;
             });
             document.getElementById(`weak${element.id}`).innerHTML = btnWeak;
             btnWeak = '';
         })
         let x = document.getElementsByClassName('btnWeakModal');
         for (let i = 0; i < x.length; i++) {
             x[i].addEventListener('click', () => {
                 let valor = x[i].value;
                 datatype = window.filterWeak(listaPokemones, valor);
                 vaciar();
                 imprimir(datatype);
                 document.getElementById('calculo-agregado').innerHTML = '';
             })
         }
     }
     // creamos botones de tipos dentro de modal
     const createBtnOfType = (arr) => {
         arr.forEach((element) => {
             element.type.forEach((element) => {
                 btnType += `<button value="${element}" class="btnTypeModal btn btn-primary filter-list ${element}" href="">
                             ${element}
                         </button>`;
             });
             document.getElementById(`type${element.id}`).innerHTML = btnType;
             btnType = '';
         })
         let x = document.getElementsByClassName('btnTypeModal');
         for (let i = 0; i < x.length; i++) {
             x[i].addEventListener('click', () => {
                 let valor = x[i].value;
                 datatype = window.filterType(listaPokemones, valor);
                 vaciar();
                 imprimir(datatype);
                 let porcentaje = window.percent(datatype);
                 document.getElementById('calculo-agregado').innerHTML = `<p id="porcentaje" class="${valor}">El ${porcentaje}% de los pokemones de la región Kanto son de tipo ${valor}.</p>`;
             })
         }
     }
     // crear botones de filtros dinamicamente
     const createBtnOfFilters = (arr) => {
         arr.forEach((element) => {
             btnFilters += ` <li id="${element}" value="${element}" class="btn btn-primary filter-list ${element}" href="">
                                             ${element}
                         </li>`;
         })
         printFilterType(arrBtn);
     };
     //imprimir resultado de filtrado por tipos
     const printFilterType = (arr) => {
         document.getElementById('botonesFiltros').innerHTML = btnFilters;
         arr.forEach((element) => {
             document.getElementById(`${element}`).addEventListener('click', () => {
                 datatype = window.filterType(listaPokemones, `${element}`);
                 vaciar();
                 imprimir(datatype);
                 let porcentaje = window.percent(datatype);
                 document.getElementById('calculo-agregado').innerHTML = `<p id="porcentaje" class="${element}">El ${porcentaje}% de los pokemones de la región Kanto son de tipo ${element}.</p>`;
                 document.getElementById('noFound').innerHTML = '';

                });
         })
     }
     //imprimir evolution
     let evolution = '';
     const createEvolution = (arr) => {
         const arrayEvolution = arr.filter(element => (element.next_evolution));
         arrayEvolution.forEach((element) => {
             let nombre;
             element.next_evolution.forEach(element => {
                 nombre = element.name;
                 let dataNombre = window.filterName(listaPokemones, nombre);
                 evolution += `<div class="col-md-6 col-sm-6">
                <p class="p__nombre">${element.name}:</p><center><button class="pokemones" value="${element.name}" href=""><img src=${dataNombre[0].img}></button></center>
            </div>
           `
             });
             document.getElementById(`evoluciones${element.id}`).innerHTML = evolution;
             evolution = '';
         });
         let x = document.getElementsByClassName('pokemones');
         for (let i = 0; i < x.length; i++) {
             x[i].addEventListener('click', () => {
                 let valor = x[i].value;
                 datatype = window.filterName(listaPokemones, valor);
                 vaciar();
                 imprimir(datatype);
             })
         }
     };
     //
     imprimir(listaPokemones);
     createBtnOfFilters(arrBtn);
     //
     const vaciar = () => {
         card = '';
         modal = '';
         btnType = '';
         btnWeak = '';
         evolution = '';
     }
     //ordenamos la data
     let a = document.getElementById('order');
     let ordered;
     a.addEventListener('change', () => {
         let option = a.value;
         if (option === 'AZ') {
             ordered = window.sortData(datatype, 'name', 'asc');
         } else if (option === 'ZA') {
             ordered = window.sortData(datatype, 'name', 'desc');
         } else if (option === 'NumUp') {
             ordered = window.sortData(datatype, 'num', 'asc');
         } else if (option === 'NumDown') {
             ordered = window.sortData(datatype, 'num', 'desc');
         }
         vaciar();
         imprimir(ordered);
     }, false);
         //buscar pokemones por nombre o numero
         document.getElementById('btnBuscar').addEventListener("click", (event) => {
             event.preventDefault();
             buscadorNombre = document.getElementById('buscador').value;
             if (isNaN(buscadorNombre) === true) {
                 buscadorNombre = MaysPrimera(buscadorNombre.toLowerCase());
                 let dataName = window.filterName(listaPokemones, buscadorNombre);
                 vaciar();
                 imprimir(dataName);
                 document.getElementById('noFound').innerHTML = '';
                 if(dataName == ''){
                    error = `<p id="error">Lo sentimos,"${buscadorNombre}" no fue encontrado.</p>`;
                    document.getElementById('noFound').innerHTML = error;
                    document.getElementById('calculo-agregado').innerHTML = '';
                 }
             } else {
                 let dataNum = window.filterNum(listaPokemones, buscadorNombre);
                 vaciar();
                 imprimir(dataNum);
                 document.getElementById('noFound').innerHTML = '';
             }
        });
             document.getElementById('calculo-agregado').innerHTML = '';
             document.getElementById('buscador').value = '';
             document.getElementById('buscador').focus();
         });
         //converir primera letra de string en mayuscula
         function MaysPrimera(string) {
             return string.charAt(0).toUpperCase() + string.slice(1);
         }
         document.getElementById('calculo-agregado').innerHTML = '';
         document.getElementById('buscador').value = '';
         document.getElementById('buscador').focus();
     
     //converir primera letra de string en mayuscula
     function MaysPrimera(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
     }
     //recargar la pagina
     document.getElementById('reload').addEventListener('click', () => {
         location.reload();
     })
     // modal de informacion
     document.getElementById('btnModalInfo').addEventListener('click', () => {
         let modalInfo = `<div aria-hidden="true" aria-labelledby="exampleModalScrollableTitle" class="modal fade" id="modalAbout" role="dialog" tabindex="-1">
                         <div class="modal-dialog modal-dialog-scrollable" role="document">
                             <div class="modal-content">
                                 <div class="modal-header">
                                     <h5 class="modal-title" id="exampleModalScrollableTitle">
                                     <i class="fas fa-info-circle">
                                     </i>
                                         PokéDex Info
                                     </h5>
                                     <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                                         <span aria-hidden="true">
                                             ×
                                         </span>
                                     </button>
                                 </div>
                                 <div class="modal-body">
                                     En esta página podras encontrar informacion sobre los Pokémones de la región Kanto. Podrás hacer busquedas por nombre o ID de Pokémon y realizar un filtro de Pokémones por tipo.
                                 </div>
                             </div>
                         </div>
                     </div>`;

         document.getElementById('modalInfo').innerHTML = modalInfo;
     })

     //grafico con pokemones por tipo
     google.charts.setOnLoadCallback(drawChart);          function drawChart() {
        var data = google.visualization.arrayToDataTable([key, value])
        var options = {
             title : 'Data por años',
             vAxis: {title: 'Valor'},
             hAxis: {title: 'Año'},
             seriesType: 'bars',
             series: {10: {type: 'line'}}
           };
        var chart = new google.visualization.ComboChart(document.getElementById("charts"));
        chart.draw(data, options);          }

