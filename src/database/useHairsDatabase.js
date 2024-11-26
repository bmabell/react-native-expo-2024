import { useSQLiteContext } from "expo-sqlite";

export function useHairsDatabase() {
    const database = useSQLiteContext();

    async function createHair({
        user_id,
        user_cadastro,
        nome,
        descricao,
        tipo,
        especificacao,
    }) {
        const statement = await database.prepareAsync(`
            INSERT INTO hairs (user_id, user_cadastro, nome, descricao, tipo, especificacao) 
            VALUES ($user_id, $user_cadastro, $nome, $descricao, $tipo, $especificacao);
        `);

        try {
            const result = await statement.executeAsync({
                $user_id: user_id,
                $user_cadastro: user_cadastro,
                $nome: nome,
                $descricao: descricao,
                $tipo: tipo,
                $especificacao: especificacao,
            });

            // Verificação robusta do lastInsertRowId
            const insertedID = result.lastInsertRowId ? result.lastInsertRowId.toString() : null;
            if (!insertedID) {
                throw new Error('Failed to get inserted row ID');
            }
            return { insertedID };
        } catch (error) {
            console.error("Error inserting hair:", error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getHairs() {
        const statement = await database.prepareAsync(`
            SELECT * FROM hairs;
        `);

        try {
            const hairs = await statement.getAllAsync();
            // Garante que 'hairs' sempre será um array, mesmo vazio
            return hairs || [];
        } catch (error) {
            console.error("Error fetching hairs:", error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    return { createHair, getHairs };
}
