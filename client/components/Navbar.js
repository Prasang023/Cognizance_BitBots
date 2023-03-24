import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import logo from "../assets/logo.png";
import { useAccount, useSigner } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDispatch, useSelector } from "react-redux";
import abi from "../assets/contract_data/Products.json";
import nftAbi from "../assets/contract_data/nft.json";
import DL_contract_address from "../assets/contract_data/ProductsAddress.json";
import nft_contract_address from "../assets/contract_data/nftAddress.json";
import { addContractAddresses, saveAddressAndSigner } from "@/redux/navbar";

// icons
import { FaRegBell, FaRegTimesCircle } from "react-icons/fa";

// image
import logo from "../assets/logo/dwar.svg";

function Navbar() {
  const router = useRouter();
  const urlpath = router.pathname;

  const dispatch = useDispatch();

  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [addressfinal, setAddressfinal] = useState(null);

  const instances = new ethers.Contract(
    DL_contract_address.address,
    abi.abi,
    signer
  );

  const nftInstances = new ethers.Contract(
    nft_contract_address.address,
    nftAbi.abi,
    signer
  );

  useEffect(() => {
    dispatch(
      addContractAddresses({
        DL_contract_address: DL_contract_address.address,
        nft_contract_address: nft_contract_address.address,
      })
    );
    address && signer
      ? dispatch(
          saveAddressAndSigner({ address, signer, instances, nftInstances })
        )
      : null;
  }, [signer, dispatch]);

  const notifications = ['hello hetu'];

  return (
    <>
      <div className="dwar-notification-container" id="dwar-notification">
        <div className="dwar-notification-box">
          <div className="dwar-notification-box-close">
            <p>Notifications</p>
            <FaRegTimesCircle
              size={20}
              className="icons"
              onClick={() => {
                const ele = document.getElementById("dwar-notification");
                ele.style.opacity = 0;
                ele.style.zIndex = -1000;
              }}
            />
          </div>
          <div className="dwar-notification-box-list">
            {notifications.map((e, index) => {
              return (
                <div className="dwar-notification-box-list-item" key={`dwar-notification-box-list-item-${index}`}>
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="dwar-navbar-container">
        <div className="dwar-logo-container">
          <Link href="/">
            <Image
              src={logo}
              width={95}
              height={95}
              style={{ borderRadius: "100%" }}
            />
          </Link>
        </div>
        <div className="dwar-element-container">
          <div className="dwar-list-container">
            <Link href="/">Home</Link>
            <Link href="/">Documents</Link>
            <Link href="/">About</Link>
            <Link href="/">Help & Support</Link>
          </div>
          <div className="dwar-btn-container">
            {/* <ConnectButton /> */}
            <button>Connect</button>
            <div
              className="dwar-notification"
              onClick={() => {
                const ele = document.getElementById("dwar-notification");
                ele.style.opacity = 1;
                ele.style.zIndex = 1000;
              }}
            >
              <FaRegBell size={16} className="icons" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
