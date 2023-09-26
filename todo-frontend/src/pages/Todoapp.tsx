import React, { useEffect, useState } from "react";
import {
  IonGrid,
  
  IonRow,
  IonCol,
} from "@ionic/react";
import TodoForm from "./TodoForm";
import Todo from "./todo";
import "./Todoapp.scss";

import axios from "axios";

interface RouteComponentProps {
  // match:any;

  user: any;
  token: any;
  history: any;
}
const TodoApp: React.FC<RouteComponentProps> = ({ history, user, token }) => {

  //setting a todo container
  let items: Array<{
    task: string;
    id: string;
    completed: boolean;
    created: Date;
  }> = [];
  let [todo, setItems] = useState(items);

  //assigning headers for authentication for api requests
  const customHeaders = {
    Authorization: `Bearer ${user.token}`, 
    "Content-Type": "application/json", 
    
  };

  //get all todos for a user and assign it to the state
  async function getTodos() {
    const response: any = await axios.get("api/todo/todos", {
      headers: customHeaders,
    });
   
    setItems(response.data);

  }

  useEffect(() => {
    if (token) {
      getTodos();
    }
  }, []);

   //add an item
  async function additems(newitem: { task: string }) {
    const response = await axios.post(
      "api/todo",
      { task: newitem.task },
      {
        headers: customHeaders,
      }
    );
    
    getTodos();
  }
  
  //edit a todo on the server using a form from the todo component
  const editTodo = async (todoid: string, newtask: string) => {
    const response = await axios.put(
      `api/todo/${todoid}`,
      { task: newtask },
      {
        headers: customHeaders,
      }
    );
    console.log(response);
    getTodos();
  };
//delete a todo from the db 
  const deleteTodo = async (todoid: string) => {
    const response = await axios.delete(`api/todo/${todoid}`, {
      headers: customHeaders,
    });
    getTodos();
  };
 //edit a todo to be completed
  const completeTodo = async (todoid: string, completed: boolean) => {
    const response = await axios.put(
      `api/todo/${todoid}`,
      { completed: !completed },
      {
        headers: customHeaders,
      }
    );
    console.log(response);
    getTodos();
  };
// map over the todos for a user and then render it so he can check its
  let todos = todo.map((v) => {
    return (
      <Todo
        compelte={v.completed}
        togglecomp={completeTodo}
        Delete={deleteTodo}
        task={v.task}
        key={v.id}
        edit={editTodo}
        id={v.id}
      />
    );
  });

  return (
    <IonGrid className="xl ion-no-padding">
      <TodoForm add={additems} />
      <IonRow className="ion-justify-content-center ion-no-padding">
        <IonCol size="auto" className="">
          <div className="Todoapp__container">{todos}</div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TodoApp;
