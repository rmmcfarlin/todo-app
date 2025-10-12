import { useState, useEffect } from "react";

function EditableNotes({ task, handleChange }) {
  const [notes, setNotes] = useState(task.notes || "");

  useEffect(() => {
    const textarea = document.querySelector(".notesInput");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [notes]);

  const handleAreaChange = (e) => {
        setNotes(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }

  return (
    <textarea
      name="notes"
      className="notesInput"
      value={notes}
      onChange={(e) => {
        handleChange(e)
        handleAreaChange(e)
      }}
    />
  );
}


export default EditableNotes