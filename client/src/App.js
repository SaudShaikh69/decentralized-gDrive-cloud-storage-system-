import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Modal_Share from "./components/Modal_Share";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalShareOpen, setModalShareOpen] = useState(false);
  const [modalFileOpen, setModalFileOpen] = useState(false);
  const [modalFetchOpen, setModalFetchOpen] = useState(false);
  const [sharedAddress, setSharedAddress] = useState("");

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
        console.log(address)
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      {/* {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )} */}
      {modalFileOpen && (
        // <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        <FileUpload account={account} provider={provider} contract={contract} setModalFileOpen={setModalFileOpen}></FileUpload>
      )}

      {modalShareOpen && (
        <Modal setModalShareOpen={setModalShareOpen} contract={contract}></Modal>
        // <FileUpload account={account} provider={provider} contract={contract} setModalOpen={modalFileOpen}></FileUpload>
      )}

      {modalFetchOpen && (
        <Modal_Share setModalFetchOpen={setModalFetchOpen} contract={contract} setSharedAddress={setSharedAddress}></Modal_Share>
        // <FileUpload account={account} provider={provider} contract={contract} setModalOpen={modalFileOpen}></FileUpload>
      )}

      <div className="App">
      <h4>Account : {account ? account : "Not connected"}</h4>
        <div class="row">
          <div class="col-3">
            <div class="container d-flex justify-content-center mt-20" id="drive_body">
              <div>
                <div class="tab-vertical col-3">
                  <ul class="nav nav-tabs" id="myTab3" role="tablist" id="drive_tab">
                    <img src={require('./resources/logo.png')} />
                    <li class="nav-item">
                      <a class="nav-link create_file"><button type="button" class="btn btn-success" onClick={() => setModalFileOpen({ modalFileOpen: true })}>+ Add Files</button></a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link create_file"><button type="button" class="btn btn-info" onClick={() => setModalShareOpen({ modalShareOpen: true })}>Share Files</button></a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link create_file"><button type="button" class="btn btn-info" onClick={() => setModalFetchOpen({ modalFetchOpen: true })}>Fetch Files</button></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-9">
            {contract &&
          <Display contract={contract} account={account} sharedAddress = {sharedAddress}></Display>
            }
          </div>
        </div>
        {/* <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>*/
        }
      </div>
    </>
  );
}

export default App;
