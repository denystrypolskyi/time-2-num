import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchLeaderboardData } from "../api/api";
import { fonts, textSizes } from "../constants/constants";
import LeaderboardItem from "../components/LeaderboardItem";

const LeaderboardScreen = ({ route }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setIsLogged } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      getLeaderboardData();
    }, [])
  );

  const getLeaderboardData = async () => {
    setIsLoading(true);
    try {
      await fetchLeaderboardData(setIsLogged, setLeaderboardData);
    } catch (error) {
      console.error("Error while fetching user results:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={({ item, index }) => (
          <LeaderboardItem
            userRank={index + 1}
            username={item.username}
            levelReached={item.levelReached}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    color: "black",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    textAlign: "center",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default LeaderboardScreen;
