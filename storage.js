/**
 * Plays audio files from extension service workers
 * @param {string} source - path of the audio file
 * @param {number} volume - volume of the playback
 */
// chrome.offscreen.createDocument({
//     url: 'off_screen.html',
//     reasons: ['AUDIO_PLAYBACK'],
//     justification: 'testing' // details for using the API
// });
var chance = getChance();
chance = parseFloat(chance) / 100;

async function playSound(source = 'default.wav', volume = 1) {
    await createOffscreen();
    await chrome.runtime.sendMessage({source: source, volume: volume });

}

// // Create the offscreen document if it doesn't already exist
async function createOffscreen() {
    if (await chrome.offscreen.hasDocument()) return;
    await chrome.offscreen.createDocument({
        url: 'off_screen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'testing' // details for using the API
    });
   
}

setInterval(async function() {
    var chance = await getChance();
    chance = parseFloat(chance) / 100;
    //console.log(parseFloat(chance));

    if(Math.random() <= chance) {
        var sound = await getAudio();
        var volume = await getVolume();
        
        
        
        //console.log("ping");
        playSound(sound, (volume / 100.0));
    }
    //chrome.runtime.sendMessage({ play: { source, volume } });
    
    //console.log("ping")
    
}, 1000)
async function getAudio() {
    var temp;
    
    
    const result = await chrome.storage.local.get(["audio"])
    if(!(result.audio === undefined)) {
        temp = result.audio;
        //alert(result.audio);
        return temp
    }
    return "Metal Pipe.mp3";  
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
async function getChance() {
    var temp;
    
    
    const result = await chrome.storage.local.get(["chance"])
    if(!(result.chance === undefined)) {
        temp = result.chance;
        //alert(result.volume);
        return temp
    }
    return 0.1;  
}
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

