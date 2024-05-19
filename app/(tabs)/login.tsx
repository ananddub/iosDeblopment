// screens/LoginScreen.js

import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { BlurView } from "expo-blur";
import * as Animatable from "react-native-animatable";

export default function Login() {
  return (
    <View className="flex-1 gap-2 items-center ">
      <StatusBar barStyle="ligth-content" backgroundColor="black" translucent />
      <Animatable.View animation="fadeInDownBig" className="w-full">
        <Image
          className="absolute max-w-full "
          source={require("../../assets/images/group.jpeg")}
          blurRadius={10}
        />
      </Animatable.View>
      <Animatable.View
        animation="fadeInUpBig"
        className="justify-center px-4 h-full w-full "
      >
        <View className="bg-white py-6 px-2 ">
          <View className="w-full justify-center items-center mb-3">
            <Image
              className="w-[120px] h-[120px] rounded-full "
              source={require("../../assets/images/logo.jpeg")}
            />
          </View>
          <View className="items-center justify-center  ">
            <Text className="text-center text-2xl font-bold text-slate-500">
              Symbosis
            </Text>
            <Text className="text-center text-2xl text-slate-500">
              International School
            </Text>
            <Text className=" px-1 text-left pt-2 w-full text-slate-500 text-[15px]">
              username
            </Text>
            <TextInput
              cursorColor={"gray"}
              className="bg-slate-200 p-2 text-slate-700 w-full h-10 rounded-lg"
            />
            <Text className=" px-1 text-left w-full  text-slate-500 text-[15px]">
              password
            </Text>
            <TextInput
              cursorColor={"gray"}
              className="bg-slate-200 p-2 text-slate-700 w-full h-10 rounded-lg"
            />
            <TouchableOpacity className="bg-blue-600 mt-5 p-2 items-center justify-center  text-white w-full h-10 rounded-lg">
              <Text className="text-white text-[20px] font-bold text-center">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
}
