import { useState } from "react";
import "./styles.css";
import { app } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

export default function App() {
  let auth = getAuth();
  const [data, setdata] = useState({});
  const [Login, setLogin] = useState(false);

  const HandleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setdata({ ...data, ...newInput });
  };

  const LoginAccount = async () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
        alert("Login Sucess");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  const RegisterAccount = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        console.log(res.user);
        alert("Create New Account");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  return (
    <div className="App">
      <div>
        {Login ? (
          <div>
            <div>
              <h1 style={{ textAlign: "center" }}>Register</h1>
            </div>
            <div>
              <input
                name="email"
                placeholder="Email"
                onChange={(event) => HandleInput(event)}
              />
            </div>
            <div>
              <input
                name="password"
                placeholder="Password"
                onChange={(event) => HandleInput(event)}
              />
            </div>
            <div>
              <button onClick={() => RegisterAccount()}>Register</button>
            </div>
            <div className="account">
              <p onClick={() => setLogin(false)}>Already Account?</p>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h1 style={{ textAlign: "center" }}>Login</h1>
            </div>
            <div>
              <input
                name="email"
                placeholder="Email"
                onChange={(event) => HandleInput(event)}
              />
            </div>
            <div>
              <input
                name="password"
                placeholder="Password"
                onChange={(event) => HandleInput(event)}
              />
            </div>
            <div>
              <button onClick={() => LoginAccount()}>Login</button>
            </div>
            <div className="account">
              <p onClick={() => setLogin(true)}>Create New Account?</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
