import HomeImg from "./../assets/Home-IMG.png"
import RapidShare from "./../assets/RAPID-SHARE.svg"
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <nav>
          <section id="Logo">
            <div className="logo-container">
              <img src={RapidShare} alt="logo" />
            </div>
          </section>
          <section id="Nav-Links">
            <a href="#">about</a>
            <a href>contact</a>
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
                  <span style={{ color: "#d0ff00" }}>Anytime,Anywhere.</span>
                </span>
              </div>
            </div>
            <div className="section-2-sub">
              <div>
                <span className="span-headers">
                  <span style={{ color: "#d0ff00" }}>click here</span> to upload
                  files
                </span>
                <Link to="/upload">
                  <button id="upload" title="upload">
                    Upload
                  </button>
                </Link>
              </div>
              <div>
                <span className="span-headers">
                  <span style={{ color: "#d0ff00" }}>click here</span> to
                  Download files
                </span>
                <Link to="/download">
                  <button id="upload" title="Download">
                    Download
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}



export default Home;