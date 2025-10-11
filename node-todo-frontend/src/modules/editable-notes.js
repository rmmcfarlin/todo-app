import { useState, useEffect } from "react";

function EditableNotes({ task }) {
  const [notes, setNotes] = useState(task.notes || "");

  useEffect(() => {
    const textarea = document.querySelector(".notesInput");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [notes]);

  return (
    <textarea
      className="notesInput"
      value={notes}
      onChange={(e) => {
        setNotes(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
        e.target.style.width = "500px";
      }}
      placeholder="Add notes..."
    />
  );
}


export default EditableNotes