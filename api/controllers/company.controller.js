const db = require("../models");
const Companies = db.companies;
const Contacts = db.contacts;

// Create a company
exports.create = (req, res) => {
    // Validate request
    if (!req.body.company_name || !req.body.company_address || !req.body.contactId) {
        return res.status(400).send({
            message: "Company Name, Address, and Contact ID cannot be empty!"
        });
    }

    // Create a company object
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contactId: req.body.contactId  // Foreign key to contacts table
    };

    // Save company in the database
    Companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Company."
            });
        });
};

// Get all companies
exports.findAll = (req, res) => {
    Companies.findAll({
        include: [{
            model: Contacts,
            as: 'contact'
        }]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving companies."
        });
    });
};

// Get one company by id
exports.findOne = (req, res) => {
    const id = req.params.companyId;

    Companies.findByPk(id, {
        include: [{
            model: Contacts,
            as: 'contact'
        }]
    })
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: `Company not found with id=${id}`
            });
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Company with id=" + id
        });
    });
};

// Update a company by id
exports.update = (req, res) => {
    const id = req.params.companyId;

    Companies.update(req.body, {
        where: { company_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Company was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Company with id=" + id
        });
    });
};

// Delete a company by id
exports.delete = (req, res) => {
    const id = req.params.companyId;

    Companies.destroy({
        where: { company_id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Company was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Company with id=" + id
        });
    });
};
