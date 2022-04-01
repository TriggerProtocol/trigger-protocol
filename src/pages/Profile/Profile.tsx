import React, { useState } from "react";

// styles
import styles from "./Profile.module.scss";
import "styles/globals.css";
import { PortalCard } from "Components/PortalCard";
import { NFTcard } from "Components/NFTcard";

export const Profile = () => {
  const [currentNavState, setCurrentNavState] = useState(0);

  return (
    <div className={styles.profile}>
      <ProfileNavigator
        currentNavState={currentNavState}
        setCurrentNavState={setCurrentNavState}
      />
      <div className={styles.profile_main}>
        {currentNavState === 3 ? <PortalsJoined /> : ""}
        {currentNavState === 2 ? <MyNfts /> : ""}
        {currentNavState === 1 ? <MyGames /> : ""}
      </div>
    </div>
  );
};

const ProfileNavigator = ({
  currentNavState,
  setCurrentNavState,
}: {
  currentNavState: any;
  setCurrentNavState: any;
}) => {
  return (
    <div className={styles.profile_navigator_wrapper}>
      <div className={`${styles.profile_navigator} container`}>
        <ul>
          <li
            className={
              currentNavState == 0 ? styles.link_active : styles.link_inactive
            }
            onClick={() => setCurrentNavState(0)}
          >
            Dashboard
          </li>

          <li
            className={
              currentNavState == 1 ? styles.link_active : styles.link_inactive
            }
            onClick={() => setCurrentNavState(1)}
          >
            My Games
          </li>
          <li
            className={
              currentNavState == 2 ? styles.link_active : styles.link_inactive
            }
            onClick={() => setCurrentNavState(2)}
          >
            My NFTs
          </li>
          <li
            className={
              currentNavState == 3 ? styles.link_active : styles.link_inactive
            }
            onClick={() => setCurrentNavState(3)}
          >
            Portals Joined
          </li>
        </ul>
      </div>
    </div>
  );
};

const PortalsJoined = () => {
  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <PortalCard />
      ))}
    </>
  );
};

const MyNfts = () => {
  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <NFTcard />
      ))}
    </>
  );
};

const MyGames = () => {
  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <PortalCard createPortal={true} />
      ))}
    </>
  );
};
