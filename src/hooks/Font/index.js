import { useFonts } from "expo-font";
import { createContext } from "react";
import { ActivityIndicator, View, Text } from "react-native";


const FontContext = createContext();

export function FontProvider ({ children }) {
    const [loaded, error] = useFonts({
        regular: require("../../assets/fonts/Rubik-Regular.ttf"),
        bold: require("../../assets/fonts/Rubik-Bold.ttf"),
        light: require("../../assets/fonts/Rubik-Light.ttf"),
        boldItalic: require("../../assets/fonts/Rubik-BoldItalic.ttf"),
        italic: require("../../assets/fonts/Rubik-Italic.ttf"),
        semiBold: require("../../assets/fonts/Rubik-LightItalic.ttf"),
        medium: require("../../assets/fonts/Rubik-Medium.ttf"),
        mediumItalic: require("../../assets/fonts/Rubik-MediumItalic.ttf"),
        semiBold: require("../../assets/fonts/Rubik-SemiBold.ttf"),
        semiBoldItalic: require("../../assets/fonts/Rubik-SemiBoldItalic.ttf"),
    });

    if (!loaded && !error) {
        return( 
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Carregando as Fontes</Text>
            <ActivityIndicator />
        </View>
        );
      }

    return <FontContext.Provider value={{}}>{children}</FontContext.Provider>;
}

export function useFont () {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error("useFont must be used within a FontProvider");
    }
    return context;
}
