import { FC } from 'react'
import { ITarea } from '../../../types/ITarea'
import styles from './CarsList.module.css'
import { useTareas } from '../../../hooks/useTareas'

type ICardList = {
    tarea: ITarea
    handleOpenModalEdit: (tarea: ITarea) => void
}
export const CardList: FC<ICardList> = ({tarea, handleOpenModalEdit}) => {
    const {eliminarTarea} = useTareas()
    const eliminarTareaById = () => {
        eliminarTarea(tarea.id)
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
    }
    return (
        <div className={styles.containerCard}>
            <div>
                <h3>Tìtulo: {tarea.titulo}</h3>
                <p>Descripción: {tarea.descripcion}</p>
                <p>Fecha Límite: {tarea.fechaLimite}</p>

            </div>
            <div className={styles.actionCard}>
                <button style={{backgroundColor: "red"}} onClick={eliminarTareaById}>Eliminar</button>
                <button style={{backgroundColor: "green"}} className={styles.editButton} onClick={editarTarea}>Editar</button>
            </div>
        </div>
    )
}