import { useState } from 'react';
import { IonButton, IonInput,IonItem, } from '@ionic/react';
import React from 'react'

interface MyComponentProps {
    task:any;
    id:string;
    update:any;
    toggle:any
  }
 
const EditTodo:React.FC<MyComponentProps> = ({ task,id,update,toggle })=>{
    const [todo,setTodo]=useState<string>(task)
    //manging the state
   function onChange(e:any){
        
    setTodo(todo=> todo=e.target.value);
    }
    // handling a task change to make an api reauest
    function handleSumbit(e:any){
      e.preventDefault();
        update(id,todo)
        toggle()
    }
     return (
        <form onSubmit={handleSumbit}> <IonItem   >
        <IonInput
        type='text'
        value={todo}
        name="todo"
        onIonInput ={onChange}
          label="Enter a Todo"
          labelPlacement="floating"
          placeholder=""
        ></IonInput>
        <IonButton type="submit" color="primary" >save</IonButton>
      </IonItem>
      </form>
     )
}

export default EditTodo;