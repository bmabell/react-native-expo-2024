import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Banner } from "../../components/Banner";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home() {
    const navigation = useNavigation(); // Hook para navegação
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [data, setData] = useState([
        { id: "1", title: "Shampoo e Condicionador", image: "https://cdn.awsli.com.br/2500x2500/1994/1994328/produto/165681754/fd767288d0.jpg", category: "Hidratação" },
        { id: "2", title: "Tônico Capilar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbinkjvUR--qo1IOHj4NkFnkhg1NxnGlHPww&s", category: "Tratamento" },
        { id: "3", title: "Máscara de Tratamento", image: "https://cdn.awsli.com.br/1279/1279312/produto/62651762/a77c0267e9.jpg", category: "Hidratação" },
        { id: "4", title: "Acidificante", image: "https://d2l4mdyojly1ma.cloudfront.net/Custom/Content/Products/45/58/45585_densidade-acidificante-250g-ps-19629-55_z7_638621808059926446.webp", category: "Reconstrução" },
        { id: "5", title: "Pré-poo", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcYPbQgfKZRaVq6BXcCuZo1_0k7uBbPPzV1Q&s", category: "Hidratação" },
        { id: "6", title: "Óleo Capilar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_6wQwrAx5KEv3Cdo7bNQGSW67CGIWdcU1A&s", category: "Nutrição" },
        { id: "7", title: "Leave-in", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQxpZE2WYAuPllqCXFB6-RxuL9P3AkUKgvvg&s", category: "Finalização" },
        { id: "8", title: "Spray Fixador", image: "https://product-data.raiadrogasil.io/images/3673924.webp", category: "Finalização" },
        { id: "9", title: "Serum Reparador", image: "https://foreverliss.vtexassets.com/arquivos/ids/171679/ForeverLiss_DesmaiaCabelo_Serum.jpg?v=638610735448930000", category: "Tratamento" },
        { id: "10", title: "Protetor Térmico", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsAAMeT57OIwsnH76QWMGxsu_BGexqbdS5Q&s", category: "Finalização" },
    ]);

    const filteredData = data.filter((item) => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const handleProductPress = (product) => {
        // Navega para outra tela passando os detalhes do produto
        navigation.navigate("ProductDetails", { product });
    };

    const categories = ["Hidratação", "Tratamento", "Reconstrução", "Nutrição", "Finalização"];

    return (
        <View style={styles.container}>
            <Banner />
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Pesquisar produtos..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.searchInput}
                />
                <Icon name="search" size={20} style={styles.searchIcon} />
            </View>
            <View style={styles.produtinhos}>
                <View style={styles.categoriasContainer}>
                    <Text style={styles.categoriasText}>O que está procurando?</Text>
                    <View style={styles.categoriasButtons}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category && styles.categoryButtonActive,
                                ]}
                                onPress={() => setSelectedCategory(category === selectedCategory ? null : category)}
                            >
                                <Text
                                    style={[
                                        styles.categoryButtonText,
                                        selectedCategory === category && styles.categoryButtonTextActive,
                                    ]}
                                >
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={styles.productList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.productCard}
                            onPress={() => handleProductPress(item)}
                        >
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <Text style={styles.productTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyMessage}>Nenhum produto encontrado.</Text>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6E6FA", // Fundo claro para separar o conteúdo
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 30,
        marginVertical: 180,
    },
    produtinhos: {
        marginTop: -150,
    },
    searchInput: {
        height: 30,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        flex: 1,
        paddingRight: 40,
    },
    searchIcon: {
        position: "absolute",
        right: 10,
    },
    categoriasContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    categoriasText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    categoriasButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    categoryButton: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    categoryButtonActive: {
        backgroundColor: "#6A5ACD",
    },
    categoryButtonText: {
        color: "#000",
        fontSize: 14,
    },
    categoryButtonTextActive: {
        color: "#fff",
    },
    productList: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    productCard: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 8,
        alignItems: "center",
        padding: 10,
        maxWidth: "30%",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        marginBottom: 10,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
    },
    emptyMessage: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "gray",
    },
});
