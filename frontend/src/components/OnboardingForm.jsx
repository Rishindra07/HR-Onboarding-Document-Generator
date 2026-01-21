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

    const res = await api.post("api/generate", payload);
    setPreview(res.data.preview);
    setPdfPath(res.data.pdfPath);
  };

  return (
    <div className="form-group">
      <h1 className="form-title">Onboarding Document Generator</h1>

      <input
        type="text"
        placeholder="Employee Name"
        className="form-input"
        value={employeeName}
        onChange={e => setEmployeeName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Employee Email"
        className="form-input"
        value={employeeEmail}
        onChange={e => setEmployeeEmail(e.target.value)}
      />

      <ClauseSelector selected={selectedClauses} setSelected={setSelectedClauses} />

      <button
        onClick={generate}
        className="btn"
      >
        Generate
      </button>

      {preview && (
        <div className="preview-section">
          <h2 className="preview-title">Preview:</h2>
          <div className="preview-content">{preview}</div>

          {pdfPath && (
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/../..${pdfPath}`}
              download
              target="_blank"
              className="download-link"
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
}
