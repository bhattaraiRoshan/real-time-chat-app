# Project Description 

This project is a real-time chat application built using a modern full-stack approach, leveraging React for the frontend, Node.js for the backend, Socket.IO for real-time communication, and MongoDB as the database for storing chat messages and user data.

## Key Features
Real-Time Messaging: Instant, bidirectional communication between users through WebSockets, powered by Socket.IO. <br>
User Authentication: Secure login and signup functionality, with sessions handled via JWT tokens or cookie-based authentication.<br>
Private Chats: Users can chat one-on-one.<br>
Persistent Chat History: All chat messages are stored in MongoDB, allowing users to retrieve message history even after they log out and back in.<br>
Online Status Indication: Displays the online/offline status of users in real-time.<br>
Responsive UI: Fully responsive design using React and Bootstrap, ensuring the application works well on both desktop and mobile devices.

## Technoogies Used 
React: For building a dynamic and interactive user interface.<br>
Node.js: Backend server for handling API requests, authentication, and integrating with Socket.IO for real-time communication.<br>
Socket.IO: Enables real-time, bidirectional event-based communication between the client and server.<br>
MongoDB: NoSQL database used to store chat messages, user data, and chat history.<br>
Express.js: A minimalist web framework for building the backend API and handling HTTP requests.<br>
JWT (JSON Web Tokens): For user authentication and authorization in a stateless manner.<br>
Bootstrap: For styling and making the UI responsive across different devices.<br>

## Installation

To run this project locally, follow these steps:

Clone the repository: <br>
git clone <repository-url>
cd client-api

Install dependencies: Using Yarn (as per yarn.lock):

yarn Install 

Or using npm:

npm install 


## API Integration

## **API Integration**
The frontend interacts with a backend API to fetch and submit data. The following endpoints are used:

## **API Documentation**

| **API Endpoint**               | **Method** | **Description**                                            | **Request Body / Parameters**                 | **Authentication** |
|---------------------------------|------------|------------------------------------------------------------|------------------------------------------------|--------------------|
| `/api/user/register`            | POST       | Registers a new user.                                       | `userObj`: Object containing user details.     | No                 |
| `/api/user/login`               | POST       | Logs in an existing user.                                   | `userObj`: Object containing login details.    | No                 |
| `/accessjwt`                    | GET        | Retrieves a new access JWT token.                           | None                                           | Yes, with refresh token |
| `/api/user/find/:_id`           | GET        | Retrieves a single user's data by ID.                       | `_id`: User ID (URL param).                    | Yes                |
| `/api/user/getalluser`          | GET        | Retrieves all users.                                        | None                                           | Yes                |
| `/api/chats/:userId`            | GET        | Retrieves all chats for a specific user by user ID.         | `userId`: User ID (URL param).                 | Yes                |
| `/api/chats/find/:userId`       | GET        | Finds the chat for a specific user.                         | `userId`: User ID (URL param).                 | Yes                |
| `/api/chats`                    | POST       | Creates a new chat between two users.                       | `firstId`, `secondId`: User IDs (body params). | Yes                |
| `/api/messages/:_id`            | GET        | Retrieves all messages in a chat by chat ID.                | `_id`: Chat ID (URL param).                    | Yes                |
| `/api/messages`                 | POST       | Sends a message in a chat.                                  | `chatId`, `senderId`, `text`: Message details. | Yes                |


## **Deployment**

The application is hosted on Vercel. You can try it out using the following link:

🔗 **Live Demo**: [Real-Time Chat App](https://vercel.com/roshan-bhattarais-projects-f2e2cbf2/real-time-chat-app-client-api)

## **Login Credentials**

To test the application, you can use the following credentials:

- **Username**: `admin@gmail.com`
- **Password**: `Nepal@123`

Feel free to explore the chat functionalities with this account.

## **Feedback**

If you encounter any issues or have feedback, please feel free to contact me at:

📧 **Email**: [roshan.bhattarai@proroshan.com](mailto:roshan.bhattarai@proroshan.com)



