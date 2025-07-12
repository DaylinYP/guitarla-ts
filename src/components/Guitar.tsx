// src/components/Guitar.tsx

import type {Guitar} from '../types' // Importa el tipo Guitar

// Si ya no necesitas 'GuitarProps' por separado, puedes quitar la definición de arriba.
export default function Guitar({guitar, addToCart}: {guitar : Guitar, addToCart: (item:Guitar) => void}){

    // Si quieres usar la descripción de la guitarra, reemplaza el <p> fijo con <p>{description}</p>
    const { name, image, description, price} = guitar

    // console.log(guitar) // Este console.log puede quedarse o quitarse si no lo necesitas
    return(

           <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                 <div className="col-4">
                     <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                 </div>
                 <div className="col-8">
                     <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                     {/* Usa la descripción real de la guitarra si la quieres mostrar */}
                     <p>{description}</p>
                     <p className="fw-black text-primary fs-3">Q{price}</p>
                     <button
                         type="button"
                         className="btn btn-dark w-100"
                         onClick={ () => addToCart(guitar)}
                     >Agregar al Carrito</button>
                 </div>
             </div>

    )
}