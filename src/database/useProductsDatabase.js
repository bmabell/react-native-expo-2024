import { useSQLiteContext } from "expo-sqlite";

export function useProductsDatabase () {
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
            INSERT INTO produtos ( user_id, user_cadastro, nome, descricao, peso, marca, categoria, especificacao) 
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
    return{createProduct};
}