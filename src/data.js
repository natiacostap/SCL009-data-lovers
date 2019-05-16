/* Manejo de data */
const filterType = (arr, condition) => {
    const arrType = arr.filter(el => {
        return el.type.includes(condition);
    });
    return arrType;
}
window.filterType = filterType;
//filtrar por debilidad
const filterWeak = (arr, condition) => {
    const arrWeak = arr.filter(el => {
        return el.weaknesses.includes(condition);
    })
    return arrWeak;
}
window.filterWeak = filterWeak;
//filtramos por nombre
const filterName = (arr, condition) => {
    const arrName = arr.filter(el => {
        return el.name.includes(condition);
    })
    return arrName;
}
window.filterName = filterName;
//filtrar por Num
const filterNum = (arr, condition) => {
    const arrNum = arr.filter(el => {
        return el.num.includes(condition);
    })
    return arrNum;
}
window.filterNum = filterNum;
// ordenar data
const sortData = (data, sortBy, sortOrder) => {
    let sortPokemones = [];
    if (sortBy == "name") {
        if (sortOrder == "asc") {
            sortPokemones = data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder == "desc") {
            sortPokemones = data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
        }
        return sortPokemones;
    }
    if (sortBy == "num") {
        if (sortOrder == "asc") {
            sortPokemones = data.sort((a, b) => a.num.localeCompare(b.num));
        } else if (sortOrder == "desc") {
            sortPokemones = data.sort((a, b) => a.num.localeCompare(b.num)).reverse();
        }
        return sortPokemones;
    }
}
window.sortData = sortData;

//calculo agregado
// const percentType = (arr, condition) => {
//     const arrPercentType = arr.filter(el => {
//         return el.type.include(condition)
//     });
//     return arrPercentType;
// }
// window.percentType;

const percent = (arr) => {
    let result = parseInt(arr.length/ 151 * 100);
    return result; 
}
window.percent = percent;