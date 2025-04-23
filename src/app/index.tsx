// Import React hooks and components from React Native and Expo Router
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// Import custom components and constants
import MovieCard from "../components/movie/MovieCard";
import { commonFontStyle } from "../constants/fonts";
import { Colors } from "../constants/Colors";
import { Movie } from "../constants/types";
import { fetchMovies } from "../lib/service";

// Main component for the Home screen
export default function Home() {
  // State to store the list of trending movies
  const [trending, setTrending] = useState<Movie[]>([]);

  // Get router instance to navigate between screens
  const router = useRouter();

  // Fetch movies when component mounts
  useEffect(() => {
    getMovies();
  }, []);

  // Async function to fetch movies from the API
  const getMovies = async () => {
    const data = await fetchMovies(); // fetchMovies should return a data object with a results array
    if (data && data.results) setTrending(data.results); // Update the trending state with movie results
  };

  return (
    <View style={styles.container}>
      {/* FlatList to render the grid of movie cards */}
      <FlatList
        data={trending} // List of movies to render
        numColumns={2} // Two columns for grid layout
        showsVerticalScrollIndicator={false} // Hide scroll indicator
        columnWrapperStyle={styles.columnWrapperStyle} // Style for row wrapper
        keyExtractor={(item: Movie) => item.id.toString()} // Unique key for each item
        ListEmptyComponent={
          <Text style={styles.emptyText}>No data found</Text> // Shown when there's no movie data
        }
        renderItem={({ item }: { item: Movie }) => (
          // Render each movie using the MovieCard component
          <MovieCard
            movie={item}
            onPress={() =>
              // Navigate to the movie detail screen with the movie ID and data
              router.push({
                pathname: `/${item.id}`,
                params: { item: JSON.stringify(item) },
              })
            }
          />
        )}
      />
    </View>
  );
}

// Styles for the Home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg_color,
    paddingTop: 10,
  },
  headerText: {
    ...commonFontStyle(18, Colors.white),
    textAlign: "center",
    marginVertical: 12,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyText: {
    ...commonFontStyle(16, Colors.white),
    textAlign: "center",
    marginTop: 50,
  },
});
