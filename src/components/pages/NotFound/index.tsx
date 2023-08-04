import styles from "./NotFound.module.css"
import { Link } from "react-router-dom"

export function NotFound() {
    return (
        <div className={styles.container}>

            <h1>Not Found!</h1>
            <h2>404</h2>
            <Link to="/">
                Acessar Crypto Coins
            </Link>

        </div>
    )
}