import { router } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/Auth/index";

const hairSchema = z.object({
    user_id: z.number().int().positive(),
    user_cadastro: z.number().int().positive(),
    nome: z.string().min(1),
    descricao: z.string(),
    tipo: z.string().min(1),
    especificacao: z.string(),
});

export default function Hair() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [especificacao, setEspecificacao] = useState("");
    const { user } = useAuth();

    const tipos = [
        { id: 1, nome: "Liso" },
        { id: 2, nome: "Cacheado" },
        { id: 3, nome: "Ondulado" },
        { id: 4, nome: "Crespo" },
    ];

    // Função de envio do formulário
    const handleSubmit = async () => {
        const hair = {
            user_id: 1, // Substitua pelo ID real do usuário autenticado
            user_cadastro: Number(user), // Verifique se user não é nulo
            nome,
            descricao,
            tipo,
            especificacao,
        };

        try {
            const result = await hairSchema.parseAsync(hair);
            console.log(result);
        } catch (error) {
            console.error("Erro de validação:", error);
        }
    };

    // Verifique se o formulário é válido antes de permitir a submissão
    const isFormValid = nome && descricao && tipo && especificacao && !isNaN(Number(user));

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <Image
                    source={{
                        uri: "https://cdn.shopify.com/s/files/1/0649/8454/7571/files/tipos-de-cabelos_480x480.png?v=1659291004",
                    }}
                    style={styles.image}
                />

                <View style={styles.inputView}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={tipo}
                            onValueChange={(itemValue) => setTipo(itemValue)}
                            style={styles.picker}
                        >
                            {tipos.map((item) => (
                                <Picker.Item key={item.id} label={item.nome} value={item.nome} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Nome do Usuário"
                        style={styles.input}
                        value={nome}
                        onChangeText={setNome}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Descrição"
                        style={[styles.input, styles.inputMultiline]} // Estilo multiline
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline
                        numberOfLines={4} // Número de linhas visíveis
                    />
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
                    <TouchableOpacity
                        style={[styles.buttonSave, !isFormValid && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                        disabled={!isFormValid} // Desabilita o botão de salvar se o formulário não for válido
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCancel} onPress={() => router.back()} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
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
        backgroundColor: "#E6E6FA", // Cor de fundo
    },
    image: {
        width: 300,
        height: 230,
        marginBottom: 20,
    },
    inputView: {
        borderColor: "black",
        borderWidth: 1,
        width: "90%",
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#FFF", // Fundo branco para os inputs
    },
    pickerContainer: {
        width: "100%",
        height: 50, // Define uma altura fixa para o Picker
        justifyContent: "center", // Alinha o Picker no centro
    },
    picker: {
        width: "100%",
    },
    input: {
        fontSize: 16,
        padding: 5,
    },
    inputMultiline: {
        textAlignVertical: 'top', // Alinha o texto no topo do campo multiline
    },
    contentButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "90%",
    },
    buttonSave: {
        flex: 1,
        marginRight: 10,
        backgroundColor: "#63026b", // Cor roxa para o botão salvar
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    buttonDisabled: {
        backgroundColor: "#ccc", // Cor desabilitada para o botão salvar
        color: "#4B0082",
    },
    buttonCancel: {
        flex: 1,
        marginLeft: 10,
        
        backgroundColor: "#b45cac", // Cor vermelha para o botão cancelar
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});