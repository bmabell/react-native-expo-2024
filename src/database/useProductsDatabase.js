import { useSQLiteContext } from "expo-sqlite";

export function useHairsDatabase() {
    const database = useSQLiteContext();

    async function createHairs({
        user_id,
        user_cadastro,
        nome,
        descricao,
        tipo,
        especificacao,
    }) {
        const statment = await database.prepareAsync(`
            INSERT INTO hairs ( user_id, user_cadastro, nome, descricao, peso, marca, categoria, especificacao) 
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

    async function getHairs() {
        const statment = await database.prepareAsync(`
            SELECET * FROM  hairs;
            `);

        try {
            const hairs = await database.getAllAsync("SELECT * FROM hairs");
            return hairs;
        } catch (error) {
            console.log(errpr);
            throw error;
        } finally {
            await statment.finalizeAsync();
        }
    }
    return { createHairs, getHairs };
}