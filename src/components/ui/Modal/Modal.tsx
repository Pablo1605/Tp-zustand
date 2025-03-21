import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import { ITarea } from '../../../types/ITarea'
import { useTareas } from '../../../hooks/useTareas'
import axios from "axios";

type IModal = {
    handleCloseModal: VoidFunction
}

const initialState: ITarea = {
    titulo: "",
    descripcion: "",
    fechaLimite: "",
}

export const Modal :FC<IModal> = ({handleCloseModal}) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva)
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const {crearTarea, putTareaEditar} = useTareas()
    const [formValues, setFormValues] = useState<ITarea>(initialState)

    useEffect(() => {
        if (tareaActiva) setFormValues(tareaActiva)
    }, [])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;

        setFormValues((prev) => ({ ...prev, [`${name}`]: value}))
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (tareaActiva) {
            putTareaEditar(formValues)
        } else {
            crearTarea({ ...formValues, id: new Date().toDateString()})
        }
        setTareaActiva(null)
        handleCloseModal()
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUp}>
            <div>
                <h3>{tareaActiva ? "Editar Tarea" : "CearTarea"}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContent}>
                <div>
                <input 
                 placeholder="Ingrese un título" 
                 type="text" 
                 required 
                 onChange={handleChange}
                 value={formValues.titulo} 
                 autoComplete="off" 
                 name='titulo'/>
                <textarea 
                 placeholder="Ingrese una descripcion" 
                 required 
                 onChange={handleChange}
                 value={formValues.descripcion} 
                 name='descripcion'/>
                <input 
                 type="date" 
                 required 
                 onChange={handleChange}
                 value={formValues.fechaLimite} 
                 autoComplete="off" 
                 name='fechaLimite'/>
                </div>
                <div className={styles.buttonCard}>
                    <button onClick={handleCloseModal}>Cancelar</button>
                    <button type="submit">
                      {tareaActiva ? "Editar Tarea" : "CearTarea"}
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}