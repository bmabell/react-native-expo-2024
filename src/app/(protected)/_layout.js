import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from "@expo/vector-icons"

const DrawerLayout = () => {
    return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name='index' 
        options={{
           drawerLabel: "Principal", 
           headerTitle:"Principal", 
           drawerIcon: () => <Ionicons name='home' size={20} color="black" />, }} />
      </Drawer>
      <Drawer.Screen name='index' 
        options={{
           drawerLabel: "Principal", 
           headerTitle:"Principal", 
           drawerIcon: () => <Ionicons name='home' size={20} color="black" />, }} />
    </GestureHandlerRootView>
  );
}
export default function Layout() {
    return DrawerLayout();
}
