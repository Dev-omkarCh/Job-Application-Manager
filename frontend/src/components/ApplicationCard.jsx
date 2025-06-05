// src/components/ApplicationCard.jsx
import { Eye, Pencil, Trash2 } from "lucide-react";

const ApplicationCard = ({ app, onEdit, onDelete, onView, view = "grid" }) => {
  return (
    <div
      onDoubleClick={() => onView(app)}
      className={`card bg-base-200 hover:shadow-lg transition cursor-pointer ${
        view === "grid" ? "w-full md:w-[48%]" : "w-full"
      }`}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{app.company}</h3>
          <span className="badge badge-outline">{app.source}</span>
        </div>
        <p className="text-sm">{app.role}</p>
        {view === "list" && <p className="text-xs mt-1">{app.description}</p>}
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm opacity-60">{app.status || "Applied"}</div>
          <div className="flex gap-2">
            <Eye className="w-4 h-4 cursor-pointer" onClick={() => onView(app)} />
            <Pencil className="w-4 h-4 cursor-pointer" onClick={() => onEdit(app)} />
            <Trash2 className="w-4 h-4 cursor-pointer text-error" onClick={() => onDelete(app._id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
