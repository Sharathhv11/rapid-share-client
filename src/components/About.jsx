import React from "react";
import Faq from "react-faq-component";

const About = () => {
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
          "With Rapid-Share, you can upload up to 5 files with a total size limit of 100MB. The files are available for download only for 10 minutes after upload, ensuring privacy and temporary usage.",
      },
      {
        title: "Why Is the Application a Bit Slower?",
        content:
          "As Rapid-Share is hosted on the free deployment tier of Render, some latency may occur. This helps us provide the service at no cost while maintaining functionality. We appreciate your understanding.",
      },
      {
        title: "How to Use Rapid-Share?",
        content:
          "1. Upload your files (up to 5, under 100MB).  \n2. fill the roomID and Password to create the section and share those credentials to allow other to download the file securly.  \n3. Ensure the recipient downloads the files within 10 minutes, as the files will be automatically deleted after that.",
      },
      {
        title: "How Do We Handle Your Privacy?",
        content:
          "At Rapid-Share, we prioritize your privacy. Uploaded files are not stored on our servers beyond the 10-minute window. This ensures your data remains secure and private at all times.",
      },
    ],
  };

  const styles = {
    bgColor: 'transparent',
    titleTextColor: "rgb(8 152 252)",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
  };
  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
  };
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <Faq data={data} styles={styles} config={config} />
      </div>
    </div>
  );
};

export default About;
