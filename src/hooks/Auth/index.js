import React, { createContext, useEffect, useState } from "react";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import { ActivityIndicator, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const AuthContext = createContext({});

export const Role = {
  SUPER: 'SUPER',
  ADM: 'ADM',
  USER: 'USER',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    autenticated: false,
    user: null,
    role: null,
  });

  const { authUser } = useUsersDatabase();

  useEffect(() => {
    const loadStorageData = async () => {
      const storageUser = await AsyncStorage.getItem('@payment:user');

      if (storageUser) {
        setUser({
          autenticated: true,
          user: JSON.parse(storageUser),
          role: JSON.parse(storageUser).role,
        });
      } else {
        setUser({
          autenticated: false,
          user: null,
          role: null,
        });
      };
    };

    loadStorageData();
  }, []);


  const signIn = async ({ email, password }) => {
    const response = await authUser({ email, password });
    if (!response) {
      setUser({ autenticated: false, user: null, role: null });
      return;
    }

    await AsyncStorage.setItem("@payment:user", JSON.stringify(response));

    setUser({ autenticated: true, user: response, role: response.role });
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@payment:user");
    router.back("/");
    setUser({
        autenticated: false,
        user: null,
        role: null,
    })
};


  if (user?.autenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando Dados do Usuário</Text>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}