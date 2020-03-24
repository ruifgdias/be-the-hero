const connection = require("../database/connection");

module.exports = {
    async create(req, resp) {       
        const { id } = req.body;

        const ong = await connection('ong')
        .where('id', id)
        .select('name')
        .first();

        if (!ong)
            return resp.status(400).json({error: 'NO ONG Found!'});

        return resp.json({ong});
    }
}