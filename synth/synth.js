// Create a new Audio Context using the Web Audio API
var context = new AudioContext(),
  // Create a volume on the Audio Context Object
  volume = context.createGain(),
  // Create array(s) to hold the notes once played
  oscillatorsOne = {},
  oscillatorsTwo = {},
  oscillatorsThree = {},
  // Create an object to analyze the Audio Context Object
  analyser = context.createAnalyser(),
  // An array of unsigned 8-bit data values for visualization
  waveData = new Uint8Array(analyser.frequencyBinCount),
  // Reference to the DOM element for the canvas
  canvas = document.querySelector('#oscilloscope'),
  // 2D canvas
  canvasContext = canvas.getContext('2d'),
  // Canvas height and width
  canvasHeight = 150,
  canvasWidth = 587,
  // Piano keyboard object constructor (qwerty-hancock.js)
  keyboard = new QwertyHancock({
    id: 'keyboard', // DOM Element
    octaves: 3,
    startNote: 'A3'
  });

// Set the volume to 30%
volume.gain.value = 0.3;
// Connect the Volume to the speakers
volume.connect(context.destination);

// Keydown Event - Make sound - Paramaters: note played, frequency of the note played
keyboard.keyDown = function(note, frequency) {
  var oscillatorOne = context.createOscillator(),
    oscillatorTwo = context.createOscillator(),
    oscillatorThree = context.createOscillator(),
    gainNode = context.createGain(),
    osc_type_one = document.querySelector('#oscillator-one').value,
    osc_type_two = document.querySelector('#oscillator-two').value,
    osc_type_three = document.querySelector('#oscillator-three').value,
    chorus = document.querySelector('#chorus').value;

  gainNode.gain.value = 0.3;

  oscillatorsOne[note] = oscillatorOne;
  oscillatorsTwo[note] = oscillatorTwo;
  oscillatorsThree[note] = oscillatorThree;

  oscillatorOne.connect(volume);
  oscillatorTwo.connect(volume);
  oscillatorThree.connect(volume);

  oscillatorOne.type = osc_type_one;
  oscillatorTwo.type = osc_type_two;
  oscillatorThree.type = osc_type_three;

  oscillatorOne.frequency.value = frequency;
  oscillatorOne.detune.value = -chorus;

  oscillatorTwo.frequency.value = frequency;
  oscillatorTwo.detune.value = chorus;

  oscillatorThree.frequency.value = frequency;

  oscillatorOne.start(context.currentTime);
  oscillatorTwo.start(context.currentTime);
  oscillatorThree.start(context.currentTime);

  oscillatorOne.connect(gainNode);
  oscillatorTwo.connect(gainNode);
  oscillatorThree.connect(gainNode);

  gainNode.connect(analyser);
};

// Keyup Event - Stop  all oscillators from making sound
keyboard.keyUp = function(note, frequency) {
  oscillatorsTwo[note].stop(context.currentTime);
  oscillatorsTwo[note].disconnect();
  oscillatorsOne[note].stop(context.currentTime);
  oscillatorsOne[note].disconnect();
  oscillatorsThree[note].stop(context.currentTime);
  oscillatorsThree[note].disconnect();
};

/* Width of the data for the x-axis on the Oscilloscope calculated
	as the Canvas Width divided by the number of data values */
var xWidth = canvasWidth / analyser.frequencyBinCount;

// Function to display the data visualization
var draw = function() {
  requestAnimationFrame(function() {
    canvas.width = canvasWidth; // Clear the canvas on each frame

    analyser.getByteTimeDomainData(waveData);

    for (var i = 0; i < analyser.frequencyBinCount; i++) {
      var yPosition = waveData[i] / 256; // 1 is max 0 is min,
      xPosition = i * xWidth;

      yPosition = yPosition * canvasHeight;
      canvasContext.lineTo(xPosition, yPosition);
    }

    canvasContext.strokeStyle = '#e17418';
    canvasContext.stroke();
    // Constantly run this function after the first note is played
    draw();
  });
};
// Fire the draw function the first time
draw();
