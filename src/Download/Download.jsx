import React, { useState, useEffect } from "react";
import "./download.css";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DownloadPage from "./DownloadPage";
import close from "./../assets/closed.svg";

const Download = () => {
  const [inps, setInps] = useState({
    roomID: "",
    password: "",
  });
  const [roomIDErrMsg, setRoomIDErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const [fetching, setFetching] = useState(false);

  const [downloadData, setDownloadData] = useState([]);

  const handleOnChange = (event) => {
    setInps({
      ...inps,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const clearFunc = setTimeout(() => {
      if (
        (inps.roomID.length < 5 || inps.roomID.length > 20) &&
        inps.roomID.trim() !== ""
      ) {
        setRoomIDErrMsg("roomID should be between 5 to 20 characters");
      } else {
        setRoomIDErrMsg("");
      }

      if (inps.password.length < 8 && inps.password.trim() !== "") {
        setPasswordErrMsg("Password should be at least 8 characters");
      } else {
        setPasswordErrMsg("");
      }
    }, 500);

    return () => {
      clearTimeout(clearFunc);
    };
  }, [inps.roomID, inps.password]);

  useEffect(() => {
    document.title = "Rapid-Share | Download files";
  }, []);

  const handleDownload = async (event) => {
    event.preventDefault();
   
      if (inps.roomID.length < 5 || inps.roomID.length > 20) {
        setRoomIDErrMsg("roomID should be between 5 to 20 characters");
        return;
      } else if (inps.password.length < 8) {
        setPasswordErrMsg("Password should be at least 8 characters");
        return;
      }

      try {
        setFetching(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/download`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Adjust based on server requirements
            },
            body: JSON.stringify(inps), // Stringify if sending JSON data
          }
        );

        const parser = await response.json();
        if (response.status === 200) {
          localStorage.setItem("token", parser.token);
          setDownloadData(parser.data);
          setFetching(false);
          return;
        }

        toast.error(parser.message);
        setFetching(false);
      } catch (error) {
        toast.error("Network Error please try again");
        setFetching(false);
      }
    
  };

  const navigate = useNavigate();

  if (downloadData.length > 0) {
    return <DownloadPage data={downloadData} />;
  }

  return (
    <main className="download-main">
      <div id="upload-main-container">
        <div className="download-container">
          <form>
            <div>
              <span>RoomID*</span>
              <input
                spellCheck="false"
                onChange={handleOnChange}
                type="text"
                name="roomID"
                min={5}
                placeholder="Enter the Room ID, ex: Example@123"
                value={inps.roomID}
                className={`${roomIDErrMsg ? "error-red" : ""}`}
              />
              <div className="error-messer-container">
                {roomIDErrMsg && (
                  <>
                    <img
                      src={close}
                      alt=""
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    />
                    <span className="error-indicator">{roomIDErrMsg}</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <span>Password*</span>
              <input
                spellCheck="false"
                onChange={handleOnChange}
                type="password"
                min={5}
                placeholder="Enter the password, ex: example@!#@#"
                value={inps.password}
                name="password"
                className={`${passwordErrMsg ? "error-red" : ""}`}
              />

              <div className="error-messer-container">
                {passwordErrMsg && (
                  <>
                    <img
                      src={close}
                      alt=""
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                    />
                    <span className="error-indicator">{passwordErrMsg}</span>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              onClick={handleDownload}
              className={`${fetching ? "fetching" : ""}`}
            >
              {fetching ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "rgb(255, 255, 255)",
                    "rgb(255, 255, 255)",
                    "rgb(255, 255, 255)",
                    "rgb(255, 255, 255)",
                    "rgb(255, 255, 255)",
                  ]}
                />
              ) : (
                "download"
              )}
            </button>
          </form>
        </div>
        {/* <div className="errMsg-conainer">
          {errMsg && (
            <div>
            <marquee>
              <h1 className="errMsg">{errMsg}</h1>
            </marquee>
            </div>
          )}
        </div> */}
      </div>
    </main>
  );
};

export default Download;
