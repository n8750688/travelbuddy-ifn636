# Travel Buddy - IFN636 Assessment 1.2

## Project Setup Instructions
1. Clone the repository: `git clone https://github.com/n8750688/travelbuddy-ifn636.git`
2. Install all dependencies: `npm run install-all`
3. Create `backend/.env` with the following variables:
   - MONGO_URI (MongoDB Atlas connection string)
   - JWT_SECRET (JWT authentication secret)
   - PORT (default: 5001)
4. Run the application: `npm run dev`

## Public URL
http://16.176.179.141

## Test Credentials
- Email: christian@email.com
- Password: (your test password)

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Atlas)
- **Frontend:** React.js, Tailwind CSS
- **Deployment:** AWS EC2, Nginx, PM2
- **CI/CD:** GitHub Actions (self-hosted runner)

## Features
- User registration and authentication (JWT)
- Create, Read, Update, Delete (CRUD) trip management
- Profile management
- Automated CI/CD deployment pipeline