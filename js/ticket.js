const tbody = document.getElementById("tbody");
const dire = document.getElementById("dire");
const trTotal = document.getElementById("total")
var parrafoDir = document.getElementById("parrafoDir");
var parrafoNombre = document.getElementById("parrafoNombre");
var parrafoTelefono = document.getElementById("parrafoTelefono");
var divCliente = document.getElementById("divCliente");
var currentDire = "";
var currentTel = "";
var currentNombre = ""
var currentCliente =
{
    "nombre": "",
    "direccion": "",
    "telefono": "",
}

var currentTicket = [];
var ultimoTicket = []
var cant = 1;
var regNum = 0;
var burguers = [
    {
        "name": "AntMan",
        "id": "a",
        "description": "",
        "cost": 270,
        "costInterface": 270,
        "currency": "$"
    },
    {
        "name": "Hukl",
        "id": "h",
        "description": "",
        "cost": 380,
        "costInterface": 380,
        "currency": "$"
    },
    {
        "name": "Capitan America",
        "id": "c",
        "description": "",
        "cost": 365,
        "costInterface": 365,
        "currency": "$"
    },
    {
        "name": "Iron Man",
        "id": "i",
        "description": "",
        "cost": 395,
        "costInterface": 395,
        "currency": "$"
    },
    {
        "name": "4 Fantastic",
        "id": "4",
        "description": "",
        "cost": 395,
        "costInterface": 363955,
        "currency": "$"
    },
    {
        "name": "Marvel",
        "id": "m",
        "description": "",
        "cost": 595,
        "costInterface": 525,
        "currency": "$"
    },
    {
        "name": "ConAros",
        "id": "ar",
        "description": "",
        "cost": 50,
        "costInterface": 50,
        "currency": "$"
    },
    {
        "name": "ConBravas",
        "id": "br",
        "description": "",
        "cost": 50,
        "costInterface": 50,
        "currency": "$"
    },
    {
        "name": "Bravas",
        "id": "pbr",
        "description": "",
        "cost": 300,
        "costInterface": 300,
        "currency": "$"
    },
    {
        "name": "Aros",
        "id": "par",
        "description": "",
        "cost": 300,
        "costInterface": 300,
        "currency": "$"
    },
    {
        "name": "Papas Fritas",
        "id": "pp",
        "description": "",
        "cost": 245,
        "costInterface": 245,
        "currency": "$"
    },
    {
        "name": "PapasChedar",
        "id": "ppc",
        "description": "",
        "cost": 0,
        "costInterface": 0,
        "currency": "$"
    },
    {
        "name": "PapasChedarBacon",
        "id": "ppcb",
        "description": "",
        "cost": 0,
        "costInterface": 0,
        "currency": "$"
    },
    {
        "name": "lata",
        "id": "lata",
        "description": "",
        "cost": 50,
        "costInterface": 50,
        "currency": "$"
    },
    {
        "name": "15% de descuento",
        "id": "d",
        "description": "",
        "cost": 0,
        "costInterface": "15%",
        "currency": "$"
    },

]

function imprimir() {
    saveTicket(currentTicket)
    window.print();
}


function showTicket() {
    let date = new Date();
    let htmlContentToAppend = "";
    for (let i = 0; i < currentTicket.length; i++) {
        let ticket = currentTicket[i];
        htmlContentToAppend +=
            `            
    <tr>
    <td class="cantidad">`+ cant + `</td>
    <td class="producto">`+ ticket.burguer.name + `   <br> ` + ticket.notas + `  </td>

    <td class="precio">`+ ticket.burguer.currency + ticket.burguer.costInterface + `</td>
     
    <td><button class="oculto-impresion" onclick="eliminarItem(`+ i + `)" >x</button></td>
    </tr>

    
    
    

`
    }

    tbody.innerHTML = htmlContentToAppend;
    document.getElementById("fecha").innerHTML = ` <small>`+ date.getDate() + `-` + (parseInt(date.getMonth())+1)  + `-` + date.getFullYear() + ` ` + date.getHours() + `:` + date.getMinutes() + `:` + date.getSeconds() + `</small>`
    total = sumarTotal(currentTicket)

    trTotal.innerHTML = `
<td></td>
<td>TOTAL</td>
<td id="total">$`+ total + `

</td>

`



}
function eliminarItem(i) {
    //pregunto al usuario si esta seguro
    var option = confirm("¿Esta seguro que deseaz eliminar el articulo?");
    //si option es true elimino el articulo, sino no hace nada
    if (option) {

        currentTicket.splice(i, 1)

        console.log(currentTicket[i])

        showTicket()
    }
}

//fin show ticket


function agregarProd(id, notas) {
    if (notas == undefined) {
        notas = ""
    }
    console.log(notas)

    let htmlContentToAppend = "";
    var precioTotal;

    for (let i = 0; i < burguers.length; i++) {
        let burguer = burguers[i];

        if (burguer.id === id) {

            currentTicket.push({ notas, burguer })
            console.log(currentTicket)
    
            showTicket()
        



        }


    }


}
//fin agregar prod

function sumarTotal(array) {
    var total = 0
    for (let i = 0; i < array.length; i++) {
        var a = array[i]
        var costo = parseInt(a.burguer.cost)
        total = total + costo

        if (a.burguer.id == "d") {

            total = Math.round(total * 0.85)
                  
        }
    }
    return (total);

}


function saveTicket(ticket) {
    ultimoTicket = []
   
    ultimoTicket.push({ ticket });
    ultimoTicket.push({ currentCliente })
    regNum++
    localStorage.setItem(regNum, JSON.stringify(ultimoTicket));
}

function cargarSelect() {
    var prodSelect = document.getElementById("idProd");

    for (let i = 0; i < burguers.length; i++) {
        let burguer = burguers[i];

        var option = document.createElement("option");
        option.value = burguer.id
        option.text = burguer.name
        prodSelect.appendChild(option)

    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    cargarSelect()


    document.getElementById("agregar").addEventListener("click", function () {
        idProd = document.getElementById("idProd").value
        inputNotas = document.getElementById("inputNotas").value
        if (inputNotas == undefined) {
            inputNotas = ""
        }
        agregarProd(idProd, inputNotas)


    });

    document.getElementById("nuevo").addEventListener("click", function () {

        currentTicket = []
        currentCliente = []
        tbody.innerHTML = ""
        trTotal.innerHTML = ""
        parrafoDir.innerHTML = ""
        parrafoNombre.innerHTML = ""
        parrafoTelefono.innerHTML = ""


    });

    document.getElementById("botonDir").addEventListener("click", function () {
        var direccion = document.getElementById("inputDir").value

        parrafoDir.innerHTML = direccion
        currentCliente.direccion = direccion;


    });
    document.getElementById("botonNombre").addEventListener("click", function () {

        // var contenido = document.createTextNode(document.getElementById("inputNombre").value)
        // parrafoNombre.appendChild(contenido)
        // console.log(contenido)
        // currentCliente.nombre = contenido;

        var nombre = document.getElementById("inputNombre").value
        parrafoNombre.innerHTML = nombre
        currentCliente.nombre = nombre;

    });
    document.getElementById("botonTelefono").addEventListener("click", function () {
        // document.getElementById("parrafoTelefono").innerHTML = '';

        // var telefono = document.createTextNode(document.getElementById("inputTelefono").value)
        // parrafoTelefono.appendChild(telefono)
        // currentCliente.telefono = telefono;

        var telefono = document.getElementById("inputTelefono").value
        parrafoTelefono.innerHTML = telefono
        currentCliente.telefono = telefono;

    });



});



/// ultimoTicket[ultimoTicket.length-1].currentCliente.nombre

// function showLastTicket(ultimoTicket) {

//     // parrafoNombre.appendChild(ultimoTicket[ultimoTicket.length-1].nombre)
//     // parrafoTelefono.appendChild(ultimoTicket[ultimoTicket.length-1].telefono)
//     let htmlContentToAppend = ""
//     //voy hasta el length -1 porque en la ultima posicion esta el cliente
//     //los datos del cliente estan en: ultimoTicket.[length-1]

//     for (let i = 0; i < ultimoTicket.length - 1; i++) {
//         let ticket = ultimoTicket[i];

//         htmlContentToAppend +=
//             `
//             <tr>
//             <td class="cantidad">`+ cant + `</td>
//             <td class="producto">`+ ticket.name + `   <br> ` + ticket.notas + `  </td>

//             <td class="precio">`+ ticket.currency + ticket.cost + `</td>
//             </tr>

//         `
//     }

//     tbody.innerHTML = htmlContentToAppend;
//     total = sumarTotalUltimo(ultimoTicket)

//     trTotal.innerHTML = `
//         <td></td>
//         <td>TOTAL</td>
//         <td id="total">$`+ total + `</td>`

//     //cliente
//     let cliente = ultimoTicket[ultimoTicket.length - 1]

//     document.getElementById("divCliente").innerHTML = `

//         <p id="parrafoDir" class="centrado">`+ cliente.currentCliente.direccion.data + `
//         </p>
//        <p id="parrafoNombre" class="centrado">
//        `+ cliente.currentCliente.nombre.data + `
//         </p>
//        <p id="parrafoTelefono" class="centrado">
//        `+ cliente.currentCliente.telefono.data + `    </p>`

// }


// function sumarTotalUltimo(array) {
//     var total = 0
//     for (let i = 0; i < array.length - 1; i++) {
//         var a = array[i]
//         var costo = parseInt(a.cost)
//         total = total + costo
//         if (a.id == "descuento") {
//             total = Math.round(total * 0.85)
//         }
//     }
//     return (total);

// }
