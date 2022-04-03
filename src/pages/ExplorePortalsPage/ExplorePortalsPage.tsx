import React from "react";
import { Link } from "react-router-dom";

import { Portal } from "Components/Portal";
import { PortalCard } from "Components/PortalCard";
import ScrollToTop from "utils/ScrollToTop";
import styles from "./explore-portals.module.scss";

import { fakeData } from "utils/fakeData";
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
        <Link to={`/portal/${fakeData[4].appid}`}>
          <PortalCard
            gameTitle={fakeData[4].gameName}
            gameDescription={fakeData[4].shortDescription}
            gameThumbnail={fakeData[4].gameThumbnail}
            handleClick={() => {}}
          />
        </Link>
      </div>
      <div className={styles.portal_details}>
        <div className={styles.portal_title}>
          <h1>{fakeData[4].gameName}</h1>
        </div>
        <div className={styles.portal_stats}>
          <div className={styles.stat}>
            <div className={styles.data}>
              <p>
                520<span> xTGR</span>
              </p>
            </div>
            <div className={styles.title}>
              <p>Total Value Locked</p>
            </div>
          </div>
          <div className={styles.sub_stats}>
            <div className={styles.stat}>
              <div className={styles.data}>
                <p>120</p>
              </div>
              <div className={styles.title}>
                <p>Total NFTS</p>
              </div>
            </div>
            <div className={styles.seperator}></div>

            <div className={styles.stat}>
              <div className={styles.data}>
                <p>
                  100k<span>TGR</span>
                </p>
              </div>
              <div className={styles.title}>
                <p>Total Volume</p>
              </div>
            </div>
            <div className={styles.seperator}></div>
            <div className={styles.stat}>
              <div className={styles.data}>
                <p>
                  1.2<span>TGR/Transactions</span>
                </p>
              </div>
              <div className={styles.title}>
                <p>Reward rate</p>
              </div>
            </div>
          </div>
        </div>
        <Link to={`/portal/${fakeData[4].appid}`}>
          <button className="btn-lg">Join Portal</button>
        </Link>
      </div>
    </div>
  );
};

const PortalsList = () => {
  return (
    <div className={styles.portals_list_container}>
      {fakeData.map((data) => (
        <Link to={`/portal/${data.appid}`}>
          {" "}
          <PortalCard
            gameTitle={data.gameName}
            gameDescription={data.shortDescription}
            gameThumbnail={data.gameThumbnail}
            handleClick={() => {}}
          />
        </Link>
      ))}
    </div>
  );
};
