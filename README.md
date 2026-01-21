📄 HR Onboarding Document Generator


A full-stack web application that enables HR teams to generate professional onboarding documents for new employees using clause templates and AI-merged content, exported as PDFs.


🚀 Live Deployment Links


Service	Link

Frontend (Vercel)	https://hr-onboarding-document-generator.vercel.app

Backend (Render)	https://hr-onboarding-document-generator.onrender.com

Database (MongoDB Atlas)	Private (Cloud Hosted)



🚀 Features

✔ Employee details form (Name, Email)

✔ Clause selection (Policies, Benefits, Team Intro, etc.)

✔ AI-merged onboarding content

✔ PDF generation & download

✔ Clause & Template storage in MongoDB

✔ Document history tracking (optional)

✔ Cloud deployment

✔ Mobile-friendly UI



🏗 Tech Stack

Layer	Technology

Frontend	React.js (Vite), Axios

Backend	Node.js, Express.js

Database	MongoDB Atlas

AI Model	Google Gemini API

PDF Generation	PDFKit

Deployment	Vercel (Frontend), Render (Backend)


🖼 Screenshots


🏠 Dashboard / Onboarding Form


<img width="1584" height="683" alt="image" src="https://github.com/user-attachments/assets/8253939d-f75b-4e3e-9902-d28626cb1854" />


📑 Clause Selection UI


<img width="1600" height="579" alt="image" src="https://github.com/user-attachments/assets/86f2251b-06c9-4117-a14a-b257edd3fb6f" />


📝 AI Generated Preview


<img width="758" height="945" alt="image" src="https://github.com/user-attachments/assets/2ec99f7d-13be-4b69-81b2-e70f3b3bcc30" />



📄 Final PDF Output


<img width="898" height="914" alt="image" src="https://github.com/user-attachments/assets/7fd4b16f-9c1f-460f-bf9a-921166465e57" />


⚙️ Architecture Overview
Frontend (React + Axios) 
         ↓
Backend API (Node + Express)
         ↓
MongoDB (Clause & History Storage)
         ↓
AI Model (Gemini)
         ↓
PDF Output (PDFKit → Download)

📂 Project Folder Structure


HR-Onboarding-Document-Generator/
|
│
├── backend/

│   ├── src/

│   │   ├── models/

│   │   ├── routes/

│   │   ├── services/

│   │   ├── config/

│   │   └── app.js

│   ├── package.json

│   └── .env
│
└── frontend/
    ├── src/
    
    │   ├── components/
    
    │   ├── api.js
    
    │   └── App.jsx
    
    ├── vite.config.js
    
    ├── package.json
    
    └── .env

🧩 Core Modules

🟡 1. Clause Management

Store reusable onboarding content like:

Leave policy

Work from Home policy

Health benefits

Team introduction

🔵 2. AI Merge Service

Sends clauses + employee details to Gemini AI

Returns formatted onboarding document

🟢 3. PDF Generator

Converts merged content into a PDF via PDFKit

Exposes download link to frontend

🛠 Backend Setup
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongodb_uri
GOOGLE_API_KEY=your_gemini_api_key


Start dev server:

npm run dev

💻 Frontend Setup

cd frontend

npm install


Create .env:

VITE_API_BASE_URL=http://localhost:5000/api


Run:

npm run dev

🌐 Deployment

Service	Platform

Frontend	Vercel

Backend	Render

DB	MongoDB Atlas


📤 API Endpoints


Method	Endpoint	Description

GET	/api/clauses	Get clause list

POST	/api/clauses	Add new clause

POST	/api/generate	Generate document via AI

GET	/generated/:file	Download PDF file


🔒 Environment Variables

Backend:

MONGO_URI=
GOOGLE_API_KEY=
PORT=


Frontend:

VITE_API_BASE_URL=


Never commit .env files to GitHub

🧠 Why this Project?

HR onboarding is manual, repetitive, and inconsistent. This project:

✔ Saves time
✔ Ensures document quality
✔ Automates formatting
✔ Generates PDFs instantly

📌 Future Enhancements

🔹 Authentication (HR/Admin)

🔹 Multi-language PDF generation

🔹 Email PDF to employee

🔹 Custom company branding & theme

🔹 Role-based template access

🔹 Dashboard & analytics

🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you’d like to improve.

📜 License

MIT License — free to use & modify.
