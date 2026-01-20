import { useState } from "react";
import ClauseSelector from "./ClauseSelector";
import api from "../api";

export default function OnboardingForm() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [selectedClauses, setSelectedClauses] = useState([]);
  const [preview, setPreview] = useState("");
  const [pdfPath, setPdfPath] = useState("");

  const generate = async () => {
    const payload = {
      employeeName,
      employeeEmail,
      clauseIds: selectedClauses
    };

    const res = await api.post("/generate", payload);
    setPreview(res.data.preview);
    setPdfPath(res.data.pdfPath);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Onboarding Document Generator</h1>

      <input
        type="text"
        placeholder="Employee Name"
        className="border p-2 w-full"
        value={employeeName}
        onChange={e => setEmployeeName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Employee Email"
        className="border p-2 w-full"
        value={employeeEmail}
        onChange={e => setEmployeeEmail(e.target.value)}
      />

      <ClauseSelector selected={selectedClauses} setSelected={setSelectedClauses} />

      <button
        onClick={generate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate
      </button>

      {preview && (
        <div className="border p-3 rounded bg-gray-50 mt-3">
          <h2 className="font-semibold text-lg mb-2">Preview:</h2>
          <pre className="whitespace-pre-wrap">{preview}</pre>

          {pdfPath && (
            <a
              href={`http://localhost:5000${pdfPath}`}
              download
              target="_blank"
              className="inline-block mt-3 bg-green-600 text-white px-3 py-2 rounded"
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
}
