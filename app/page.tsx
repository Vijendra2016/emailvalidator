"use client";

import { useState } from "react";

export default function EmailChecker() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = async () => {
    if (!email) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/validate-email?email=${email}`);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded-xl">
      <h1 className="text-xl font-bold mb-4">ShopifyTasker's Email Validator</h1>
            <h1 className="text-sm font-bold mb-4">This is internal tool for email validation  </h1>


      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={validateEmail}
        className="w-full bg-black text-white py-2 rounded"
      >
        {loading ? "Checking..." : "Validate"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Sub Status:</strong> {result.sub_status}</p>
          <p><strong>Free Email:</strong> {result.free_email ? "Yes" : "No"}</p>
          <p><strong>MX Found:</strong> {result.mx_found ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}