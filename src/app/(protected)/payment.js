import { router } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';

export default function Payment() {
    const [valor, setValor] = useState("0,00");
    const [sugestoes, setSugestoes] = useState(
        [{
            "id": 1,
            "nome": "Pammi Tiernan"
        }, {
            "id": 2,
            "nome": "Rebbecca Sales"
        }, {
            "id": 3,
            "nome": "Claresta Tollfree"
        }, {
            "id": 4,
            "nome": "Selma Washbrook"
        }, {
            "id": 5,
            "nome": "Inness Rogans"
        }, {
            "id": 6,
            "nome": "Luis Roswarne"
        }, {
            "id": 7,
            "nome": "Pren McNair"
        }, {
            "id": 8,
            "nome": "Zedekiah Lorence"
        }, {
            "id": 9,
            "nome": "Valentina Fanshawe"
        }, {
            "id": 10,
            "nome": "Markos Phare"
        }, {
            "id": 11,
            "nome": "Cullan Heaphy"
        }, {
            "id": 12,
            "nome": "Antoine Purkins"
        }, {
            "id": 13,
            "nome": "Boot Lillgard"
        }, {
            "id": 14,
            "nome": "Seamus Beards"
        }, {
            "id": 15,
            "nome": "Ferrel Sprulls"
        }, {
            "id": 16,
            "nome": "Bronson Mathen"
        }, {
            "id": 17,
            "nome": "Yvor Raffeorty"
        }, {
            "id": 18,
            "nome": "Hartwell Younghusband"
        }, {
            "id": 19,
            "nome": "Lorrin Jeggo"
        }, {
            "id": 20,
            "nome": "Jennee Krikorian"
        }, {
            "id": 21,
            "nome": "Elyn Goghin"
        }, {
            "id": 22,
            "nome": "Cynthie McArtan"
        }, {
            "id": 23,
            "nome": "Krisha MacDuff"
        }, {
            "id": 24,
            "nome": "Giralda Adamovsky"
        }, {
            "id": 25,
            "nome": "Glyn Neame"
        }, {
            "id": 26,
            "nome": "Modestine Ingyon"
        }, {
            "id": 27,
            "nome": "Lucais Millin"
        }, {
            "id": 28,
            "nome": "Floria McFarlan"
        }, {
            "id": 29,
            "nome": "Caddric Ecclestone"
        }, {
            "id": 30,
            "nome": "Shamus Semper"
        }, {
            "id": 31,
            "nome": "Arlan Bruckman"
        }, {
            "id": 32,
            "nome": "Thayne Engel"
        }, {
            "id": 33,
            "nome": "Westbrook Ayto"
        }, {
            "id": 34,
            "nome": "Baillie Duns"
        }, {
            "id": 35,
            "nome": "Ewart Antonomolii"
        }]
    );
    const [id, setId] = useState(1);

    return (
        <View style={styles.content}>
            <View style={styles.inputView}>
                <Ionicons name="wallet-outline" size={24} color="black" />
                <TextInput
                    placeholder="Valor"
                    keyboardType="decimal-pad"
                    style={styles.inputValor}
                    value={valor}
                    onChangeText={setValor} />
            </View>
            <View style={styles.inputView}>
                <TextInput placeholder="Usuário" />
            </View>
            <View style={styles.inputView}>
                <TextInput placeholder="Data" />
            </View>
            <View style={styles.inputView}>
                <TextInput placeholder="Observações" />
            </View>
            <View style={styles.contentButtons}>
                <Button title="Salvar" />
                <Button title="Continuar" />
                <Button title="Cancelar" onPress={() => router.back()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    inputView: {
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
    },
    contentButtons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
    },
});