import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import React, { useEffect } from "react";
// import { useRouter } from "next/router";
import { useAccount, useSigner } from "wagmi";
import { useDispatch } from "react-redux";
import warrantyAbi from "../assets/contract_data/warranty.json";
import warranty_contract_address from "../assets/contract_data/warrantyAddress.json";
import { addContractAddresses, saveAddressAndSigner } from "@/redux/navbar";
import { ConnectWallet } from "./CustomConnect";

// image
import logo from "../assets/logo/dwar.svg";

function Navbar() {
  // const router = useRouter();
  // const urlpath = router.pathname;

  const dispatch = useDispatch();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  // const [addressfinal, setAddressfinal] = useState(null);

  const instances = new ethers.Contract(
    warranty_contract_address.address,
    warrantyAbi.abi,
    signer
  );

  useEffect(() => {
    dispatch(
      addContractAddresses({
        warranty_contract_address: warranty_contract_address.address,
      })
    );
    address && signer
      ? dispatch(
          saveAddressAndSigner({
            address,
            signer,
            instances,
          })
        )
      : null;
  }, [signer, dispatch]);

  return (
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
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
