# React + Vite                                                                                              #College ID- IIT2021177

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

  #Project Overview
  
  -This application is designed for a sports technology company's operations team to manage bookings at multiple centers. Each center offers various sports, and each sport has multiple courts/resources. The operations team can view and create bookings for any sport in their facility.

#Goal :-
-The goal of the project is to build a booking app for the operations team at a sports technology company. The key features include:

-Managing bookings for multiple centers.
-Supporting multiple sports and courts at each center.
-Ensuring no double bookings for the same court and time slot.
-Viewing and creating bookings via a simple user interface.

#Setup Instructions

1. Clone the repository:
git clone https://github.com/shiva177/game_theory.git
cd directory_name

3. Backend Setup:
-Navigate to the backend folder:
-cd backend
-Install backend dependencies:
-npm install
-Create a .env file in the backend folder with the following environment variables:

Start the backend server:
npm start
The backend should now be running at http://localhost:5000.

4. Frontend Setup:
-Navigate to the frontend folder:
-cd frontend
-Install frontend dependencies:
npm install
Ensure the API URL for the backend is correctly configured in your frontend code (e.g., http://localhost:5000).

Start the frontend development server:
npm start
The frontend should now be running at http://localhost:3000.

5.Running the Project
Backend:

-Ensure your MongoDB server is running (or you are connected to MongoDB Atlas).
Run the backend server using npm start from the backend directory.
The server should be accessible at http://localhost:5000.

Frontend:

-In a separate terminal, run the frontend development server using npm start from the frontend directory.
The app should open in your browser at http://localhost:3000.

Deployment Instructions

1. Backend Deployment (Heroku)
Create a Heroku account and install the Heroku CLI.
Login to Heroku:
heroku login
In the backend folder, initialize a git repository (if not already done):

git init
Create a Heroku app:

heroku create your-app-name
Set your environment variables on Heroku:
heroku config:set MONGO_URI=your-mongodb-connection-string
Deploy to Heroku:

git add .
git commit -m "Deploying backend"
git push heroku master

2. Frontend Deployment (Vercel)
Create a Vercel account and install the Vercel.

Login to Vercel:
Navigate to the frontend folder and deploy the app:
