AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  //Función para disparar las bolas de pintura
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //Obtener la dirección de la cámara como un vector de Three.js
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //Establecer la velocidad y su dirección
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));
        var scene = document.querySelector("#scene");

        //Establecer la bala como una entidad dinámica
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        //Agregar un escucha de eventos de colisión a la bala
        bullet.addEventListener("collide", this.removeBullet);
        
        //Agregar la bala como hija de la escena
        scene.appendChild(bullet);

        //Sonido de disparo
        this.shootSound();
      }
    });
  },

  //Función para eliminar la bala y generar mancha de pintura
  removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    //Elemento de la bala
    var element = e.detail.target.el;

    //Elemento que es golpeado
    var elementHit = e.detail.body.el;

    //Crear una mancha de pintura con los siguientes pasos:
    //1.-Crear una entidad
    var paint = document.createElement("a-entity")

    //2.-Obtener atributo de posicion de la bala
    var pos=element.getAttribute("position")

    //3.-Obtener atributo de rotacion del elemento golpeado
    var rota=elementHit.getAttribute("rotation")

    //4.-Asignar el atributo de posición para la mancha según la posición de la bala
    paint.setAttribute("position", {x:pos.x, y:pos.y, z:pos.z})

    //5.-Asignar el atributo de rotación para la mancha según la rotación del elemento golpeado
    paint.setAttribute("rotation", {x:rota.x, y:rota.y, z:rota.z})

    //6.-Asignar el atributo de escala para la mancha como 2 2 2
    paint.setAttribute("scale", {x:2, y:2, z:2,})

    //7.-Variable que guarde numero aleatorio entre 1 y 8
    var num = parseInt(Math.random()* 8 + 1)

    //8.-Completar el atributo del material con el nombre de la imagen de mancha a elegir según el numero aleatorio
    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./images/paint splash-0" + num + ".png"
    });
   
    //9.-Asignar el atributo de geometria para la mancha como un plano
    paint.setAttribute("geometry", {
      primitive:"plane",
      width:0.5,
      height:0.5
    })

    //10.-Agregar la mancha como hija de la escena
    scene.appendChild(paint)

    //Eliminar escucha de evento
    element.removeEventListener("collide", this.removeBullet);

    //Remover las balas de la escena      
    scene.removeChild(element);
  },
  //Función para reproducir sonido de disparo de mancha
  shootSound: function () {
    var entity = document.querySelector("#splash");
    entity.components.sound.playSound();
  },
});

