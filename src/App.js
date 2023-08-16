import "./App.css";
import AddToDo from "./components/AddToDo/AddToDo";
import ToDoesList from "./components/ToDoesList/ToDoesList";
import { useState, useEffect, createContext } from "react";
import Header from "./components/Header/MyHeader.jsx";
import {
  BrowserRouter,
  redirect,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
import styles, { ThemeProvider } from "styled-components";
import PostButton from "./components/Interaction/PostButton/PostButton";

const LightTheme = styles.div`
background: white;
color: black;
`;

const DarkTheme = styles.div`
background: black;
color: white;
`;

const lightTheme = {
  bgColor: "#fff",
  textColor: "#000",
};

const darkTheme = {
  bgColor: "#000",
  textColor: "#fff",
};

const Content = styles.div`
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.textColor}
`;
export const ThemeContext = createContext("dark");

const App = () => {
  const [update, forceUpdate] = useState(0);
  const [theme, setTheme] = useState("light");

  const changeThemeHandler = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeThemeHandler }}>
      <div id={theme}>
        <BrowserRouter className="App">
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ToastContainer />
          <Routes>
            <Route path="/" render={() => {}} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/todoes"
              element={
                <div>
                  <AddToDo
                    forceUpdate={() => forceUpdate(update + 1)}
                    update={update}
                  />
                  <ToDoesList update={update} />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
        <PostButton onClick={changeThemeHandler}>change theme</PostButton>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
