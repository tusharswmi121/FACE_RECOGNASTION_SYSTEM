# 👨‍👩‍👧‍👦 Family Person Face Recognition

Identify whether an uploaded face photo matches any enrolled family member.  
Full-stack application built with **React (frontend)** → **Node.js + Express (backend)** → **Python (face encoding)** → **MongoDB (storage)**.

---

## ✨ What It Does

- Lets you **enroll** family members by name + photo.  
- Extracts a **128-D face encoding** using a pretrained **dlib ResNet** model in Python.  
- Stores each person’s name and encoding in **MongoDB**.  
- On **verify**, compares the uploaded face encoding with all stored ones using **Euclidean distance**.  
- Returns the **matched person’s name** or **“Not Matched”** if no close match is found.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React + Axios + Tailwind CSS |
| **Backend API** | Node.js + Express |
| **Face Embedding Service** | Python (`face_recognition`, `dlib`, `numpy`) |
| **Database** | MongoDB (via Mongoose) |
| **Image Upload** | Multer (temporary storage in `/uploads`) |

---

## 📁 Project Structure

```
family_face_recognisation/
├── README.md
├── package.json
│
├── backend/
│ ├── index.js # Entry: starts Express, connects MongoDB, mounts routes
│ ├── .env # PORT, MONGO_URI, PYTHON_PATH, THRESHOLD, etc.
│ ├── config/
│ │ └── db.js # MongoDB connection setup
│ ├── controllers/
│ │ ├── personController.js # Enroll + list family members
│ │ └── verifyController.js # Verify face and match
│ ├── routes/
│ │ ├── persons.js # /api/persons endpoints (POST, GET)
│ │ └── verify.js # /api/verify endpoint
│ ├── services/
│ │ ├── embeddingService.js # Spawns Python, gets 128-D encoding
│ │ └── distance.js # (optional) Euclidean distance helper
│ ├── models/
│ │ └── personModel.js # MongoDB schema { name, embedding[], createdAt }
│ ├── python/
│ │ ├── embed.py # Python script → returns JSON 128-D embedding
│ │ ├── requirements.txt # face_recognition, dlib, numpy
│ │ └── .venv/ # Python virtual environment
│ └── uploads/ # Temporary image uploads for Python
│
└── frontend-react/
├── package.json
├── vite.config.js # Proxy setup for backend
├── public/
│ └── index.html
└── src/
├── api.js # Axios setup for API calls
├── App.jsx # Main React app
├── main.jsx # React entry
└── components/
├── EnrollForm.jsx # Enroll family member
├── VerifyForm.jsx # Upload + verify person
└── PeopleList.jsx # List enrolled people

```

## ⚙️ Prerequisites
```

| Requirement | Version |
|--------------|----------|
| Node.js | 18+ |
| npm | 9+ |
| Python | 3.10+ |
| MongoDB | 6+ |
| macOS/Linux/Windows | ✅ Works fine |

```

# ⚡ How It Works

1️⃣ Frontend (React) — user uploads a photo and enters a name.<br/>
2️⃣ Node.js backend receives it (via Multer), saves the image temporarily in /uploads.<br/>
3️⃣ Node.js → Python: the backend calls embed.py with the image path.<br/>
4️⃣ Python (face_recognition) detects the face, uses dlib’s ResNet model to generate a 128-D embedding, and returns it as JSON.<br/>
5️⃣ MongoDB stores { name, embedding } for each person.<br/>
6️⃣ On verify:
a) New photo → Node → Python → get 128-D embedding.<br/>
b) Compare it with stored ones using Euclidean distance.<br/>
c) If the distance is below a threshold (e.g., 0.55), it’s a match.<br/>
7️⃣ Response is sent back to React and displayed as “✅ Matched with [Name]” or “❌ Not Matched”.<br/>


# 🧠 ML Model Used

a) Face Detector: HOG (Histogram of Oriented Gradients) — finds face region (rectangle)..<br/>
b) Face Encoder: Dlib ResNet-based deep neural network — converts face pixels to 128-D embedding..<br/>
c) Trained on millions of images → robust to lighting, pose, small occlusions..<br/>
d) Distance metric: Euclidean distance between embeddings..<br/>

# 🧩 Project Flow
```
React (image + name)
   ↓
Node.js (Express)
   ↓
Python (face_recognition → 128D embedding)
   ↓
MongoDB (store & match)
   ↓
React (show result)

```

# 📸 Screenshot (UI Example)
<img width="1104" height="637" alt="Screenshot 2025-10-29 at 11 04 29 PM" src="https://github.com/user-attachments/assets/719755b1-8f64-45a5-8511-d5f9f543896a" />

