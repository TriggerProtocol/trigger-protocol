import React from "react";

// Styles
import styles from "./Footer.module.scss";
import "../../styles/globals.css";

// Assets
import portal from "../../assets/images/portal.png";
import tgr_logo_full from "../../assets/logos/png/tgr_logo_full.png";
import twitter from "../../assets/logos/svg/socials/twitter.svg";
import reddit from "../../assets/logos/svg/socials/reddit.svg";
import telegram from "../../assets/logos/svg/socials/telegram.svg";
import discord from "../../assets/logos/svg/socials/discord.svg";

export const Footer = () => {
  return (
    <div className={styles.footer_outer}>
      <div className={`container ${styles.footer}`}>
        {/* <img src={portal} alt="portal" /> */}
        <div className={styles.footer_links}>
          <img src={tgr_logo_full} alt="tgr_logo_full" />
          <div className={styles.links}>
            <strong>Community</strong>
            <ul>
              <a>
                <li>Discord</li>
              </a>
              <a>
                <li>Twitter</li>
              </a>
              <a>
                <li>Reddit</li>
              </a>
              <a>
                <li>Telegram</li>
              </a>
            </ul>
          </div>
        </div>
        <div className={styles.footer_social}>
          <div className={styles.logos}>
            <a>
              <img src={twitter} alt="twitter" />
            </a>
            <a>
              <img src={discord} alt="discord" />
            </a>
            <a>
              <img src={reddit} alt="reddit" />
            </a>
            <a>
              <img src={telegram} alt="telegram" />
            </a>
          </div>
          <p>Copyright ©2022 Trigger Protocol</p>
        </div>
      </div>
    </div>
  );
};
