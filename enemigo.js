Enemigo = function()
{
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

    this.derrota1X = "-80px"; this.derrota1Y = "-200px";
    this.derrota2X = "-160px"; this.derrota2Y = "-200px";
    this.derrota3X = "0px"; this.derrota3Y = "-250px";
    this.derrota4X = "-80px"; this.derrota4Y = "-250px";

    this.reaccion = null;
    this.tiempoReaccion = 1000;

    this.posicionEnemigo = null;
    this.plantilla = "url(\"/Bomberman/sprites/enemigo/plantilla.png\")";
    this.escenario = null;
    this.jugador = null;

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
    this.posicionAbajo = null;
    this.posicionDerecha = null;
    this.posicionIzquierda = null;
}

//Método que permite indicarle al enemigo en qué posición inicial se encuentra.
Enemigo.prototype.crear = function()
{
    var casillaNueva = this.crearCasilla(this.frente1X, this.frente1Y);
    var cantidadCasillas = this.escenario.firstElementChild.childElementCount;
    var casillaEnemigo = cantidadCasillas - (cantidadCasillas - inicioEnemigo) - 1;

    this.posicionEnemigo = this.escenario.firstElementChild.childNodes[casillaEnemigo];
    this.posicionEnemigo.appendChild(casillaNueva);

    this.actualizar();

    var that = this;

    if(juego.dificultad == "facil")
    {
        this.tiempoReaccion = 1000;
    }
    else
    {
        this.tiempoReaccion = 500;
    }

    this.reaccion = setInterval(function()
    {
        that.realizarAccion();
    }, this.tiempoReaccion);
}

//Método que permitirá al enemigo realizar una acción determinada.
Enemigo.prototype.realizarAccion = function()
{
    var tipoAccion = Math.floor((Math.random()) * ((10 - 1) + 1 + 1));

    switch(tipoAccion)
    {
        case 1:
            this.moverArriba();
            break;
        case 2:
            this.moverDerecha();
            break;
        case 3:
            this.moverAbajo();
            break;
        case 4:
            this.moverIzquierda();
            break;
        default:
            this.colocarBomba();
    }
}

//Método para actualizar las casillas contiguas al enemigo de forma dinámica.
Enemigo.prototype.actualizar = function()
{
    var filaActual = this.posicionEnemigo.parentNode;
    var indice = this.posicionEnemigo.cellIndex;

    this.posicionArriba = filaActual.previousElementSibling !== null ? filaActual.previousElementSibling.childNodes[indice] : null;
    
    this.posicionAbajo = filaActual.nextElementSibling !== null ? filaActual.nextElementSibling.childNodes[indice] : null;

    this.posicionIzquierda = this.posicionEnemigo.previousElementSibling !== null ? this.posicionEnemigo.previousElementSibling : null;

    this.posicionDerecha = this.posicionEnemigo.nextElementSibling !== null ? this.posicionEnemigo.nextElementSibling : null;
}

//Método que permite el movimiento vertical hacia arriba.
Enemigo.prototype.moverArriba = function()
{
    if(this.posicionArriba !== null && this.posicionArriba.firstElementChild === null)
    {
        if(this.comprobarBomba(this.posicionArriba) === false)
        {
            var casillaNueva = this.crearCasilla(this.espalda2X, this.espalda2Y);

            this.posicionEnemigo.removeChild(this.posicionEnemigo.firstElementChild);
            this.posicionArriba.appendChild(casillaNueva);

            this.posicionEnemigo = this.posicionArriba;

            this.actualizar();

            this.prepararArriba();
        }
    }
    else
    {
        this.prepararArriba();
    }
}

Enemigo.prototype.prepararArriba = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.espalda3X, that.espalda3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.espalda1X, that.espalda1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = true;
    this.mirandoDerecha = false;
    this.mirandoAbajo = false;
    this.mirandoIzquierda = false;
}

//Método que permite el movimiento vertical hacia abajo.
Enemigo.prototype.moverAbajo = function()
{
    if(this.posicionAbajo !== null && this.posicionAbajo.firstElementChild === null)
    {
        if(this.comprobarBomba(this.posicionAbajo) === false)
        {
            var casillaNueva = this.crearCasilla(this.frente2X, this.frente2Y);

            this.posicionEnemigo.removeChild(this.posicionEnemigo.firstElementChild);
            this.posicionAbajo.appendChild(casillaNueva);

            this.posicionEnemigo = this.posicionAbajo;

            this.actualizar();

            this.prepararAbajo();
        }
    }
    else
    {
        this.prepararAbajo();
    }
}

Enemigo.prototype.prepararAbajo = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.frente3X, that.frente3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.frente1X, that.frente1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = false;
    this.mirandoDerecha = false;
    this.mirandoAbajo = true;
    this.mirandoIzquierda = false;
}

//Método que permite el movimiento lateral hacia la derecha.
Enemigo.prototype.moverDerecha = function()
{
    if(this.posicionDerecha !== null && this.posicionDerecha.firstElementChild === null)
    {
        if(this.comprobarBomba(this.posicionDerecha) === false)
        {
            var casillaNueva = this.crearCasilla(this.derecha2X, this.derecha2Y);

            this.posicionEnemigo.removeChild(this.posicionEnemigo.firstElementChild);
            this.posicionDerecha.appendChild(casillaNueva);

            this.posicionEnemigo = this.posicionDerecha;

            this.actualizar();

            this.prepararDerecha();
        }
    }
    else
    {
        this.prepararDerecha();
    }
}

Enemigo.prototype.prepararDerecha = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.derecha3X, that.derecha3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.derecha1X, that.derecha1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = false;
    this.mirandoDerecha = true;
    this.mirandoAbajo = false;
    this.mirandoIzquierda = false;
}

//Método que permite el movimiento lateral hacia la izquierda.
Enemigo.prototype.moverIzquierda = function()
{
    var that  = this;

    if(this.posicionIzquierda !== null && this.posicionIzquierda.firstElementChild === null)
    {
        if(this.comprobarBomba(this.posicionIzquierda) === false)
        {
            var casillaNueva = this.crearCasilla(this.izquierda2X, this.izquierda2X);

            this.posicionEnemigo.removeChild(this.posicionEnemigo.firstElementChild);
            this.posicionIzquierda.appendChild(casillaNueva);

            this.posicionEnemigo = this.posicionIzquierda;

            this.actualizar();

            this.prepararIzquierda();
        }
    }
    else
    {
        this.prepararIzquierda();
    }
}

Enemigo.prototype.prepararIzquierda = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.izquierda3X, that.izquierda3Y);}, this.tiempoMovimiento1);
    setTimeout(function(){that.realizarMovimiento(that.izquierda1X, that.izquierda1Y);}, this.tiempoMovimiento2);

    this.mirandoArriba = false;
    this.mirandoDerecha = false;
    this.mirandoAbajo = false;
    this.mirandoIzquierda = true;
}

//Método que genera la casilla en la que se ubicará el enemigo.
Enemigo.prototype.crearCasilla = function(posicionX, posicionY)
{
    var casillaNueva = document.createElement("div");
    
    casillaNueva.classList.add("enemigo");
    casillaNueva.style.background = this.plantilla;
    casillaNueva.style.backgroundPosition = posicionX + " " + posicionY;

    return casillaNueva;
}

//Método que permite realizar la animación de movimiento del enemigo.
Enemigo.prototype.realizarMovimiento = function(posicionX, posicionY)
{
    this.posicionEnemigo.firstElementChild.style.backgroundPosition = posicionX + " " + posicionY;
}

//Método que verifica si hay una bomba cercana a la casilla a la que se va a mover el enemigo.
Enemigo.prototype.comprobarBomba = function(posicion)
{
    var bombaEncontrada = false;
    var filaActual = posicion.parentNode;
    var indice = posicion.cellIndex;

    if(filaActual.previousElementSibling !== null)
    {
        if(filaActual.previousElementSibling.childNodes[indice].firstElementChild !== null
            && filaActual.previousElementSibling.childNodes[indice].firstElementChild.classList.contains("bomba"))
        {
            bombaEncontrada = true;
        }
    }

    if(filaActual.nextElementSibling !== null)
    {
        if(filaActual.nextElementSibling.childNodes[indice].firstElementChild !== null
            && filaActual.nextElementSibling.childNodes[indice].firstElementChild.classList.contains("bomba"))
        {
            bombaEncontrada = true;
        }
    }

    if(posicion.previousElementSibling !== null)
    {
        if(posicion.previousElementSibling.firstElementChild !== null
            && posicion.previousElementSibling.firstElementChild.classList.contains("bomba"))
        {
            bombaEncontrada = true;
        }
    }

    if(posicion.nextElementSibling !== null)
    {
        if(posicion.nextElementSibling.firstElementChild !== null
            && posicion.nextElementSibling.firstElementChild.classList.contains("bomba"))
        {
            bombaEncontrada = true;
        }
    }

    return bombaEncontrada;
}

//Método que intentará crear una bomba dependiendo de a dónde esté mirando el enemigo.
Enemigo.prototype.colocarBomba = function()
{
    var bomba = new Bomba();

    if(this.mirandoArriba === true && (this.posicionArriba !== null && this.posicionArriba.firstElementChild === null))
    {
        bomba.posicionBomba = this.posicionArriba;
    }
    else if(this.mirandoAbajo === true && (this.posicionAbajo !== null && this.posicionAbajo.firstElementChild === null))
    {
        bomba.posicionBomba = this.posicionAbajo;
    }
    else if(this.mirandoDerecha === true && (this.posicionDerecha !== null && this.posicionDerecha.firstElementChild === null))
    {
        bomba.posicionBomba = this.posicionDerecha;
    }
    else if(this.mirandoIzquierda === true && (this.posicionDerecha !== null &&this.posicionIzquierda.firstElementChild === null))
    {
        bomba.posicionBomba = this.posicionIzquierda;
    }

    if(bomba.posicionBomba !== null)
    {
        bomba.escenario = this.escenario;
        bomba.jugador = this.jugador;
        bomba.enemigo = this;

        this.posicionBomba = bomba.posicionBomba;
        
        bomba.crear();
        this.evitarBomba();
    }
}

//Método que permite al enemigo saber a dónde moverse si ha colocado una bomba.
Enemigo.prototype.evitarBomba = function()
{
    if(this.mirandoArriba === true)
    {
        if(this.posicionDerecha !== null && this.posicionDerecha.firstElementChild === null)
        {
            this.moverDerecha();
        }
        else if(this.posicionAbajo !== null && this.posicionAbajo.firstElementChild === null)
        {
            this.moverAbajo();
        }
        else if(this.posicionIzquierda !== null && this.posicionIzquierda.firstElementChild === null)
        {
            this.moverIzquierda();
        }
    }
    else if(this.mirandoDerecha === true)
    {
        if(this.posicionArriba !== null && this.posicionArriba.firstElementChild === null)
        {
            this.moverArriba();
        }
        else if(this.posicionAbajo !== null && this.posicionAbajo.firstElementChild === null)
        {
            this.moverAbajo();
        }
        else if(this.posicionIzquierda !== null && this.posicionIzquierda.firstElementChild === null)
        {
            this.moverIzquierda();
        }
    }
    else if(this.mirandoAbajo === true)
    {
        if(this.posicionArriba !== null && this.posicionArriba.firstElementChild === null)
        {
            this.moverArriba();
        }
        else if(this.posicionDerecha !== null && this.posicionDerecha.firstElementChild === null)
        {
            this.moverDerecha();
        }
        else if(this.posicionIzquierda !== null && this.posicionIzquierda.firstElementChild === null)
        {
            this.moverIzquierda();
        }
    }
    else if(this.mirandoIzquierda === true)
    {
        if(this.posicionArriba !== null && this.posicionArriba.firstElementChild === null)
        {
            this.moverArriba();
        }
        else if(this.posicionDerecha !== null && this.posicionDerecha.firstElementChild === null)
        {
            this.moverDerecha();
        }
        else if(this.posicionAbajo !== null && this.posicionAbajo.firstElementChild === null)
        {
            this.moverAbajo();
        }
    }
}

Enemigo.prototype.ganar = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.victoria1X, that.victoria1Y);}, this.tiempoMovimiento1);
}

Enemigo.prototype.perder = function()
{
    var that = this;

    setTimeout(function(){that.realizarMovimiento(that.derrota1X, that.derrota1Y);}, this.tiempoDerrota1);
    setTimeout(function(){that.realizarMovimiento(that.derrota2X, that.derrota2Y);}, this.tiempoDerrota2);
    setTimeout(function(){that.realizarMovimiento(that.derrota3X, that.derrota3Y);}, this.tiempoDerrota3);

    setTimeout(function()
    {
        that.realizarMovimiento(that.derrota4X, that.derrota4Y);
        that.posicionEnemigo.removeChild(that.posicionEnemigo.firstElementChild);
    }, this.tiempoDerrota4)

    clearInterval(this.reaccion);
}