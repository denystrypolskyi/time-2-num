import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  AVATAR_BASE_URL,
  colors,
  fonts,
  textSizes,
} from "../constants/constants";
import {
  fetchUserAvatar,
  fetchUserInfo,
  logout,
  updateUserAvatar,
  updateUserInfo,
} from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import EditableInput from "../components/EditableInput";
import Button from "../components/Button";

const ProfileScreen = ({ route }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { setIsLogged } = route.params;

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();
    }, [])
  );

  const getUserInfo = async () => {
    setIsLoading(true);
    try {
      const userData = await fetchUserInfo(setIsLogged);
      setUsername(userData.username);
      setEmail(userData.email);

      const fileName = await fetchUserAvatar(setIsLogged);
      setAvatarUrl(`${AVATAR_BASE_URL}/${fileName}`);
    } catch (error) {
      console.error("Error while fetching user info:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;

      setIsLoading(true);
      try {
        await updateUserAvatar(setIsLogged, fileUri);
        setAvatarUrl(fileUri);
      } catch (error) {
        console.log("Error while updating user avatar:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedUserData = {
        username,
        email,
      };

      const response = await updateUserInfo(updatedUserData);
      if (response) {
        const newToken = response.data.token;
        await AsyncStorage.setItem("token", newToken);
      }
    } catch (error) {
      console.error("Error while updating user info:", error.message);
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
      <Text style={styles.header}>Profile</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          style={styles.image}
          source={{
            uri: avatarUrl,
          }}
        />
      </TouchableOpacity>
      <EditableInput
        value={username}
        iconName="person"
        setValue={setUsername}
      />
      <EditableInput value={email} iconName="mail" setValue={setEmail} />
      <Button
        text="Save Changes"
        backgroundColor="#1abc9c"
        onPress={handleSaveChanges}
        width="100%"
        marginBottom={15}
      />
      <Button
        text="Logout"
        backgroundColor="#e74c3c"
        onPress={() => {
          logout(setIsLogged);
        }}
        width="100%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  header: {
    color: "black",
    fontFamily: fonts.bold,
    fontSize: textSizes.extraLarge,
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: textSizes.medium,
    fontFamily: fonts.bold,
  },
  rank: {
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: textSizes.large,
    marginBottom: 5,
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
  userInfoText: {
    fontFamily: fonts.regular,
    fontSize: textSizes.medium,
  },
  saveButton: {
    backgroundColor: "#1abc9c",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
  },
});

export default ProfileScreen;
