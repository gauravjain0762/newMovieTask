// Importing required libraries and components
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { fallbackMoviePoster, imageUrl } from "../lib/moviesdb";
import { useLocalSearchParams } from "expo-router";
import MovieList from "../components/movie/MovieList";
import { commonFontStyle, SCREEN_HEIGHT } from "../constants/fonts";
import { MovieDetails, MovieParam } from "../constants/types";
import {
  fetchMovieDetails,
  fetchSimilarMovies,
  fetchVideoMovies,
} from "../lib/service";
import { Images } from "../assets/images";
import { Colors } from "../constants/Colors";
import VideoModal from "../components/movie/VideoModal";

// Get screen dimensions and platform info
let { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function MovieDetail() {
  // Extract route parameters and parse movie data
  const params = useLocalSearchParams<any>();
  const item: MovieDetails = JSON.parse(params.item);

  // State to store similar movies, movie details, trailer video key, and modal visibility
  const [similarMovies, setSimilarMovies] = useState<MovieDetails[]>([]);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<any>();

  // Set navigation header title to movie title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: item?.title,
    });
  }, [navigation, item?.title]);

  // Fetch movie details and similar movies on mount
  useEffect(() => {
    getMovieDetails(item.id);
    getSimilarMovies(item.id);
  }, [item.id]);

  // Function to fetch detailed info for the movie
  const getMovieDetails = async (id: number) => {
    const data: any = await fetchMovieDetails(id);
    if (data) setMovie(data);
  };

  // Function to fetch a list of similar movies
  const getSimilarMovies = async (id: number) => {
    const data: any = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  // Function to fetch trailer video and open the modal
  const onPlayView = async () => {
    const data: any = await fetchVideoMovies(item.id);
    if (data.results[data?.results?.length - 1]?.key) {
      setVideoKey(data.results[data?.results?.length - 1].key);
      setVisible(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}
    >
      {/* Movie Poster with Gradient Overlay */}
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

      {/* Movie Details Section */}
      <View style={styles.movieDetails}>
        {/* Title */}
        <Text style={styles.movieTitle}>{movie?.title}</Text>

        {/* Release info */}
        {movie?.id && (
          <Text style={styles.movieInfo}>
            {movie?.status} • {movie?.release_date?.split("-")[0] || "N/A"} •{" "}
            {movie?.runtime} min
          </Text>
        )}

        {/* Genres */}
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

        {/* Play Trailer Button */}
        <View style={styles.playView}>
          <TouchableOpacity onPress={() => onPlayView()}>
            <Image source={Images.playButton} style={styles.imageStyle} />
          </TouchableOpacity>
          <Text style={styles.playText}>{"Play Trailer"}</Text>
        </View>

        {/* Movie Overview */}
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>

      {/* Similar Movies List */}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}

      {/* Video Modal for Trailer */}
      {videoKey && (
        <VideoModal
          videoKey={videoKey}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
    </ScrollView>
  );
}

// Styles for the Movie Detail screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717", // dark background
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
    fontWeight: "bold",
    letterSpacing: 1.5,
    ...commonFontStyle(22, Colors.white),
  },
  movieInfo: {
    textAlign: "center",
    fontWeight: "600",
    ...commonFontStyle(14, Colors._a3a3a3),
  },
  genresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: 16,
    gap: 4,
  },
  genreText: {
    fontWeight: "600",
    textAlign: "center",
    ...commonFontStyle(11, Colors._a3a3a3),
  },
  overviewText: {
    ...commonFontStyle(16, Colors._a3a3a3),
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  playText: {
    ...commonFontStyle(16, Colors.white),
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  playView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  imageStyle: {
    width: 24,
    height: 24,
    tintColor: Colors.white,
  },
});
