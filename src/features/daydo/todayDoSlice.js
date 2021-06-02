import { createSlice} from "@reduxjs/toolkit"

export const todaySlice = createSlice({
    name:"todaydo",
    initialState: {
        value:0,
        todoItems:[{
        
            description:"",
            completed:false,
            draft:false,
          },]

    },
    reducers: {

        addToToday: (state, action) =>{
            state.todoItems.push(action.payload )

        },
        removeFromToday: (state, action) =>{
            state.todoItems.splice(action.payload)

        },
        editToTodo: (state, action) =>{
            state.todoItems.splice(action.payload)
        },
        increment: (state) =>{
            state.value += 1;
        }, 
        decrement: (state) =>{
            state.value -= 1;
        },
        incrementByAmount: (state, action) =>{
            let val = Number(action.payload);
            state.value += val;
        },

    }
})

export const {increment, decrement, incrementByAmount, addToToday, removeFromToday} = todaySlice.actions;
export default  todaySlice.reducer;