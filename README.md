# 🧭 AI Chat Navigator

A sleek, lightweight browser extension that adds a "Notion-style" interactive Table of Contents to your AI conversations. It automatically extracts your prompts and creates a floating sidebar, allowing you to easily navigate long chat threads.

Currently supports **Google Gemini** and **ChatGPT**.

<img width="1461" height="850" alt="image" src="https://github.com/user-attachments/assets/497177ae-37ba-4881-8d11-3607aa36c122" />

## ✨ Features

* **Universal Compatibility:** Works seamlessly across `gemini.google.com` and `chatgpt.com`.
* **Notion-Style Aesthetics:** A minimalist, non-intrusive UI with a custom scrollbar and clean typography.
* **Smart Scroll-Spy:** As you read through long answers, the sidebar automatically highlights the exact question you are currently viewing.
* **Auto-Scrolling:** Clicking a question in the sidebar glides you smoothly to that exact point in the conversation.
* **Floating Toggle Menu:** A clean, minimalist hamburger icon allows you to hide the sidebar when you need full-screen focus.
* **Dark Mode Ready:** Matches the native dark themes of Google and OpenAI perfectly.
* **Zero Flicker:** Optimized with `IntersectionObserver` and `requestAnimationFrame` to ensure buttery smooth performance without lag or UI blinking while the AI is generating text.

## 📦 Installation (Developer Mode)

Since this extension is not currently published on the Chrome Web Store, you can easily install it locally:

1. **Download the code:** Clone this repository or download it as a `.zip` file and extract it to a folder on your computer.
2. **Open Extensions:** In your Chromium-based browser (Chrome, Edge, Brave), navigate to `chrome://extensions/`.
3. **Enable Developer Mode:** Toggle the **Developer mode** switch in the top right corner.
4. **Load the Extension:** Click the **Load unpacked** button in the top left and select the folder where you saved the files.
5. **Ready to go:** Open a new tab, head to Gemini or ChatGPT, and start prompting!

## 📂 File Structure

The project relies on vanilla web technologies. No build steps or heavy frameworks required.

* `manifest.json`: The blueprint and permission configurations for the browser.
* `content.js`: The engine. It parses the DOM, extracts user queries, builds the sidebar UI, and handles the scroll-spy logic.
* `styles.css`: The aesthetics. Handles the floating layout, hover states, dark mode coloring, and SVG icon styling.

## 🛠️ How it Works

The extension uses DOM querying to find elements tagged with `[data-message-author-role="user"]` or specific `<user-query>` tags. It then cleans up the text (removing hidden accessibility tags like "You said") and builds a dynamic list. A `MutationObserver` watches the chat container for new messages, ensuring your sidebar is always up to date.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
If you want to add support for another AI platform (like Claude or Perplexity), feel free to open a Pull Request updating the `manifest.json` permissions and tweaking the DOM selectors in `content.js`.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
