# Massage Reservation System

This is a simple massage reservation system designed to facilitate the booking of massage appointments for users. The system allows users to register, log in, reserve queues at massage shops, view/edit/delete their reservations, and allows administrators to manage reservations.

## Features

1. **User Registration:** Users can register by providing their name, telephone number, email, and password.
2. **User Authentication:** Registered users can log in using their email and password. The system also supports logout functionality.
3. **Reservation:** After logging in, users can reserve up to 3 queues by specifying the date and preferred massage shop from the provided list. Each massage shop entry includes information such as name, address, telephone number, and operating hours.
4. **View Reservations:** Registered users can view their existing massage reservations.
5. **Edit Reservations:** Users are allowed to edit their existing massage reservations.
6. **Delete Reservations:** Users can delete their existing massage reservations.
7. **Admin Access:** Administrators have access to view, edit, and delete any massage reservation.
8. **Password Recovery:** registered users can reset their password by receiving a OTP for reset password via email.

## Technologies Used

- Backend: [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PoomThammasorn/massage-reservation-swdev.git
```

2. Navigate to the project directory:

```bash
cd massage-reservation-swdev
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

   - Create a `config.env` file in `./configs` directory.
   - Define the following environment variables:
     - `PORT`: Port number for running the server.
     <!-- - `MONGODB_URI`: MongoDB connection URI.
     - `JWT_SECRET`: Secret key for JWT token generation. -->
     - `NODE_ENV`: Environment mode (`development` or `production`).

5. Run the backend server:

- To run the server in production mode:
  ```bash
  npm start
  ```
- To run the server in development mode:
  ```bash
  npm run dev
  ```
