import React, { MouseEvent, useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
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
//utils
import {
  createPortalInstance,
  createStreamInstance,
  getPortalInstance,
  getStreamInstance,
  IStreamData,
} from "configs/textile.io.configs";

import {
  createStream,
  getStreamData,
  toggleStreamRecord,
  deleteStream,
} from "configs/livepeer.config";
import { MintForm } from "Components/MintForm";
export const PortalPage = () => {
  useEffect(() => {
    getPortalInstance("dsewew").then((data) => {
      console.log(data);
    });
    // getStreamData().then((data) => {
    //   console.log(data);
    // });
    deleteStream().then((data) => {
      console.log(data);
    });
    // toggleStreamRecord().then((data) => {
    //   console.log(data);
    // });
    // createStream().then((data) => {
    //   console.log(data);
    // });
    // createPortalInstance()
    //   .then(() => {
    //     console.log("Portal instance created");
    //   })
    //   .catch((err) => console.log("Error creating Instance :", err));
  });
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
            <AddressInfo address="0xE0E6Ab1F6e8714063F2A4A4341Fc6B0CbA3cD16c" />
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
                      address="0xE0E6Ab1F6e8714063F2A4A4341Fc6B0CbA3cD16c"
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
  const [popupToggle, setPopuptoggle] = useState(false);
  const [creatingStream, setCreatingStream] = useState(false);
  const [recordStream, setRecordStream] = useState(false);
  const [allStreams, setAllStreams] = useState<Array<IStreamData>>([]);
  const streamNameRef = useRef<HTMLInputElement>(null);
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [{ data: walletConnection, error }] = useConnect();

  useEffect(() => {
    getStreamInstance("4").then((data) => {
      console.log(data);
      //@ts-ignore
      setAllStreams(data);
    });
  }, []);

  const navigate = useNavigate();
  function handleCreateStream(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (
      streamNameRef.current?.value &&
      walletConnection.connected &&
      accountData?.address
    ) {
      setCreatingStream(true);
      let streamName: string = streamNameRef.current?.value;
      createStream(streamName, recordStream)
        .then((data) => {
          const { id } = data.data;
          createStreamInstance(
            "4",
            "23232",
            id,
            streamName,
            accountData?.address
          )
            .then((data) => {
              console.log(data);
              navigate(`/streamer-dashboard/${id}`);
              setCreatingStream(false);
            })
            .catch((err) => {
              console.log("error at storing stream data: ", err);
            });
        })
        .catch((err) => {
          console.log("error at stream creation: ", err);
        });
    }
  }
  return (
    <div className={styles.livestream_section}>
      <SectionTitle sectionName="Live Streams" />
      <div className={styles.streams_wrapper}>
        <div className={styles.streams_list}>
          {allStreams.length != 0
            ? allStreams.map((data) => {
                // console.log(data)
                return (
                  <Link to={`/stream/${data._id}`}>
                    {" "}
                    <div className={styles.stream_card}>
                      <LiveStreamCard
                        streamName={data.streamName}
                        creatorAddress={data.creatorAddress}
                        createdAt={data.createdAt}
                      />
                    </div>
                  </Link>
                );
              })
            : "no streams"}
        </div>
        <div className={styles.create_stream}>
          <div className={styles.create_stream_wrapper}>
            <div className={styles.layer_blur}></div>

            <div
              className={`${styles.create} solid_border`}
              onClick={() => setPopuptoggle(true)}
            >
              <p>Create Live Stream</p>
            </div>
          </div>
        </div>
      </div>
      <PopupModal
        modalTitle="Create Stream"
        toggleModal={popupToggle}
        setToggleModal={(state) => setPopuptoggle(state)}
        height={"200px"}
        width={"300px"}
      >
        {creatingStream ? (
          <div className={styles.loading_stream}>
            <h2>Creating stream...</h2>
          </div>
        ) : (
          <form action="" className={`${styles.create_stream_form} form-ui`}>
            <label htmlFor="">Stream Name</label>
            <input type="text" ref={streamNameRef} />
            <div className={styles.stream_form_flex}>
              <label htmlFor="" className={styles.record_label}>
                Record Stream
              </label>
              <label
                htmlFor=""
                className="switch-toggle"
                onClick={() => setRecordStream(!recordStream)}
              >
                <input type="checkbox" />
              </label>{" "}
            </div>
            <button className="btn-md" onClick={(e) => handleCreateStream(e)}>
              Create Stream{" "}
            </button>
          </form>
        )}
      </PopupModal>
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
        height="fit-content"
        width="fit-content"
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
