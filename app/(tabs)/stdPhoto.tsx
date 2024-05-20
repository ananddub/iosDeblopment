import {
  StyleSheet,
  Touchable,
  Image,
  TouchableOpacity,
  Button,
  View,
  useColorScheme,
  FlatList,
  TextInput,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Text } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { URL } from "./GlobalVariable";
import axios from "axios";
import { Camera } from "expo-camera";
import CardCamera from "@/components/Card";
import { Linking } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import DropDown from "@/components/DropDown";
import { shareAsync } from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import * as Permissions from "expo-permissions";

import { Link } from "expo-router";
import * as FileSystem from "expo-file-system";
export default function stdPhoto() {
  const colorScheme = useColorScheme();
  const [list, setList] = useState<[]>([]);
  const [mlist, setMList] = useState<[]>([]);
  const isDarkMode = colorScheme === "dark";
  const [selectedImage, setSelectedImage] = useState(null);
  const [reload, setReload] = useState(false);
  const [spin, setSpin] = useState<boolean>(false);
  const [ptotal, setPtotal] = useState<number>(0);
  const classarr = [
    "NUR",
    "LKG",
    "UKG",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];
  const secarr = ["ALL", "A", "B", "C", "D"];
  const [classindex, setClassIndex] = useState<number>(-1);
  const [secindex, setSecIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");
  useEffect(() => {
    // console.log("color", stdPhoto);
    let i = 0;
    if (classindex > -1) {
      setSpin(true);
      setList([]);
      setMList([]);
      axios
        .get(`${URL}/getStdImage?class=${classarr[classindex]}`)
        .then(async (response: any) => {
          const data = `[${response.data}]`;
          const data1 = JSON.parse(data);
          setSpin(false);
          console.log(data1[0].name);
          setList(data1);
          setMList(data1);
          console.log(i);
        })
        .catch((error) => console.log(error));
    }
  }, [reload, classindex]);
  const pickImageAsync = async (admno: string) => {
    let result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      uploadAsync(admno, result.assets[0]);
    } else {
      // alert("You did not select any image.");
    }
  };
  const uploadAsync = async (admno: string, obj: any) => {
    try {
      const form = new FormData();
      const imageName = `${admno}.jpg`;
      console.log(obj);
      form.append("image", {
        uri: obj.uri,
        type: "image/jpg",
        name: imageName,
      });
      const url = `${URL}/imageupload`;
      console.log(url);
      const resp = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      });
      if (resp.status === 200) {
        console.log("completed uploading");
        setReload(!reload);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    if (classindex > -1) {
      setSpin(true);
      const arr: any[] = mlist.filter((item: any) => {
        console.table({
          section: secarr[secindex],
          condtion: item.section === secarr[secindex],
        });
        return item.section === secarr[secindex] || secarr[secindex] === "ALL";
      });

      setList(arr);
      setSpin(false);
    }
  }, [secindex, classindex, mlist]);
  useEffect(() => {
    const total = list.reduce((a: number, item: any) => {
      if (item.imagepath.length > 0) return a + 1;
      return a;
    }, 0);
    setPtotal(total);
  }, [list]);
  const printToFiile = async () => {
    const { uri } = await Print.printToFileAsync({
      html: "<h1>Hello World</h1>",
    });
    console.log("File has been saved to:", uri);

    if (Platform.OS === "android") {
      Permissions.MEDIA_LIBRARY;
      // On Android, we need to copy the file to a location accessible to other apps
      const fileUri = FileSystem.cacheDirectory + "myfile.pdf";
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
      try {
        console.log("done");
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: `file://${fileUri}`,
          flags: 1,

          type: "application/pdf",
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      // On iOS, use the built-in document viewer
      try {
        const result: any = await FileSystem.getContentUriAsync(uri);
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: result.uri,
          flags: 1,
          type: "application/pdf",
        });
      } catch (e) {
        console.log(e);
      }
    }
    // await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  return (
    <View className="flex-1 items-center">
      <StatusBar backgroundColor={isDarkMode ? "black" : "white"} />
      <ActivityIndicator
        size="small"
        animating={false}
        style={{
          padding: 5,
          width: "100%",
          backgroundColor: isDarkMode ? "#202020" : "white",
        }}
      />
      <View
        className={
          "flex-row py-2 px-2 items-center justify-center " +
          (isDarkMode ? "bg-[#202020]" : "bg-white")
        }
      >
        <TouchableOpacity>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text className="text-2xl text-center flex-1 font-bold">
          Student Photo
        </Text>
        <TouchableOpacity onPress={printToFiile}>
          <FontAwesome5
            className="flex-1"
            name="file-pdf"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <Text className="flex-1 text-center">Total {list.length}</Text>
        <Text className="flex-1 text-center text-rose-500">
          PhotoLeft {list.length - ptotal}
        </Text>
        <Text className="flex-1 text-center text-green-500">
          PhotoDone {ptotal}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          maxWidth: 500,
          marginTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
          columnGap: 10,
          flexDirection: "row",
        }}
      >
        <DropDown
          arr={classarr}
          isDarkMode={isDarkMode}
          text="Select class"
          fun={(value: number) => {
            setClassIndex(value);
            console.log("classindex ", classindex);
          }}
        />
        <DropDown
          arr={secarr}
          isDarkMode={isDarkMode}
          text={secarr[secindex]}
          fun={(value: number) => {
            console.log("secindex ", secindex);
            setSecIndex(value);
          }}
        />
        <TextInput
          placeholder="Enter Roll"
          placeholderTextColor={isDarkMode ? "gray" : "gray"}
          cursorColor={isDarkMode ? "white" : "gray"}
          secureTextEntry
          onChangeText={(e) => setText(e.trim())}
          keyboardType="numeric"
          value={text}
          className={
            isDarkMode
              ? "bg-[#151718] flex-1 border border-[#313538] ring-white px-2 text-white w-full  rounded-lg"
              : "bg-white flex-1 border border-slate-200 ring-white px-2 text-black w-full  rounded-lg"
          }
        />
      </View>
      {spin && (
        <ActivityIndicator
          size={"large"}
          color={isDarkMode ? "white" : "black"}
        />
      )}
      <FlatList
        style={{
          flex: 1,
          paddingBottom: 10,
        }}
        data={list}
        renderItem={({ item }) => Card(item, isDarkMode, pickImageAsync)}
      />
    </View>
  );
}

function Card(
  obj: {
    admno: string;
    name: string;
    class: string;
    section: string;
    FNAME: string;
    ptown: string;
    roll: string;
    imagepath: string;
  },
  isDarkMode: boolean,
  pickImage: (admno: string) => void
) {
  return (
    <View className="px-1 max-w-[500px] flex-row ">
      <View
        className={
          isDarkMode
            ? "bg-[#151718] border py-2 px-1 border-[#313538] flex-row items-center rounded-lg max-w-[500px] w-full mt-2  "
            : "bg-white border py-2 px-1 border-slate-200 flex-row items-center rounded-lg max-w-[500px] w-full mt-2  "
        }
      >
        <View
          className={
            isDarkMode
              ? "bg-[#000000]  rounded-full "
              : "bg-slate-300  rounded-full "
          }
        >
          {obj.imagepath === "" ? (
            <View className="p-5 ">
              {
                <Ionicons
                  name="person"
                  color={isDarkMode ? "white" : "black"}
                  size={50}
                />
              }
            </View>
          ) : (
            <Image
              source={{ uri: `data:image/jpeg;base64,${obj.imagepath}` }}
              width={100}
              height={100}
              className="rounded-full border-2 border-[#696969]"
            />
          )}
          <TouchableOpacity
            onPress={() => pickImage(obj.admno)}
            className="absolute w-full h-[100px] items-end justify-end "
          >
            <View
              className={
                isDarkMode
                  ? "justify-center items-center bg-[#151515] border p-2 rounded-full  border-[#292929]"
                  : "justify-center items-center bg-slate-100 border p-2 rounded-full  border-slate-200"
              }
            >
              <Ionicons
                name="camera-sharp"
                color={isDarkMode ? "white" : "black"}
                size={20}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-1">
          <View className="flex-row gap-2 pl-2">
            <Text className=" font-bold ">Name</Text>
            <Text className=" text-sm">{obj.name}</Text>
          </View>

          <View className="flex-row gap-2 pl-2">
            <Text className=" font-bold ">Class</Text>
            <Text className=" text-sm">
              {obj.class},{obj.section},{obj.roll}
            </Text>
          </View>

          <View className="flex-row gap-2 pl-2">
            <Text className=" font-bold ">F.Name</Text>
            <Text className=" text-sm">{obj.fname}</Text>
          </View>

          <View className="flex-row gap-2 pl-2">
            <Text className=" font-bold ">Add</Text>
            <Text className=" text-sm">{obj.ptown}</Text>
          </View>

          <View className="flex-row gap-2 pl-2">
            <Text className=" font-bold ">Mob</Text>
            <Text className=" text-sm">{obj.fmob}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ImagePickerers() {}
