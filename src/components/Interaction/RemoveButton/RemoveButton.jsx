import style from "./RemoveButton.module.css"

const RemoveButton = (props) => {
    return(
        <div>
            <button className={style.btn} type="button" onClick={() => props.deleteToDoHandler(props.id)}>Remove</button>
        </div>
    )
}

export default RemoveButton;