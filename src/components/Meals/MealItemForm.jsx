import classes from './MealItemForm.module.css'
import Input from '../UI/Input'
import { useContext, useState } from 'react'
import CardContext from '../../store/cart-context'

const MealItemForm = ({ data, id }) => {
	const [inputValue,setInputValue] = useState(1)
	const { onMyltiply } = useContext(CardContext)
	const onAddItemHandler=(e)=>{
		if(e.target.value >0 && e.target.value <5){
			setInputValue(e.target.value)
		}else{
			setInputValue(prevState=>prevState)
		}
	}
	const submitHandler = (e) => {
		e.preventDefault()
	}
	const onMyltiplyHandler=(data)=>{
		const newAmount=Number(inputValue)
		return()=>{
			onMyltiply(data,newAmount)
			setInputValue(1)
		}
	}
	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<Input
				label='amount'
				input={{
					id: 'amount_' + id,
					type: 'number',
					min: '1',
					max: '5',
					step: '1',
					onChange :onAddItemHandler ,
					value:inputValue
				}}
			/>
			<button type='submit' onClick={onMyltiplyHandler(data)}> + Add</button>
		</form>
	)
}
export default MealItemForm
