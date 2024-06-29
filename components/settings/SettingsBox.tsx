import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { ThemedText } from "@/components/ThemedText";
import { Alert, Button, StyleSheet, TouchableOpacity } from "react-native";

export const SettingsBox: React.FC = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return Alert.alert(
        "Biometric record not found",
        "Please verify your identity with your password"
      );

    console.log("Biometric record found", savedBiometrics);

    const result = await LocalAuthentication.authenticateAsync({
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
      fallbackLabel: "Use your password",
      promptMessage: "Authenticate to continue",
      requireConfirmation: true,
    });

    if (result.success) {
      console.log("Biometric authentication successful");
      console.log("result", result);
    } else {
      console.log("Biometric authentication failed");
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText>
        {isBiometricSupported
          ? "Your device supports biometric authentication"
          : "Your device does not support biometric authentication"}
      </ThemedText>
      <TouchableOpacity onPress={handleBiometricAuth} style={s.button}>
        <ThemedText type="default">
          {isBiometricSupported
            ? "Enable biometric authentication"
            : "Biometric authentication is not available"}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const s = StyleSheet.create({
  button: {
    margin: 4,
    borderRadius: 4,
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    color: "white",
    textAlign: "center",
  },
});
