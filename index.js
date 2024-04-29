const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'harrypotter',
    password: 'ds564',
    port: 5432,
});

app.use(express.json());

app.get('/bruxos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bruxos');
        res.status(201).json({
            total: result.rowCount,
            bruxos: result.rows,
        });
    } catch (error) {
        console.error('Erro ao encontrar bruxos:', error);
    }
});

app.get('/bruxos/:id', async (req, res) => {
    try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
    if (result.rowCount === 0) {
        res.status(404).json({
            status: 'error',
            message: 'Bruxo não encontrado',
        });
    }
    res.json({
        status: 'success',
        bruxo: result.rows[0],
    });
    } catch (error) {
        console.error('Erro ao encontrar bruxo:', error);
    }
});

app.get('/bruxos/nome/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const result = await pool.query('SELECT * FROM bruxos WHERE nome = $1', [nome]);
        if (result.rowCount === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Bruxo não encontrado',
            });
        }
        res.json({
            status: 'success',
            bruxo: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao encontrar bruxo:', error);
    }
});


app.post('/bruxos', async (req, res) => {
        let { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
        const casal = casa.toLowerCase();
        const status_sanguel = status_sangue.toLowerCase();
        const query = 'INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)';
        const values = [nome, idade, casal, habilidade, status_sanguel, patrono];
        try {
        if(!nome || !idade || !casa || !habilidade || !status_sangue || !patrono) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos os campos são obrigatórios',
            });
        }
        if (casal !== 'grifinória' && casal !== 'sonserina' && casal !== 'corvinal' && casal !== 'lufa-lufa' && casal !== 'grifinoria' && casal !== 'sonserina' && casal !== 'corvinal' && casal !== 'lufa lufa') {
            return res.status(400).json({
                status: 'error',
                message: 'Casa inválida',
            });
        }
        if (status_sanguel !== 'puro' && status_sanguel !== 'mestiço' && status_sanguel !== 'trouxa' && status_sanguel !== 'puro' && status_sanguel !== 'mestico' && status_sanguel !== 'trouxas') {
            return res.status(400).json({
                status: 'error',
                message: 'Status de sangue inválido',
            });
        }
        const result = await pool.query(query, values);
        res.status(201).json({
         bruxo: result.rows[0],
        status: 'success',
        });
        }
        catch (error) {
            console.error('Erro ao adicionar bruxo:', error);
        }
});

app.put('/bruxos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
    const query = 'UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7';
    const values = [nome, idade, casa, habilidade, status_sangue, patrono, id]; 

    try {
        if(!nome || !idade || !casa || !habilidade || !status_sangue || !patrono) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos os campos são obrigatórios',
            });
        }
        if(casa !== 'grifinória' && casa !== 'sonserina' && casa !== 'corvinal' && casa !== 'lufa-lufa' && casa !== 'grifinoria' && casa !== 'sonserina' && casa !== 'corvinal' && casa !== 'lufa lufa') {
            return res.status(400).json({
                status: 'error',
                message: 'Casa inválida',
            });
        }
        if(status_sangue !== 'puro' && status_sangue !== 'mestiço' && status_sangue !== 'trouxa' && status_sangue !== 'puro' && status_sangue !== 'mestico' && status_sangue !== 'trouxas') {
            return res.status(400).json({
                status: 'error',
                message: 'Status de sangue inválido',
            });
        }

        await pool.query(query, values);
        res.status(200).json({
            status: 'success',
            message: 'Bruxo atualizado com sucesso',
        });
        
    } catch (error) {
        console.error('Erro ao atualizar bruxo:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao atualizar bruxo',
        });
    }
});

app.delete('/bruxos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Bruxo não encontrado',
            });
        }
        res.status(204).json({
            status: 'success',
            message: 'Bruxo deletado com sucesso',
            total: result.rowCount,
            bruxo: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao deletar bruxo:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao deletar bruxo',
        });
    }
});

// varinhas routes
//id SERIAL PRIMARY KEY,
// material VARCHAR(100) NOT NULL,
// comprimento DECIMAL NOT NULL,
// nucleo VARCHAR(100) NOT NULL,
// data_fabricacao DATE NOT NULL

app.get('/varinhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM varinhas');
        res.json({
            status: 'success',
            total: result.rowCount,
            varinhas: result.rows,
        });
    } catch (error) {
        console.error('Erro ao encontrar varinhas:', error);
    }
});

app.get('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Varinha não encontrada',
            });
        }
        res.json({
            status: 'success',
            varinha: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao encontrar varinha:', error);
    }
});

app.post('/varinhas', async (req, res) => {
    let { material, comprimento, nucleo, data_fabricacao } = req.body;
    const query = 'INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)';
    const values = [material, comprimento, nucleo, data_fabricacao];
    try {
        if(!material || !comprimento || !nucleo || !data_fabricacao) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos os campos são obrigatórios',
            });
        }
        const result = await pool.query(query, values);
        res.status(201).json({
            varinha: result.rows[0],
            status: 'success',
        });
    } catch (error) {
        console.error('Erro ao adicionar varinha:', error);
    }
});

app.put('/varinhas/:id', async (req, res) => {
    const { id } = req.params;
    const { material, comprimento, nucleo, data_fabricacao } = req.body;
    const query = 'UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5';
    const values = [material, comprimento, nucleo, data_fabricacao, id];
    try {
        if(!material || !comprimento || !nucleo || !data_fabricacao) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos os campos são obrigatórios',
            });
        }
        await pool.query(query, values);
        res.status(200).json({
            status: 'success',
            message: 'Varinha atualizada com sucesso',
        });
    } catch (error) {
        console.error('Erro ao atualizar varinha:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao atualizar varinha',
        });
    }
}
);

app.delete('/varinhas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({
                status: 'error',
                message: 'Varinha não encontrada',
            });
        }
        res.status(204).json({
            status: 'success',
            message: 'Varinha deletada com sucesso',
            total: result.rowCount,
            varinha: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao deletar varinha:', error);
        res.status(500).json({
            status: 'error',
            message: 'Erro ao deletar varinha',
        });
    }
});




app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

