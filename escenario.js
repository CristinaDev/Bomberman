Escenario = function()
{
    this.escenario = null;
    this.plantilla = "url(\"/Bomberman/sprites/escenario/plantilla.png\")";

    this.muñecoX = "0px"; this.muñecoY = "-50px"; //Coordenadas para los muñecos de nieve.
    this.nieveX = "-80px"; this.nieveY = "0px"; //Coordenadas para los bloques de nieve.

    this.posicionJugador = null; //Posición que el escenario preparará para que el jugador empiece a jugar.
    this.posicionEnemigo = null; //Posición que el escenario preparará para que el enemigo empiece a jugar.
}

//Método para crear un escenario completo.
Escenario.prototype.crear = function()
{
    var ancho = 10; //anchoCelda * (var ancho) = 100%
    var alto = 10; //altoFila * (var alto) = 100%
    var i = 0;
    var j = 0;

    var filaNueva = null;
    var casillaNueva = null;

    for(i = 0; i < alto; i++)
    {
        filaNueva = document.createElement("tr");
        filaNueva.classList.add("fila");

        this.escenario.appendChild(filaNueva);

        for(j = 0; j < ancho; j++)
        {
            casillaNueva = document.createElement("td");
            casillaNueva.classList.add("celda");

            this.escenario.lastElementChild.appendChild(casillaNueva);

            this.prepararCasilla(casillaNueva);
        }
    }

    this.inicioJugador();
    this.inicioEnemigo();
}

//Método que permite borrar el escenario ya creado.
Escenario.prototype.destruir = function()
{
    var ancho = 10;
    var alto = 10;
    var i = 0;
    var j = 0;

    for(i = 0; i < alto; i++)
    {
        for(j = 0; j < ancho; j++)
        {
            this.escenario.lastElementChild.removeChild(this.escenario.lastElementChild.lastElementChild);
        }

        this.escenario.removeChild(this.escenario.lastElementChild);
    }
}

//Método para generar una casilla del escenario.
Escenario.prototype.prepararCasilla = function(casillaNueva)
{
    var indice = casillaNueva.cellIndex;
    var longitudFila = 9;

    if(indice > 0 && indice < longitudFila)
    {
        var tipoCasilla = Math.floor((Math.random()) * ((100 - 0) + 1 + 0));

        if(tipoCasilla >= 60)
        {
            this.crearCasilla(casillaNueva, "nieve", this.nieveX, this.nieveY);
        }
        else if(tipoCasilla >= 50 && tipoCasilla < 60)
        {
            this.crearCasilla(casillaNueva, "muñeco", this.muñecoX, this.muñecoY);
        }
    }
    else
    {
        this.crearCasilla(casillaNueva, "muñeco", this.muñecoX, this.muñecoY);
    }
}

Escenario.prototype.crearCasilla = function(casillaNueva, clase, posicionX, posicionY)
{
    casillaNueva.appendChild(document.createElement("div"));
    casillaNueva.lastElementChild.classList.add(clase);
    casillaNueva.lastElementChild.style.background = this.plantilla;
    casillaNueva.lastElementChild.style.backgroundPosition = posicionX + " " + posicionY;
}

//Método que permite establecer una posición de inicio para el jugador.
Escenario.prototype.inicioJugador = function()
{
    var cantidadCasillas = this.escenario.lastElementChild.childElementCount;
    var casillaJugador = cantidadCasillas - (cantidadCasillas - inicioJugador) - 1;
    
    this.posicionJugador = this.escenario.lastElementChild.childNodes[casillaJugador];

    if(this.posicionJugador.firstElementChild !== null)
    {
        this.posicionJugador.removeChild(this.posicionJugador.firstElementChild);
    }

    if(this.posicionJugador.previousElementSibling !== null
        && this.posicionJugador.previousElementSibling.firstElementChild !== null)
    {
        this.posicionJugador.previousElementSibling.removeChild(this.posicionJugador.previousElementSibling.firstElementChild);
    }

    if(this.posicionJugador.nextElementSibling !== null
        && this.posicionJugador.nextElementSibling.firstElementChild !== null)
    {
        this.posicionJugador.nextElementSibling.removeChild(this.posicionJugador.nextElementSibling.firstElementChild);
    }
}

//Método que permite establecer una posición de inicio para el enemigo.
Escenario.prototype.inicioEnemigo = function()
{
    var cantidadCasillas = this.escenario.lastElementChild.childElementCount;
    var casillaEnemigo = cantidadCasillas - (cantidadCasillas - inicioEnemigo) - 1;

    this.posicionEnemigo = this.escenario.firstElementChild.childNodes[casillaEnemigo];

    if(this.posicionEnemigo.firstElementChild !== null)
    {
        this.posicionEnemigo.removeChild(this.posicionEnemigo.firstElementChild);
    }

    if(this.posicionEnemigo.previousElementSibling !== null
        && this.posicionEnemigo.previousElementSibling.firstElementChild !== null)
    {
        this.posicionEnemigo.previousElementSibling.removeChild(this.posicionEnemigo.previousElementSibling.firstElementChild);
    }

    if(this.posicionEnemigo.nextElementSibling !== null
        && this.posicionEnemigo.nextElementSibling.firstElementChild !== null)
    {
        this.posicionEnemigo.nextElementSibling.removeChild(this.posicionEnemigo.nextElementSibling.firstElementChild);
    }
}