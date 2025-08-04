# 🏡 California Housing Income Predictor  

An interactive web app that predicts California’s median housing income based on user-supplied housing features.

---

## 🚀 Tech Stack  

### Frontend Framework  
- ⚛️ **React 18** + **TypeScript**  
- ⚡ **Vite** – Lightning-fast development and builds  
- 🔁 **React Router DOM** – Simple page routing  

### UI & Styling  
- 🎨 **Tailwind CSS** – Utility-first styling  
- 🧩 **shadcn/ui** – Accessible prebuilt UI components  

### State & Interactivity  
- 🔄 **React Hooks** – `useState`, `useEffect` for component logic  
- 📡 **Real-time API calls** – Sends user input and receives predictions  
- 🧪 **Form validation** – Handles missing/invalid fields cleanly  

---

## 🧠 Backend Integration  

This frontend connects to a **Django REST API** that serves a trained machine learning model for predicting California housing income.  

- 🌐 **API URL**: `localhost or custom`  
- 🔄 **CORS must be enabled** on the backend  
- 📊 Input features include room count, location, and other housing attributes  
