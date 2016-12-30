Bomba = function()
{
    //Coordenadas con los aspectos de las bombas.
    this.bomba1X = "-80px"; this.bomba1Y = "-50px";
    this.bomba2X = "-160px"; this.bomba2Y = "-50px";
    this.bomba3X = "0px"; this.bomba3Y = "-100px";

    this.nieve2X = "-160px"; this.nieve2Y = "0px";

    this.posicionBomba = null; //Posición en la que se colocará la bomba.
    this.posicionesContiguas = new Array();
    this.plantilla = "url(\"/Bomberman/sprites/escenario/plantilla.png\")";

    this.tiempoEstado1 = 1000;
    this.tiempoEstado2 = 2000;
    this.tiempoEstado3 = 2200;

    this.jugador = null;
    this.enemigo = null;
    this.escenario = null;
}

Bomba.prototype.crear = function()
{
    var casillaNueva = document.createElement("div");
    
    casillaNueva.classList.add("bomba");
    casillaNueva.style.background = this.plantilla;
    casillaNueva.style.backgroundPosition = this.bomba1X + " " + this.bomba1Y;

    this.posicionBomba.appendChild(casillaNueva);

    this.actualizar();

    var that = this;

    setTimeout(function(){that.cambiarEstado(that.bomba2X, that.bomba2Y);}, this.tiempoEstado1);
    setTimeout(function(){that.cambiarEstado(that.bomba3X, that.bomba3Y);}, this.tiempoEstado2);
    setTimeout(function(){that.explotar();}, this.tiempoEstado3);
}

//Método que permite tener localizadas las casillas contiguas de cada bomba.
Bomba.prototype.actualizar = function()
{
    var filaActual = this.posicionBomba.parentNode;
    var indice = this.posicionBomba.cellIndex;

    if(filaActual.previousElementSibling !== null)
    {
        this.posicionesContiguas.push(filaActual.previousElementSibling.childNodes[indice]);
    }

    if(filaActual.nextElementSibling !== null)
    {
        this.posicionesContiguas.push(filaActual.nextElementSibling.childNodes[indice]);
    }

    if(this.posicionBomba.previousElementSibling !== null)
    {
        this.posicionesContiguas.push(this.posicionBomba.previousElementSibling);
    }

    if(this.posicionBomba.nextElementSibling !== null)
    {
        this.posicionesContiguas.push(this.posicionBomba.nextElementSibling);
    }
}

Bomba.prototype.explotar = function()
{
    var that = this;
    
    Array.from(this.posicionesContiguas).forEach(function(nodo)
    {
        if(nodo.firstElementChild !== null)
        {
            if(nodo.firstElementChild.classList.contains("nieve") && juego.dificultad == "facil")
            {
                nodo.removeChild(nodo.firstElementChild);
                juego.actualizarScoreFacil();
            }
            else if(nodo.firstElementChild.classList.contains("nieve") && juego.dificultad == "dificil")
            {
                nodo.removeChild(nodo.firstElementChild);
                juego.actualizarScoreFacil();

                var casillaNueva = document.createElement("div");
                
                casillaNueva.classList.add("nieve2");
                casillaNueva.style.background = that.plantilla;
                casillaNueva.style.backgroundPosition = that.nieve2X + " " + that.nieve2Y;

                nodo.appendChild(casillaNueva);
            }
            else if(nodo.firstElementChild.classList.contains("nieve2"))
            {
                nodo.removeChild(nodo.firstElementChild);
                juego.actualizarScoreDificil();
            }
            else if(nodo.firstElementChild.classList.contains("jugador"))
            {
                that.jugador.perder();
                that.enemigo.ganar();
                that.escenario.removeEventListener("keypress", juego.manejo);
            }
            else if(nodo.firstElementChild.classList.contains("enemigo"))
            {
                that.jugador.ganar();
                that.enemigo.perder();
                that.escenario.removeEventListener("keypress", juego.manejo);

                if(juego.nivel < 3)
                {
                    opciones.siguiente.disabled = false;
                }
            }
        }
    });

    this.posicionBomba.removeChild(this.posicionBomba.firstElementChild);
}

Bomba.prototype.cambiarEstado = function(posicionX, posicionY)
{
    this.posicionBomba.firstElementChild.style.backgroundPosition = posicionX + " " + posicionY;
}