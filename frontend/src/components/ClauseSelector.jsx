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
    <div className="border p-3 rounded">
      <h3 className="font-semibold text-lg mb-2">Select Clauses</h3>
      {clauses.map(c => (
        <label key={c._id} className="flex gap-2 mb-1">
          <input
            type="checkbox"
            checked={selected.includes(c._id)}
            onChange={() => toggle(c._id)}
          />
          {c.title} ({c.type})
        </label>
      ))}
    </div>
  );
}
