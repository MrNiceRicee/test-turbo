import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeRouter, Route, Routes } from "react-router-native";
import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { Text } from "react-native";
import PageNotFound from "./screens/PageNotFound";

export const App = () => {
  return (
    <NativeRouter>
      <TRPCProvider>
        <SafeAreaProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <StatusBar style="dark" />
        </SafeAreaProvider>
      </TRPCProvider>
    </NativeRouter>
  );
};
