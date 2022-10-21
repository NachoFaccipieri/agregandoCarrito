/*
class Libro{
    constructor(nombre, autor, precio, premios, paginas, categorias){
        this.nombre = nombre;
        this.autor = autor;
        this.precio = precio;
        this.premios = premios;
        this.paginas = paginas;
        this.categorias = categorias;
    }

    sumarIva(){
        return (this.precio * 1.21);
    }
}
*/





let prods = document.getElementById("prods");
const carrito = [];


function mostrarProductos(){
    for(const libro of vecLibros){
        prods.innerHTML += `
        <div class="card col-md-2 m-2 p-auto">
            <div class="img-wrapper">
                <img src="${libro.foto}" class="card-img-bottom" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-text">${libro.nombre} (${libro.id})</h5>
                <p class="card-text">$ ${libro.precio}</p>
                <a href="#" id="btn${libro.id}" class="btn btn-primary">Comprar</a>
            </div>
        </div>
        `;
    }

    //Eventos

    vecLibros.forEach((libro) => {
        //Escucho el evento de apretar click. Creo una funcion anonima para poder llamar a la funcion "agregar al carrito" dado que no se pueden pasar parametros desde "add event listener"
        document.getElementById(`btn${libro.id}`).addEventListener("click",function(){
            agregarAlCarrito(libro);
        });
    })
}


function agregarAlCarrito(libro){
    carrito.push(libro);
    console.table(carrito);
    let precioTotal = carrito.reduce((acumulador, lib) => acumulador+lib.precio,0)
    document.getElementById("tablaBody").innerHTML += `
    <tr>
        <td>${libro.id}</td>
        <td>${libro.nombre}</td>
        <td>${libro.precio}</td>
    </tr>
    
    `;
    document.getElementById("total").innerText = "Total a pagar: $"+precioTotal;
}

mostrarProductos();



//---------> MAIN <-----------

/*
const vecLibros=[];
//const vecCategoriasTotales=[];
let nombre, autor,categoria, premio;
let precioLibro, indic=0, paginas, importado;

*/

//Este vector de objetos lo hice para que no sea tan tedioso probar las funciones ya que cada vez que cambiaba algo y lo quería probar, tenía que volver a ingresar libros manualmente. El problema es que para que funcione hay que comentar varias líneas: --> línea 22 --> línea 45 --> línea 149 y 150 --> línea 207 a 225
/*
const vecLibros = [
    {nombre: 'Harry Potter', autor:'J. K. Rowling', precio: 7800},
    {nombre: 'El poder del ahora', autor:'Eckhart Tolle', precio: 4200},
    {nombre: 'El imperio de los algoritmos', autor:'Cecilia Danesi', precio: 4300},
    {nombre: 'Voces de Chernobil', autor:'Alexiévich Svetlana', precio: 5800},
] */

/*

let salir = false;

while(!salir){
    let eleccion=prompt("Ingrese un número según lo que desee hacer\n1) Ingresar un nuevo libro\n2) Eliminar Libro\n3) Imprimir la lista de libros\n4) Imprimirla ordenada alfabeticamente\n5) Imprimirla ordenada según su precio\n6) Búsqueda de libros\n7) Finalizar");
    switch (eleccion) {
        case '1':
            lectura();

            break;

        case '2':
            if(vecLibros.length !== 0){
                let eliminar = prompt("Nombre completo del libro a eliminar");
                let index = vecLibros.findIndex(nom => nom.nombre === eliminar);
                alert(index);
                if (index >= 0) {
                    vecLibros.splice(index, 1);
                    alert("Libro eliminado");
                } else {
                    alert("El libro no existe");
                }
                
            }else
                alert("Lista de libros vacía");
            break;

        case '3':
            if(vecLibros.length !== 0){
                imprimir();
            }else
                alert("Lista de libros vacía");
            break;

        case '4':
            if(vecLibros.length !== 0){
                ordenarAlf(vecLibros);
            }else
                alert("Lista de libros vacía");
            break;

        case'5':
            if(vecLibros.length !== 0){
                ordenarPrecio(vecLibros);
            }else
                alert("Lista de libros vacía");
            break;

        case '6':
            if(vecLibros.length !== 0){
                const buscar = prompt("1) Para buscar un libro por su nombre\n2) Para buscar libros mayores a determinado precio\n3) Para buscar libros menores a determinado precio");
                switch(buscar) {
                    case '1':
                        buscarLibroNom(vecLibros);
                        break;
                    case '2':
                        buscarLibroMayor(vecLibros);
                        break;
                    case '3':
                        buscarLibroMenor(vecLibros);
                        break;
                    default:
                        break;
                }
            }else
                alert("Lista de libros vacía");
            break;
        case '7':
            salir = true;
            break;
    }
}





*/




function lectura(){

    //Leo el nombre del libro. Si se ingresa un texto vacío, se vuelve a pedir el nombre
    nombre = prompt("Ingrese el nombre del libro (para finalizar la carga escriba FIN): ");
    while(nombre.length === 0){
        nombre = prompt("Ingrese el nombre del libro (para finalizar la carga escriba FIN): ");
    }

    while(nombre !== "FIN"){

        //Busco coincidencias en el vector con el nombre del libro ingresado para saber si ya está en la lista.
        const comparacion = vecLibros.find((comp) => comp.nombre === nombre);
        if (comparacion){
            alert("Libro ya existente");
            break;
        }else{
            //Leo el autor del libro. Si se ingresa un texto vacío, se vuelve a pedir el autor
            autor = prompt("Ingrese el autor del libro: ");
            while(autor.length === 0){
                alert("Ingrese el autor del libro: ");
                autor = prompt("Ingrese el autor del libro: ");
            }

            //leo el precio del libro sin impuestos. Si se ingresa algo distinto a un número, vuelvo a leer
            precioLibro=parseFloat(prompt("Ingrese el precio del libro: "));
            while (isNaN(precioLibro)){
                alert("Error. No se ingresó un número.");
                precioLibro=parseFloat(prompt("Ingrese el precio del libro: "));
            }
            importado = getImportado();
            precioLibro = productoImportado(importado, precioLibro);
    

            const vecPremios = [];
            //leo los premios que ha recibido el libro. En caso no haber recibido ninguno, se ingresa enter y finaliza la lectura
            premio = prompt("Ingrese los premios ganados por el libros (para finalizar, oprima 'enter'): ");
            while(premio.length !== 0){
                vecPremios.push(premio);
                premio = prompt("Ingrese los premios ganados por el libros (para finalizar, oprima 'enter'): ");
            }

            //leo la cantidad de páginas que tiene el libro
            paginas=parseInt(prompt("Ingrese la cantidad de páginas del libro: "));
            while (isNaN(paginas)){
                alert("Error. No se ingresó un número.");
                paginas=parseFloat(prompt("Ingrese la cantidad de páginas del libro: "));
            }


            const vecCategorias = [];
            //leo las categorías a las que pertenece el libro (autoayuda, economía, ciencia, etc.)
            categoria = prompt("Ingrese a qué categorías pertenece el libro (escriba FIN para finalizar): ");
            while(categoria !== "FIN"){
                vecCategorias.push(categoria);

                //Si la categoría no se ingresó, guardo la categoría en un vector
                /*
                const cat = vecCategoriasTotales.find((el) => el === categoria);
                if (cat != undefined){
                    vecCategoriasTotales[vecCategoriasTotales.indexOf(cat)].push(categoria);
                }else{
                    vecCategoriasTotales.push(categoria);
                }
                */ //-------> La idea sería poder tener una opción que me imprima todas las categorías ingresadas y todos los libros pertenecientes a ellas teniendo en cuenta que un libro puede pertenecer a más de una categoría, por ejemplo: "Autoayuda: libro1, libro2, libro3 \n Ciencia Ficcion: libro2, libro4, libro5". No tuve tiempo para pensarlo mucho, me agarró en semana de parciales pero está en proceso.
                
                categoria = prompt("Ingrese a qué categorías pertenece el libro (escriba FIN para finalizar): ");
            }

            //Cargo al vector de libros, un nuevo libro recién leído, recién salido del horno
            vecLibros.push(new Libro(nombre,autor,precioLibro,vecPremios,paginas,vecCategorias));


            //Leo el nombre del libro. Si se ingresa un texto vacío, se vuelve a pedir el nombre
            nombre = prompt("Ingrese el nombre del libro (para finalizar la carga escriba FIN): ");
            while(nombre.length === 0){
                alert("Ingrese el nombre del libro: ");
                nombre = prompt("Ingrese el nombre del libro (para finalizar la carga escriba FIN): ");
            }
        }
    }
}


function imprimir(){
    console.log(vecLibros);
    for (const libro1 of vecLibros){
        console.log("Nombre del libro y autor: "+libro1.nombre+" "+libro1.autor);
        /* */
        console.log("Precio: "+libro1.sumarIva().toFixed(2));
        console.log("Premios: ");
        if(libro1.premios.length !== 0){
            for (const Premio of libro1.premios){
                console.log("--> "+Premio);
            }

        }else{
            console.log("El libro no tiene premios");
        }
        
        console.log("Paginas: "+libro1.paginas);

        console.log("Categorias: ");
        for (const cat of libro1.categorias){
            console.log("--> "+cat);
        }
        /* */
    }
}


function ordenarAlf(libros){
    const opcion = prompt("Para ordenar de forma ascendente presionar S, caso contrario será de forma descendente.");
    if (opcion === 'S'){
        libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
        console.log(libros);
    } else {
        libros.sort((a, b) => b.nombre.localeCompare(a.nombre));
        console.log(libros);
    }
}

function ordenarPrecio(libros){
    const opcion = prompt("Para ordenar de forma ascendente presionar S, caso contrario será de forma descendente.");
    if (opcion === 'S'){
        libros.sort((a, b) => a.precio - b.precio);
        console.log(libros);
    } else {
        libros.sort((a, b) => b.precio - a.precio);
        console.log(libros);
    }
}

function buscarLibroNom(libros){
    const buscar = prompt("Ingrese el nombre completo del libro para saber si se encuentra: ");
    const comparacion = libros.find( (nom) => nom.nombre === buscar);
    if (comparacion != undefined){
        console.log(comparacion);
        return comparacion;
    }else{
        alert("Nombre no encontrado");
    }
}

function buscarLibroMayor(libros){
    let buscar = prompt("Se buscarán libros desde: ");
    let resultado = libros.filter((elem) => elem.precio >= buscar );
    console.log(JSON.stringify(resultado));
    // console.log("Lista de libros con precios mayores a: $"+buscar+"\n"+resultado); Quise hacerlo de esta forma pero el mensaje que me devuelve es: "Lista de libros con precios mayores a: *precio* [object Object]. Así me dijeron que use JSON"
}

function buscarLibroMenor(libros){
    const buscarPrecio = parseFloat(prompt("Se buscarán libros desde $0 hasta: "));
    const resultado = libros.filter((elem) => elem.precio <= buscarPrecio );
    console.log(JSON.stringify(resultado));
    //console.log("Lista de libros con precios menores a: $"+buscarPrecio+resultado);
}



//Función en la que pregunto si un libro es importado o no. 
//En caso de ser importado debe ingresarse una S, en caso una contrario una N. Si no se ingresa una S o una N
//queda en un loop hasta que se ingrese una u otra.
function getImportado(){
    let importado= prompt("El producto es importado? S/N");
    let bool = false;

    while (!bool){
        if (importado === 'S'){
            bool = true;
            return importado;
        }else if(importado === 'N'){
            bool = true;
            return importado;
        }
        importado = prompt("El producto es importado?\nIngrese S si es importado\nN en caso contrario");
    }
}



//Función que calcula el precio del libro recibiendo dos parámetros: Si es importado y su precio sin impuestos. 
//Si es importado, se utiliza la función "Calcular precio importado". En caso contrario, sólo se calcula el iva.
function productoImportado (importado, precio){
    if (importado == "S"){
        let precioImportado = calcularPrecioImportado(precio);
        return precioImportado;
    }else{
        if(importado == "N"){
        alert("El producto no es importado. Sólo se calculará el IVA");
        return precio;
        }
    }
}



//Función en la que se calcula el precio del libro en caso de ser importado
function calcularPrecioImportado(precio){

    if(precio > 15000){
        return precio * 1.5;
    }else{
        return precio *1.15;
    }
}


//Función que sirve para aplicar descuentos. En caso de que no haya, no se aplica ningún descuento
/*
function aplicarDescuento(){
    let desc = prompt("Descuentos: \n1) Jubilados\n2) Estudiantes\n3) Efectivo\nE) Sin descuento");
    switch (desc){
        case '1':
            alert("Se aplicará descuento de jubilados");
            return 0.70;
        case '2':
            alert("Se aplicará descuento de estudiantes");
            return 0.85;
        case '3':
            alert("Se aplicará descuento en efectivo");
            return 0.80;
        default:
            alert("No se aplicará descuento");
            return 1;
    }
} */