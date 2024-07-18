import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, textSizes } from "../constants/constants";

const LeaderboardItem = ({ userRank, username, levelReached }) => {
  const rankColors = { 1: colors.gold, 2: colors.silver, 3: colors.bronze };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: rankColors[userRank] || "white" },
      ]}
    >
      <View
        style={[
          styles.rankContainer,
          { borderColor: rankColors[userRank] || colors.darkGray },
        ]}
      >
        <Text
          style={[styles.rankText, { color: rankColors[userRank] || "white" }]}
        >
          {userRank}
        </Text>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.levelReached}>Level {levelReached}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "white",
  },
  rankContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    backgroundColor: colors.darkGray,
    borderRadius: 20,
    borderColor: colors.darkGray,
    borderWidth: 2,
  },
  rankText: {
    color: colors.darkGray,
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
  userInfoContainer: {
    marginLeft: 20,
  },
  username: {
    fontFamily: fonts.bold,
    fontSize: textSizes.medium,
  },
  levelReached: {
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
  },
});

export default LeaderboardItem;
