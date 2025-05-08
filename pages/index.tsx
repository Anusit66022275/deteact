// หน้าเว็บแบบใช้ next + axios + tailwind css 
import axios from "axios";
import React, { useState } from "react";


export default function Home() {
  const [file, setFile] = useState<File | null>(null); 
  const [message, setMessage] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(res.data.output_url);
    } catch (err) {
      console.error("ผิดพลาด", err);
      setMessage("เกิดข้อผิดพลาด");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
  <h1 className="text-2xl font-bold text-gray-800 mb-6">ตรวจจับรูปภาพ</h1>

  <form 
    onSubmit={handleUpload}
    className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
  >
    <input
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      className="border border-gray-300 rounded-md p-2"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md mx-auto"
    >
      Detaect
    </button>
  </form>

  {message && (
    <p className="mt-4 text-green-600 text-sm">{message}</p>
  )}

  {message && (
    <img 
    src={message}
    alt="Detected Image"
    className="mt-6  max-w-md rounded shadow-md"
    />
  )}
</main>
  );
}
