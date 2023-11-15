  // Función para guardar las opciones en localStorage
  function guardarOpciones() {
    const teclaIzquierda = document.getElementById('teclaIzquierda').value.toUpperCase();
    const teclaDerecha = document.getElementById('teclaDerecha').value.toUpperCase();
    const teclaArriba = document.getElementById('teclaArriba').value.toUpperCase();
    const teclaAbajo = document.getElementById('teclaAbajo').value.toUpperCase();

    const teclaIzquierdaR = document.getElementById('teclaIzquierdaR').value.toUpperCase();
    const teclaDerechaR = document.getElementById('teclaDerechaR').value.toUpperCase();
    const teclaArribaR = document.getElementById('teclaArribaR').value.toUpperCase();
    const teclaAbajoR = document.getElementById('teclaAbajoR').value.toUpperCase();

    const opciones = {
        teclaIzquierda,
        teclaDerecha,
        teclaArriba,
        teclaAbajo,
        teclaIzquierdaR,
        teclaDerechaR,
        teclaArribaR,
        teclaAbajoR
    };


    localStorage.setItem('opciones', JSON.stringify(opciones));
    const opcionesGuardadas = localStorage.getItem('opciones');
    console.log(JSON.parse(opcionesGuardadas));
    alert('Opciones guardadas correctamente.'+opciones);
}

