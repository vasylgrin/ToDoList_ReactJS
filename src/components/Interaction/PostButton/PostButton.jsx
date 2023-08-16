import style from "./PostButton.module.css"

const PostButton = (props) => {


    return(
        <div>
            <button className={style.postBtn} type="submit" onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

export default PostButton;