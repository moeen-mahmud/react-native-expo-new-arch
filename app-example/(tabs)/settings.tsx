import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { SettingsBox } from "@/components/settings/SettingsBox";

export default function SettingsScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={s.wrapper}>
      <ThemedView style={s.header} />
      <ThemedView style={s.container}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedView style={s.gap} />
        <SettingsBox />
      </ThemedView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    height: Constants.statusBarHeight,
    overflow: "hidden",
  },

  gap: {
    height: 16,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
