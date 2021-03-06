import React, { MouseEvent, useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Link, useParams } from "react-router-dom";
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
import { fakeData } from "utils/fakeData";
type GameData = {
  appid: string;
  gameName: string;
  gameThumbnail: string;
  shortDescription: string;
};
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
  const { portalId } = useParams();

  const [popupToggle, setPopuptoggle] = useState(false);
  const [portalData, setPortalData] = useState<GameData>();
  const { contract, createPortal } = useTriggerProtocolContract();
  const data: IPortal = {
    dbThreadID: "3232",
    appID: 3232,
  };
  useEffect(() => {
    if (portalId) {
      fakeData.map((data) => {
        if (data.appid === portalId) {
          setPortalData(data);
        }
      });
    }
  }, []);
  function handleCreatePortal() {
    // createPortal(data)
    //   .then((txn) => {
    //     console.log(txn);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            <h2>{portalData?.gameName}</h2>
          </div>
          <div className={styles.app_description}>
            <p>{portalData?.shortDescription}</p>
          </div>
          <div className={styles.portal_creator}>
            <p className="heading3">Created By</p>
            <AddressInfo address="0xE0E6Ab1F6e8714063F2A4A4341Fc6B0CbA3cD16c" />
          </div>
        </div>
        <div className={styles.stats_join}>
          <div className={styles.portal_stats}>
            <div className={styles.stat}>
              <p className={styles.data}>150</p>
              <p className={styles.title}>Total NFTs</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.data}>960</p>
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

          <button className="btn-md" onClick={() => setPopuptoggle(true)}>
            Stake
          </button>
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
      <PopupModal
        modalTitle="Manage Staking"
        toggleModal={popupToggle}
        setToggleModal={(state) => setPopuptoggle(state)}
        height={"350px"}
        width={"fit-content"}
      >
        <div className={styles.stake_popoup_wrapper}>
          <form action="" className={`${styles.stake_form} form-ui`}>
            <div className="form_input_balance">
              <div className="wrap_input_head">
                <label htmlFor="">Enter Amount</label>
                <p id="balance">Balance : 0 xTGR</p>
              </div>
              <div className="big_input">
                <input type="number" defaultValue={0.0} />
                <p id="max-btn">max</p>
              </div>
            </div>
            <button className="btn-md">Stake</button>
          </form>
          <div className={styles.seperator}></div>
          <div className={styles.stake_details}>
            <div className={styles.details_item}>
              <p className="heading2">100xTGR</p>
              <p>My Total Stake</p>
              <button className="btn-md">Withdraw</button>
            </div>
            <div className={styles.details_item}>
              <p className="heading2">10TGR</p>
              <p>Total Rewards Earned</p>
              <button className="btn-md">Claim</button>
            </div>
          </div>
        </div>
      </PopupModal>
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
    let interval = setInterval(() => {
      getStreamInstance("4").then((instance) => {
        // console.log(data);
        console.log("test");
        var FinalStreams: Array<{ id: string; isActive: boolean }> = [];
        let allPromise = instance.map(async (stream) => {
          await getStreamData(stream.streamId).then(({ data }) => {
            FinalStreams.push(data);
          });
        });

        Promise.all(allPromise).then(() => {
          instance.map((stream) => {
            FinalStreams.map((data) => {
              if (data.id == stream.streamId) {
                if (data.isActive && !allStreams.includes(stream)) {
                  setAllStreams([stream]);
                } else {
                  setAllStreams([
                    ...allStreams.filter(
                      (stream) => stream.streamId !== data.id
                    ),
                  ]);
                }
              }
            });
          });
        });
        //@ts-ignore
      });
      return () => clearInterval(interval);
    }, 5000);
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
              navigate(`/streamer-dashboard/${data[0]}`);
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
            <input type="text" className="input-black" ref={streamNameRef} />
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
            <button
              className="btn-md"
              disabled={walletConnection.connected === false}
              onClick={(e) => handleCreateStream(e)}
            >
              {walletConnection.connected ? "Create Stream" : "Conect Wallet"}
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
