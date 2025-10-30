# IHWP - Prakriti Self-Assessment Application

This project is a modern, single-page web application (SPA) designed to help users determine their unique mind-body constitution, or **Prakriti**, according to the principles of Ayurveda. It features a dark-themed, mobile-responsive design built with **Tailwind CSS**.

The application includes user authentication, a multi-step questionnaire, a personalized result screen, and educational resources on the basics of Ayurveda.

---

## 🚀 Features

### Core Functionality
* **Splash Screen:** An engaging animated start screen that transitions into the main app.
* **User Authentication:** Simple local storage-based **Login** and **Registration** to track user progress.
* **Prakriti Self-Assessment:** A 12-question, multi-step quiz to calculate the dominant Dosha (**Vata**, **Pitta**, or **Kapha**).
* **Auto-Advance Quiz:** The questionnaire automatically moves to the next question upon selection for a streamlined user experience.
* **Dosha Results:** Displays the dominant Dosha, a detailed description, key traits, and a personalized wellness chart.
* **Assessment History:** Stores and displays past assessment results for the logged-in user.

### Educational & UI Features
* **Ayurveda Basics Carousel:** A full-screen, swipeable carousel to educate users on the five elements, the three Doshas, and key traits.
* **Tailwind CSS:** Fully responsive, dark-mode-first design for a modern, focused look.
* **Local Storage Management:** User data, including login credentials and assessment history, is persisted locally using `localStorage` and `sessionStorage`.

---

## 🛠 Project Structure

The application consists of three main files:

| File Name | Description |
| :--- | :--- |
| `index.html` | The main structure of the SPA. Defines all screens (`auth`, `dashboard`, `questionnaire`, `results`, `history`, `basics`) and includes Tailwind CSS and the main script. |
| `app.js` | The core JavaScript file managing the application logic. Handles state, screen transitions, user authentication, quiz functionality, Dosha calculation, history management, and the basics carousel. |
| `style.css` | Custom CSS rules, primarily for unique elements like the splash screen animation, the processing spinner, custom radio buttons, and the new basics carousel scroll behavior. |

### Assets (Required Images)

The following image files are expected to be present in the same directory as the HTML/CSS/JS files for the application to display correctly:

| Category | File Names | Purpose |
| :--- | :--- | :--- |
| **Backgrounds** | `splash-bg-image.jpg`, `login-bg-image.jpg`, `ayurveda-herbs-bg.jpg` | Visual flair and background for various screens. |
| **Dosha Icons** | `vata_icon.jpg`, `pitta_icon.jpg`, `kapha_icon.jpg`, `default_icon.jpg` | Icons displayed on the final results screen. |
| **Chart/Steps** | `vata_next_steps.png`, `pitta_next_steps.png`, `kapha_next_steps.png`, `default_next_steps.jpg` | Personalized recommendations shown in the Chart View. |
| **Basics Carousel** | `1.png`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`, `6.jpg`, `7.png` | Educational content for the "Know Ayurveda Basics" screen. |

---

## ⚙ Installation and Setup

This is a front-end only application and does not require a backend server for full functionality.

1.  **Clone or Download:** Get the `index.html`, `app.js`, and `style.css` files (along with all necessary image assets) into a single directory.
2.  **Open in Browser:** Simply open the `index.html` file with your web browser (e.g., Google Chrome, Firefox).

```bash
# Example: If you have the files locally
open index.html
