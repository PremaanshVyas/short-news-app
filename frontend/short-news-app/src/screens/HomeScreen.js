import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news");  // Fetch from backend
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("NewsDetail", { article: item })}
          >
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.source}>{item.source.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  card: { marginBottom: 10, backgroundColor: "#f8f9fa", padding: 10, borderRadius: 10 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  source: { fontSize: 12, color: "gray" },
});

export default HomeScreen;
