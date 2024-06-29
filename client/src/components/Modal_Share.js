import { useEffect } from "react";
import "./Modal_Share.css";
import {getdata} from "./Display";

const Modal_Share = ({ setModalFetchOpen, contract, setSharedAddress }) => {
  // console.log(setSharedFilesAddress)
  function Fetch_files(){
    // console.log("fetched")
    setSharedAddress(document.querySelector(".address").value)
  }
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Fetch from</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setModalFetchOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            {/* <button onClick={() => setSharedAddress(document.querySelector(".address").value)}>Share</button> */}
            <button onClick={Fetch_files}>Fetch</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal_Share;
