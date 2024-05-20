import {
  View,
  Text,
  TextInput,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import SelectDropdown from "react-native-select-dropdown";

function DropDown({
  arr,
  fun,
  text,
  isDarkMode,
}: {
  arr: any;
  fun: (value: number) => void;
  text: string;
  isDarkMode: boolean;
}) {
  const { width, height } = useWindowDimensions();
  console.log(isDarkMode);
  return (
    <SelectDropdown
      data={arr}
      onSelect={(selectedItem: any, index: number) => {
        console.log(selectedItem, index);
        fun(index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View
            style={
              isDarkMode
                ? { ...dark.dropdownButtonStyle }
                : { ...light.dropdownButtonStyle }
            }
          >
            <Text
              style={
                isDarkMode
                  ? dark.dropdownButtonTxtStyle
                  : light.dropdownButtonTxtStyle
              }
            >
              {(selectedItem && selectedItem) || text}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={
              isDarkMode
                ? {
                    ...dark.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "black" }),
                  }
                : {
                    ...light.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#E5EAF2" }),
                  }
            }
          >
            <Text
              style={
                isDarkMode
                  ? dark.dropdownItemTxtStyle
                  : light.dropdownItemTxtStyle
              }
            >
              {item}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={
        isDarkMode ? dark.dropdownMenuStyle : light.dropdownMenuStyle
      }
    />
  );
}

const light = StyleSheet.create({
  textinput: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    color: "gray",
  },
  dropdownButtonStyle: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    borderColor: "#E5EAF2",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "white",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

//  className={
//     isDarkMode
//     ? "bg-[#151718] flex-1 border border-[#313538] ring-white px-2 text-white w-full  rounded-lg"
//     : "bg-gray-200  text-gray-700 w-full h-12 rounded-lg "
// }
const dark = StyleSheet.create({
  textinput: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "black",
    color: "gray",
  },
  dropdownButtonStyle: {
    flex: 1,
    height: 40,
    backgroundColor: "#151718",
    borderColor: "#313538",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: "white",
    fontWeight: "400",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    // backgroundColor: "red",
    backgroundColor: "#151718",
    borderColor: "#313538",
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "white",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default DropDown;
