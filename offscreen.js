chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // Check the message type or content
    //alert(message.volume)
    
    var audio = new Audio(message.source);
    

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createMediaElementSource(audio)
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = message.volume;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    audio.play();
  
  });