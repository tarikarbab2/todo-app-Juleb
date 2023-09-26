import React,{ useState} from 'react';
import {
  IonCol, 
  IonItem,
  IonRow,
  IonInput,
  IonButton,

} from "@ionic/react";

interface MyComponentProps {
    add({}):void;
  }
const TodoForm: React.FC<MyComponentProps> = ({ add }) => {
  //setting a todo to the state
    const [todo,setTodo]=useState<string>('')
 //manging the state
   function onChange(e:any){
        
    setTodo(todos=> todos=e.target.value);
    }
    //adding a todo to the todo app by sumbting and using the upper function
    function handleSumbit(e:any){
      e.preventDefault();
       add({task:todo})
       //reset the form so a user can inter a new todo
       setTodo('')
       
    }
  return (
   <>
   
     
    
            <form onSubmit={handleSumbit} >
          <IonRow className="ion-justify-content-center xl" >
            <IonCol size="8">
              <IonItem >
                <IonInput
                type='text'
                value={todo}
                name="todo"
                onIonInput ={onChange}
                  label="Enter a Todo"
                  labelPlacement="floating"
                  placeholder=""
                ></IonInput>
              </IonItem>
          
            </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center">
            <IonCol size="8">
                <IonItem lines="none">
                    <IonButton type="submit" color="primary" >add a todo</IonButton>
                </IonItem>
                
            </IonCol>
           
          </IonRow>
          </form>
      
    
      </>
     
   
  );
};


export default TodoForm