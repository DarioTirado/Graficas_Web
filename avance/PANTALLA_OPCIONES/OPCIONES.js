  // Función para guardar las opciones en localStorage
  function guardarOpciones() {
    const teclaIzquierda = document.getElementById('teclaIzquierda').value.toUpperCase();
    const teclaDerecha = document.getElementById('teclaDerecha').value.toUpperCase();
    const teclaArriba = document.getElementById('teclaArriba').value.toUpperCase();
    const teclaAbajo = document.getElementById('teclaAbajo').value.toUpperCase();

    const opciones = {
        teclaIzquierda,
        teclaDerecha,
        teclaArriba,
        teclaAbajo
    };

    localStorage.setItem('opciones', JSON.stringify(opciones));

    alert('Opciones guardadas correctamente.');
}

