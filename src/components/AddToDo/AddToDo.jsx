import PostButton from "../Interaction/PostButton/PostButton";
import TextBox from "../Interaction/TextBox/TextBox";
import { useState } from "react";
import ToDoService from "../../services/ToDoService";
import ValidationService from "../../services/ValidationService";
import { toast } from "react-toastify";

const toDoService = new ToDoService();

const AddPosts = (props) => {

    const [topic, setTopic] = useState("");

    const addNewPostHandle = (e) => {
        e.preventDefault();

        const login = localStorage.getItem("login");
        if(login === null){
            toast.error("Failed: Try to Sign In")
            return;
        }
        
        const dataForAddNewToDo = {login: login, topic: topic}

        const [isValid, errMsg] = ValidationService.isValid(dataForAddNewToDo);
        if(!isValid){
            toast.error("Failed: " + errMsg)
            return;
        }

        toDoService.addNewToDo(dataForAddNewToDo);

        setTopic("");
        props.forceUpdate();
    }

    return(
        <div className="container">
            <form onSubmit={(e)=>addNewPostHandle(e)}>
                <TextBox text="Enter topic..." value={topic} setValue={setTopic}/>
                <PostButton>Add New Post</PostButton>
            </form>            
        </div>
    )
}

export default AddPosts;