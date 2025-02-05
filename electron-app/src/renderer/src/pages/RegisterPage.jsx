import React, { useState } from "react";
import axios from "axios";
import Header from "../components/common/Header";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        email,
        password
      });
      setSuccess("Inscription réussie !");
      setError("");
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };
  return (
    <div className='flex-1 overflow-auto relative z-10 bg-white'>
      <Header title={"Register"} />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form onSubmit={handleSubmit} >
          <div>
            <label style={{ color: "black" }}>Email :</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ color: "black" }}>Mot de passe :</label>
            <input
              type="password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{ color: "black" }}>S'inscrire</button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
