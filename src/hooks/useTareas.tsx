import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { API_URL, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tarea";
import { ITarea } from "../types/ITarea"
import { editarTarea } from "../http/tarea";
import axios from "axios";

export const useTareas = () => {
    const {tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea, postNuevaTarea} = tareaStore(useShallow((state)=> ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea,
        postNuevaTarea: state.postNuevaTarea,
    })))

    const getTareas = async () => {
            const data = await getAllTareas()
            if (data) setArrayTareas(data)
        }

        const crearTarea = async (nuevaTarea: ITarea) => {
            const tareaConId = { ...nuevaTarea, id: crypto.randomUUID() }; // Genera un ID único válido
            console.log("Intentando crear tarea:", tareaConId);
        
            agregarNuevaTarea(tareaConId);
        
            try {
                const response = await axios.post<ITarea>(API_URL, nuevaTarea);
                return response.data;
            } catch (error) {
                console.error("Error en postNuevaTarea:", error);
                throw error;
            }
        };

        const putTareaEditar = async (tareaEditada: ITarea) => {
            console.log("Intentando editar tarea:", tareaEditada);
        
            const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
        
            editarUnaTarea(tareaEditada);
        
            try {
                const response = await editarTarea(tareaEditada);
                console.log("Respuesta del servidor al editar tarea:", response);
            } catch (error) {
                if (estadoPrevio) editarUnaTarea(estadoPrevio);
                console.error("Error al editar la tarea:", error);
                console.log("Algo salió mal al editar la tarea");
            }
        };

    const eliminarTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea);
        eliminarUnaTarea(idTarea)
        try {
            await eliminarTareaPorID(idTarea)
        } catch (error) {
            if(estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("algo salio mal al editar")
        }
    }
    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas,
    }
}