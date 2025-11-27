const isProduction = import.meta.env.MODE === "production";

const baseURL = isProduction
  ? "https://nature-diary-backend.onrender.com/"
  : "http://localhost:8000/";

export default baseURL;
