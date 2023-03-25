import React from "react";
import { FaDiscord, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
function Footer({hide}) {
  return (
    <>
      <div className="fContainer" style={hide ? { visibility: "hidden" } : { visibility: "visible" }}>
        <div className="footer-container">
          <div className="content-container">
            <Link href="/" className="first">Terms & Conditions</Link>
            <Link href="/" className="second">Privacy Policy</Link>
          </div>
          <div className="media-container">
            <p>Made with 💖 by Team <span><span>Bit</span>Bots<span>.</span></span></p>
          </div>
          {/* <div className="media-container">
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Footer;
