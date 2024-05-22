import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function LoginScreen() {
  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigation();
  const color = useColorScheme();
  const [spin, setSpin] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const isValidUser = () => {
    setSpin(true);
    if (user === "admin" && pass === "admin") {
      setSpin(false);
      navigate.navigate("home");
    } else {
      console.log("inavlid user ", user, pass);
      setTimeout(() => {
        setSpin(false);
        setIsValid(true);
      }, 5000);
    }
  };
  useEffect(() => {
    // setTimeout(() => navigate.navigate("stdPhoto"), 500);
  }, []);
  useEffect(() => {
    setIsValid(false);
  }, [user, pass]);
  return (
    <View
      style={{
        backgroundColor: color == "dark" ? "#0C0D0E" : "#fff",
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Animatable.View animation="fadeInDown" className="w-full h-1/3">
        <Image
          className="absolute w-full h-full"
          source={require("../../assets/images/background.jpeg")}
          style={{ resizeMode: "cover" }}
          blurRadius={10}
        />
        <BlurView intensity={50} className="absolute w-full h-full">
          <View className="flex-1 items-center justify-center">
            <Image
              className="w-32 h-32 rounded-full"
              source={require("../../assets/images/logo.jpeg")}
            />
          </View>
        </BlurView>
      </Animatable.View>
      <Animatable.View
        animation="fadeInUp"
        className="w-full h-2/3 p-5 max-w-[500px] rounded-t-3xl"
      >
        <View>
          <View className="items-center mb-6">
            <Text
              className={`text-3xl font-bold ${
                color == "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Symbosis
            </Text>
            <Text
              className={`text-lg ${
                color == "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              International School
            </Text>
          </View>
          <View className="w-full">
            <Text className="text-slate-100 mb-2">Username</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor={color === "dark" ? "gray" : "gray"}
              cursorColor={color === "dark" ? "white" : "gray"}
              onChangeText={(e) => setUser(e.trim())}
              className={
                color == "dark"
                  ? "bg-[#151718] border border-[#313538] ring-white p-3 text-white w-full h-12 rounded-lg mb-4"
                  : "bg-gray-200 p-3 text-gray-700 w-full h-12 rounded-lg mb-4"
              }
            />
            {isValid && (
              <Text className="text-rose-500 top-[-15] text-[12px] font-bold mb-2">
                username or password invalid
              </Text>
            )}
            <Text className="text-slate-100 mb-2">Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={color === "dark" ? "gray" : "gray"}
              cursorColor={color === "dark" ? "white" : "gray"}
              secureTextEntry
              onChangeText={(e) => setPass(e.trim())}
              className={
                color == "dark"
                  ? "bg-[#151718] border border-[#313538] ring-white p-3 text-white w-full h-12 rounded-lg mb-4"
                  : "bg-gray-200 p-3 text-gray-700 w-full h-12 rounded-lg mb-4"
              }
            />
            <TouchableOpacity
              onPress={() => isValidUser()}
              className="bg-blue-600 flex-row   p-3 items-center justify-center rounded-lg"
            >
              <Text className="text-white text-lg font-bold">Login</Text>
              {spin && (
                <ActivityIndicator
                  size={"small"}
                  className="text-red-500 px-2"
                  color="lightblue"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
}
