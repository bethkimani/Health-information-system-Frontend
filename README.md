use this to login:https://health-information-system-frontend.onrender.com/
email:admin@cema.com
password:admin123




### Health-Information-System-Frontend
Center for Epidemiological Modelling and Analysis (CEMA) Project
The CEMA Health Information System Frontend is a web application designed to provide a user-friendly interface for healthcare providers to interact with the Health Information System backend. Built with React and Tailwind CSS, this application enables users to register clients, manage health programs, view client profiles, and perform administrative tasks seamlessly.
 ### Table of Contents

Features
Technologies Used
Installation
Usage
Code Structure
Best Practices
Testing
Contributing
License
Acknowledgments

### Features
Goals or What Was Implemented

View Health Programs: Display a list of health programs (e.g., TB, Malaria, HIV) with details.
Client Management: Register new clients, view, and update client profiles.
Client Enrollment: Enroll clients in multiple health programs.
Search Functionality: Search for clients by name or ID to quickly access profiles.
Responsive Design: Optimized for both desktop and mobile devices.
Secure Authentication: Login and registration with JWT-based authentication.

#### Technologies Used

React: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for styling.
Axios: For making HTTP requests to the backend API.
React Router: For client-side routing.
JWT-decode: For decoding JWT tokens to manage user sessions.
### Installation
Clone the Repository:
git clone git@github.com:username/Health-Information-System-Frontend.git
cd health-information-system-frontend

#### Install Dependencies:
npm install

Configure the Application:

Create a .env file in the root directory.
Add the backend API URL:VITE_API_URL=http://localhost:5000/ap
online backend url:https://health-inforamtion-system-backend.onrender.com



Start the Development Server:
npm run dev

The application will be available at http://localhost:5173.
 online url::https://health-information-system-frontend.onrender.com/
Usage

Login/Register: Access the login or registration page to authenticate.
Dashboard: View an overview of health programs and client statistics.
Client Management: Navigate to the clients section to add, view, or update client information.
Program Enrollment: Enroll clients in health programs from the client profile page.
Search: Use the search bar to find clients quickly.

Code Structure
health-information-system-frontend/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── assets/             # Images and other static assets
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components (e.g., Login, Dashboard, ClientProfile)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions (e.g., auth, clients)
│   ├── styles/             # Tailwind CSS and custom styles
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── routes.jsx          # Route definitions
│
├── .env                    # Environment variables
├── package.json
├── vite.config.js          # Vite configuration
└── README.md

### Best Practices

Component-Based Architecture: Organized code into reusable React components.
Clean Code: Followed JavaScript and React best practices, including ESLint rules.
Responsive Design: Used Tailwind CSS for responsive and maintainable styling.
Error Handling: Implemented error boundaries and user-friendly error messages.
State Management: Used React Context API for managing authentication state.




### Contributing
Contributions are welcome! Please follow these steps:



### License
This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

Thanks to the React and Tailwind CSS communities for their excellent documentation and resources.
Inspired by modern web development practices and user-centered design principles.

