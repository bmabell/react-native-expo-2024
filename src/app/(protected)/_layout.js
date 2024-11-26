import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from "@expo/vector-icons"
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from "../../hooks/Auth/index";

function CustomDrawerContent(props) {
  const { user, signOut } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 50, justifyContent:'center', alignItems:'center', 
        backgroundColor: '#E6E6FA', paddingVertical:10}}> 
        <Image source={{
        uri: 'https://github.com/bmabell.png',
      }}
        style={{ width: 100, height: 100, borderRadius: 50, margin: 10 }}
      />
        <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'regular' }}>
            {user.user?.nome || "Sem ninguém"}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          padding: 10,
          backgroundColor: '#6b1664',
          borderRadius: 30,
        }} onPress={() => signOut()}>

        <Text style={{ color: 'white', fontFamily: 'bold' }}>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}  >
        <Drawer.Screen name='index'
          options={{
            drawerLabel: "Principal",
            headerTitle: "Principal",
            drawerIcon: () => <Ionicons name='home' size={20} color="black" />,
          }} />
        <Drawer.Screen name='list'
          options={{
            drawerLabel: "Cabelos adicionados",
            headerTitle: "Cabelos adicionados",
            drawerIcon: () => <Ionicons name='list-outline' size={20} color="black" />,
          }} />
        <Drawer.Screen name='hairs'
          options={{
            drawerLabel: "Adicionar cabelo",
            headerTitle: "Adicionar tipo de cabelo",
            drawerIcon: () => <Ionicons name='add-circle-outline' size={20} color="black" />,
          }} />
          <Drawer.Screen name='save'
          options={{
            drawerLabel: "Salvos",
            headerTitle: "Salvos",
            drawerIcon: () => <Ionicons name='bookmark-outline' size={20} color="black" />,
          }} />
      </Drawer>

    </GestureHandlerRootView>
  );
}
export default function Layout() {
  return DrawerLayout();
}
