tsParticles.load("particles",{

  particles:{

    number:{
      value:80
    },

    color:{
      value:"#00ffff"
    },

    links:{
      enable:true,
      color:"#00ffff"
    },

    move:{
      enable:true,
      speed:1
    },

    size:{
      value:2
    }

  }

});

const clock =
document.getElementById("clock");

setInterval(()=>{

  const now = new Date();

  clock.innerHTML =
  now.toLocaleTimeString();

},1000);

setInterval(()=>{

  document.getElementById("tempMonitor")
  .innerHTML =
  Math.floor(Math.random()*10+30)+"°C";

  document.getElementById("humidityMonitor")
  .innerHTML =
  Math.floor(Math.random()*40+40)+"%";

  document.getElementById("waterMonitor")
  .innerHTML =
  Math.floor(Math.random()*80)+" CM";

},2000);