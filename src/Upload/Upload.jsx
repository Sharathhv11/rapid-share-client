import React, { useState, useRef, useEffect } from "react";
import "./upload.css";
import upload from "./../assets/upload.svg";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const Upload = () => {
  //state to manage inputs
  const [inps, setInps] = useState({
    roomID: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [fetching,setFetching] = useState(false);
  const files = useRef();

  const uploadFiles = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (!errMsg) {
      if (inps.roomID.length < 5 || inps.roomID.length > 20) {
        setErrMsg("roomID should be between 5 to 20 characters");
        return;
      } else if (inps.password.length < 8) {
        setErrMsg("Password should be at least 8 characters");
        return;
      }
      try {
        const data = new FormData();

        data.append("roomID", inps.roomID);
        data.append("password", inps.password);

        let count = 0;
        Array.from(files.current.files).forEach((file) => {
          data.append("files", file);
          count++;
        });

        if(count >5){
            setErrMsg("can upload only 5 files");
        }
        setFetching(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        setErrMsg("");
        setFetching(false);

        const parser = await response.json();
        if (response.status === 201) {
          toast.success("Files uploaded successfully");
        } 
        else {
          const { message } = parser;
          toast.error(`${message}`);
        }
      } catch (error) {
        toast.error(error.messaage);
      }
    } else {
    }
  };
  useEffect(() => {
    const clearFunc = setTimeout(() => {
      if (
        (inps.roomID.length < 5 || inps.roomID.length > 20) &&
        inps.roomID.trim() !== ""
      ) {
        setErrMsg("roomID should be between 5 to 20 characters");
      } else if (inps.password.length < 8 && inps.password.trim() !== "") {
        setErrMsg("Password should be at least 8 characters");
      } else {
        setErrMsg(""); // Clear error message if everything is valid
      }
    }, 500);

    return () => {
      clearTimeout(clearFunc); // Clear the timeout to prevent memory leaks
    };
  }, [inps.roomID, inps.password]);


  useEffect(() => {
    document.title = "Rapid-Share | Upload files"
  })

  const handleOnChange = (event) => {
    setInps({
      ...inps,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <main className="Main-Upload">
      <div id="upload-main-container">
        <div className="upload-form-container">
          <form>
            <div>
              <span>RoomID*</span>
              <input
                spellCheck="false"
                onChange={handleOnChange}
                type="text"
                name="roomID"
                min={5}
                placeholder="Enter the Room ID"
                value={inps.roomID}
              />
            </div>

            <div>
              <span>Password*</span>
              <input
                spellCheck="false"
                onChange={handleOnChange}
                type="text"
                min={5}
                placeholder="Enter the password"
                value={inps.password}
                name="password"
              />
            </div>

            <div className="upload-area">
              <input type="file" multiple ref={files} />
              <img src={upload} alt="upload image icon" />
              <span>
                alternatively, you can select files by clicking Drag file(s) to
                upload
                <span
                  style={{
                    color: "blue",
                  }}
                >
                  click here
                </span>
              </span>
            </div>
            <button type="submit" onClick={uploadFiles} className={`${fetching?"fetching":""}`}>
              {
                fetching?<ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)']}
                />:"submit"
                }
            </button>
          </form>
        </div>
        <div className="errMsg-conainer">
          {errMsg && (
            <div>
            <marquee>
              <h1 className="errMsg">{errMsg}</h1>
            </marquee>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Upload;
