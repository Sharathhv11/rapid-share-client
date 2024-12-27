import HomeImg from "./../assets/homePageLogo-removebg.png";
import RapidShare from "./../assets/appLogo2.png";
import { Link } from "react-router-dom";
import upload from "./../assets/folder_upload_fill.svg";
import download from "./../assets/folder_download_fill.svg";
import Faq from "react-faq-component";
import Footer from "../components/Footer";

const data = {
  title: "Know More About Rapid-Share",
  rows: [
    {
      title: "What is Rapid-Share?",
      content:
        "Rapid-Share is a lightweight file-sharing application that allows you to quickly upload and share files with ease. Designed for simplicity and privacy, it ensures your files are shared securely and efficiently.",
    },
    {
      title: "Application Limitations",
      content:
        "With Rapid-Share, you can upload up to 5 files with a total size limit of 500MB. The files are available for download only for 10 minutes after upload, ensuring privacy and temporary usage.",
    },
    {
      title: "Why Is the Application a Bit Slower?",
      content:
        "As Rapid-Share is hosted on the free deployment tier of Render, some latency may occur. This helps us provide the service at no cost while maintaining functionality. We appreciate your understanding.",
    },
    {
      title: "How to Use Rapid-Share?",
      content:
        "1. Upload your files (up to 5, under 500MB).  \n2. Share the generated link with your recipient.  \n3. Ensure the recipient downloads the files within 10 minutes, as the files will be automatically deleted after that.",
    },
    {
      title: "How Do We Handle Your Privacy?",
      content:
        "At Rapid-Share, we prioritize your privacy. Uploaded files are not stored on our servers beyond the 10-minute window. This ensures your data remains secure and private at all times.",
    },
  ],
};

function Home() {
  return (
    <>
      <div className="main-container">
        <nav>
          <section id="Logo">
            <div className="logo-container">
              <img src={RapidShare} alt="logo" />
            </div>
          </section>
          <section id="Nav-Links">
            <Link to="/about" className="poppins-regular">
              about
            </Link>
            {/* <Link to="/contact" className="poppins-regular"> */}
            <a href="#footer">contact</a>
            {/* </Link> */}
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
                <span id="main-Header" className="poppins-medium">
                  {" "}
                  Get Started{" "}
                </span>
              </div>
              <div className="main-header-2">
                <span className="poppins-regular">
                  {" "}
                  Fast, Secure, and Effortless File{" "}
                </span>
                <span className="poppins-regular">
                  Sharing –{" "}
                  <span
                    style={{ color: "#0066ff" }}
                    className="poppins-regular"
                  >
                    Anytime,Anywhere.
                  </span>
                </span>
              </div>
            </div>
            <div className="mobile-img-container">
              <img src={HomeImg} alt="share files" />
            </div>

            <div className="section-2-container">
            <div>
                <Link
                  to="/upload"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                  }}
                >
                  <button className="upload-download-btn">
                    <img
                      src={upload}
                      alt="upload your files by clicking here"
                    />
                    <p className="link-headers poppins-regular">Upload</p>
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  to="/download"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                  }}
                >
                  <button className="upload-download-btn">
                    <img
                      src={download}
                      alt="upload your files by clicking here"
                    />
                    <p className="link-headers poppins-regular">download</p>
                  </button>
                </Link>
              </div>
            </div>
            {/* <div className="section-2-sub">
              <div>
                <Link
                  to="/upload"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                  }}
                >
                  <button className="upload-download-btn">
                    <img
                      src={upload}
                      alt="upload your files by clicking here"
                    />
                    <p className="link-headers poppins-regular">Upload</p>
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  to="/download"
                  style={{
                    width: "100%",
                    textDecoration: "none",
                  }}
                >
                  <button className="upload-download-btn">
                    <img
                      src={download}
                      alt="upload your files by clicking here"
                    />
                    <p className="link-headers poppins-regular">download</p>
                  </button>
                </Link>
              </div>
            </div> */}
          </section>
          {/* <div className="faq-container">
            <Faq data={data}/>
          </div> */}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
