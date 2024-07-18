import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import GameScreen from "./src/screens/GameScreen";
import LeaderboardScreen from "./src/screens/LeaderboardScreen";
import { checkAuthentication } from "./src/api/api";
import { fonts } from "./src/constants/constants";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [loadedFont] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });

  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthentication(setIsLogged);
    };

    checkAuth();
  }, []);

  const tabBarOptions = {
    activeTintColor: "#ff847c",
    inactiveTintColor: "#6c757d",
    tabBarLabelStyle: {
      fontFamily: fonts.bold,
    },
    style: {
      backgroundColor: "#f8f9fa",
    },
  };

  const stackScreenOptions = {
    headerStyle: {
      backgroundColor: "#f8f9fa",
    },
    headerTintColor: "#212529",
    headerTitleStyle: {
      fontFamily: fonts.bold,
    },
  };

  if (!isFontLoaded) {
    if (loadedFont) {
      setIsFontLoaded(true);
    } else {
      return (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="large"
          color="#0000ff"
        />
      );
    }
  }

  return (
    <NavigationContainer>
      {isLogged ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Profile") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Leaderboard") {
                iconName = focused ? "clipboard" : "clipboard-outline";
              } else if (route.name === "Game") {
                iconName = focused ? "play" : "play-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            ...tabBarOptions,
          })}
        >
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{ setIsLogged: setIsLogged }}
          />
          <Tab.Screen
            name="Game"
            component={GameScreen}
            initialParams={{ setIsLogged: setIsLogged }}
          />
          <Tab.Screen
            name="Leaderboard"
            component={LeaderboardScreen}
            initialParams={{ setIsLogged: setIsLogged }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={stackScreenOptions}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ setIsLogged: setIsLogged }}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: "Sign up" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

styles = StyleSheet.create({
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
});

export default App;
