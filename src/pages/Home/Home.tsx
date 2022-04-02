import React, { useEffect } from "react";
import styles from "./Home.module.scss";

// Assets
import portal from "../../assets/images/portal.svg";
import nft_card from "../../assets/images/nft_card.png";
import roadmap from "../../assets/images/Roadmap.png";
import polygon from "../../assets/logos/png/polygon.png";
import ipfs from "../../assets/logos/png/ipfs.png";
import the_graph from "../../assets/logos/png/the_graph.png";
import livepeer from "../../assets/logos/png/livepeer.png";
import { ScrollDown } from "../../Components/ScrollDown";
import {
  getAllStakesInPortal,
  getPortalNFTs,
  getPortals,
  getPortalUsers,
  getSingleUserStakes,
  getUserJoinedPortals,
} from "theGraphFuncs";
import axios from "axios";

export const Home = () => {
  useEffect(() => {
    const data = { userId: "76561199061887574" };
    axios
      .post("https://trigger-protocol-api.herokuapp.com/tgr-api/owned-games", data)
      .then((r) => console.log(r))
      .catch((err) => {
        console.log(err);
      });

    const f = getPortals();
    f.then((d) => console.log(d));

    const d = getPortalNFTs(3);
    d.then((k) => console.log(k));

    const e = getPortalUsers(3);
    e.then((r) => console.log(r));

    const s = getAllStakesInPortal(3);
    s.then((r) => console.log(r));

    const h = getSingleUserStakes(
      3,
      "0x733024e367b2FcABa7c4957d041Bf90fa58C3C4E"
    );
    h.then((r) => console.log(r));

    const k = getUserJoinedPortals(
      "0x733024e367b2FcABa7c4957d041Bf90fa58C3C4E"
    );
    k.then((r) => console.log(r));

    axios
      .get("http://127.0.0.1:8000/auth/steam/logged-data")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.landing_page}>
      <section className={styles.intro} id="intro">
        <Intro />
        <a className={styles.scroll} href="http://127.0.0.1:8000/auth/steam">
          <ScrollDown />
        </a>
      </section>
      <section className={styles.hiw} id="hiw">
        <SectionTitle sectionName={"How it works?"} />
        <HowItWorks />
      </section>
      <section className={styles.roadmap} id="roadmap">
        <SectionTitle sectionName={"Roadmap"} />
        <Roadmap />
        <div className={styles.roadmap_img}>{/* <img src={roadmap} /> */}</div>
      </section>
      <section className={styles.powered_by} id="powered_by">
        <SectionTitle sectionName={"Powered By"} />
        <div className={styles.powered_by_logos}>
          <img src={polygon} alt="polygon" />
          <img src={ipfs} alt="ipfs" />
          <img src={the_graph} alt="the_graph" />
          <img src={livepeer} alt="livepeer" />
        </div>
      </section>
      <section className={styles.faq} id="faq">
        <SectionTitle sectionName={"FAQs"} />
      </section>
    </div>
  );
};

const Intro = () => {
  return (
    <>
      <div className={styles.intro_texts}>
        <h1>
          Create game <span>portals</span>, buy and sell your favourite game{" "}
          <span>NFTs</span> seamlessly!
        </h1>
        <p>
          Trigger is a platform to onboard gamers and digital artists into the
          space of blockchain and web3 by creating their favorite game portals
          which allow buying and selling of NFTs and much more!
        </p>
        <button>Launch App</button>
        <div className={styles.intro_stats}>
          <div className={styles.stat}>
            <h3>300</h3>
            <p>All-time NFTs traded</p>
          </div>
          <div className={styles.stat}>
            <h3>$842,657,047</h3>
            <p>Total Value Locked</p>
          </div>
          <div className={styles.stat}>
            <h3>$842,65</h3>
            <p>Volume Traded (7D)</p>
          </div>
        </div>
      </div>
      <div className={styles.portal}>
        <img src={portal} alt="portal" />
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
        <img src={nft_card} alt="nft_card" id={styles.nft_card} />
        <img src={nft_card} alt="nft_card2" id={styles.nft_card2} />
      </div>
    </>
  );
};

export const SectionTitle = ({ sectionName }: { sectionName: string }) => {
  return (
    <div className={styles.section_title}>
      <span></span>
      <h2>{sectionName}</h2>
      <span></span>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <>
      <div className={styles.hiw_item}>
        <div className={styles.hiw_details}>
          <h1>Create game portals of your owned games from steam</h1>
          <p>
            Trigger allows your to create game portals of your favourite games
            which opens up a bunch of possibilites for gamers and digital
            artists!
          </p>
        </div>
        <div className={styles.hiw_image}>
          <img src={nft_card} />
        </div>
      </div>
      <div className={styles.hiw_item} id={styles.hiw_rev}>
        <div className={styles.hiw_details}>
          <h1>
            Buy & Sell NFTs of your favourite games inside their particular
            portalsCreate game portals of your owned games from steam
          </h1>
          <p>
            Show your talent and affection towards your favourite games by
            minting NFTs inside portals along with bunch of rewarding features!
          </p>
        </div>
        <div className={styles.hiw_image}>
          <img src={nft_card} />
        </div>
      </div>
      <div className={styles.hiw_item}>
        <div className={styles.hiw_details}>
          <h1>
            Earn by being part of game portals and stakingCreate game portals of
            your owned games from steam
          </h1>
          <p>
            Trigger's one of awesome feature is that it allows you to earn
            reward token you earn based on your in game acheivements through
            every transaction happpening inside the portals! Check docs for more
            info
          </p>
        </div>
        <div className={styles.hiw_image}>
          <img src={nft_card} />
        </div>
      </div>
      <div className={styles.hiw_item} id={styles.hiw_rev}>
        <div className={styles.hiw_details}>
          <h1>
            Host live streams seamlessly inside portalsCreate game portals of
            your owned games from steam
          </h1>
          <p>
            Create livestream of you playing your games in a decentralized
            fashion on the new web!
          </p>
        </div>
        <div className={styles.hiw_image}>
          <img src={nft_card} />
        </div>
      </div>
    </>
  );
};

const Roadmap = () => {
  return (
    <div className={styles.roadmap_wrapper}>
      <div className={styles.roadmap_circle}>
        <div className={styles.roadmap_card}>
          <div className={styles.glow1}></div>
          <div className={styles.glow2}></div>
          <h3>3rd Jan 2021</h3>
          <p>Created plan and started descussing on features and ideas</p>
        </div>
      </div>
      <span id={styles.glowed}></span>
      <div className={styles.roadmap_circle}>
        <div className={styles.roadmap_card} id={styles.alternate}>
          <div className={styles.glow1}></div>
          <div className={styles.glow2}></div>
          <h3>5th Jan 2021</h3>
          <p>
            Designed the logo, created the wireframe and started with UI/UX
            designing
          </p>
        </div>
      </div>
      <span></span>
      <div className={styles.roadmap_circle}>
        <div className={styles.roadmap_card} id={styles.end}>
          {/* <div className={styles.glow1}></div>
          <div className={styles.glow2}></div> */}
          <h3>17th Jan 2021</h3>
          <p>
            Initialized the project and started building the smart contracts and
            frontend
          </p>
        </div>
      </div>
    </div>
  );
};
