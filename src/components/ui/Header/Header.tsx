import styles from "./Header.module.css"

export const Header = () => {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.containerTittleHeader}>
                <h2>Aplicacion de Tareas</h2>
            </div>
        </div>
    )
}