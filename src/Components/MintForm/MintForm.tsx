import React from "react";
import styles from "./MintForm.module.scss";
import { Icon } from "@iconify/react";

export const MintForm = () => {
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
    <div className={styles.mint_form_wrapper}>
      <div className={styles.form}>
        <form>
          <div className={styles.form_item_wrapper}>
            <div className={styles.item}>
              <div>
                <label>
                  Image, Video, Gif <span id={styles.red}>*</span>
                </label>
                <p>Supported file types: png/jpeg/jpg/mp4/gif</p>
              </div>
              <div className={styles.upload_svg}>
                <Icon icon="bi:image-fill" id={styles.upload_svg} />
              </div>
            </div>
            <div className={styles.item} id={styles.clip}>
              <div>
                <label>Choose Clip from livesteam</label>
                <p>Supported file types: mp4/gif</p>
              </div>
              <div className={styles.upload_svg} id={styles.upload_clip}>
                <Icon
                  icon="fluent:video-clip-20-filled"
                  color="#3f3c3f"
                  id={styles.upload_svg}
                />
              </div>
            </div>
          </div>
          <div className={styles.form_item}>
            <label>
              Name <span id={styles.red}>*</span>
            </label>
            <div className={styles.input_box}>
              <input type={"text"} placeholder="   NFT Name"></input>
            </div>
          </div>
          <div className={styles.form_item}>
            <label>
              Description <span id={styles.red}>*</span>
            </label>
            <div className={styles.input_box}>
              <textarea></textarea>
            </div>
          </div>
          <div className={styles.form_item}>
            <label>
              Price <span id={styles.red}>*</span>
            </label>
            <div className={styles.input_box}>
              <input type={"number"} placeholder="   NFT Price"></input>
            </div>
          </div>
          <div className={styles.toogles}>
            <div className={styles.setting_item}>
              <p className="heading3">
                For Sale <span id={styles.red}>*</span>
              </p>
              <label
                htmlFor=""
                className="switch-toggle"

                // onClick={() => setfundtoggle(!fundtoggle)}
              >
                <input type="checkbox" />
              </label>
            </div>
            {/* <div className={styles.setting_item}>
              <p className="heading3">
                For Sale <span id={styles.red}>*</span>
              </p>
              <label
                htmlFor=""
                className="switch-toggle"

                // onClick={() => setfundtoggle(!fundtoggle)}
              >
                <input type="checkbox" />
              </label>
            </div> */}
          </div>
          <button className={`${styles.mint_btn} btn-sm`}>Mint</button>
        </form>
      </div>
      <div className={styles.file_preview}></div>
    </div>
  );
};
