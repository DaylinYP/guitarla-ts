// src/App.tsx

import type { Guitar } from './types'; 
import GuitarComponent from "./components/Guitar" 
import Header from "./components/Header"
import {useCart} from './hooks/useCart'

function App() {

    //Llamamos desde aca lo que se encuentra en el hook tambien declarado useCart.js
   const {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,

    } = useCart()

    return (
        <>
        <Header
            cart={cart} //le pasamos el carrito, creamos un prop cart y el valor que le vamos a pasar tambien se llama asi
            removeFromCart={removeFromCart} //Llamamos al prop igual que la funcion
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
            isEmpty={isEmpty}
            cartTotal={cartTotal}
        />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {/* Especificamos que 'guitar' es de tipo 'Guitar' */}
                {data.map( (guitar: Guitar) => (
                   <GuitarComponent
                        //Prop
                        guitar={guitar}
                        key={guitar.id}//El key tiene que tener un valor unico osea id

                        addToCart={addToCart}
                        />
                ))}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
}

export default App