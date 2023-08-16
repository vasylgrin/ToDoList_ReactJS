import { useState } from "react"
import TextBox from "../Interaction/TextBox/TextBox"
import PostButton from "../Interaction/PostButton/PostButton";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ValidationService from "../../services/ValidationService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {
    const [login, setLogin] = useState("string");
    const [password, setPassword] = useState("string");

    const navigation = useNavigate();

    const signInHandler = (e) => {
        e.preventDefault();

        const signInData = {login: login, password: password};

        const [isValid, errMsg] = ValidationService.isValid(signInData);
        if(!isValid){
            toast.info(errMsg)
            return;
        }

        axios.post("http://localhost:5290/api/User/SignIn", signInData)
        .then(resp => {
            localStorage.setItem("jwt", resp.data)
            localStorage.setItem("login", login);
            navigation("/todoes")
        })
        .catch(err=>toast.error(err.message));

        setLogin("");
        setPassword("");
    }

    return(
        <div className="container">
            <form onSubmit={(e) => signInHandler(e)}>
                <TextBox value={login} setValue={setLogin} text="Enter login..."/>
                <TextBox value={password} setValue={setPassword} text="Enter password..."/>
                <PostButton>Sign In</PostButton>
            </form>
        </div>
    )
}

export default SignIn;