Jugador = function()
{
    //Coordenadas de todos los aspectos del jugador.
    this.frente1X = "0px"; this.frente1Y = "0px";
    this.frente2X = "-80px"; this.frente2Y = "0px";
    this.frente3X = "-160px"; this.frente3Y = "0px";

    this.espalda1X = "0px"; this.espalda1Y = "-50px";
    this.espalda2X = "-80px"; this.espalda2Y = "-50px";
    this.espalda3X = "-160px"; this.espalda3Y = "-50px";

    this.derecha1X = "0px"; this.derecha1Y = "-100px";
    this.derecha2X = "-80px"; this.derecha2Y = "-100px";
    this.derecha3X = "-160px"; this.derecha3Y = "-100px";

    this.izquierda1X = "0px"; this.izquierda1Y = "-150px";
    this.izquierda2X = "-80px"; this.izquierda2Y = "-150px";
    this.izquierda3X = "-160px"; this.izquierda3Y = "-150px";

    this.victoria1X = "0px"; this.victoria1Y = "-200px";
    this.victoria2X = "-80px"; this.victoria2Y = "-200px";

    this.derrota1X = "-160px"; this.derrota1Y = "-200px";
    this.derrota2X = "0px"; this.derrota2Y = "-250px";
    this.derrota3X = "-80px"; this.derrota3Y = "-250px";
    this.derrota4X = "-160px"; this.derrota4Y = "-250px";

    this.posicionJugador = null; //Posición actual del jugador en el escenario.
    this.plantilla = "url(\"/Bomberman/sprites/jugador/plantilla.png\")";
    this.escenario = null; //Escenario en el que el jugador se moverá.
    this.enemigo = null;

    this.tiempoMovimiento1 = 100;
    this.tiempoMovimiento2 = 200;

    this.tiempoDerrota1 = 0;
    this.tiempoDerrota2 = 100;
    this.tiempoDerrota3 = 200;
    this.tiempoDerrota4 = 300;

    this.mirandoArriba = false;
    this.mirandoDerecha = false;
    this.mirandoAbajo = true;
    this.mirandoIzquierda = false;

    this.posicionArriba = null;
    this.posicionDerecha = null;
    this.posicionAbajo = null;
    this.posicionIzquierda = null;
}

//Método que permite indicarle al jugador en qué posición inicial se encuentra.
Jugador.prototype.crear = function()
{
    var casillaNueva = this.crearCasilla(this.frente1X, this.frente1Y);
    var cantidadCasillas = this.escenario.lastElementChild.childElementCount;
    var casillaJugador = cantidadCasillas - (cantidadCasillas - inicioJugador) - 1;
    
    this.posicionJugador = this.escenario.lastElementChild.childNodes[casillaJugador];
    this.posicionJugador.appendChild(casillaNueva);

    this.actualizar();
}

//Método para actualizar las casillas contiguas al jugador de forma dinámica.
Jugador.prototype.actualizar = function()
{
    var filaActual = this.posicionJugador.parentNode;
    var indice = this.posicionJugador.cellIndex;

    this.posicionArriba = filaActual.previousElementSibling !== null ? filaActual.previousElementSibling.childNodes[indice] : null;
    
    this.posicionAbajo = filaActual.nextElementSibling !== null ? filaActual.nextElementSibling.childNodes[indice] : null;

    this.posicionIzquierda = this.posicionJugador.previousElementSibling !== null ? this.posicionJugador.previousElementSibling : null;

    this.posicionDerecha = this.posicionJugador.nextElementSibling !== null ? this.posicionJugador.nextElementSibling : null;
}

//Método que permite el movimiento vertical hacia arriba.
Jugador.prototype.moverArriba = function()
{
    if(this.posicionArriba !== null && this.posicionArriba.firstElementChild === null)
    {
        var casillaNueva = this.crearCasilla(this.espalda2X, this.espalda2Y);

        this.posicionJugador.removeChild(this.posicionJugador.firstElementChild);
        this.posicionArriba.appendChild(casillaNueva);

        this.posicionJugador = this.posicionArriba;

        this.actualizar();
    }

    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.espalda3X, that.espalda3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.espalda1X, that.espalda1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = true;
    this.mirandoDerecha = false;
    this.mirandoAbajo = false;
    this.mirandoIzquierda = false;
}

//Método que permite el movimiento vertical hacia abajo.
Jugador.prototype.moverAbajo = function()
{
    if(this.posicionAbajo !== null && this.posicionAbajo.firstElementChild === null)
    {
        var casillaNueva = this.crearCasilla(this.frente2X, this.frente2Y);

        this.posicionJugador.removeChild(this.posicionJugador.firstElementChild);
        this.posicionAbajo.appendChild(casillaNueva);

        this.posicionJugador = this.posicionAbajo;

        this.actualizar();
    }

    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.frente3X, that.frente3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.frente1X, that.frente1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = false;
    this.mirandoDerecha = false;
    this.mirandoAbajo = true;
    this.mirandoIzquierda = false;
}

//Método que permite el movimiento lateral hacia la derecha.
Jugador.prototype.moverDerecha = function()
{
    if(this.posicionDerecha !== null && this.posicionDerecha.firstElementChild === null)
    {
        var casillaNueva = this.crearCasilla(this.derecha2X, this.derecha2Y);

        this.posicionJugador.removeChild(this.posicionJugador.firstElementChild);
        this.posicionDerecha.appendChild(casillaNueva);

        this.posicionJugador = this.posicionDerecha;

        this.actualizar();
    }

    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.derecha3X, that.derecha3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.derecha1X, that.derecha1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = false;
    this.mirandoDerecha = true;
    this.mirandoAbajo = false;
    this.mirandoIzquierda = false;
}

//Método que permite el movimiento lateral hacia la izquierda.
Jugador.prototype.moverIzquierda = function()
{
    if(this.posicionIzquierda !== null && this.posicionIzquierda.firstElementChild === null)
    {
        var casillaNueva = this.crearCasilla(this.izquierda2X, this.izquierda2Y);

        this.posicionJugador.removeChild(this.posicionJugador.firstElementChild);
        this.posicionIzquierda.appendChild(casillaNueva);

        this.posicionJugador = this.posicionIzquierda;

        this.actualizar();
    }

    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.izquierda3X, that.izquierda3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.izquierda1X, that.izquierda1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = false;
    this.mirandoDerecha = false;
    this.mirandoAbajo = false;
    this.mirandoIzquierda = true;
}

//Método que genera la casilla en la que se ubicará el jugador.
Jugador.prototype.crearCasilla = function(posicionX, posicionY)
{
    var casillaNueva = document.createElement("div");

    casillaNueva.classList.add("jugador");
    casillaNueva.style.background = this.plantilla;
    casillaNueva.style.backgroundPosition = posicionX + " " + posicionY;

    return casillaNueva;
}

//Método que permite realizar la animación de movimiento del jugador.
Jugador.prototype.realizarMovimiento = function(posicionX, posicionY)
{
    this.posicionJugador.firstElementChild.style.backgroundPosition = posicionX + " " + posicionY;
}

//Método que intentará crear una bomba dependiendo de a dónde esté mirando el jugador.
Jugador.prototype.colocarBomba = function()
{
    var bomba = new Bomba();

    if(this.mirandoArriba === true && this.posicionArriba.firstElementChild === null)
    {
        bomba.posicionBomba = this.posicionArriba;
    }
    else if(this.mirandoAbajo === true && this.posicionAbajo.firstElementChild === null)
    {
        bomba.posicionBomba = this.posicionAbajo;
    }
    else if(this.mirandoDerecha === true && this.posicionDerecha.firstElementChild === null)
    {
        bomba.posicionBomba = this.posicionDerecha;
    }
    else if(this.mirandoIzquierda === true && this.posicionIzquierda.firstElementChild === null)
    {
        bomba.posicionBomba = this.posicionIzquierda;
    }

    if(bomba.posicionBomba !== null)
    {
        bomba.escenario = this.escenario;
        bomba.jugador = this;
        bomba.enemigo = this.enemigo;
        
        bomba.crear();
    }
}

Jugador.prototype.ganar = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.victoria1X, that.victoria1Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.victoria2X, that.victoria2Y);}, this.tiempoMovimiento2);
}

Jugador.prototype.perder = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.derrota1X, that.derrota1Y);}, this.tiempoDerrota1);
    setTimeout(function(){that.realizarMovimiento(that.derrota2X, that.derrota2Y);}, this.tiempoDerrota2);
    setTimeout(function(){that.realizarMovimiento(that.derrota3X, that.derrota3Y);}, this.tiempoDerrota3);
    
    setTimeout(function()
    {
        that.realizarMovimiento(that.derrota4X, that.derrota4Y);
        that.posicionJugador.removeChild(that.posicionJugador.firstElementChild);
    }, this.tiempoDerrota4);

    clearInterval(this.enemigo.reaccion);
}