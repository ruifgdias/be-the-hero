const connection = require("../database/connection");
const crypt = require("crypto");

module.exports= {
    async index(req, resp) {
        const { page = 1, pagesize = 5 } = req.query;

        const [count] = await connection('incident').count();

        const incs = await connection('incident')
        .join('ong', 'ong.id', '=', 'incident.ong_id')
        .limit(pagesize)
        .offset((page - 1) * pagesize)
        .select(
            ['incident.*',
            'ong.name',
            'ong.email',
            'ong.whatsapp',
            'ong.city',
            'ong.uf']
        );

        resp.header('X-Total-Count', count['count(*)']);
        return resp.json(incs);
    },
    async create(req, resp) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id
        });

        return resp.json({id});
    },
    async delete (req, resp) {
        const {id} = req.params;
        const ong_id = req.headers.authorization;

        const inc = await connection('incident')
        .where('id', id)
        .select('ong_id')
        .first();

        if (!inc || inc.ong_id != ong_id)
            return resp.status(401).json({ error : 'Operation not permitted'});
        
        await connection('incident').where('id', id).delete();
        
        return resp.status(204).send();
    }
}