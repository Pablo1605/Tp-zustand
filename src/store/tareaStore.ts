import { create } from "zustand";
import { ITarea } from "../types/Itarea";

interface ITareaStore {
    tareas: ITarea[]
    tareaActiva: ITarea | null
    setTareaActiva: (tareaActiva: ITarea | null) => void
    setArrayTareas: (arrayDeTareas: ITarea[]) => void
    agregarNuevaTarea: (nuevaTarea: ITarea[]) => void
    editarUnaTarea: (tareaActualizada: ITarea) => void;
    eliminarUnaTarea: (idTarea: string) => void
}

export const tareaStore = create((set) => ({
    tareas: [],
    tareaActiva: null,
    agregarNuevaTarea: (nuevaTarea) => set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),
    editarUnaTarea:(tareaEditada)=> set((state)=>{
        const arregloTareas = state.tareas.map((tarea)=> tarea.id === tareaEditada.id ? {...tarea, ...tareaEditada}: tarea)
        return {tareas: arregloTareas}
    }),
    eliminarUnaTarea: (idTarea) => set((state) => {
        const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea);
        return { tareas: arregloTareas };
    }),
    setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn }))
}))