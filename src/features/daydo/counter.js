import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, incrementByAmount} from "./todayDoSlice";

export const Counter = () =>{
   const count = useSelector((state) => state.today.value)
   const dispatch = useDispatch()
   const [amount, setAmount] = useState(0);
   const onAmountChange =(event) =>{
       const ca = event.target.value;
    setAmount(ca);
   }
    return(
        <div>
            <span>{count}</span>
            <button aria-label ="Increment value" onClick ={() => dispatch(increment())}>Increment</button>
            <button aria-label ="Decrement value" onClick ={() => dispatch(decrement())}>Decrement</button>
           <input name ="camount" value ={amount} onChange ={(e) => onAmountChange(e)}/> 
           <button aria-label ="Increment By Amount" onClick ={() =>dispatch(incrementByAmount(amount))}>Increment By Amount</button>
        </div>
    )
}