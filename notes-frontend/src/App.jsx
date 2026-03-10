import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API = "http://localhost:3000/api/notes";

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
    setLoading(false);
  };

  const addNote = async () => {
    if (!text) return;

    await axios.post(API, { text });

    setText("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-80"
          placeholder="Write note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-4 shadow rounded">
              <p>{note.text}</p>

              <button
                onClick={() => deleteNote(note._id)}
                className="text-red-500 mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
