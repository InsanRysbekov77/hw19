import React, { useReducer } from 'react'
import { ADD, MYLTIPLY, REMOVE } from '../helpers/constants'

const CardContext = React.createContext()

const intitState = {
	items: [],
	totalPrice: 0,
}

const cartReducer = (state, action) => {
	switch (action.type) {
		case ADD:
			let curentIndex = state.items.findIndex((el) => el.id == action.item.id)
			if (curentIndex === -1) {
				let newItem={...action.item, amount:1}
				const newItems = state.items.concat(newItem)
				const newPrice = state.totalPrice + action.item.price

				return {
					...state,
					items: newItems,
					totalPrice: newPrice,
				}
			} else{
				const newPrice = state.totalPrice + action.item.price
				let newItems = state.items.map((el,idx) => {
					return idx === curentIndex? {...el, amount: el.amount+1 }:el
				})
				return {
					...state,
					items: newItems,
					totalPrice: newPrice
				}
			}
			case REMOVE:
				let currentElem = state.items.find(el => el.id == action.id)
				if(currentElem.amount === 1){
					let newItems = state.items.filter(el => el.id !== action.id)
				return {
					...state,
					items: newItems,
				}
			  }else{
					let newItem = state.items.map(el => {
						return el.id === action.id ? {...el, amount: --el.amount} : el
					})
					return {
					...state,
					items: newItem,
					totalPrice: state.totalPrice - currentElem.price
				}
			}
			case MYLTIPLY:
			    let currentIndex = state.items.findIndex((el) => el.id === action.data.id)
				if(currentIndex === -1){
					let newItem = {...action.data, amount: action.amount}
					const newItems = state.items.concat(newItem)
					const newPrice = action.data.price * action.amount
					const newAmount = state.totalPrice + newPrice
					return{
						...state,
						items: newItems,
						totalPrice: newAmount
					}
				}else {
					const newPrice = action.data.price * action.amount
					const newAmount = state.totalPrice + newPrice
					let newState = state.items.map((el,index) => {
						return index === currentIndex
						? {...el, amount: el.amount + 1}
						: el
					})
					return{
						...state,
						items: newState,
						totalPrice: newAmount
					}
				}
		default:
			return state
	}
}
export const CardContextProvider = (props) => {
	const [state, dispatch] = useReducer(cartReducer, intitState)
	const onAddHandler = (item, inputValue) => {
		dispatch({ type: ADD, item, inputValue })
	}
	const onRemoveHandler = (id) => {
	dispatch({ type: REMOVE, id })
	}
	const onMyltiplyHandler = (data, newAmount) =>  {
		dispatch({ type: MYLTIPLY, data, amount: newAmount })
	}
	return (
		<CardContext.Provider
			value={{
				items: state.items,
				totalPrice: state.totalPrice,
				onAdd: onAddHandler,
				onRemove: onRemoveHandler,
				onMyltiply: onMyltiplyHandler
			}}
		>
			{props.children}
		</CardContext.Provider>
	)
}

export default CardContext
