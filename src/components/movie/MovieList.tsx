import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, imageUrl } from "../../lib/moviesdb";
import { useRouter } from "expo-router";

let { width, height } = Dimensions.get("window");

export default function MovieList({ title, hideSeeAll, data }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[styles.seeAllText]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              router.push({
                pathname: `/${item.id}`,
                params: { item: JSON.stringify(item) },
              });
            }}
          >
            <View style={styles.movieCard}>
              <Image
                source={{
                  uri: item.poster_path
                    ? imageUrl(item.poster_path)
                    : fallbackMoviePoster,
                }}
                style={styles.posterImage}
              />
              <Text style={styles.movieTitle}>
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32, // mb-8
  },
  headerRow: {
    marginHorizontal: 16, // mx-4
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 20, // text-xl
    fontWeight: "600",
  },
  seeAllText: {
    fontSize: 18, // text-lg
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  movieCard: {
    marginRight: 16, // mr-4
    marginTop: 10,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  posterImage: {
    width: width * 0.33,
    height: height * 0.22,
    borderRadius: 24, // rounded-3xl
    resizeMode: "cover",
  },
  movieTitle: {
    color: "#d4d4d8", // text-neutral-300
    marginLeft: 4, // ml-1
    marginTop: 8,
  },
});
