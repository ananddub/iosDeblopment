import { TouchableOpacity, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
export default function TabOneScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-gray-100"} pt-5`}>
      <StatusBar backgroundColor={isDarkMode ? "black" : "white"} />
      <View
        className={
          isDarkMode ? "items-center mb-5" : " bg-gray-100 items-center mb-5"
        }
      >
        <Text
          className={`text-2xl  font-bold ${
            isDarkMode ? "text-white" : "text-gray-900 bg-gray-100"
          }`}
        >
          Welcome
        </Text>
      </View>
      <View
        className={
          isDarkMode
            ? "flex-row flex-wrap justify-around p-2"
            : "flex-row flex-wrap bg-gray-100 justify-around p-2"
        }
      >
        <TouchableOpacity>
          <Card icon="person" title="Profile" isDarkMode={isDarkMode} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Card icon="megaphone" title="Announcement" isDarkMode={isDarkMode} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Card icon="wallet" title="Dues" isDarkMode={isDarkMode} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Card({
  icon,
  title,
  isDarkMode,
}: {
  icon: string;
  title: string;
  isDarkMode: boolean;
}) {
  return (
    <View
      className={`bg-gray-800 w-[110px] h-[110px] rounded-lg justify-center items-center m-2 shadow-lg ${
        isDarkMode
          ? "bg-[#151515] border border-[#292929]"
          : "bg-white border border-[#e0e0e0cc]"
      }`}
      style={{
        elevation: 5,
      }}
    >
      <Ionicons name={icon} size={32} color={isDarkMode ? "white" : "black"} />
      <Text
        className={
          isDarkMode ? "text-white  mt-2 text-md " : "text-black  mt-2 text-md "
        }
      >
        {title}
      </Text>
    </View>
  );
}
