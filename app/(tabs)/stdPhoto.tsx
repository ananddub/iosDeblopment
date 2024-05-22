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
import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import DropDown from "@/components/DropDown";
import * as Sharing from "expo-sharing";
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
  const [text, setText] = useState<string>("5");
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
          console.log(data1[0].name);
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
      setSpin(false);
      setSpin(false);
      const arr: any[] = mlist.filter((item: any) => {
        console.table({
          section: secarr[secindex],
          condtion: item.section === secarr[secindex],
        });
        if (text !== "") {
          console.log(
            "comed",
            secarr[secindex],
            text,
            item.roll,
            text === item.roll
          );
          if (secarr[secindex] === "ALL" && text === `${item.roll}`)
            return true;
          return secarr[secindex] === item.section && text === `${item.roll}`;
        }
        return item.section === secarr[secindex] || secarr[secindex] === "ALL";
      });

      setList(arr);
      setSpin(false);
    }
  }, [secindex, classindex, mlist, text]);
  useEffect(() => {
    const total = list.reduce((a: number, item: any) => {
      if (item.imagepath.length > 0) return a + 1;
      return a;
    }, 0);
    setPtotal(total);
  }, [list]);
  const genrateHTML = () => {
    let str = "";
    list.forEach((x: any) => {
      str += idcreate(x);
    });
    return pdf(str, classarr[classindex], secarr[secindex]);
  };
  const printToFiile = async () => {
    const { uri } = await Print.printToFileAsync({
      html: genrateHTML(),
    });
    console.log("File has been saved to:", uri);

    if (Platform.OS === "android") {
      Permissions.MEDIA_LIBRARY;
      const fileUri =
        FileSystem.cacheDirectory +
        `${classarr[classindex]}${secarr[secindex]}.pdf`;
      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/pdf",
        dialogTitle: "Share this PDF",
      });
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
          <AntDesign
            name="sharealt"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          maxWidth: 500,
          marginTop: 10,
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
      <View className="flex-row gap-2 pb-2 max-w-[500px] mt-2 px-2">
        <Text
          className={
            isDarkMode
              ? "flex-1 text-center  bg-[#10243E] text-[#369EFF] rounded-lg p-1"
              : "flex-1 text-center bg-blue-100 font-bold text-blue-500 rounded-lg p-1"
          }
        >
          Total {list.length}
        </Text>
        <Text
          className={
            isDarkMode
              ? "flex-1 text-center  bg-[#291415] text-[#F2555A] rounded-lg p-1"
              : "flex-1 text-center bg-rose-100 font-bold text-rose-500 rounded-lg p-1"
          }
        >
          PhotoLeft {list.length - ptotal}
        </Text>
        <Text
          className={
            isDarkMode
              ? "flex-1 text-center bg-[#0F291E] text-[#3AAB75] rounded-lg p-1"
              : "flex-1 text-center bg-emerald-100 font-bold text-emerald-500 rounded-lg p-1"
          }
        >
          PhotoDone {ptotal}
        </Text>
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

const idcreate = (item: any) => {
  return `     <div id="card">
                        <img src=${
                          item.imagepath !== ""
                            ? "data:image/jpeg;base64," + item.imagepath
                            : "../assets/user.png"
                        } 
                            width="120px" 
                            height="120px"   
                        class="bg-gray-300 rounded-full"
                        alt="" srcset="">
                        <div id="details"> 
                            <div class="dm">
                                <p class="dom">Name</p>
                                <p class="nom">${item.name}</p>
                            </div>
                            <div class="dm">
                                <p class="dom">class </p>
                                <p class="nom">${item.class},${item.section},${
    item.roll
  }</p>
                            </div>
                            <div class="dm">
                                <p class="dom">F.Name</p>
                                <p class="nom">${item.fname}</p>
                            </div>
                            <div class="dm">
                                <p class="dom">Address</p>
                                <p class="nom">${item.ptown}</p>
                            </div>
                            <div class="dm">
                                <p class="dom">Mob</p>
                                <p class="nom">${item.fmob}</p>
                            </div>
                        </div>
                        </div>`;
};

const pdf = (str: string, clas: string, section: string) => {
  return `<html>
  <style>
      #card{
          display: flex;
          flex: 1;
          flex-direction: row;
          outline-width: 2px;
          outline-color: gray;
          padding: 8px;
          gap: 10px;
          height: 300px;
          width: 500px;
          outline-style: solid;
          border-radius: 20px;
      }
      .dm{
          display: flex;
          flex-direction: row;
          gap: 10px;
          height: 30px;
          color:#2B2B2B ;
      }
      #details{
          display: flex;
          flex-direction: column;
          margin
      }
      #mcontainer{
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
          color:#2B2B2B ;
      }
     
      img{
          border-radius: 100%;
      }
  </style>
    <body>
        <div id="mcontainer">
            <h1 style="color: #2B2B2B;" >Class ${clas}  Sec ${section}</h1>
            ${str}
    </div>
    </body>
</html>`;
};
