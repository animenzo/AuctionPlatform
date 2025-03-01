
## 🚀 Getting Started

### Prerequisites

-   **Node.js** (v14 or later)
-   **npm** (v6 or later) or **yarn**

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

    ```bash
    npm run dev
    ```

    The frontend will run on [http://localhost:5173](http://localhost:5173).
