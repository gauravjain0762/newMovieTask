// app/index.tsx
import { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/movie/MovieCard";
import { commonFontStyle } from "../constants/fonts";
import { Colors } from "../constants/Colors";
import { Movie } from "../constants/types";
import { fetchMovies } from "../lib/moviesdb";

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const router = useRouter();
  console.log("trending", trending[0]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const data = await fetchMovies();
    if (data && data.results) setTrending(data.results);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trending}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapperStyle}
        keyExtractor={(item: Movie) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No data found</Text>}
        renderItem={({ item }: { item: Movie }) => (
          <MovieCard
            movie={item}
            onPress={() =>
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
