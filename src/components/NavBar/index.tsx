import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import logoCrypto from "../../assets/logo.svg"

export function NavBar() {
    return (
        <header className={styles.container}>

            <div>
                <Link to='/'> <img src={logoCrypto} alt="Logo" /></Link>
            </div>


        </header>
    )
}