import { router } from "expo-router";
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function About() {
    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 30 }}>

                <Image source={require("../assets/mabell.png")} style={{
                    width: 300,
                    height: 300,
                    marginTop: 30,
                }} />

                <Text style={{ fontSize: 22, fontFamily: 'bold', marginTop: -20 }}>Sobre mim</Text>
                <Text style={{ fontSize: 18, fontFamily: 'regular', textAlign: 'justify', marginTop: 10 }}>
                    Me chamo Mabell, tenho 17 anos e sou de presidente venceslau no interior de são paulo.
                    Atualmente curso o segundo ano do ensino médio integrado com curso técnico de informática
                    na Etec Professor Milton Gazzetti e atuo como influenciadora digital.
                </Text>

                <Image source={require("../assets/hairhaven1.png")} style={{
                    width: 220,
                    height: 220,
                    margin: 15,
                }} />

                <Text style={{ fontSize: 22, fontFamily: 'bold' }}>Sobre o app</Text>
                <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'regular', textAlign: 'justify', }}>
                    Hair Haven é um aplicativo sobre os tipos de cabelo, suas particularidades e beleza. Nele,
                    você poderá cadastrar seu tipo de cabelo e quais produtos você indicaria para esse tal tipo, além disso, 
                    também achará diversas dicas de produtos e cuidados para o seu tipo de cabelo.
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#8B0000',
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 15,
                        width: '50%',
                        alignItems: 'center',
                    }}
                    onPress={() => { router.replace("/") }}
                >
                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                    }}> Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

