// --- DOM Elements ---
const contentDisplay = document.getElementById("content-display");
const mainText = document.getElementById("main-text");
const spinner = document.getElementById("spinner");
const newAdviceBtn = document.getElementById("new-advice-btn");
const copyBtn = document.getElementById("copy-btn");
const multiJokeBtn = document.getElementById("multi-joke-btn");
const multipleJokesContainer = document.getElementById(
  "multiple-jokes-container"
);
const messageBox = document.getElementById("message-box");

// --- API URLs ---
const adviceApiUrl = "https://api.adviceslip.com/advice";
const jokeApiUrl = "https://official-joke-api.appspot.com/random_joke";

// --- Helper Function to show/hide loading spinner ---
function setLoading(isLoading) {
  if (isLoading) {
    mainText.textContent = "";
    multipleJokesContainer.classList.add("hidden");
    spinner.classList.remove("hidden");
    newAdviceBtn.disabled = true;
    copyBtn.disabled = true;
    multiJokeBtn.disabled = true;
  } else {
    spinner.classList.add("hidden");
    newAdviceBtn.disabled = false;
    copyBtn.disabled = false;
    multiJokeBtn.disabled = false;
  }
}

/**
 * Fetches a random piece of advice from the Advice Slip API.
 */
async function fetchAdvice() {
  setLoading(true);

  // Hide multiple joke container if it's visible
  multipleJokesContainer.classList.add("hidden");
  mainText.classList.remove("hidden");

  try {
    // await for the fetch call to complete and get the Response object
    const response = await fetch(adviceApiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // await for the JSON to be parsed
    const data = await response.json();

    // The Advice Slip API returns an object with a 'slip' property
    if (data.slip && data.slip.advice) {
      mainText.textContent = data.slip.advice;
    } else {
      mainText.textContent = "Oops, something went wrong with the advice data.";
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    mainText.textContent = `Failed to fetch advice: ${error.message}`;
  } finally {
    setLoading(false);
  }
}

/**
 * Copies the current text from the display to the clipboard.
 */
function shareContent() {
  // Get the text to copy
  const textToCopy =
    mainText.textContent ||
    Array.from(multipleJokesContainer.querySelectorAll("p"))
      .map((p) => p.textContent)
      .join("\n\n");

  if (textToCopy && textToCopy !== "Loading...") {
    // Try using the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          showMessage("Copied to clipboard!");
        })
        .catch(() => {
          // If Clipboard API fails, try the fallback method
          fallbackCopyText(textToCopy);
        });
    } else {
      // Use fallback for non-secure contexts or browsers without Clipboard API
      fallbackCopyText(textToCopy);
    }
  }
}

// Helper function to show messages
function showMessage(text) {
  messageBox.textContent = text;
  messageBox.classList.remove("hidden");
  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 2000);
}

// Fallback copy method using textarea
function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // Avoid scrolling to bottom
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    showMessage("Copied to clipboard!");
  } catch (err) {
    showMessage("Failed to copy!");
    console.error("Failed to copy text: ", err);
  } finally {
    document.body.removeChild(textarea);
  }
}

//  Get Multiple Jokes
/**
 * Fetches multiple jokes concurrently using Promise.all
 */
async function fetchMultipleJokes() {
  setLoading(true);

  // Show the multiple joke container
  mainText.classList.add("hidden");
  multipleJokesContainer.classList.remove("hidden");
  multipleJokesContainer.innerHTML = ""; // Clear previous jokes

  const fetchPromises = [
    fetch(jokeApiUrl),
    fetch(jokeApiUrl),
    fetch(jokeApiUrl),
  ];

  try {
    // Promise.all waits for all promises in the array to resolve
    const responses = await Promise.all(fetchPromises);

    // Check if all responses are ok
    for (const res of responses) {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    }

    // Map over the responses and get a new promise for each JSON payload
    const jokeDatas = await Promise.all(responses.map((res) => res.json()));

    // Display each joke
    jokeDatas.forEach((joke, index) => {
      const jokeElement = document.createElement("p");
      jokeElement.classList.add("text-lg", "text-gray-700", "font-medium");
      jokeElement.textContent = `Joke ${index + 1}: ${joke.setup} ... ${
        joke.punchline
      }`;
      multipleJokesContainer.appendChild(jokeElement);
    });
  } catch (error) {
    console.error("There was a problem fetching multiple jokes:", error);
    mainText.textContent = `Failed to fetch jokes: ${error.message}`;
    mainText.classList.remove("hidden");
    multipleJokesContainer.classList.add("hidden");
  } finally {
    setLoading(false);
  }
}

// --- Event Listeners ---
newAdviceBtn.addEventListener("click", fetchAdvice);
copyBtn.addEventListener("click", shareContent);
multiJokeBtn.addEventListener("click", fetchMultipleJokes);

// --- Initial Call ---
// Fetch an advice on page load
fetchAdvice();
