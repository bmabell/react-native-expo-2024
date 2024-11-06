import { View, Text, TextInput, FlatList } from "react-native";
import { Banner } from "../../components/Banner";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([
        { id: '1', title: 'Shampoo Revitalizante' },
        { id: '2', title: 'Condicionador Nutritivo' },
        { id: '3', title: 'Máscara de Hidratação' },
        { id: '4', title: 'Leave-in Defrizante' },
        { id: '5', title: 'Óleo Capilar Reparador' },
        { id: '6', title: 'Shampoo Anticaspa' },
        { id: '7', title: 'Escova Alisadora' },
        { id: '8', title: 'Protetor Térmico' },
    ]);

    const filteredData = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            <Banner />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", bottom: 170 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: "80%" }}>
                    <TextInput
                        placeholder="Pesquisar produtos..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        style={{
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 10,
                            flex: 1,
                            paddingRight: 40,
                        }}
                    />
                    <Icon name="search" size={20} style={{ position: 'absolute', right: 10 }} />
                </View>
                {/* Exibe apenas a lista filtrada se houver um termo de pesquisa */}
                {searchTerm && (
                    <FlatList
                        data={filteredData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Text style={{ fontSize: 18, marginVertical: 5 }}>
                                {`${item.id} - ${item.title}`}
                            </Text>
                        )}
                    />
                )}
                {/* Caso contrário, exibe uma mensagem para informar que não há resultados */}
                {!searchTerm && (
                    <Text style={{ fontSize: 18, color: 'gray' }}>
                        Nenhum produto pesquisado ainda.
                    </Text>
                )}
            </View>
        </View>
    );
}
