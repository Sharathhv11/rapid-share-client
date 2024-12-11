import React, { useState, useRef, useEffect } from "react";
import "./upload.css";
import upload from "./../assets/upload.svg";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import close from "./../assets/closed.svg";

const Upload = () => {
  //state to manage inputs
  const [inps, setInps] = useState({
    roomID: "",
    password: "",
  });
  const [roomIDErrMsg, setRoomIDErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const [fetching, setFetching] = useState(false);
  const files = useRef();

  const uploadFiles = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (inps.roomID.length < 5 || inps.roomID.length > 20) {
      setRoomIDErrMsg("roomID should be between 5 to 20 characters");
      return;
    } else if (inps.password.length < 8) {
      setPasswordErrMsg("Password should be at least 8 characters");
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

      if(!count){
        return toast("No files selected to upload",{
          icon:"🤦‍♂️",
          style:{
            color:"white",
            textTransform:"capitalize",
            background:"#14213d",
            fontWeight:"bolder"
          }
        });
      }else if(count > 5){
        toast("only top 5 files will selected",{
          icon:"👍",
          style:{
            color:"white",
            textTransform:"capitalize",
            background:"#14213d",
            fontWeight:"bolder"
          }
        })
      }

      setFetching(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      setFetching(false);

      const parser = await response.json();
      if (response.status === 201) {
        toast.success("Files uploaded successfully");
      } else {
        const { message } = parser;
        toast.error(`${message}`);
      }
    } catch (error) {
      toast.error("Network Error please try again");
      setFetching(false);
    }
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
    document.title = "Rapid-Share | Upload files";
  });

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
              <span>Room-ID*</span>
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

            <div className="upload-area">
              <input type="file" multiple ref={files} />
              <img src={upload} alt="upload image icon" />
              <span>
                Alternatively, you can select files by clicking Drag file(s) to
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
            <button
              type="submit"
              onClick={uploadFiles}
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
                "submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Upload;
