import HomeImg from "./../assets/Home-IMG.png";
import RapidShare from "./../assets/RAPID-SHARE.svg";
import { Link } from "react-router-dom";
import upload from "./../assets/folder_upload_fill.svg";
import download from "./../assets/folder_download_fill.svg";
import Faq from "react-faq-component"

const data = {
  title: "Know More About Rapid-Share",
rows: [
  {
    title: "What is Rapid-Share?",
    content: "Rapid-Share is a lightweight file-sharing application that allows you to quickly upload and share files with ease. Designed for simplicity and privacy, it ensures your files are shared securely and efficiently."
  },
  {
    title: "Application Limitations",
    content: "With Rapid-Share, you can upload up to 5 files with a total size limit of 500MB. The files are available for download only for 10 minutes after upload, ensuring privacy and temporary usage."
  },
  {
    title: "Why Is the Application a Bit Slower?",
    content: "As Rapid-Share is hosted on the free deployment tier of Render, some latency may occur. This helps us provide the service at no cost while maintaining functionality. We appreciate your understanding."
  },
  {
    title: "How to Use Rapid-Share?",
    content: "1. Upload your files (up to 5, under 500MB).  \n2. Share the generated link with your recipient.  \n3. Ensure the recipient downloads the files within 10 minutes, as the files will be automatically deleted after that."
  },
  {
    title: "How Do We Handle Your Privacy?",
    content: "At Rapid-Share, we prioritize your privacy. Uploaded files are not stored on our servers beyond the 10-minute window. This ensures your data remains secure and private at all times."
  }
]

  
}

function Home() {
  return (
    <>
      <div>
        <nav>
          <section id="Logo">
            <div className="logo-container">
              {/* <img src={RapidShare} alt="logo" /> */}
              RapidShare
            </div>
          </section>
          <section id="Nav-Links">
            <Link to="/about">about</Link>
            <Link to="/contact">contact</Link>
          </section>
        </nav>
        <main className="Home-main">
          <section>
            <div id="home-page-img-container">
              <img src={HomeImg} alt="share files" />
            </div>
          </section>
          <section>
            <div className="section-2-main">
              <div>
                <span id="main-Header"> Get Started </span>
              </div>
              <div className="main-header-2">
                <span> Fast, Secure, and Effortless File </span>
                <span>
                  Sharing –{" "}
                  <span style={{ color: "#0066ff" }}>Anytime,Anywhere.</span>
                </span>
              </div>
            </div>
            <div className="section-2-sub">
              <div>
                <Link to="/upload" style={{
                  width:"100%",
                  textDecoration:"none"
                }}>
                  <button className="upload-download-btn">
                  <img src={upload} alt="upload your files by clicking here" />
                  <p className="link-headers">Upload</p>
                </button>
                </Link>
               
              </div>
              <div>
                
                <Link to="/download" style={{
                  width:"100%",
                   textDecoration:"none"
                }}>
                <button className="upload-download-btn">
                  <img
                    src={download}
                    alt="upload your files by clicking here"
                  />
                  <p className="link-headers">download</p>
                </button>
                </Link>
               
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* <div className="faq-div">
        <Faq data={data}></Faq>
      </div> */}
    </>
  );
}

export default Home;
