import { IonItem,IonButton,IonCheckbox  } from '@ionic/react';
import useToggle from '../Hooks/usetoggle';
import './todo.scss';
import EditTodo from './EditTodoForm';
interface MyComponentProps {
  task: string;
  id:string;
  edit:any;
  Delete:any;
  compelte:boolean;
  togglecomp:any;
}
const Todo: React.FC<MyComponentProps> = ({ task,id,edit,Delete,compelte,togglecomp })  => {
   //check if the user want to edit a todo or not
  const [isEditing,toggle]= useToggle()
  //delete a todo 
  function handleDelete(){
    Delete(id)
  }
  //update a todo to be completed
  function togglecomplete(){
    togglecomp(id,compelte)
  }
  //
  function updatetodo(){
    toggle()
  }

  return (
  
   
    <IonItem >
      {isEditing ? 
         <EditTodo id={id} task={task} key={id} update={edit} toggle={toggle} /> :
      <div className="todo__card">
        < div className='todo__left'  >
           <IonCheckbox className="todo__check" checked={compelte} onIonChange={togglecomplete} >   </IonCheckbox>
          <h1 className={`todo__name ${compelte ?'todo__completed':''}`}> {task} </h1>
           </div>
       
     
      <div className="todo__right">
      <IonButton className='' onClick={updatetodo}>edit</IonButton>
      <IonButton className='' onClick={handleDelete} color="danger">delete</IonButton>
      </div>
      </div>
      }
  
    
   </IonItem>
  

   
  );
};

export default Todo;
