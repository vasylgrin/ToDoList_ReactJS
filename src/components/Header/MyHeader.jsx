import { useEffect, useState } from "react"
import style from "./Header.module.css"
import {NavLink} from "react-router-dom"

const Header = (props) => {

    const [changeHeader, setChangeHeader] = useState(true);

    const signOut = () =>{
        localStorage.clear();
        setChangeHeader(true);
    }

    const interval = setInterval(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt === null) {
            setChangeHeader(true);
        }
        else{
            setChangeHeader(false);
            clearInterval(interval);
        }
     }, 1000);

    return(
        <div className="">
            <div className={style.header + " container"}>
                <NavLink to="/todoes" className={style.posts}>ToDoes</NavLink>
                
                {changeHeader 
                ? 
                <div>
                    <NavLink to="/signin" className={style.navLink}>Sign In</NavLink>
                    <NavLink to="/signup" className={style.navLink}>Sign Up</NavLink>
                </div>
                : 
                <div>
                    <NavLink to="/signin" className={style.navLink} onClick={signOut}>Sign out</NavLink>
                </div>  
                }
            </div>
            <hr />
        </div>
    )
}

export default Header;