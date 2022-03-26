import React from "react";

// Styles
import styles from "./PortalCard.module.scss";

// assets
import avatar from "../../assets/images/avatar.png";
import portal_thumb from "../../assets/images/portal_thumb.png";

export const PortalCard = () => {
  return (
    <div className={styles.portal_card}>
      <img src={portal_thumb} alt="portal_thumbnail" id={styles.portal_thumb} />
      <div className={styles.portal_details_wrapper}>
        {/* Portal Details */}
        <div className={styles.portal_details}>
          <h3>Little Nightmares</h3>
          <div className={styles.portal_volume}>
            <p>Total Volume</p>
            <h4>900 TGR = $9000</h4>
          </div>
        </div>

        {/* Portal Members */}
        <div className={styles.portal_members_wrapper}>
          <div className={styles.portal_members}>
            {[1, 2, 3].map(() => {
              return (
                <img src={avatar} alt="avatar" id={styles.member_avatar} />
              );
            })}
          </div>

          <p>50+</p>
        </div>
      </div>
    </div>
  );
};
