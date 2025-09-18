let voices = [];
let speech = new SpeechSynthesisUtterance(); // ✅ ek hi baar global banaya
let voiceSelect = document.querySelector("select");

// jab voices load ho
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  voices.forEach((voice, index) => {
    voiceSelect.options[index] = new Option(voice.name, index);
  });

  // default me pehle voice
  speech.voice = voices[0];
};

// jab user voice change kare
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value]; // ✅ sirf tab change ho jab tum chaho
});

// jab button click ho
document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;

  window.speechSynthesis.cancel(); // agar pehle se bol raha hai to stop karo
  window.speechSynthesis.speak(speech);
});
