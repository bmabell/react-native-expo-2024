import { router } from "expo-router";
import {
    Button,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "../../hooks/Auth/index";

const productSchema = z.object({
    peso: z.number().gt(0),
    user_id: z.number().int().positive(),
    user_cadastro: z.number().int().positive(),
    nome: z.string().min(1),
    descricao: z.string(),
    marca: z.string(),
    categoria: z.string(),
    especificacao: z.string(),
});

export default function Product() {
    const [peso, setPeso] = useState("0");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [marca, setMarca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [especificacao, setEspecificacao] = useState("");
    const { user } = useAuth();

    const sugestoes = [
        { id: 1, nome: "Shampoo" },
        { id: 2, nome: "Condicionador" },
        { id: 3, nome: "Máscara de Tratamento" },
        { id: 4, nome: "Acidificador" },
        { id: 5, nome: "Pré-poo" },
    ];

    const handleSubmit = async () => {
        const product = {
            user_id: 1, // Substitua pelo ID real do usuário autenticado
            user_cadastro: Number(user),
            peso: Number(peso),
            nome,
            descricao,
            marca,
            categoria,
            especificacao,
        };

        try {
            const result = await productSchema.parseAsync(product);
            console.log(result);
        } catch (error) {
            console.log("Erro de validação:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Peso (kg)"
                        keyboardType="numeric"
                        style={styles.input}
                        value={peso}
                        onChangeText={setPeso}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Nome do Produto"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Descrição"
                        style={styles.input}
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Marca"
                        style={styles.input}
                        value={marca}
                        onChangeText={setMarca}
                    />
                </View>

                <View style={styles.inputView}>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(itemValue) => setCategoria(itemValue)}
                        style={styles.picker}
                    >
                        {sugestoes.map((item) => (
                            <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Especificação"
                        style={styles.input}
                        value={especificacao}
                        onChangeText={setEspecificacao}
                    />
                </View>

                <View style={styles.contentButtons}>
                    <Button title="Salvar" onPress={handleSubmit} />
                    <Button title="Cancelar" onPress={() => router.back()} />
                </View>
            </View>
        </KeyboardAvoidingView>
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
        borderColor: "black",
        borderWidth: 1,
        width: "100%",
        marginVertical: 10,
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
    },
    input: {
        fontSize: 16,
        flex: 1,
        padding: 5,
    },
    picker: {
        width: "100%",
        position: "relative",
        height: 40,
    },
    contentButtons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        marginTop: 20,
    },
});
