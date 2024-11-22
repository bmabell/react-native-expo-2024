import { useSQLiteContext } from "expo-sqlite";

export function useProductsDatabase() {
    const database = useSQLiteContext();

    async function createProduct({
        user_id,
        user_cadastro,
        nome,
        descricao,
        peso,
        marca,
        categoria,
        especificacao,
    }) {
        const statment = await database.prepareAsync(`
            INSERT INTO products ( user_id, user_cadastro, nome, descricao, peso, marca, categoria, especificacao) 
            VALUES ($user_id, $user_cadastro, $nome, $descricao, $peso, $marca, $categoria, $especificacao); 
            `);
        try {
            const result = await statment.executeAsync({
                $user_id: user_id,
                $user_cadastro: user_cadastro,
                $nome: nome,
                $descricao: descricao,
                $peso: peso,
                $marca: marca,
                $categoria: categoria,
                $especificacao: especificacao,
            });
            const insertedID = result.lastInsertRowId.toString();
            return { insertedID };
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            await statment.finalizeAsync();
        }
    }

    async function getProducts() {
        const statment = await database.prepareAsync(`
            SELECET * FROM  produtos;
            `);

        try {
            const products = await database.getAllAsync("SELECT * FROM products");
            return products;
        } catch (error) {
            console.log(errpr);
            throw error;
        } finally {
            await statment.finalizeAsync();
        }
    }
    return { createProduct, getProducts };
}