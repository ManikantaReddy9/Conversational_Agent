const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");

// Function to handle refresh, minimize, and close actions
document.querySelector(".icon[title='Refresh']").onclick = () => location.reload();
document.querySelector(".icon[title='Minimize']").onclick = () => alert("Minimize action");
document.querySelector(".icon[title='Close']").onclick = () => alert("Close action");

// Append message to the chat box
function appendMessage(text, isUser = true) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-message ${isUser ? "user-message" : "bot-message"}`;
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Scroll to the bottom of the chat box
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle send button click or Enter key press
function handleSend() {
  const text = userInput.value.trim();
  if (!text) return;
  appendMessage(text);
  botReply(text);
  userInput.value = "";
}

sendBtn.addEventListener("click", handleSend);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleSend();
});

// Show welcome message and suggestions
function showWelcomeMessage() {
  appendMessage("Welcome to Halleck Vineyard fellow wine enthusiast! I am Halle, your Virtual Concierge and Wine Educator, here to be your guide. Ask me anything about Wine & Halleck.", false);

  setTimeout(() => {
    const suggestions = ["Taste our wines", "Explore our Memberships", "Shop our wines", "Events", "Ask a Question"];

    const container = document.createElement("div");
    container.className = "suggestion-container";

    suggestions.forEach(text => {
      const btn = document.createElement("div");
      btn.className = "suggestion-button";
      btn.innerHTML = `<span class="icon">⚡</span> ${text}`;
      btn.onclick = () => {
        appendMessage(text);
        botReply(text);
        container.remove();
      };
      container.appendChild(btn);
    });

    chatBox.appendChild(container);
    scrollToBottom();
  }, 300);
}

// Handle bot reply based on user input
function botReply(userText) {
  const lowerText = userText.toLowerCase();

  if (lowerText.includes("hello") || lowerText === "hi") {
    appendMessage("Hello! How can I assist you today?", false);
  } else if (lowerText.includes("help")) {
    appendMessage("Sure, I can help. Please tell me what you need assistance with.", false);
  } else if (lowerText.includes("services")) {
    appendMessage("We offer 24/7 support, AI solutions, and automation tools.", false);
  } else if (lowerText.includes("contact")) {
    appendMessage("You can contact support at support@redaugment.com", false);
  } else if (lowerText.includes("taste our wines")) {
    showTastingCard();
  } else if (lowerText.includes("shop our wines")) {
    showWineCarousel();
  } else if (lowerText.includes("events")) {
    showEventImageCards();
  } else if (lowerText.includes("explore our memberships")) {
    showMembershipInfo();
  } else {
    appendMessage("I'm not sure I understood that. Can you rephrase?", false);
  }
}

// Show wine tasting card
function showTastingCard() {
  const wineCard = document.createElement("div");
  wineCard.className = "chat-message bot-message wine-card-message";
  wineCard.innerHTML = `
    <div class="wine-card">
      <p class="intro-text">
        Here are some experiences you shouldn't miss to <strong>"Join us at our Halleck Estate for a sublime tasting experience"</strong>
      </p>
      <div class="wine-card-content">
        <div class="wine-img-wrapper">
          <img src="./fae06e1c30db5cddc38a78400a7b2a3b.png" alt="Sonoma Wine Tasting">
          <div class="price-tag">$65/person</div>
          <div class="wine-title">Sonoma Wine Tasting</div>
        </div>
        <ul class="wine-details">
          <li>20 guests max per wine tasting</li>
          <li>Open Thursday thru Sunday</li>
          <li>Seated wine tastings at 11 am & 3 pm</li>
          <li>Reservations Required</li>
          <li>$78pp for groups of 7-12</li>
        </ul>
        <button class="reserve-btn">Reserve</button>
      </div>
    </div>
  `;
  chatBox.appendChild(wineCard);
  scrollToBottom();
}

// Show wine carousel for "Shop our wines"
function showWineCarousel() {
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-message bot-message";

  const wines = [
    { title: "Dry White Zinfandel Russian River", price: "$34.00", image: "./r2.png" },
    { title: "Pinot Noir Sonoma Coast clone 828,2021", price: "$79.00", image: "./r1.png" }
  ];

  const carousel = document.createElement("div");
  carousel.className = "mwine-carousel";

  wines.forEach(wine => {
    const card = document.createElement("div");
    card.className = "mwine-card";
    card.innerHTML = `
      <img src="${wine.image}" alt="${wine.title}">
      <div class="mwine-info">
        <h4>${wine.title}</h4>
        <p>${wine.price}</p>
        <button class="buy-btn">🛒 Buy Now</button>
      </div>
    `;
    carousel.appendChild(card);
  });

  msgDiv.appendChild(carousel);
  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Show event cards
function showEventImageCards() {
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-message bot-message";

  const carousel = document.createElement("div");
  carousel.className = "events-carousel";

  const events = [
    { name:"Turkish", title: "Wine Tour Adventure", date:"Sep6-Sep 20, 2025", image: "./e1.png", price:"$20,889.00/p" },
    { name:"Halleck", title: "Vineyard Harvest", date: "Oct 19, 2025", image: "./e2.png", price:"$145/p" }
  ];

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img class="event-image" src="${event.image}" alt="">
      <div class="event-info">
        <p class="event-name">${event.name}</p>
        <h2 class="event-title">${event.title}</h2>
        <h3 class="event-date">${event.date}</h3>
      </div>
      <p class="event-price">${event.price}</p>
    `;
    card.onclick = () => {
      appendMessage(event.title);
      showEventOptions();
      msgDiv.remove();
    };
    carousel.appendChild(card);
  });

  msgDiv.appendChild(carousel);
  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Show event options after clicking an event
function showEventOptions() {
  const container = document.createElement("div");
  container.className = "suggestion-container";

  const options = ["Wine Tour Adventure", "Tasting Session", "Food Pairing Dinner", "Explore more"];
  options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "suggestion-button";
    btn.textContent = opt;
    btn.onclick = () => {
      appendMessage(opt);
      showEventDetails(opt);
      container.remove();
    };
    container.appendChild(btn);
  });

  chatBox.appendChild(container);
  scrollToBottom();
}

// Show event details based on selected option
function showEventDetails(option) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-message bot-message";

  if (option === "Wine Tour Adventure") {
    appendMessage("Here's your brief information:", false);
    msgDiv.innerHTML = `
      <p class="sep">Sep 6 - Sep 20 2025</p>
      <strong class="sstrong">Turkish Wine Tour Adventure</strong><br>
      <p>For same day reservations,<br>specific times or larger groups</p>
      <strong>please call 707-944-5620 x1.</strong>
      <p>**Note for cancellations with > 4 hours<br>notice or no-shows, the full experience fee will be applied**</p>
      <p>🍷 $20,889.00 per person</p>
      <button class="book">Book your slot</button>
    `;
  }

  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Show membership information
function showMembershipInfo() {
  const botMsg = document.createElement("div");
  botMsg.className = "chat-message bot-message";
  botMsg.innerText = "We have so many Memberships tailored to your taste. You can choose any of the options below.";
  chatBox.appendChild(botMsg);

  const suggestionWrap = document.createElement("div");
  suggestionWrap.className = "suggestion-container";

  const btn1 = document.createElement("button");
  btn1.className = "suggestion-button";
  btn1.innerText = "6 Bottle Club";
  btn1.onclick = () => {
    appendMessage("6 Bottle Club");
    appendMessage("As a member, you'll get up to 20% off, access to members-only tastings, and curated monthly picks.", false);
    suggestionWrap.remove();
  };

  const btn2 = document.createElement("button");
  btn2.className = "suggestion-button";
  btn2.innerText = "12 Bottle Club";
  btn2.onclick = () => {
    appendMessage("12 Bottle Club");
    appendMessage("To join, visit our membership page or talk to a sommelier at your nearest event.", false);
    suggestionWrap.remove();
  };

  suggestionWrap.appendChild(btn1);
  suggestionWrap.appendChild(btn2);
  chatBox.appendChild(suggestionWrap);
  scrollToBottom();
}

// Handle speech-to-text functionality
micBtn?.addEventListener("click", () => {
  if (!SpeechSDK) return;
  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription("8N3oX1hFHC5mCKdhZIe1fUNNZIpoJnuEYrDYTzVIq44bP6bSCf67JQQJ99BDACGhslBXJ3w3AAAYACOGPkL0", "centralindia");
  speechConfig.speechRecognitionLanguage = "en-US";

  const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  appendMessage("🎙️ Listening...", false);

  recognizer.recognizeOnceAsync(result => {
    if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
      appendMessage(result.text);
      botReply(result.text);
    } else {
      appendMessage("⚠️ Couldn't recognize speech.", false);
    }
    recognizer.close();
  });
});

// Initialize the chat with the welcome message when the window is loaded
window.onload = () => {
  showWelcomeMessage();
};
