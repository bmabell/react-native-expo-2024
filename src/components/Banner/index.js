import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
    const [page, setPage] = useState(0);

    const onPageSelected = (e) => {
        setPage(e.nativeEvent.position);
    };

    useEffect(() => {
        // Intervalo de 3 segundos para mudar a página automaticamente
        const interval = setInterval(() => {
            setPage((prevPage) => (prevPage + 1) % 3); // Rotaciona entre 0, 1 e 2
        }, 3000);

        // Limpeza do intervalo quando o componente for desmontado
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Muda a página no PagerView a cada vez que o estado 'page' é atualizado
        if (page !== undefined) {
            pagerViewRef.current?.setPage(page); // Muda a página no PagerView
        }
    }, [page]);

    const pagerViewRef = React.useRef(null); // Referência do PagerView

    return (
        <View style={styles.container}>
            <PagerView
                ref={pagerViewRef}
                initialPage={0}
                style={styles.content}
                onPageSelected={onPageSelected}
                scrollEnabled={false} // Desabilita a navegação manual
            >
                <View key="1" style={styles.page}>
                    <Image source={require("../../assets/image1.png")} style={styles.image1} />
                </View>
                <View key="2" style={styles.page}>
                    <Image source={require("../../assets/image2.png")} style={styles.image1} />
                </View>
                <View key="3" style={styles.page}>
                    <Image source={require("../../assets/image3.png")} style={styles.image1} />
                </View>
            </PagerView>
            <View style={styles.bulletContent}>
                <View style={[styles.bullet, page === 0 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 1 && styles.activeBullet]}></View>
                <View style={[styles.bullet, page === 2 && styles.activeBullet]}></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    content: {
        marginTop: 10,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6b1664',
    },
    bulletContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 10, 
        backgroundColor: "#999",
    },
    activeBullet: {
        backgroundColor: "#000"
    },
    image1: {
        width: "100%",
        height: 200,
    },
});
