import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useProductsDatabase } from "../../database/useProductsDatabase";
import { FlashList } from "@shopify/flash-list";

export default function List() {
    const [data, setData] = useState({})
    const { getProducts } = useProductsDatabase();

    async function fetchData() {

        //buzca no banco de dados
        const products = await getProducts();
        setData(products)
    }

    useEffect(() => {
        //executa a primeira e fez a busca de dados
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
            <Text>Listagem</Text>
            {
                data.lenght > 0 && data.map((item, index) => {
                    return <Text key={index}>{item.id}</Text>
                })
            }
            <FlashList
                data={data}
                renderItem={({ item }) => <Text>{item.id}</Text>}
                estimatedItemSize={200}
                style={{ flex: 1 }}
            />
        </View>
    );
}