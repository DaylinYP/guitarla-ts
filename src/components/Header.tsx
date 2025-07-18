// src/components/Header.tsx

import type { CartItem, GuitarID } from "../types" 

// FUNCTION SIGNATURE
export type HeaderProps = {
    cart: CartItem[] 
    removeFromCart: (id: GuitarID) => void 
    increaseQuantity: (id: GuitarID) => void 
    decreaseQuantity: (id: GuitarID) => void 
    clearCart: () => void 
    isEmpty: boolean
    cartTotal: number 
}

/*Esto crea un componente y export default es para que lo lea en app.jsx*/
export default function Header({cart = [], removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }: HeaderProps){ /* Se añade un valor por defecto [] a 'cart' para evitar 'undefined'*/
/*Un componente siempre lleva return() y lo que esta dentro se muestra en pantalla*/
return(

    //<h1>Hola: {name}</h1> //Se renderiza la variable
<header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                           {isEmpty ?
                           <p className="text-center">El carrito esta vacio</p>
                             : (
                               <>

                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cart.map (guitar => ( //se va a iterar en cada elemento de nuestro carrito, este mismo codigo
                                    <tr key={guitar.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{guitar.name}</td>
                                        <td className="fw-bold">
                                                 Q{guitar.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => decreaseQuantity(guitar.id)}
                                            >
                                                -
                                            </button>
                                                     {guitar.quantity}

                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => increaseQuantity(guitar.id)} //para hacer funcionar el boton de agregar llamamos>"function increaseQuantity, miramos si está conectado con un console.log" linea 36
                                                //Despues creamos un prop en App>"en el Header linea 44"
                                                //Luego venimos hacia aca y lo llamamos en la linea 3 de exportaciones, luego se agrega un onClick aca pasandole el id de la guitarra

                                                //SI ESTA FUNCIONANDO
                                                //Vamos a la funcion en el App y creamos en la funcion un array method que se llamap .map
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={ ()=>removeFromCart(guitar.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="text-end">Total pagar: <span
                            className="fw-bold">Q{cartTotal}</span></p> {/* cartTotal es una constante, no una función, por lo que se usa directamente sin paréntesis. */}
                               </>
                               )}
                    <button
                       className="btn btn-dark w-100 mt-3 p-2"
                       onClick={clearCart} /*1. Creo mi funcion clearCart y la seteo en App linea 65, lo agrego en el header del App via props linea 75
                         luego vengo al Header.js  y exporto mi funcion linea 3 y despues creo mi onClick linea 101 y listo  */
                       >Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>

)
}