AFRAME.registerComponent("player-movement", {
    //Componente para el efecto de caminar con sonido incluido
    init: function () {
        this.sound();
      },
      sound: function () {
        window.addEventListener("keydown", (e) => {
          // Añadir la condición para reproducir sonido
          if(e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight"){
            var sonido = document.querySelector("#step")
            sonido.components.sound.playSound()
          }
  
  
        });
      },
});

