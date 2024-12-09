import React,{useState,useEffect} from "react";
import "./download.css";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DownloadPage from "./DownloadPage";


const Download = () => {
  const [inps, setInps] = useState({
    roomID: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [fetching,setFetching] = useState(false);

  const [downloadData,setDownloadData] = useState([]);

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

  useEffect(()=>{
    document.title = "Rapid-Share | Download files"
  },[])

  const handleDownload = async (event) => {
    event.preventDefault();
    if (!errMsg) {
        if (inps.roomID.length < 5 || inps.roomID.length > 20) {
          setErrMsg("roomID should be between 5 to 20 characters");
          return;
        } else if (inps.password.length < 8) {
          setErrMsg("Password should be at least 8 characters");
          return;
        }

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/download`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Adjust based on server requirements
                },
                body: JSON.stringify(inps), // Stringify if sending JSON data
            });

            const parser = await response.json();
            if(response.status === 200){

                localStorage.setItem("token",parser.token);
                setDownloadData(parser.data);
                return;
            }

            toast.error(parser.message);
            
    
            
        } catch (error) {
            toast.error(error.message);
        }        
    }
  }

  const navigate = useNavigate();

  if(downloadData.length > 0){
    return <DownloadPage data={downloadData}/>
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

export default Download;
