import React, { useState } from "react";
import { Icon } from "@iconify/react";

// Styles
import styles from "./Navbar.module.scss";
import "../../styles/globals.css";

// Assets
import tgr_logo_full from "../../assets/logos/png/tgr_logo_full.png";

export const Navbar = () => {
  const [landingPage, setLandingPage] = useState(true);
  const [defaultCheck, setDefaultCheck] = useState(true);

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
                <Icon icon="gridicons:dropdown" fontSize={"23px"} id={styles.dropdown_icon} />
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
            <li>
              <a>How it works?</a>
              <input
                type="radio"
                name="highlighter"
                checked={defaultCheck}
                onClick={() => setDefaultCheck(true)}
              ></input>
              <span className={styles.highlighter}></span>
            </li>
            <li>
              <a>Roadmap</a>
              <input
                type="radio"
                name="highlighter"
                onClick={() => setDefaultCheck(false)}
              ></input>
              <span className={styles.highlighter}></span>
            </li>
            <li>
              <a>Powered By</a>
              <input
                type="radio"
                name="highlighter"
                onClick={() => setDefaultCheck(false)}
              ></input>
              <span className={styles.highlighter}></span>
            </li>
            <li>
              <a>FAQs</a>
              <input
                type="radio"
                name="highlighter"
                onClick={() => setDefaultCheck(false)}
              ></input>
              <span className={styles.highlighter}></span>
            </li>
          </ul>
        ) : (
          // Links, navigation (App)
          <ul className={styles.app_links}>
            <li>
              <a>Portal</a>
              <input type="radio" name="highlighter"></input>
              <span className={styles.highlighter}></span>
            </li>
            <li>
              <a>Stats</a>
              <input type="radio" name="highlighter"></input>
              <span className={styles.highlighter}></span>
            </li>
            <li>
              <a>Profile</a>
              <input type="radio" name="highlighter"></input>
              <span className={styles.highlighter}></span>
            </li>
          </ul>
        )}
        {/* Launch App button */}
        <div className={styles.app_button}>
          <button>Launch App</button>
        </div>
      </div>
    </div>
  );
};
