import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";

function UploadDocuments() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    // Simulate document upload
    console.log("Uploaded Document:", { documentName, documentType, file });
    alert("Document uploaded successfully");
    navigate(`/suppliers/${id}`);
  };

  return (
    <Navigation>
      <div className="p-6 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">Add Document</h3>
        <form className="grid grid-cols-1 gap-4" onSubmit={handleUpload} encType="multipart/form-data">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              id="documentName"
              placeholder="e.g. Supplier Contract"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              id="documentType"
              placeholder="e.g. PDF, Excel"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">Upload File</label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              id="fileUpload"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => navigate(`/suppliers/${id}`)}
            >
              Back
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </Navigation>
  );
}

export default UploadDocuments;