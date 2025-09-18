let textArea = document.querySelector("#text-input");
let startBtn = document.querySelector("#start-btn");
let stopBtn = document.querySelector("#stop-btn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your Browser does not support Speech Recognition");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

let finalTranscript = "";

recognition.onresult = (event) => {
  let interimTranscript = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;

    if (event.results[i].isFinal) {
      // ✅ final speech add ho jaayega
      finalTranscript += transcript + " ";
    } else {
      // ✅ live bolte waqt dikhana
      interimTranscript += transcript;
    }
  }

  // final + interim dono show karenge
  textArea.value = finalTranscript + interimTranscript;
};

recognition.onerror = (event) => {
  console.log("Error: ", event.error);
};

let isRecognizing = false;

startBtn.addEventListener("click", () => {
  if (!isRecognizing) {
    recognition.start();
    isRecognizing = true;
  }
});

stopBtn.addEventListener("click", () => {
  if (isRecognizing) {
    recognition.stop();
    isRecognizing = false;
  }
});

// Reset when recognition ends
recognition.onend = () => {
  isRecognizing = false;
};
