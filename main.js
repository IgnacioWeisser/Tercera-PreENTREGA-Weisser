
//Checklist 2

class Tarea {
    constructor(id, descripcion, completada) {
        this.id = id;
        this.descripcion = descripcion;
        this.completada = completada;
    }
}

let listaTareas = [];
let historialTareasCompletadas = [];

function agregarTarea() {
    let descripcion = prompt("Ingrese la nueva tarea:");
    if (descripcion !== null) { 
        descripcion = descripcion.trim();
        if (descripcion !== "") {
            let nuevaTarea = new Tarea(listaTareas.length + 1, descripcion, false);
            listaTareas.push(nuevaTarea);
            alert("Tarea agregada: " + descripcion);
        } else {
            alert("La descripción de la tarea no puede estar vacía.");
        }
    } else {
        alert("Operación cancelada."); 
    }
}

function verTareas() {
    if (listaTareas.length === 0) {
        alert("No hay tareas en la lista.");
    } else {
        let mensaje = "Lista de tareas disponibles:\n\n";
        listaTareas.forEach(function (tarea) {
            let estado = tarea.completada ? "completada" : "pendiente";
            mensaje += tarea.id + ". " + tarea.descripcion + " - Estado: " + estado + "\n";
        });
        alert(mensaje);
    }
}

function completarTarea() {
    let tareasDisponibles = listaTareas.filter(tarea => !tarea.completada);
    if (tareasDisponibles.length === 0) {
        alert("No hay tareas disponibles para marcar como completadas.");
    } else {
        let mensaje = "Seleccione la tarea que desea marcar como completada:\n\n";
        tareasDisponibles.forEach(function (tarea, index) {
            mensaje += (index + 1) + ". " + tarea.descripcion + "\n";
        });
        let indice = prompt(mensaje);
        indice = parseInt(indice);
        if (isNaN(indice) || indice < 1 || indice > tareasDisponibles.length) {
            alert("Índice inválido.");
        } else {
            let tareaCompletada = listaTareas.find(tarea => tarea.id === tareasDisponibles[indice - 1].id);
            tareaCompletada.completada = true;
            tareaCompletada.fechaCompletada = new Date();
            historialTareasCompletadas.push(tareaCompletada);
            alert("Tarea marcada como completada.");
        }
    }
}

function borrarTarea() {
    if (listaTareas.length === 0) {
        alert("No hay tareas para borrar.");
    } else {
        let mensaje = "Seleccione la tarea que desea borrar:\n\n";
        listaTareas.forEach(function (tarea, index) {
            let estado = tarea.completada ? "completada" : "pendiente";
            mensaje += (index + 1) + ". " + tarea.descripcion + " - Estado: " + estado + "\n";
        });
        let indice = prompt(mensaje);
        indice = parseInt(indice);
        if (isNaN(indice) || indice < 1 || indice > listaTareas.length) {
            alert("Índice inválido.");
        } else {
            let tareaBorrada = listaTareas.find(tarea => tarea.id === indice);
            listaTareas = listaTareas.filter(tarea => tarea.id !== tareaBorrada.id);
            alert("Tarea borrada.");

            listaTareas.forEach(function (tarea, index) {
                tarea.id = index + 1;
            });
        }
    }
}

function mostrarTareasCompletadas() {
    if (historialTareasCompletadas.length === 0) {
        alert("No hay tareas completadas en el historial.");
    } else {
        let mensaje = "Historial de tareas completadas:\n\n";
        historialTareasCompletadas.forEach(function (tarea, index) {
            mensaje += (index + 1) + ". " + tarea.descripcion + "\n";
        });
        alert(mensaje);
    }
}

document.getElementById("agregarBtn").addEventListener("click", agregarTarea);
document.getElementById("verBtn").addEventListener("click", verTareas);
document.getElementById("completarBtn").addEventListener("click", completarTarea);
document.getElementById("borrarBtn").addEventListener("click", borrarTarea);
document.getElementById("mostrarBtn").addEventListener("click", mostrarTareasCompletadas);