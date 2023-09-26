import { useState } from "react";


function useToggle(value:Boolean=false){
    const [state,setState]=useState(value)
    const toggle:any=() =>{
    setState(!state)
    }
    return [state,toggle]
}


export default useToggle