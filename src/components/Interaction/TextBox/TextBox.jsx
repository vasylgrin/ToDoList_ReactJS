import style from "./TextBox.module.css"

const TextBox = (props) => {
    return(
        <div>
            <input className={style.textBox} type="text" placeholder={props.text} value={props.value} onChange={ e => props.setValue(e.target.value)}/>
        </div>
    )
}

export default TextBox;