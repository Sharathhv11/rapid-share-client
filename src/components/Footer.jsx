import insta from "./../assets/ins_fill.svg";
import linkedin from "./../assets/linkedin_fill.svg";
import github from "./../assets/github_fill.svg";
import x from "./../assets/social_x_fill.svg";


const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href="https://www.instagram.com/sharath___11/profilecard/?igsh=MW81cmx0czA4YXIxNQ==" target="_blank">
          <img src={insta} alt="" />
        </a>
        <a href="https://linkedin.com/in/SharathHV" target="_blank">
          <img src={linkedin} alt="" />
        </a>
        <a href="https://github.com/Sharathhv11" target="_blank">
          <img src={github} alt="" />
        </a>
        <a href="https://x.com/imsharath11?s=09" target="_blank">
          <img src={x} alt="" />
        </a>
      </div>
      <p>
      This project is built with passion and innovation to make digital sharing faster and easier. If you have ideas or suggestions, feel free to contribute or reach out – together, we can make Rapid Share even better!
      </p>   
    </footer>
  );
};

export default Footer;
