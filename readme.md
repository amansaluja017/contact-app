# Contact Manager Application

A full-stack contact management application built with React, Express, and MongoDB.

## Features

- Create, Read, Update, and Delete contacts
- Responsive design with Tailwind CSS and DaisyUI
- Real-time form validation
- Animated text effects using Typed.js
- RESTful API backend

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios
- React Hook Form
- Typed.js
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## Project Structure

```
contact-app/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx      # Entry point
│   └── index.html        # HTML template
└── backend/               # Express backend application
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utils/        # Utility functions
    └── index.js          # Server entry point
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/amansaluja017/contact-app.git
cd contact-app
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables
- Create `.env` file in backend directory with:
  ```
  PORT=3000
  MONGO_URI=your_mongodb_uri
  CORS_ORIGIN=http://localhost:5173
  ```
- Create `.env` file in frontend directory with:
  ```
  VITE_URL=http://localhost:3000
  ```

4. Start the application
```bash
# Start backend server
cd backend
npm run dev

# Start frontend development server
cd frontend
npm run dev
```

## API Endpoints

- `POST /api/v1/contact/create-contact` - Create a new contact
- `GET /api/v1/contact/get-contacts` - Get all contacts
- `GET /api/v1/contact/get-current-contact` - Get a specific contact
- `PATCH /api/v1/contact/update-contact` - Update a contact
- `DELETE /api/v1/contact/delete-contact/:contactId` - Delete a contact

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
