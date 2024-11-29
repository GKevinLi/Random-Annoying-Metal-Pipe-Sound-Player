var enterButton = document.getElementById("EnterButton");
var enterButton1 = document.getElementById("EnterButton1");
var enterButton2 = document.getElementById("EnterButton2");
var enterButton3 = document.getElementById("EnterButton3");
var input = document.getElementById("input");
const regex = new RegExp("\d+");



enterButton.onclick = async function() {
    
    var val1 = await getAudio();
    var val2 = await getVolume();
    var audio;
    if(val1 === "No Audio") {
        audio = new Audio("Metal Pipe.mp3");
    }
    else {
        audio = new Audio(val1);
    }

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createMediaElementSource(audio)
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = (val2 / 100.0);
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    audio.play();
}
enterButton1.onclick = function() {
    if(document.getElementById('input').value != null) {
        if(isSound(document.getElementById('input').value)) {
            

            const reader = new FileReader();
            //const blob = new Blob([document.getElementById('input').value], { type: "mp3" })
            //alert(blob instanceof Blob);
            
            reader.onload = function(){
                
                var str = this.result;
                //console.log(str);
                //alert(str);
                chrome.storage.local.set({"audio": str}).then(() => {
                });
                
                
            };
            reader.readAsDataURL(input.files[0]);
            
            document.getElementById('input').value = null;
        }
    }

}
// input.onchange = e => {
//     if(input.files[0].type.indexOf('audio/') !== 0){
//         alert('not an audio file');
//         return;
//     }
    
// }


enterButton2.onclick = function() {
    if(document.getElementById('numInput').value != "") {
        
        if(parseInt(document.getElementById('numInput').value) >= 0) {
            //alert(parseInt(document.getElementById('numInput').value));
            chrome.storage.local.set({"volume": document.getElementById('numInput').value}).then(() => {
            });
            document.getElementById('numInput').value = null;
            
        }
    }

}
enterButton3.onclick = function() {
    if(document.getElementById('numInput2').value != "") {
        
        if(parseInt(document.getElementById('numInput2').value) >= 0) {
            //alert(parseInt(document.getElementById('numInput').value));
            chrome.storage.local.set({"chance": document.getElementById('numInput2').value}).then(() => {
            });
            document.getElementById('numInput2').value = null;
            
        }
    }

}
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
function isSound(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'mp3':
      
        //etc
        return true;
    }
    return false;
  }

async function getAudio() {
    var temp;
    
    
    const result = await chrome.storage.local.get(["audio"])
    if(!(result.audio === undefined)) {
        temp = result.audio;
        //alert(result.audio);
        return temp
    }
    return "No Audio";  
}
async function getVolume() {
    var temp;
    
    
    const result = await chrome.storage.local.get(["volume"])
    if(!(result.volume === undefined)) {
        temp = result.volume;
        //alert(result.volume);
        return temp
    }
    return 100;  
}
function base64ToArrayBuffer(base64) {
    var binaryString =  window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
