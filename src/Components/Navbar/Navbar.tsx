import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Styles
import styles from "./Navbar.module.scss";
import "../../styles/globals.css";

// Assets
import tgr_logo_full from "../../assets/logos/png/tgr_logo_full.png";
import { Link } from "react-router-dom";
import { WalletButton } from "../WalletButton";

export const Navbar = () => {
  const [landingPage, setLandingPage] = useState(false);

  const [hiw, checkHiw] = useState(false);
  const [roadmap, checkRoadmap] = useState(false);
  const [poweredBy, checkPoweredBy] = useState(false);

  const [portal, checkPortal] = useState(false);
  const [stats, checkStats] = useState(false);
  const [profile, checkPorfile] = useState(false);

  return (
    <div className={styles.navbar_outer}>
      <div className={`container ${styles.navbar}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src={tgr_logo_full} alt="tgr_logo_full" />
        </div>
        {landingPage ? (
          // Landing page navigations
          <ul className={styles.landing_page_links}>
            <li>
              <div className={styles.buy_tgr}>
                <p>Buy $TGR</p>
                <Icon
                  icon="gridicons:dropdown"
                  fontSize={"23px"}
                  id={styles.dropdown_icon}
                />
                <span className={styles.buy_tgr_dropdown}>
                  <ul>
                    <a href="#" target={"_blank"}>
                      <li>Binance</li>
                    </a>
                    <a href="#" target={"_blank"}>
                      <li>Coinbase</li>
                    </a>
                    <a href="#" target={"_blank"}>
                      <li>CoinSwitch</li>
                    </a>
                    <a href="#" target={"_blank"}>
                      <li>WazirX</li>
                    </a>
                  </ul>
                </span>
              </div>
            </li>
            <li>
              <a>Docs</a>
            </li>
            <a
              href="#hiw"
              onClick={() => {
                checkHiw(true);
                checkRoadmap(false);
                checkPoweredBy(false);
              }}
            >
              <li>
                How it works?
                <input type="radio" name="highlighter" checked={hiw}></input>
                <span className={styles.highlighter}></span>
              </li>
            </a>
            <a
              href="#roadmap"
              onClick={() => {
                checkRoadmap(true);
                checkHiw(false);
                checkPoweredBy(false);
              }}
            >
              <li>
                Roadmap
                <input
                  type="radio"
                  name="highlighter"
                  checked={roadmap}
                ></input>
                <span className={styles.highlighter}></span>
              </li>
            </a>
            <a
              href="#powered_by"
              onClick={() => {
                checkHiw(false);
                checkPoweredBy(true);
                checkRoadmap(false);
              }}
            >
              <li>
                Powered By
                <input
                  type="radio"
                  name="highlighter"
                  checked={poweredBy}
                ></input>
                <span className={styles.highlighter}></span>
              </li>
            </a>
            {/* <a href="#faq">
              <li>
                FAQs
                <input
                  type="radio"
                  name="highlighter"
                  onClick={() => setDefaultCheck(false)}
                ></input>
                <span className={styles.highlighter}></span>
              </li>
            </a> */}
          </ul>
        ) : (
          // Links, navigation (App)
          <ul className={styles.app_links}>
            <a
              onClick={() => {
                checkPortal(true);
                checkPorfile(false);
                checkStats(false);
              }}
            >
              <li>
                Portal
                <input type="radio" name="highlighter" checked={portal}></input>
                <span className={styles.highlighter}></span>
              </li>
            </a>
            <a
              onClick={() => {
                checkPortal(false);
                checkPorfile(false);
                checkStats(true);
              }}
            >
              <li>
                Stats
                <input type="radio" name="highlighter" checked={stats}></input>
                <span className={styles.highlighter}></span>
              </li>
            </a>
            <a
              onClick={() => {
                checkPortal(false);
                checkPorfile(true);
                checkStats(false);
              }}
            >
              <li>
                Profile
                <input
                  type="radio"
                  name="highlighter"
                  checked={profile}
                ></input>
                <span className={styles.highlighter}></span>
              </li>
            </a>
          </ul>
        )}
        {/* Launch App button */}
        <div className={styles.app_button}>
          {landingPage ? <button>Launch App</button> : <WalletButton />}
        </div>
      </div>
    </div>
  );
};
