import React from "react";
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="fContainer">
        <div className="footer-container">
          <div className="content-container">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </div>
          {/* <div className="conterms">
            <li>Made with 💖 by Team Ethermions</li>
          </div> */}
          <div className="media-container">
            <p>
              <FaDiscord size={25} className="icons" />
            </p>
            <p>
              <FaGithub size={25} className="icons" />
            </p>
            <p>
              <FaInstagram size={25} className="icons" />
            </p>
            <p>
              <FaTwitter size={25} className="icons" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
