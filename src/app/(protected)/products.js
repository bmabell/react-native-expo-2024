import { router } from "expo-router";
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { z } from "zod";
import { useAuth } from "../../hooks/Auth/index";
import { useProductsDatabase } from "../../database/useProductsDatabase";
import { useUsersDatabase } from "../../database/useUsersDatabase"

const productSchema = z.object({
    peso: z.number().gt(0),
    user_id: z.number().int().positive(),
    user_cadastro: z.number().int().positive(),
    descricao: z.string(),
    marca: z.string(),
    categoria: z.string(),
    especificacao: z.string(),
});

export default function Product() {
    const [valor, setValor] = useState("0,00");
    const [sugestoes, setSugestoes] = useState([
        { "id": 1, "nome": "Shampoo" },
        { "id": 2, "nome": "Condicionador" },
        { "id": 3, "nome": "Máscara de tratamento" },
        { "id": 4, "nome": "Acidificador" },
        { "id": 5, "nome": "Pré-poo" }
    ]);
    const [id, setId] = useState(1);
    const [data, setData] = useState(new Date());
    const [viewCalendar, setViewCalendar] = useState(false);
    const [observacao, setObservacao] = useState("");
    const valueRef = useRef();
    const { user } = useAuth();
    const { createProduct } = useProductsDatabase();
    const { getAllUsers } = useUsersDatabase();

    const handleCalendar = (event, selectedDate) => {
        setData(selectedDate || data);
        setViewCalendar(false);
    };

    useEffect(() => {
        valueRef?.current?.focus();
    }, []);

    const handleChangeValor = (value) => {
        setValor(value);
    };

    const convertValue = (value) => {
        try {
            let valorLimpo = value.replace(",", "").replace(".", "");
            let valorConvertido = Number(valorLimpo) / 100;
            if (valorConvertido === 0 || isNaN(valorConvertido)) {
                setValor("0,00");
                return 0;
            }
            return valorConvertido;
        } catch (error) {
            setValor("0,00");
        }
    };

    const handleSubmit = async () => {
        const product = {
            user_id: id,
            user_cadastro: Number(user),
            descricao,
            peso: convertValue(valor),
            marca,
            categoria,
            especificacao,
        };

        try {
            const result = await productSchema.parseAsync(product);
            const { insertedID } = await createProduct(product);
            console.log(result);
            console.log(insertedID);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.content}>
                <View style={styles.inputView}>
                    <Ionicons name="wallet-outline" size={24} color="black" />
                    <TextInput
                        placeholder="Valor"
                        keyboardType="decimal-pad"
                        style={styles.inputValor}
                        value={valor}
                        onChangeText={handleChangeValor}
                        ref={valueRef}
                    />
                </View>

                <View style={styles.inputView}>
                    <Picker
                        selectedValue={id}
                        onValueChange={(itemValue) => setId(itemValue)}
                        style={styles.picker}
                    >
                        {sugestoes?.map((item) => (
                            <Picker.Item key={item.id} label={item.nome} value={item.id} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.inputView}>
                    <Text onPress={() => setViewCalendar(true)} style={styles.inputCalendar}>
                        {data.toLocaleDateString()}
                    </Text>
                    {viewCalendar && (
                        <DateTimePicker
                            value={data}
                            onChange={handleCalendar}
                            mode="date"
                            display="default"
                        />
                    )}
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Observações"
                        style={styles.inputObservacao}
                        value={observacao}
                        onChangeText={setObservacao}
                        multiline
                    />
                </View>

                <View style={styles.contentButtons}>
                    <Button title="Salvar" onPress={handleSubmit} />
                    <Button title="Continuar" />
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
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        marginVertical: 10,
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
    },
    picker: {
        width: "100%",
        height: 50,
    },
    contentButtons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        marginTop: 20,
    },
    inputCalendar: {
        width: "100%",
        textAlign: "center",
        fontFamily: "regular",
        fontSize: 20,
        padding: 10,
    },
    inputObservacao: {
        fontFamily: "regular",
        fontSize: 16,
        flex: 1,
        lineHeight: 20,
    },
    inputValor: {
        fontSize: 16,
        flex: 1,
    },
});
