





import { useState } from "react"
import TextBox from "../Interaction/TextBox/TextBox";
import PostButton from "../Interaction/PostButton/PostButton";
import ValidationService from "../../services/ValidationService";
import { toast } from "react-toastify";
import Configuration from "../../configuration/Configuration";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    
    const [name, setName] = useState("");
    const [login, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigation = useNavigate();
    
    const signUpHandler = (e) => {
        e.preventDefault();

        const dataForSignUp = {name: name, login: login, password: password, email: email}

        const [isValid, errMsg] = ValidationService.isValid(dataForSignUp);
        if(!isValid){
            toast.error("Failed: " + errMsg)
            return;
        }

        

        axios.post(Configuration.signUp, dataForSignUp)
        .then(resp => {
            toast.success("Registration was succesfuls")
            navigation("/signin")
        })
        .catch(err=>toast.error(err.message));

        
    }


    return(
        <div className="container"> 
            <form onSubmit={(e)=> signUpHandler(e)}>
                <TextBox value={name} setValue={setName} text="Enter name..."/>
                <TextBox value={login} setValue={setUsername} text="Enter login..."/>
                <TextBox value={password} setValue={setPassword} text="Enter password..."/>
                <TextBox value={email} setValue={setEmail} text="Enter email..."/>
                <PostButton>Sign Up</PostButton>
            </form>
        </div>
    )
}

export default SignUp;