import React, { useEffect } from "react";
import toast from "react-hot-toast";
import download from "./../assets/arrow_down_circle_fill.svg"
const DownloadPage = ({ data,state }) => {
  useEffect(() => {
    document.title = "Rapid-Share | Download files";
  });

  const downloadFile = async (event, file) => {
    event.preventDefault();

    if(state.downloading) return;

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        throw new Error("Authorization token is missing");
      }

      state.setDownloading(true);
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
      state.setDownloading(false);
    } catch (error) {
      console.error("Error while downloading the file:", error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  function formatFileType(fileType, maxLength = 20) {
    if (fileType.length > maxLength) {
      return fileType.slice(0, maxLength - 3) + "...";
    }
    return fileType;
  }

  function formatFileSize(size) {
    const sizePattern = /^([\d.]+)([A-Za-z]+)$/; // Pattern to match the numeric part and unit
    const match = size.match(sizePattern);

    if (match) {
      const numericPart = parseFloat(match[1]); // Extract and parse the numeric part
      const unit = match[2]; // Extract the unit
      return `${numericPart.toFixed(2)}${unit}`; // Format with 2 decimal places
    }

    // Return the original string if it doesn't match the expected format
    return size;
  }

  return (
    <div className="cards-container">
      {data.map((file) => (
        <div key={file.fileUrl} className="card">
          <h1 className="filename">{formatFileType(file.filename)}</h1>
          <p className="file-info">
            <strong>Type:</strong> {formatFileType(file.fileType)} <br />
            <strong>Size:</strong> {formatFileSize(file.fileSize)}
          </p>
          <button
            className={`download-button ${state.downloading?"disable":""}`}
            onClick={(event) => downloadFile(event, file)}
          >
            <img src={download} alt="download logo" />
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default DownloadPage;
