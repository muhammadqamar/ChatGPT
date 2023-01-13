import Head from "next/head";

import { auth } from "../../service/firebase/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import styles from "../assets/styles/Home.module.scss";
import Router from "next/router";
import { Formik } from "formik";

export default function Home() {
  const [user, setUser] = useAuthState(auth);
  const [authError, setAuthError] = useState("");
  const handlerWithGoogleLogin = async () => {
    const googleAuth = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, googleAuth);
  };

  const handlerWithFacebookLogin = () => {
    const facebookAuth = new FacebookAuthProvider();
    signInWithPopup(auth, facebookAuth)
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const createNewAccount = (userEmail, userPassword) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userData) => {
        setAuthError("");
        console.log("user_data", userData);
      })
      .catch((error) => {
        console.log("error_createNewAccount", error);
        setAuthError(error.message);
      });
  };
  const authLogin = async (userEmail, userPassword) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userData) => {
        setAuthError("");
        console.log("user_data", userData);
      })
      .catch((error) => {
        console.log("error", error.message);
        setAuthError(error.message);
      });
  };
  const logout = () => {
    auth.signOut();
  };
  useEffect(() => {
    if (user) {
      const { pathname } = Router;
      if (pathname == "/") {
        Router.push("/dashboard");
      }
    }
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.login_screen_section}>
          <div className={styles.login_screen_header}>
            <h2>Welcome to ChatGPT</h2>
          </div>

          <div className={styles.btn_div}>
            {/*{user ? (
              <>
                <div className={styles.main_dashboard_section}>
                  <div className={styles.btn_dash_section}>
                    <button className={styles.btn} onClick={logout}>
                      Logout
                    </button>
                  </div>
                  <div className={styles.btn_dash_section}>
                    <button className={styles.btn} onClick={() => Router.push("/dashboard")}>
                      Go To Dashboard
                    </button>
                  </div>
                </div>
              </>
            ) }*/}
            {!user && (
              <>
                <div className={styles.user_form_controller}>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = "Required";
                      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address";
                      }
                      if (!values.password) {
                        errors.password = "Required";
                      }
                      return errors;
                    }}
                    onSubmit={(values, actions) => {
                      authLogin(values.email, values.password);
                    }}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className={styles.form_group}>
                          <label className={styles.form_lable} htmlFor="email">
                            Email
                          </label>
                          <input
                            className={styles.input_field}
                            type="text"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                            name="email"
                          />
                          {props.errors.email && (
                            <div style={{ color: "red", paddingTop: "5px" }}>
                              {props.errors.email}
                            </div>
                          )}
                        </div>
                        <div className={styles.form_group}>
                          <label className={styles.form_lable} htmlFor="password">
                            Password
                          </label>
                          <input
                            className={styles.input_field}
                            type="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                            name="password"
                          />
                          {props.errors.password && (
                            <div style={{ color: "red", paddingTop: "5px" }}>
                              {props.errors.password}
                            </div>
                          )}
                        </div>
                        {authError && (
                          <p style={{ color: "red", paddingTop: "10px" }}>{authError}</p>
                        )}
                        <div className={styles.form_group}>
                          <button
                            className={`${styles.btn} primary-btn ${styles.mt_12}`}
                            type="submit"
                          >
                            Login
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className={`${styles.btn} ${styles.mt_12}`}
                            onClick={() => {
                              if (!props.errors.email && !props.errorpassword) {
                                createNewAccount(props.values.email, props.values.password);
                              }
                            }}
                          >
                            Create New Account
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
                <div className={styles.or_option}>OR</div>
                <div>
                  <button className={styles.btn} onClick={handlerWithGoogleLogin}>
                    Login With Google
                  </button>
                </div>

                <div className={styles.btn_section}>
                  <button className={styles.btn} onClick={handlerWithFacebookLogin}>
                    Login With Facebook
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
