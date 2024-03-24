
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
    let descripcion = document.getElementById("nuevaTareaInput").value.trim();
    if (descripcion !== "") {
        let nuevaTarea = new Tarea(listaTareas.length + 1, descripcion, false);
        listaTareas.push(nuevaTarea);
        alert("Tarea agregada: " + descripcion);
        document.getElementById("nuevaTareaInput").value = ""; // Limpiar el campo de entrada después de agregar la tarea
    } else {
        alert("La descripción de la tarea no puede estar vacía.");
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
    let tareaId = document.getElementById("tareaInput").value;
    if (tareaId.trim() === "") {
        alert("Por favor, ingrese el ID de la tarea.");
        return;
    }
    
    let id = parseInt(tareaId);
    if (isNaN(id) || id <= 0 || id > listaTareas.length) {
        alert("ID de tarea inválido.");
        return;
    }

    let tarea = listaTareas.find(t => t.id === id);
    if (tarea.completada) {
        alert("Esta tarea ya está completada.");
    } else {
        tarea.completada = true;
        tarea.fechaCompletada = new Date();
        historialTareasCompletadas.push(tarea);
        alert("Tarea marcada como completada.");
    }
}


function verify(id, arr) {
    if (arr.some(tarea => tarea.id === id && !tarea.completada)) {
        return true;
    }
    return false;
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
        localStorage.setItem('historialTareasCompletadas', JSON.stringify(historialTareasCompletadas));

    }
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("agregarBtn").addEventListener("click", agregarTarea);
    document.getElementById("verBtn").addEventListener("click", verTareas);
    document.getElementById("completarBtn").addEventListener("click", function() {
        console.log("Botón de completar tarea clickeado."); 
        completarTarea(); 
    });
    document.getElementById("mostrarBtn").addEventListener("click", mostrarTareasCompletadas);
});


