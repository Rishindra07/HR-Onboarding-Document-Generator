import { useEffect, useState } from "react";
import api from "../api";

export default function ClauseSelector({ selected, setSelected }) {
  const [clauses, setClauses] = useState([]);

  useEffect(() => {
    api.get("/clauses").then(res => setClauses(res.data));
  }, []);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="clause-selector">
      <h3 className="clause-title">Select Clauses</h3>
      {clauses.map(c => (
        <div key={c._id} className="clause-item">
          <input
            type="checkbox"
            checked={selected.includes(c._id)}
            onChange={() => toggle(c._id)}
          />
          <label>{c.title} ({c.type})</label>
        </div>
      ))}
    </div>
  );
}
