// src/hooks/useCart.ts

import { useState, useEffect, useMemo } from 'react' // useMemo es una forma en la que puedo decir: no hagas render completo de mi app hasta que no cambie algo que yo voy a decir que es
import {db} from '../data/db'
import type { Guitar, CartItem } from '../types'

// export es para importar en otros componentes
export const useCart = () => {
    // Si 'db' es estático y no cambia, no necesitas useState para 'data'.
    // Si 'data' se necesita como un estado que podría cambiar, descomenta y usa 'setData'.
    // const [data, setData] = useState(db)

    // Va a buscar si localStorage tiene algo y lo setea si no, le pasa el arreglo vacío
    const initialCart = () : CartItem[ ] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState<CartItem[]>(initialCart)
    // state, lo que modifica el state tiene que tener set seguido del nombre del state

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    // useEffect para mantener lo del carrito, solo se hace estas líneas, no se llama de ningún lugar
    useEffect( () => {
        // localStorage toma 2 parámetros: nombre de lo que quiero almacenar 'cart', lo que deseo almacenar (solamente strings)
        localStorage.setItem('cart', JSON.stringify(cart)) // como el carrito es un arreglo, lo convertimos a string con JSON.stringify y le pasamos el carrito
    }, [cart]) // cada que cart cambie ejecutamos lo anterior

    function addToCart(item: Guitar){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExists >= 0){ // existe en el carrito
            if(cart [itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart] // creamos una copia del carrito
            updatedCart[itemExists].quantity++ // luego modificamos la copia que creamos
            setCart(updatedCart) // se setea
        } else {
            const newItem : CartItem = {...item, quantity : 1} // Asegúrate que es 'CartItem' con 'C' mayúscula
            setCart([...cart, newItem]) // Aquí corregí de 'item' a 'newItem' para asegurarme de que se añade con la cantidad inicial
        }
    }

    // Función elimina del carrito de compras por id > Header
    function removeFromCart(id: number ){
        // va a filtrar y voy a mantener las diferentes a la que quiero eliminar por id
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    // Función que incrementa
    function increaseQuantity(id: number ){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item, // retornamos todo como está
                    quantity: item.quantity + 1 // pero la cantidad la voy a modificar manteniendo el resto de propiedades
                }
            }
            return item // mantiene los objetos en los que no di click y los regresa
        })
        setCart(updatedCart) // siempre hay que setear al carrito
    }

    // Función que decrementa
    function decreaseQuantity(id: number) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    // función limpiar carrito
    function clearCart(){
        setCart([ ])
    }

    // state derivado porque const isEmpty depende del =>cart.length...
    // se coloca isEmpty y se llama en la línea 26. Se añade [cart] como dependencia para que useMemo funcione correctamente.
    const isEmpty = useMemo(() => cart.length === 0, [cart])

    // STATE: .reduce es array method que toma dos parámetros, queremos sumar al total acumulado más la cantidad * precio, va a iniciar en 0
    // [cart] : vuelve a ejecutar el render completo hasta que el carrito cambie, todo esto con useMemo. El array de dependencias [cart] se movió al lugar correcto para useMemo.
    const cartTotal = useMemo(() => // Se asigna el resultado a cartTotal
        cart.reduce((total, item) => total + (item.quantity * item.price), 0),
    [cart])
    // total va a iterar y multiplicar la cantidad por el precio y en la siguiente va a recordar en la anterior iteración teníamos tal y luego le suma lo otro
    // El item es el elemento actual

    // Dentro del return las hago disponibles las funciones que están en la lógica de mi useCart
    return {
        data: db, // 'db' es el arreglo de guitarras, lo pasamos directamente
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity, // Asegúrate de que esta función se exporta para usarla
        clearCart,
        isEmpty,
        cartTotal
    }
}