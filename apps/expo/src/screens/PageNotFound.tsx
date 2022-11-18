import React from "react";

import { Button, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const PageNotFound = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full flex justify-center items-center">
        <View>
          <Text className="font-semibold text-5xl text-center">
            Page not found!
          </Text>
          <Text className="text-lg font-light text-center">
            The page you are looking for does not exist.
          </Text>
        </View>
        <View className="py-5 bg-gradient-to-b from-fuchsia-200 to-slate-800">
          <Link to="/" className="bg-indigo-500 rounded p-2 items-center">
            <Text className="text-white font-semibold">Go home</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PageNotFound;
