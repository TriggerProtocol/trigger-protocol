import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { useConnect, useAccount } from "wagmi";
import { PopupModal } from "Components/PopupModal";
import { toast } from "react-toastify";

// styles
import styles from "./WalletButton.module.scss";

// assets
import avatar from "../../assets/images/avatar.png";
import metaMask from "assets/images/metamask.svg";
import { stripAddr } from "utils";
export const WalletButton = () => {
  const wallet_ref = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [wallConnectToggle, setWalletConnectToggle] = useState(false);
  const [{ data, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  useEffect(() => {
    data.connected && setWalletConnectToggle(false);
  }, [data.connected]);
  useEffect(() => {
    error &&
      toast.error(error.message, {
        position: "bottom-right",
      });
  }, [error]);
  useEffect(() => {
    console.log(data.connectors);
    const handleClickOutisde = (event) => {
      if (wallet_ref.current && !wallet_ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutisde);
  }, []);

  return (
    <>
      <div
        className={styles.wallet_button}
        ref={wallet_ref}
        onClick={() =>
          data.connected
            ? setShowDropdown(!showDropdown)
            : setWalletConnectToggle(true)
        }
      >
        <div
          className={styles.wallet_state}
          style={showDropdown ? { paddingTop: "100px" } : { paddingTop: "0px" }}
        >
          {data.connected ? (
            <>
              <div className={styles.avatar}>
                <img src={avatar} alt="avatar" />
              </div>
              <div className={styles.wallet_details_wrapper}>
                <div className={styles.wallet_details}>
                  <h4>{stripAddr(accountData.address)}</h4>
                  <div className={styles.wallet_name}>
                    <p>{accountData.connector.name} Wallet</p>
                    <div className={styles.connected_or_not}></div>
                  </div>
                </div>
                <Icon
                  icon="gridicons:dropdown"
                  fontSize={"23px"}
                  id={styles.dropdown_icon}
                />
              </div>{" "}
            </>
          ) : (
            <h2>Connect Wallet</h2>
          )}
        </div>

        {data.connected && showDropdown ? (
          <div className={styles.dropdown}>
            <p>Copy Address</p>
            <p onClick={() => disconnect()}>Disconnect</p>
          </div>
        ) : null}
      </div>
      <PopupModal
        modalTitle="Connect Wallet"
        toggleModal={wallConnectToggle}
        setToggleModal={(state) => setWalletConnectToggle(state)}
      >
        <div>
          {data.connectors.map((connector) => (
            <div
              disabled={connector.ready === false || data.connected}
              key={connector.id}
              onClick={() => connect(connector)}
              className={styles.connector_button}
            >
              <img src={metaMask} alt="" />
              <h3> {connector.name}</h3>
              {/* <p> {data.connected ? "Connected" : "connect"}</p> */}
              {/* {!connector.ready && " (unsupported)"} */}
            </div>
          ))}

          {/* {error && <div>{error?.message ?? "Failed to connect"}</div>} */}
        </div>
      </PopupModal>
    </>
  );
};
