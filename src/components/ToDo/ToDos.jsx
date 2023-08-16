import { useState } from "react";
import ToDoService from "../../services/ToDoService";
import RemoveButton from "../Interaction/RemoveButton/RemoveButton";
import style from "./ToDos.module.css"

const toDoService = new ToDoService();

const ToDos = (props) => {
    const [isDone, setIsDone] = useState(false);

    const doneToDoHandler = (id) => {
        toDoService.doneToDo(id);
        setIsDone(!isDone)
    } 

    const deleteToDoHandler = (id) => {
        toDoService.deleteToDo(id);
    }

    const formater = (date) => {
        return date.replace("T", " ").slice(0, 19);
    }

    const formaterDateOfDone = (date) => {
        const formatDate = formater(date);
        const defaultDate = "0001-01-01 00:00:00"

        return formatDate === defaultDate ? "Not Done yet" : formatDate; 
    }

    return(
        <div className={isDone ? style.unDoneToDo + " " + style.doneToDo : style.unDoneToDo}>
            <div className={style.toDos}>
                    <div className={style.item}><input className={style.doneCheckbox} type="checkbox" checked={props.isDone} onChange={()=>doneToDoHandler(props.id)}></input></div>
                    <div className={style.item} >№{props.iterator + 1}</div>
                    <div className={style.item}>Topic: {props.topic}</div>
                    <div className={style.item}>Created: {formater(props.dateOfCreation)}</div>
                    <div className={style.item}>Modified: {formater(props.dateOfModification)}</div>
                    <div className={style.item}>Done: {formaterDateOfDone(props.dateOfDone)}</div>
                </div>
            <RemoveButton className={style.removeBtn} id={props.id} deleteToDoHandler={deleteToDoHandler}/>
        </div>
    )
}

export default ToDos;