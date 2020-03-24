const connection = require("../database/connection");
const crypt = require("crypto");

module.exports = {
    async index(req, resp) {
        const ongs = await connection('ong').select('*');    
        resp.json(ongs)
    },
    async create(req, resp) {
        const { name , email, whatsapp, city, uf}  = req.body;
        const id = crypt.randomBytes(4).toString('HEX');
    
        await connection('ong').insert({
            id,name,email,whatsapp,city,uf
        });
    
        return resp.json({ id });
    }
}