import { useEffect, useState } from "react";
import api from "../api";

export default function ClauseSelector({ selected, setSelected }) {
  const [clauses, setClauses] = useState([]);

  useEffect(() => {
    try {
      const res = async () => {
        const data = await api.get("/")
        console.log(data)
      }
      res();
      api.get("api/clauses").then(res => setClauses(res.data));
    } catch (error) {
      console.log(error)
    }

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
