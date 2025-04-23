// components/MovieCard.tsx
import { Colors } from "@/src/constants/Colors";
import {
  commonFontStyle,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/src/constants/fonts";
import { MovieCardProps } from "@/src/constants/types";
import { imageUrl } from "@/src/lib/moviesdb";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 10 }}>
      <Image
        source={{ uri: imageUrl(movie.poster_path) }}
        style={styles.imageStyle}
      />
      <Text numberOfLines={2} style={styles.titleStyle}>
        {movie.title}
      </Text>
      <Text style={styles.releaseDateStyle}>{movie.release_date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerText: {
    ...commonFontStyle(18, Colors.white),
    textAlign: "center",
    marginVertical: 12,
  },
  imageStyle: {
    width: SCREEN_WIDTH * 0.41,
    height: SCREEN_HEIGHT * 0.22,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleStyle: {
    ...commonFontStyle(13, Colors.white),
    marginVertical: 5,
    width: SCREEN_WIDTH * 0.41,
  },
  releaseDateStyle: {
    ...commonFontStyle(10, Colors.white),
    width: SCREEN_WIDTH * 0.41,
  },
});
