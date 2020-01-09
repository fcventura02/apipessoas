const Person = require('../models/PersonModel');
const success = { creat: 'Add successfully' };
const { ValidaCpf } = require('./CpfController');
module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const person = await Person.paginate({}, { page, limit: 5 });
        res.json(person);
    },

    async show(req, res) {
        const q = req.params
        const person = await Person.findById(q.id)
            .catch(err => {
                res.status(404).send("Id nao encontrado");
            });
        res.json(person);

    },

    async update(req, res) {
        await Person.findById(req.params.id, function (err, person) {
            const { person_cpf, person_name } = req.body
            const validaCpf = new ValidaCpf(person_cpf)
            if (!person)
                res.status(404)
            else {
                if (person_name != '')
                    person.person_name = person_name;
                else person.person_name = person.person_name;


                if (person_cpf != null) {

                    if (validaCpf.getValorCpf() && person_cpf.length === 11) {
                        person.person_cpf = person_cpf;
                    } else {
                        res.status(400).json({ err: "Cpf Invalido" });
                    }
                } else person.person_cpf = person.person_cpf;

                person.save().then(person => {
                    res.status(200).json({ update: 'upddate completo', person })
                })
                    .catch(err => {
                        res.status(400).send("Não foi possivel fazer o update no database " + err);
                    });
            }
        });
    },



    async remove(req, res) {
        const person = await Person.findById(req.params.id);
        await person.remove();
        res.send("removido com sucesso!");
    },


    async create(req, res) {
        const { person_cpf, person_name } = req.body
        const validaCpf = new ValidaCpf(person_cpf)
        if ((validaCpf.getValorCpf()) && (person_cpf.length === 11))
            if (person_name != null && person_name != "" && person_name != " ") {
                const person = await Person.create(req.body);
                res.status(200).json({ success, person });
            } else (res.status(400).json({ success: "nome invalido" }));
        else (res.status(400).json({ success: "Cpf invalido" }))
    }



};