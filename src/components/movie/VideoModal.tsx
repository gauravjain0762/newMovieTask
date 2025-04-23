// components/VideoModal.tsx

import { Colors } from "@/src/constants/Colors";
import { commonFontStyle, SCREEN_HEIGHT } from "@/src/constants/fonts";
import { getYouTubeVideoUrl } from "@/src/lib/moviesdb";
import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";

interface Props {
  videoKey: string;
  visible: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<Props> = ({ videoKey, visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <WebView
            source={{ uri: getYouTubeVideoUrl(videoKey) }}
            style={styles.webview}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    height: Dimensions.get("window").width * (9 / 16) + 50,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    minHeight: SCREEN_HEIGHT * 0.4,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 10,
    zIndex: 1,
  },
  closeText: {
    ...commonFontStyle(22, Colors.white),
  },
  webview: {
    flex: 1,
    marginTop: 30,
  },
});

export default VideoModal;
