const connection = require("../database/connection");
module.exports = {
    async index(req, resp) {        
        const ong_id = req.headers.authorization;        
        const { page = 1, pagesize = 5 } = req.query;

        const incs = await connection('incident')
        .join('ong', 'ong.id', '=', 'incident.ong_id')
        .limit(pagesize)
        .offset((page - 1) * pagesize)
        .where('ong_id', ong_id)
        .select(
            ['incident.*',
            'ong.name',
            'ong.email',
            'ong.whatsapp',
            'ong.city',
            'ong.uf']
        );

        const [count] = await connection('incident')
        .where('ong_id', ong_id)
        .count();
        resp.header('X-Total-Count', count['count(*)']);
        resp.header('X-Page-Number', page);
        resp.header('X-Page-Size', pagesize);

        return resp.json(incs);
    }

}