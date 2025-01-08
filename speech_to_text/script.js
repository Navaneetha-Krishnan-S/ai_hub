if (!('webkitSpeechRecognition' in window)) {
    alert('Sorry, your browser does not support speech recognition.');
  } else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
  
    const output = document.getElementById('output');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const generateButton = document.getElementById('generate');
    const resetButton = document.getElementById('reset');
    const indicator = document.getElementById('indicator');
    const statusText = document.getElementById('status-text');
  
    let idleTimer; // Timer for idle detection
    const idleTimeLimit = 5000; // Time in milliseconds (5 seconds)
    let finalTranscript = ''; // Store the full transcript
  
    // Update indicator status
    const updateIndicator = (color, text) => {
      indicator.style.backgroundColor = color;
      statusText.textContent = text;
    };
  
    // Clear idle timer
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        updateIndicator('orange', 'Idle');
      }, idleTimeLimit);
    };
  
    // Start recognition
    startButton.addEventListener('click', () => {
      recognition.start();
      updateIndicator('green', 'Listening...');
      resetIdleTimer();
    });
  
    // Stop recognition
    stopButton.addEventListener('click', () => {
      recognition.stop();
      updateIndicator('red', 'Stopped');
      clearTimeout(idleTimer);
    });
  
    // Reset button functionality
    resetButton.addEventListener('click', () => {
      finalTranscript = ''; // Clear the full transcript
      output.textContent = 'Speech will appear here...';
      updateIndicator('blue', 'Reset');
    });
  
    // Capture speech result
    recognition.onresult = (event) => {
      let interimTranscript = ''; // For storing interim results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript; // Append final result to the full transcript
        } else {
          interimTranscript += result[0].transcript; // Capture interim results
        }
      }
      output.textContent = finalTranscript + interimTranscript; // Combine final and interim results
      resetIdleTimer(); // Reset idle timer after new input
    };
  
    // Handle errors
    recognition.onerror = (event) => {
      updateIndicator('orange', 'Error');
      output.textContent = `Error occurred: ${event.error}`;
      clearTimeout(idleTimer);
    };
  
    // Generate and download text file
    generateButton.addEventListener('click', () => {
      const textContent = finalTranscript.trim();
      if (textContent === '') {
        alert('No content available to generate a file.');
        return;
      }
  
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'speech_to_text_output.txt';
      a.click();
      URL.revokeObjectURL(url); // Cleanup the URL object
    });
  }
  