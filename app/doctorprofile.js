import React from "react";
import { View, StyleSheet } from "react-native";
import DoctorProfileScreen from "../components/DoctorProfileScreen";

export default function DoctorProfilePage() {
  return (
    <View style={styles.container}>
      <DoctorProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
