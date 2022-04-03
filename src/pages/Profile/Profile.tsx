import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccount, useConnect } from "wagmi";
// styles
import styles from "./Profile.module.scss";
import "styles/globals.css";
import { PortalCard } from "Components/PortalCard";
import { NFTcard } from "Components/NFTcard";
import { createPortalInstance } from "configs/textile.io.configs";
import { useTriggerProtocolContract } from "hooks";

const axiosApiInstance = axios.create({
  baseURL: "https://trigger-protocol-api.herokuapp.com/",
});
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
      {/* {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <PortalCard />
      ))} */}
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
type gameData = {
  name: string;
  shortDescription: string;
  gameThumbnail: string;
};
const MyGames = () => {
  const [ownedGames, setOwnedGames] = useState<Array<gameData>>([]);
  const [loading, setLoading] = useState(true);
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [{ data: walletConnection, error }] = useConnect();

  const { createPortal } = useTriggerProtocolContract();
  useEffect(() => {
    const body = { userId: "76561199061887574" };
    axios
      .post(
        "https://trigger-protocol-api.herokuapp.com/tgr-api/owned-games",
        body
      )
      .then((data) => {
        if (data.status === 200) {
          setOwnedGames(data.data);
          setLoading(false);
        }
      });
  }, []);

  //create new portal if portal not crreated
  function handleCreatePortal(gameData: any) {
    if (walletConnection.connected && accountData?.address) {
      createPortalInstance(
        gameData.name,
        gameData.appId,
        gameData.shortDescription,
        gameData.gameThumbnail,
        accountData?.address
      ).then((data) => {
        console.log(data);
        // createPortal({ dbThreadID: data._id, appID: gameData.appId }).then(
        //   () => {}
        // );
      });
    }
  }
  return (
    <>
      {
        loading ? "Loading" : console.log(ownedGames)
        // ? ownedGames.map((data) => (
        //     <PortalCard
        //       gameTitle={data.name}
        //       gameDescription={data.shortDescription}
        //       gameThumbnail={data.gameThumbnail}
        //       createPortal={true}
        //       handleClick={() => handleCreatePortal(data)}
        //     />
        //   ))
        // : "no games"
      }
    </>
  );
};
