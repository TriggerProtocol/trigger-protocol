import React, { useState } from "react";
import { Icon } from "@iconify/react";
//hooks
import {
  useTriggerProtocolContract,
  IPortal,
} from "hooks/useTriggerProtocolContract";

//components
import { NFTcard } from "Components/NFTcard";
import { AddressInfo } from "Components/AddressInfo";
import { SectionTitle } from "pages/Home";
import { LiveStreamCard } from "Components/LiveStreamCard";
import ScrollToTop from "utils/ScrollToTop";
//styles
import styles from "./Portalpage.module.scss";
import { PopupModal } from "Components/PopupModal";
import { getNftStorageClient } from "configs/nft.storage.config";

export const PortalPage = () => {
  return (
    <div className={styles.container}>
      <ScrollToTop />
      <PortalMainSection />
      <LiveStreamSection />
      <NftSection />
    </div>
  );
};
const PortalMainSection = () => {
  const { contract, createPortal } = useTriggerProtocolContract();
  const data: IPortal = {
    dbThreadID: "3232",
    appID: 3232,
  };
  function handleCreatePortal() {
    createPortal(data)
      .then((txn) => {
        console.log(txn);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={styles.main_section}>
      <div className={`${styles.hot_nft} solid_border`}>
        <div className={styles.head}>
          <p className="heading1">Hot NFT</p>
          <Icon icon="noto:fire" height="30" />
        </div>
        <div className={styles.nft_card}>
          <NFTcard />
        </div>
      </div>
      <div className={`${styles.portal_details} solid_border`}>
        <div className={styles.app_data}>
          <div className={styles.app_name}>
            <h2>DOTA 2</h2>
          </div>
          <div className={styles.app_description}>
            <p>
              Dota is a series of strategy video games now developed by Valve.
              The series began in 2003 with the release of Defense of the
              Ancients, a fan-developed multiplayer online battle arena mod for
              the video game Warcraft III: Reign of Chaos and its expansion, The
              Frozen Throne.
            </p>
          </div>
          <div className={styles.portal_creator}>
            <p className="heading3">Created By</p>
            <AddressInfo address="0xEhs67........Tk2zw" />
          </div>
        </div>
        <div className={styles.stats_join}>
          <div className={styles.portal_stats}>
            <div className={styles.stat}>
              <p className={styles.data}>100</p>
              <p className={styles.title}>Total NFTs</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.data}>120</p>
              <p className={styles.title}>Total Gamers in portal</p>
            </div>
          </div>
          <button className="btn-md" onClick={() => handleCreatePortal()}>
            Join Portal
          </button>
        </div>
      </div>
      <div className={`${styles.portal_staking} solid_border`}>
        <div className={styles.stake_stats_btn}>
          <div className={styles.stake_stats}>
            <div className={styles.stat}>
              <p className={styles.data}>1000 xTRG</p>
              <p className={styles.title}>Total Value Locked</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.data}>2 TGR</p>
              <p className={styles.title}>Total Royalty per transaction</p>
            </div>
          </div>

          <button className="btn-md">Stake</button>
        </div>

        <div className={styles.seperator}></div>
        <div className={styles.top_stakers}>
          <div className={styles.head}>
            <h2>Top Stakers</h2>
            <div className={styles.stakers_list}>
              {[1, 2, 3, 4].map(() => {
                return (
                  <div className={styles.staker}>
                    <AddressInfo
                      address="0xEhs67........Tk2zw"
                      text="100 xTGR Staked"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.portal_user_achievement} solid_border`}>
        <div className={styles.head}>
          <p className="heading2">Your In-Game Achievement</p>
          <p className={styles.caption}>
            Claim achivement equivalent xTGR Token
          </p>
        </div>
        <div className={styles.achivement_info_btn}>
          <p id={styles.achivement_data}>
            15 <span>Achievements</span>
          </p>
          <button className="btn-sm">Claim 15xTGR</button>
        </div>
      </div>
    </div>
  );
};
const LiveStreamSection = () => {
  return (
    <div className={styles.livestream_section}>
      <SectionTitle sectionName="Live Streams" />
      <div className={styles.streams_wrapper}>
        <div className={styles.streams_list}>
          {" "}
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <div className={styles.stream_card}>
                <LiveStreamCard key={index} />
              </div>
            );
          })}
        </div>
        <div className={styles.create_stream}>
          <div className={styles.create_stream_wrapper}>
            <div className={styles.layer_blur}></div>

            <div className={`${styles.create} solid_border`}>
              <p>Create Live Stream</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const NftSection = () => {
  const [nftFormToggle, setNftFormToggle] = useState<boolean>(false);

  return (
    <div className={styles.nft_section}>
      <SectionTitle sectionName="All NFTs" />
      <div className={styles.mint_section}>
        <button className="btn-md" onClick={() => setNftFormToggle(true)}>
          Mint
        </button>
      </div>
      <div className={styles.nft_list}>
        {[1, 2, 3, 4, 5, 6].map((index) => {
          return <NFTcard key={index} />;
        })}
      </div>
      <PopupModal
        modalTitle="Mint NFT"
        height="300px"
        width="400px"
        toggleModal={nftFormToggle}
        setToggleModal={(state) => {
          setNftFormToggle(state);
        }}
      >
        <MintForm />
      </PopupModal>
    </div>
  );
};

const MintForm = () => {
  // const client = getNftStorageClient();
  // async function storeNft() {
  //   const imageFile = new File([someBinaryImageData], "nft.png", {
  //     type: "image/png",
  //   });
  //   const metadata = await client.store({
  //     name: "My sweet NFT",
  //     description: "Just try to funge it. You can't do it.",
  //     image: imageFile,
  //   });
  //   return metadata;
  // }
  // function handleMint() {
  //   storeNft()
  //     .then(() => {})
  //     .catch(() => {});
  // }
  return (
    <div className="">
      <button>Mint</button>
    </div>
  );
};
