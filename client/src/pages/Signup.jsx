import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful:", data);
        setSuccess("Signup successful! You can now log in.");
        setFormData({ name: "", email: "", password: "" });
      } else {
        console.error("Signup failed:", data.message);
        setError(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Signup
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Success Message */}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
