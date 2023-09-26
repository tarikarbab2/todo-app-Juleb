import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, NavLink } from "react-router-dom";
import { IonApp, setupIonicReact, IonButton } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { IonHeader, IonTitle } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./app.scss";
/* Theme variables */
import "./theme/variables.css";

import TodoApp from "./pages/Todoapp";
import User from "./pages/user";
setupIonicReact();

const App: React.FC = () => {
  //setting a token state to mange authintcation
  const [tokens, setToken] = useState(false);
  // checking for user information
  const [user, setUser] = useState({ id: 0, name: "", token: "" });

  //when a user is logedin or signed up set the state information to have the user information
  function auth(id: number, name: string, token: any) {
    setToken(token);
    setUser({ id: id, name: name, token: token });
    //save an instance of the token so even if the app is refreshed the data will still be saved
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, username: name, token: token })
    );
  }
  //manging when user loged out from the app delete all data of the session
  async function logout() {
    setUser({ id: 0, name: "", token: "" });
    setToken(false);
    localStorage.removeItem("userData");
    return <Redirect to="/auth/signin" />;
  }
  //using effect to make sure if there a stored token or not
  useEffect(() => {
    const data: any = localStorage.getItem("userData");
    const stored: any = JSON.parse(data);
    if (stored && stored.token) {
      auth(stored.userId, stored.username, stored.token);
    }
  }, []);

  {
    /* //check if the user is signed or not to show the right components */
  }
  if (tokens) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonHeader className="nav">
            <IonTitle className="nav__title">TodoApp</IonTitle>

            <IonButton onClick={logout} className="nav__link">
              logout
            </IonButton>
          </IonHeader>
          {/*the components for the app */}
          <Switch>
            <Route
              exact
              path="/todo"
              render={(props) => (
                <TodoApp history={props.history} token={tokens} user={user} />
              )}
            />

            <Redirect from="/" to="/todo" />
          </Switch>
        </IonReactRouter>
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          <IonHeader className="nav">
            <IonTitle className="nav__title">TodoApp</IonTitle>
            <div>
              {" "}
              <NavLink to="/auth/signup" className="nav__link">
                signup
              </NavLink>
              <NavLink className="nav__link" to="/auth/signin">
                signin
              </NavLink>
            </div>
          </IonHeader>
          {/*the components for the app */}
          <Switch>
            <Route
              exact
              path="/auth/signin"
              render={(props) => (
                <User
                  history={props.history}
                  sign="in"
                  match={props.match}
                  auth={auth}
                />
              )}
            />

            <Route
              exact
              path="/auth/signup"
              render={(props) => (
                <User
                  history={props.history}
                  sign="up"
                  match={props.match}
                  auth={auth}
                />
              )}
            />

            <Redirect from="/" to="/auth/signup" />
          </Switch>
        </IonReactRouter>
      </IonApp>
    );
  }
};

export default App;
