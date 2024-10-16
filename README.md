# Sports Center Booking System

**College ID:** IIT2021177

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Setup Instructions](#setup-instructions)
6. [Running the Project](#running-the-project)
7. [Deployment](#deployment)
8. [Assumptions and Limitations](#assumptions-and-limitations)
9. [Links](#links)

## Project Overview
This project is a Sports Center Booking System where users can book courts at different centers for various sports. The operations team can view, create, update, and delete bookings using a simple UI. The system supports multiple sports centers, each offering several courts for different sports.

This project was built using React.js with Tailwind CSS for the frontend, and it uses local storage to store booking data. There is no external backend or database for this project.


## Features
- **Multiple Centers and Sports:** Support for multiple sports centers, each offering different sports like badminton, tennis, squash, and more.
- **Court Booking:** Users can book courts for a specific sport at a given time slot.
- **View Bookings:** A dynamic booking grid displays all bookings for the selected center and sport, showing available and occupied slots.
- **CRUD Operations:** Users can create, update, and delete bookings for each center and sport.
- **Local Storage:** All bookings are stored in the browser’s local storage, ensuring data persistence across sessions.
- **Error Handling:** Graceful error handling with an ErrorBoundary component to prevent crashes.
- **Notifications:** Real-time success and error notifications using react-toastify for a smoother user experience.

## Tech Stack
**Frontend:**
- React.js (for building the user interface)
- Tailwind CSS (for styling)
- React Router (for managing routes between pages)
- React Toastify (for success/error notifications)

**Storage:**
- Local Storage (to store bookings in the browser)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (version 14.x or higher)
- npm (Node package manager)
- Modern browser (Chrome, Firefox, or Edge)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/shiva177/game_theory.git
   cd sports-booking-system
   ```
2. Install dependencies: Run the following command to install the required npm packages:
   ```bash
   npm install
   ```
3. Run the development server: Start the development server with the command:
   ```bash
   npm run dev
   ```
   The application will open in your default browser at [http://localhost:5173](http://localhost:5173).

## Running the Project
### Running the Development Server
To run the app in development mode, use the following command:
```bash
npm run dev
```
This will launch the app at [http://localhost:5173](http://localhost:5173) where you can test and modify the code.

### Running the Production Build
To create a production build of the application:
```bash
npm run build
```
This will generate a `build/` folder with the optimized production version of the app.

## Deployment
The application can be easily deployed to hosting services like Netlify or Vercel. Here are the deployment steps:

### Deploying to Vercel:
1. Sign up or log in to Vercel.
2. Select **New Project** and import the GitHub repository.
3. Follow the instructions to deploy the main branch.
4. Vercel will handle the build process and provide a live link.

## Assumptions and Limitations
- **Storage:** The application uses local storage to store bookings. This means bookings are only saved locally on the user's machine and are not shared between users or devices.
- **No Authentication:** There is no user authentication or role-based access control in this application.
- **Single-Day Bookings:** The system currently allows booking for only one day. Multiple dates or date ranges are not supported.
- **No Backend:** This is a frontend-only application with no backend server or external database.

## Links
- **Deployed Application:** [App Link](https://game-theory-beige.vercel.app/) (Replace with your actual deployed app link)
- **Frontend GitHub Repository:** [GitHub Link](https://github.com/shiva177/game_theory.git)
