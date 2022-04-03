import React from "react";
import { Link } from "react-router-dom";

import { Portal } from "Components/Portal";
import { PortalCard } from "Components/PortalCard";
import ScrollToTop from "utils/ScrollToTop";
import styles from "./explore-portals.module.scss";
export const ExplorePortalsPage = () => {
  return (
    <div className={styles.container}>
      <ScrollToTop />

      <TrendingPortal />
      <PortalsList />
    </div>
  );
};
const TrendingPortal = () => {
  return (
    <div className={styles.trending_portal}>
      <div className={styles.portal}>
        <Portal />
      </div>
      <div className={styles.portal_card}>
        <Link to="/portal/1">
          <PortalCard gameTitle="Little Nightmare" handleClick={() => {}} />
        </Link>
      </div>
      <div className={styles.portal_details}>
        <div className={styles.portal_title}>
          <h1>Little Nightmares</h1>
        </div>
        <div className={styles.portal_stats}>
          <div className={styles.stat}>
            <div className={styles.data}>
              <p>
                100<span> xTGR</span>
              </p>
            </div>
            <div className={styles.title}>
              <p>Total NFTS</p>
            </div>
          </div>
          <div className={styles.sub_stats}>
            <div className={styles.stat}>
              <div className={styles.data}>
                <p>
                  100<span> xTGR</span>
                </p>
              </div>
              <div className={styles.title}>
                <p>Total NFTS</p>
              </div>
            </div>
            <div className={styles.seperator}></div>

            <div className={styles.stat}>
              <div className={styles.data}>
                <p>
                  100<span> xTGR</span>
                </p>
              </div>
              <div className={styles.title}>
                <p>Total NFTS</p>
              </div>
            </div>
            <div className={styles.seperator}></div>
            <div className={styles.stat}>
              <div className={styles.data}>
                <p>
                  100<span> xTGR</span>
                </p>
              </div>
              <div className={styles.title}>
                <p>Total NFTS</p>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-lg">Join Portal</button>
      </div>
    </div>
  );
};

const PortalsList = () => {
  return (
    <div className={styles.portals_list_container}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Link to="/portal/1">
          {" "}
          <PortalCard gameTitle="Little Nightmare" handleClick={() => {}} />
        </Link>
      ))}
    </div>
  );
};
