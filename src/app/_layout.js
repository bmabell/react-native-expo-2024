import { Stack, useSegments, router } from "expo-router";
import { AppProvider } from "../hooks";
import { useAuth } from "../hooks/Auth";
import { useEffect } from "react";


const StackLayout = () => {
  const {user} = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(protected)";
    
    if(!user?.autenticated && inAuthGroup) {
      if (router.canGoBack()) {
        router.back();
        return;
      } else {
        router.replace("/");
      }
    } else {
      if(user.autenticated){
        router.replace("(protected)")
      }
    }
  }, [user]);
  
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false}} />
      <Stack.Screen name="(protected)" options={{ headerShown: false}} />
    </Stack>
  );
}
  
export default function Layout() {
  return (
    <AppProvider>
      <StackLayout />
    </AppProvider>
  );
}