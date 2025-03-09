
## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v14 or later)
-   **npm** (v6 or later) 

### Installation

#### Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory with the following content:
        ```plaintext
        PORT=5000
        MONGODB_URI=your_mongo_uri
        JWT_SECRET=your_jwt_secret
        ORIGIN=http://localhost:5173 or url of frontend
        ```

#### Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `frontend` directory with the following content:
        ```plaintext
        TARGET=http://localhost:5000 or url of backend
        ```

## 🏃‍♂️ Running the Project

### Backend

1. Start the backend server:

    ```bash
    npx nodemon
    ```

    The backend will run on [http://localhost:5000](http://localhost:5000).

### Frontend

1. Start the frontend development server:

    ```markdown
    npm run dev
    ```

    The frontend will run on [http://localhost:5173](http://localhost:5173).

## 🛠️ Project Setup

This project is a comprehensive full-stack auction platform developed using the MERN stack (MongoDB, Express, React, Node.js). The backend is designed to handle all API requests, manage user authentication, and interact with the database to store and retrieve auction data. It includes controllers for auction and user logic, models defining the data schemas, routes for API endpoints, and utility functions for authentication and error handling.

The frontend is built to provide a seamless and responsive user interface, allowing users to browse auctions, view detailed information about each auction, and place bids. It includes various components for displaying auction lists and items, pages for different parts of the application, and services for making HTTP requests to the backend.

The project is structured to maintain a clear separation of concerns between the backend and frontend, which enhances maintainability and scalability. Environment variables are used to configure the application for different environments, ensuring flexibility and security.

### Project Structure

```
AuctionPlatform/
├── backend/
│   ├── controllers/
│   │   └── auctionController.jsx  # Handles auction-related logic
│   │   └── userController.jsx     # Manages user-related operations
│   ├── models/
│   │   └── auctionModel.jsx       # Defines the auction schema
│   │   └── userModel.jsx          # Defines the user schema
│   ├── routes/
│   │   └── auctionRoutes.jsx      # Routes for auction endpoints
│   │   └── userRoutes.jsx         # Routes for user endpoints
│   ├── utils/
│   │   └── authMiddleware.jsx     # Middleware for authentication
│   │   
│   ├── .env                      # Environment variables
│   ├── server.jsx                 # Entry point for the backend server
│   └── package.json              # Backend dependencies and scripts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AuctionList.jsx    # Component to list auctions
│   │   │   └── AuctionItem.jsx    # Component to display a single auction item
│   │   │   └── Navbar.jsx         # Header component
│   │   ├── pages/
│   │   │   └── HomePage.jsx       # Home page of the application
│   │   │  
│   │   │   └── Login.jsx      # User login page
│   │   ├── services/
│   │   │  
│   │   ├── App.jsx                # Main application component
│   │   ├── index.jsx              # Entry point for the frontend
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── .env                      # Environment variables
│   └── package.json              # Frontend dependencies and scripts
└── README.md                     # Project documentation
```

### Abstract

- **Full-Stack Auction Platform**: Built using the MERN stack (MongoDB, Express, React, Node.jsx).
- **Backend Functionality**: Handles API requests, user authentication, and database interactions.
- **Frontend Interface**: Provides a responsive user interface for users to interact with the auction platform.
- **Project Structure**: Separates concerns between the backend and frontend, making it easier to manage and scale.
- **Environment Configuration**: Uses environment variables to configure the application for different environments.


### Components

- **AuctionList.jsx**: Displays a list of all auctions available on the platform.
- **AuctionItem.jsx**: Shows detailed information about a single auction item.
- **Navbar.jsx**: Provides navigation links to different parts of the application.
- **HomePage.jsx**: The main landing page displaying featured auctions.
- **AuctionPage.jsx**: Detailed view of a specific auction, including bidding options.
- **LoginPage.jsx**: Allows users to log in to their accounts.

### Routes

- **auctionRoutes.jsx**: Defines API endpoints for auction-related operations such as creating, updating, and fetching auctions.
- **userRoutes.jsx**: Manages user-related endpoints including registration, login, and profile management.

### Other Features

- **Authentication**: Utilizes JWT for secure user authentication and authorization.
- **Database Interaction**: Uses Mongoose to interact with MongoDB for storing and retrieving auction and user data.
- **Error Handling**: Implements middleware to handle errors gracefully and provide meaningful feedback to the client.
- **Environment Configuration**: Employs environment variables to manage configuration settings for different environments.
- **Responsive Design**: Ensures the frontend is responsive and works well on various devices and screen sizes.





