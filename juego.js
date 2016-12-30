var inicioJugador = 8; //El jugador empezará en la casilla 8.
var inicioEnemigo = 3; //El enemigo empezará en la casilla 3.
var juego = null;
var opciones = new Object();

window.addEventListener("DOMContentLoaded", function()
{
    var usuarioActual = sessionStorage.getItem("usuario");

    if(usuarioActual !== null)
    {
        opciones = {
            dificultad: document.getElementById("dificultad"),
            empezar: document.getElementById("empezar"),
            reiniciar: document.getElementById("reiniciar"),
            siguiente: document.getElementById("siguiente"),
            puntuacion: document.getElementById("puntuacion")
        };

        document.getElementById("jugador").innerHTML = usuarioActual;
        document.getElementById("score").innerHTML = "0";
        
        opciones.reiniciar.disabled = true;
        opciones.siguiente.disabled = true;

        document.getElementById("escenario").style.backgroundColor = "#000000";

        document.getElementById("datosJugador").addEventListener("click", function(event)
        {
            if(event.target.id !== undefined)
            {
                switch(event.target.id.toLowerCase())
                {
                    case "empezar":
                        comenzarJuego();
                        break;
                    case "reiniciar":
                        comenzarJuego();
                        break;
                    case "siguiente":
                        pasarNivel();
                        break;
                    case "puntuacion":
                        registrarPuntuacion();
                }
            }
        });
    }
    else
    {
        window.location.replace("/Bomberman/");
    }
});

//Función que comenzará el juego de cero.
function comenzarJuego()
{
    document.getElementById("score").innerHTML = "0";

    opciones.dificultad.disabled = true;
    opciones.reiniciar.disabled = false;
    opciones.empezar.disabled = true;

    if(juego !== null)
    {
        juego.escenario.destruir();
    }

    juego = new Juego();

    mostrarNivel();

    juego.comenzar();
}

//Función que recogerá los datos obtenidos en la partida y empezará otra partida con ellos.
function pasarNivel()
{
    opciones.siguiente.disabled = true;

    var dificultadActual = juego.dificultad;
    var scoreActual = juego.score;
    var nivelActual = juego.nivel + 1;

    juego.escenario.destruir();

    juego = new Juego();
    juego.nivel = nivelActual;
    juego.dificultad = dificultadActual;
    juego.score = scoreActual;

    mostrarNivel();

    juego.comenzar();
}

//Mostrará el nivel actual en el que se encuentra el jugador, y si puede seguir avanzando o no.
function mostrarNivel()
{
    if(juego.nivel < 3)
    {
        document.getElementById("siguiente").innerHTML = "Siguiente nivel (" + Number(juego.nivel + 1) + "/3)";
    }
    else
    {
        document.getElementById("siguiente").innerHTML = "¡No hay más!";
    }
}

function registrarPuntuacion()
{
    if(juego !== null)
    {
        var usuarioActual = sessionStorage.getItem("usuario");
        var scoreActual = juego.score;
        var dificultadActual = juego.dificultad;

        localStorage.setItem("scoreJugador", localStorage.getItem("scoreJugador") + usuarioActual + ";");
        localStorage.setItem("scorePuntuacion", localStorage.getItem("scorePuntuacion") + scoreActual + ";");
        localStorage.setItem("scoreDificultad", localStorage.getItem("scoreDificultad") + dificultadActual + ";");

        var jugadores = localStorage.getItem("scoreJugador");
        var puntuaciones = localStorage.getItem("scorePuntuacion");
        var dificultades = localStorage.getItem("scoreDificultad");

        jugadores = jugadores.substr(0, jugadores.length - 1).split(";");
        puntuaciones = puntuaciones.substr(0, puntuaciones.length - 1).split(";");
        dificultades = dificultades.substr(0, dificultades.length - 1).split(";");

        var temporal1;
        var temporal2;
        var temporal3;
        var i = 0;
        var j = 0;

        for(i = 0; i < puntuaciones.length; i++)
        {
            for(j = 0; j < puntuaciones.length - 1; j++)
            {
                if(Number(puntuaciones[j]) < Number(puntuaciones[j + 1]))
                {
                    temporal1 = puntuaciones[j];
                    temporal2 = jugadores[j];
                    temporal3 = dificultades[j];
                    
                    puntuaciones[j] = puntuaciones[j + 1];
                    jugadores[j] = jugadores[j + 1];
                    dificultades[j] = dificultades[j + 1];

                    puntuaciones[j + 1] = temporal1;
                    jugadores[j + 1] = temporal2;
                    dificultades[j + 1] = temporal3;
                }
            }
        }

        var cadena1 = "";
        var cadena2 = "";
        var cadena3 = "";
        var limite = 0;

        if(puntuaciones.length >= 10)
        {
            limite = 10;
        }
        else
        {
            limite = puntuaciones.length;
        }

        i = 0;
        while(i < limite)
        {
            cadena1 += puntuaciones[i] + ";";
            cadena2 += jugadores[i] + ";";
            cadena3 += dificultades[i] + ";";

            i++;
        }

        localStorage.setItem("scorePuntuacion", cadena1);
        localStorage.setItem("scoreJugador", cadena2);
        localStorage.setItem("scoreDificultad", cadena3);
    }
}

//Clase Juego, contendrá el escenario, el jugador y el enemigo, así como más datos de la partida.
Juego = function()
{
    this.nivel = 1;
    this.score = 0;
    this.dificultad = opciones.dificultad.value;

    this.escenario = null;
    this.jugador = null;
    this.enemigo = null;

    this.manejo = this.controlarJugador.bind(this);
}

Juego.prototype.comenzar = function()
{
    var that = this;

    this.escenario = new Escenario();
    this.jugador = new Jugador();
    this.enemigo = new Enemigo();

    this.escenario.escenario = document.getElementById("escenario");
    this.escenario.escenario.setAttribute("tabindex", 1);
    this.escenario.escenario.focus();
    this.escenario.escenario.addEventListener("keypress", that.manejo);

    this.jugador.escenario = this.escenario.escenario;
    this.enemigo.escenario = this.escenario.escenario;

    this.jugador.enemigo = this.enemigo;
    this.enemigo.jugador = this.jugador;

    this.escenario.crear();
    this.jugador.crear();
    this.enemigo.crear();
}

Juego.prototype.controlarJugador = function(event)
{
    var tecla = event.charCode;

    switch(tecla)
    {
        case 119: //Tecla W.
            this.jugador.moverArriba();
            break;
        case 97: //Tecla A.
            this.jugador.moverIzquierda();
            break;
        case 100: //Tecla D.
            this.jugador.moverDerecha();
            break;
        case 115: //Tecla S.
            this.jugador.moverAbajo();
            break;
        case 32: //Barra espaciadora.
            this.jugador.colocarBomba();
    }
}

Juego.prototype.actualizarScoreFacil = function()
{
    this.score += 25;
    document.getElementById("score").innerHTML = this.score;
}

Juego.prototype.actualizarScoreDificil = function()
{
    this.score += 50;
    document.getElementById("score").innerHTML = this.score;
}