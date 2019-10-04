const Person = require('../models/PersonModel');
const success = { creat: 'Add successfully' };
const testCpf = require('./CpfController');
module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;
        const person = await Person.paginate({}, { page, limit:5});
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
        const person = await Person.findById(req.params.id, function (err, person) {
            if (!person)
                res.status(404).send("data is not found");
            else {
                if (req.body.person_name != null)
                    person.person_name = req.body.person_name;
                else person.person_name = person.person_name;


                if (req.body.person_cpf != null) {
                    if (testCpf(req.body.person_cpf)) {
                        person.person_cpf = req.body.person_cpf;
                    } else {
                        res.status(400).send("Cpf Invalido");
                    }
                } else person.person_cpf = person.person_cpf;

                person.save().then(person => {
                    res.json({ update: 'upddate completo', person })
                })
                    .catch(err => {
                        res.status(400).send("Não foi possivel fazer o update no database");
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

        if ((testCpf(req.body.person_cpf))&&(req.body.person_cpf.length === 11))
            if (req.body.person_name != null && req.body.person_name != " "){
            const person = await Person.create(req.body);
            res.status(200).json({ success, person });
        }else (res.status(400).send("Nome invalido"));
        else (res.status(400).send("Cpf invalido"));
    }



};