var analyser, canvas, ctx, random = Math.random, circles = [];



window.onload = function() {
    getRandomColor()
    var buttonplay = document.getElementById('daplay');
    buttonplay.addEventListener('click',function() {
        canvas = document.createElement('canvas');
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        setupWebAudio();
        draw();
    })
};

function setupWebAudio() {
    var audio = document.createElement('audio');
    audio.src = 'talk.mp3';
    audio.controls = 'true';
    audio.loop = 'true';
    document.body.appendChild(audio);
    audio.style.width = window.innerWidth + 'px';
    
    var audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    audio.play();
  
}

function getRandomColor(){
   return random() * 255 >> 0;
}

var encrementa = 0;

function draw() {
    requestAnimationFrame(draw);
    var freqByteData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqByteData);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var sum = freqByteData.reduce(function(a, b) { return a + b; }, 0);
    
    function getArea(areain, areaout, position, posx, largura, limiter) {
        let areagrave = freqByteData.slice(areain,areaout);
        var peakergrave = areagrave.reduce(function(a, b) { return a + b; }, 0);
        let cor = '#FF0000';
        if (peakergrave > limiter) {

       
        encrementa = encrementa + 1;
        if(encrementa > 254) {
            encrementa = 0
        }

        console.log(encrementa)
        
        ctx.fillStyle =`rgba(0,${Math.floor(255 - 42.5 * encrementa)}, 100 ,0.6)`
        ctx.beginPath();
        ctx.arc(position, posx, sum / 2000 ,0, 2* Math.PI)
        ctx.fill();
        }  
    }
 
    getArea(0,100,100,100, 100, 13000)

    getArea(400,500,100,500,300,10000)

    getArea(601,900,100,300,100,1000)  
    
    //segunda fileira

    getArea(0,100,300,100, 100, 13000)

    getArea(400,500,300,500,300,10000)

    getArea(601,900,300,300,100,1000)  

     //terceira fileira

     getArea(0,100,500,100, 100, 13000)

     getArea(400,500,500,500,300,10000)
 
     getArea(601,900,500,300,100,1000)

}
