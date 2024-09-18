import { router } from "expo-router";
import { Button, Image, Text, View } from "react-native";

export default function About() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={require("../assets/hairhaven.png")} style={{
                width: 300, 
                height: 300,
                margin: 10,
            }} />

            <Text style={{fontSize: 22, fontFamily: 'regular'}}>Sobre</Text>
            <Text style={{marginBottom:20}}> Seu refúgio para cuidados e estilo capilar</Text>
            <Button title="Voltar" onPress={() => { router.replace("/") }} />
        </View>
    );
}

