import React,{useEffect} from "react";
import toast from "react-hot-toast";

const DownloadPage = ({ data }) => {
  useEffect(() => {
    document.title = "Rapid-Share | Download files"
  })


  const downloadFile = async (event, file) => {
    event.preventDefault();
    
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await fetch(file.fileUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download the file. Please try again.");
      }

      const blob = await response.blob(); // Convert the response to a Blob

      // Ensure the file has a valid filename
      const filename = file.filename || "downloaded-file";

      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename; // Use the filename from the file object
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL after download
      window.URL.revokeObjectURL(url);

      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Error while downloading the file:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="cards-container">
      {data.map((file) => (
        <div key={file.fileUrl} className="card">
          <h1 className="filename">{file.filename}</h1>
          <p className="file-info">
            <strong>Type:</strong> {file.fileType} <br />
            <strong>Size:</strong> {file.fileSize}
          </p>
          <button
            className="download-button"
            onClick={(event) => downloadFile(event, file)}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default DownloadPage;
