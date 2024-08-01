import { useEffect, useRef, useState } from "react";
import { fetchUserAvatarByUsername } from "../../api/api";
import { storage } from "../../../firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import styles from "./LeaderboardItem.module.css";

const LeaderboardItem = ({ username, levelReached, userRank, medal }) => {
  const [avatarURL, setAvatarURL] = useState(null);
  const [medalURL, setMedalURL] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const avatarURL = await fetchUserAvatarByUsername(username);
        const downloadURL = await getDownloadURL(ref(storage, avatarURL));
        setAvatarURL(downloadURL);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMedal = async () => {
      let medalRef;
      if (userRank === 1) {
        medalRef = ref(storage, "svg/gold-medal.svg");
      } else if (userRank === 2) {
        medalRef = ref(storage, "svg/silver-medal.svg");
      } else if (userRank === 3) {
        medalRef = ref(storage, "svg/bronze-medal.svg");
      }

      if (medalRef) {
        try {
          const medalDownloadURL = await getDownloadURL(medalRef);
          setMedalURL(medalDownloadURL);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
    fetchMedal();
  }, []);

  return (
    <div className={styles.leaderboardItemContainer}>
      <div className={styles.subContainer}>
        <img src={medalURL} className={styles.medal} />
        <img src={avatarURL} className={styles.userAvatar} />
        <div className={styles.username}>{username}</div>
      </div>
      <div className={styles.userLevel}>{levelReached}</div>
    </div>
  );
};

export default LeaderboardItem;
