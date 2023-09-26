import React, { useState } from "react";
import {
  IonGrid,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRow,
  IonCol,
  IonInput,
  IonItem,
  IonButton,
  IonContent,
} from "@ionic/react";
import axios from "axios";
import { useHistory, Redirect, withRouter } from "react-router-dom";
interface RouteComponentProps {
  match: any;

  auth: any;
  history: any;
  sign: string;
}
import "./user.scss";

// interface auth{

// }
const User: React.FC<RouteComponentProps> = ({
  history,
  auth,
  match,
  sign,
}) => {
  //   console.log(pro.match.params.sgin);
  const [userlogin, setuserin] = useState({ email: "", password: "" });
  const [usersignup, setuserup] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState({ iserror: false, message: "" });
//handle the state of the signin
  function onChangein(e: any) {
    const { name, value } = e.target;
    // @ts-ignore
    setuserin({ ...userlogin, [name]: value });
  }
  //handle the state of the signin
  function onChangeup(e: any) {
    const { name, value } = e.target;
    // @ts-ignore
    setuserup({ ...usersignup, [name]: value });
  }
//handle the sumbit of the sign in form
  async function onSumbit(e: any) {
    e.preventDefault();
    
    //handling erros to show the user
    setError({ iserror: false, message: "" });
    try {
    //making an api reauest to sign in
      const sign = await axios.post("api/auth/signin", {
        email: userlogin.email,
        password: userlogin.password,
      });

    
      const data = sign.data;

  
     //using th auth function to set the app state
      auth(data.id, data.name, data.token);
      //driect users to the todo page
      history.push("/todo");
      //    <Redirect />
    } catch (err: any) {
      //set the state to show any possible erros in the app
      setError({ iserror: true, message: err.response.data.message });
    }
  }

  //handle the sumbit of the sign up form
  //has the same setup as the sign in function
  async function onSumbitUp(e: any) {

    e.preventDefault();
   
    setError({ iserror: false, message: "" });
    try {
      const sign = await axios.post("api/auth/signup", {
        email: usersignup.email,
        name: usersignup.name,
        password: usersignup.password,
      });
     
      const data = sign.data;

      
      auth(data.id, data.name, data.token);
      history.push("/todo");
      //    <Redirect />
    } catch (err: any) {
      setError({ iserror: true, message: err.response.data.message });
    }
  }
  //check to show what type of form to render
  // render a sign in form
  if (sign == "in") {
    return (
      <IonContent>
        <IonGrid>
          <form action="" onSubmit={onSumbit}>
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    type="email"
                    required
                    name="email"
                    value={userlogin.email}
                    onIonInput={onChangein}
                    label="email"
                    labelPlacement="floating"
                    placeholder=""
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8"></IonCol>
            </IonRow>
       
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    required
                    type="password"
                    onIonInput={onChangein}
                    name="password"
                    value={userlogin.password}
                    label="password"
                    labelPlacement="floating"
                    placeholder=""
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            {error.iserror ? (
              <IonRow className="ion-justify-content-center xl">
                <IonCol size="8">
                  <IonItem lines="none">
                    <h1 className="error-message">{error.message}</h1>
                  </IonItem>
                </IonCol>
              </IonRow>
            ) : (
              ""
            )}
            <IonRow className="ion-justify-content-center">
              <IonCol size="8">
                <IonItem lines="none">
                  <IonButton type="submit" color="primary">
                    signin
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    );
  } else {
    return (
      <IonContent>
        <IonGrid>
          <form action="" onSubmit={onSumbitUp}>
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    type="email"
                    required
                    name="email"
                    value={usersignup.email}
                    onIonInput={onChangeup}
                    label="email"
                    labelPlacement="floating"
                    placeholder=""
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8"></IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    type="text"
                    required
                    onIonInput={onChangeup}
                    name="name"
                    value={usersignup.name}
                    label="username"
                    labelPlacement="floating"
                    placeholder=""
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-justify-content-center xl">
              <IonCol size="8">
                <IonItem>
                  <IonInput
                    required
                    type="password"
                    onIonInput={onChangeup}
                    name="password"
                    value={usersignup.password}
                    label="password"
                    labelPlacement="floating"
                    placeholder=""
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            {error.iserror ? (
              <IonRow className="ion-justify-content-center xl">
                <IonCol size="8">
                  <IonItem lines="none">
                    <h1 className="error-message">{error.message}</h1>
                  </IonItem>
                </IonCol>
              </IonRow>
            ) : (
              ""
            )}
            <IonRow className="ion-justify-content-center">
              <IonCol size="8">
                <IonItem lines="none">
                  <IonButton type="submit" color="primary">
                    signup
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </form>
        </IonGrid>
      </IonContent>
    );
  }
};

export default User;
