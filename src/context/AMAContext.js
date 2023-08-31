import React, { createContext, useState, useEffect } from "react";
import { session } from "../shared/sessions";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';

import en from '../../localization/en.json';
import si from '../../localization/si.json';
import LoadingScreen from "../components/LoadingScreen";

// import { PanResponder, StatusBar, StyleSheet, useColorScheme, View ,Dimensions} from 'react-native';

export const AMAContext = createContext();

export const AMAProvider = ({ children }) => {

  const [screen, setScreen] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({name:"...",email:'...'});

  useEffect(() => {
    getData()
  }, []);


  const getData = () => {
    session("language")
    .then((response) => {
        console.log(response)
        setLanguage(response)
                i18n.locale = response;
        i18n.fallbacks = true;
        i18n.translations = { en, si };
    })

    session("user")
    .then((response) => {
        console.log(response)
        setUser(JSON.parse(response))
    })
} 
  return (
    <AMAContext.Provider
      value={{
        screen,
        setScreen,
        language,
        setLanguage,
        user,
        setUser,
        loading,
        setLoading
      }}
    >
      <LoadingScreen show={loading}/>
        {children}
    </AMAContext.Provider>
  );
};