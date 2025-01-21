// Init SpeechSynth API
const synth = window.speechSynthesis;
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
const pauseResumeBtn = document.querySelector('#pause-resume-btn');

let voices = [];
let isPaused = false;

// Get voices and populate the select options
const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Pause and Resume functionality
pauseResumeBtn.addEventListener('click', () => {
  if (synth.speaking) {
    if (isPaused) {
      synth.resume();
      pauseResumeBtn.textContent = 'Pause';
      body.style.background = '#141414 url(./wave.gif)';
      body.style.backgroundRepeat = 'repeat-x';
      body.style.backgroundSize = '100% 100%';
      isPaused = false;
    } else {
      synth.pause();
      pauseResumeBtn.textContent = 'Resume';
      body.style.background = '#141414'; // Stop the animation when paused
      isPaused = true;
    }
  }
});

// Speak function
const speak = () => {
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {
    body.style.background = '#141414 url(./wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = () => {
      body.style.background = '#141414';
    };

    speakText.onerror = () => {
      console.error('Something went wrong');
    };

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
};

// Event listeners
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener('change', e => (rateValue.textContent = rate.value));
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
voiceSelect.addEventListener('change', e => speak());
