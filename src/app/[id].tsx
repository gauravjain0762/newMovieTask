import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  fallbackMoviePoster,
  fetchMovieDetails,
  fetchSimilarMovies,
  imageUrl,
} from "../lib/moviesdb";
import { useLocalSearchParams } from "expo-router";
import MovieList from "../components/movie/MovieList";
import { SCREEN_HEIGHT } from "../constants/fonts";
import { MovieDetails, MovieParam } from "../constants/types";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function MovieDetail() {
  const params = useLocalSearchParams<any>();
  const item: MovieDetails = JSON.parse(params.item);

  const [similarMovies, setSimilarMovies] = useState<MovieDetails[]>([]);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const navigation = useNavigation<any>();

  console.log("movie", movie);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item?.title,
    });
  }, [navigation, item?.title]);

  useEffect(() => {
    getMovieDetails(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id: number) => {
    const data: any = await fetchMovieDetails(id);
    if (data) setMovie(data);
  };

  const getSimilarMovies = async (id: number) => {
    const data: any = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      <View style={styles.fullWidth}>
        <View>
          <Image
            source={{
              uri: imageUrl(movie?.poster_path) || fallbackMoviePoster,
            }}
            style={{
              width,
              height: height * 0.4,
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
              resizeMode: "cover",
            }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </View>
      </View>

      <View style={styles.movieDetails}>
        <Text style={styles.movieTitle}>{movie?.title}</Text>
        {movie?.id && (
          <Text style={styles.movieInfo}>
            {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
            {movie?.runtime} min
          </Text>
        )}
        <View style={styles.genresContainer}>
          {movie?.genres?.map((genre, index) => {
            const showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} style={styles.genreText}>
                {genre.name}
                {showDot ? " •" : ""}
              </Text>
            );
          })}
        </View>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>

      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  fullWidth: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.45,
  },
  safeAreaView: {
    position: "absolute",
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    borderRadius: 12,
    padding: 4,
  },
  movieDetails: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 30,
  },
  movieTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  movieInfo: {
    textAlign: "center",
    color: "#a3a3a3",
    fontSize: 16,
    fontWeight: "600",
  },
  genresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: 16,
    gap: 4,
  },
  genreText: {
    color: "#a3a3a3",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  overviewText: {
    color: "#a3a3a3",
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
});
