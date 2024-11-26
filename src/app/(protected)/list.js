import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useHairsDatabase } from "../../database/useHairsDatabase";
import { FlashList } from "@shopify/flash-list";

export default function List() {
    const [data, setData] = useState([]); // Estado inicial como lista vazia
    const { getHairs } = useHairsDatabase();

    // Função para buscar dados
    async function fetchData() {
        try {
            const hairs = await getHairs();
            setData(hairs);
        } catch (error) {
            console.error("Erro ao buscar hairs:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}> </Text>
            {data.length > 0 ? (
                <FlashList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>ID: {item.id}</Text>
                            <Text style={styles.itemText}>Nome: {item.nome}</Text>
                            <Text style={styles.itemText}>Descrição: {item.descricao}</Text>
                            <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
                            <Text style={styles.itemText}>
                                Especificação: {item.especificacao}
                            </Text>
                        </View>
                    )}
                    estimatedItemSize={200}
                    style={styles.list}
                />
            ) : (
                <Text style={styles.emptyText}>Nenhum hair encontrado</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#D8BFD8",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    list: {
        flex: 1,
        marginTop: 8,
    },
    itemContainer: {
        padding: 16,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemText: {
        fontSize: 16,
        color: "#333",
    },
    emptyText: {
        fontSize: 18,
        color: "#888",
        textAlign: "center",
        marginTop: 20,
    },
});
