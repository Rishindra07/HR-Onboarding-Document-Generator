import { useState } from "react";
import ClauseSelector from "./ClauseSelector";
import api from "../api";

export default function OnboardingForm() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [selectedClauses, setSelectedClauses] = useState([]);
  const [preview, setPreview] = useState("");
  const [pdfPath, setPdfPath] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!employeeName.trim()) {
      newErrors.employeeName = "Employee name is required";
    }

    if (!employeeEmail.trim()) {
      newErrors.employeeEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeEmail)) {
      newErrors.employeeEmail = "Please enter a valid email address";
    }

    if (selectedClauses.length === 0) {
      newErrors.clauses = "Please select at least one clause";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generate = async () => {
    if (!validateForm()) {
      return;
    }

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
      {errors.employeeName && <p className="error-message">{errors.employeeName}</p>}

      <input
        type="email"
        placeholder="Employee Email"
        className="form-input"
        value={employeeEmail}
        onChange={e => setEmployeeEmail(e.target.value)}
      />
      {errors.employeeEmail && <p className="error-message">{errors.employeeEmail}</p>}

      <ClauseSelector selected={selectedClauses} setSelected={setSelectedClauses} />
      {errors.clauses && <p className="error-message">{errors.clauses}</p>}

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
