import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import axios from "axios";
// import moment from "moment";
import type { getResponseSizeProps } from "@/constants/types";
// import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const HEIGHT_SCREEN_DESIGN = 844;
const WIDTH_SCREEN_DESIGN = 390;

export const getResponseSize: getResponseSizeProps = (
  dimension,
  isHeight = true
) => {
  const ratio =
    (isHeight ? HEIGHT_SCREEN_DESIGN : WIDTH_SCREEN_DESIGN) / dimension;
  return getCorrelation(ratio, isHeight);
};
export const getCorrelation: getResponseSizeProps = (
  ratio,
  isHeight = true
) => {
  return (isHeight ? height : width) / ratio;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export const birthDayFormatter = (date: Date) => {
  return [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join("/");
};

const regex = {
  default: /^/,
  username: /^[a-z0-9_ ]{4,}$/,
  fullName:
    /^([a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{2,}(\s)?)+$/u,
};
const errorMessages = {
  default: "",
  fullName: "Enter a valid user name. Use text only",
  username:
    "Enter a valid user name. Use smallcase text or/and numbers, should be more than 3 characters",
  birthday: "It seems you are less than 18 years old.",
};
export type Name = "username" | "fullName";

export const validation = (value: string, name?: Name): string => {
  if (!name) return "";

  const reg = regex?.[name] || regex.default;
  const isValid = reg.test(value);
  return isValid ? "" : errorMessages[name];
};

// export const validateAge = (birthday: string): string => {
//   const isValid = moment(birthday, "MM/DD/YYYY").isValid();

//   if (!isValid) {
//     return "Please enter date in month/day/year format";
//   }
//   if (
//     !birthday.match(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
//   ) {
//     return "Please enter a valid birth date";
//   }
//   return 18 > moment().diff(moment(birthday, "MM-DD-YYYY"), "years")
//     ? errorMessages.birthday
//     : "";
// };

export const clearToken = async () => {
  try {
    axios.defaults.headers.common = { Authorization: "" };
    await AsyncStorage.removeItem("@token");
  } catch (e) {
    console.log("[AsyncStorage [REMOVE TOKEN] Error]:", e);
  }
};

export const setToken = async (value: string) => {
  try {
    axios.defaults.headers.common = { Authorization: `Bearer ${value}` };
    await AsyncStorage.setItem("@token", value);
  } catch (e) {
    console.log("[AsyncStorage [SET TOKEN] Error]:", e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");
    return value;
  } catch (e) {
    console.log("[AsyncStorage [GET TOKEN] Error]:", e);
  }
};

export const getAuthorAbbreviate = (userName: string): string => {
  return userName
    .split(" ")
    .slice(0, 2)
    .map((el) => el[0])
    .join("")
    .toUpperCase();
};

// const createTokenCache = (): TokenCache => {
//   return {
//     getToken: (key) => {
//       return SecureStore.getItemAsync(key);
//     },
//     saveToken: (key, token) => {
//       return SecureStore.setItemAsync(key, token);
//     },
//     clearToken: (key) => {
//       return SecureStore.deleteItemAsync(key);
//     },
//   };
// };

// export const tokenCache =
//   Platform.OS !== "web" ? createTokenCache() : undefined;

// export const millisecondsToMinutesSeconds = (ms: number) => {
//   let duration = moment.duration(ms, "milliseconds");
//   let fromMinutes = Math.floor(duration.asMinutes());
//   let fromSeconds = Math.floor(duration.asSeconds() - fromMinutes * 60);

//   return Math.floor(duration.asSeconds()) >= 60
//     ? (fromMinutes <= 9 ? "0" + fromMinutes : fromMinutes) +
//         ":" +
//         (fromSeconds <= 9 ? "0" + fromSeconds : fromSeconds)
//     : "00:" + (fromSeconds <= 9 ? "0" + fromSeconds : fromSeconds);
// };

function ValidateIPaddress(ipaddress: string) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  alert("You have entered an invalid IP address!");
  return false;
}
