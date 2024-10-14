const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.address) {
        return res.status(400).send({
            message: "Name and Address cannot be empty!"
        });
    }

    // Create a contact object
    const contact = {
        name: req.body.name,
        address: req.body.address  // Ensure the address is included
    };

    // Save the contact in the database
    Contacts.create(contact)
        .then(data => {
            res.send(data);  // Send created contact back
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Contact."
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll({
        include: [{
            model: Phones,  // Include associated phones in the response
            as: 'phones'
        }]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contacts."
        });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;

    Contacts.findByPk(id, {
        include: [{
            model: Phones,  // Include associated phones in the response
            as: 'phones'
        }]
    })
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: `Contact not found with id=${id}`
            });
        }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Contact with id=" + id
        });
    });
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.contactId;

    // Validate request
    if (!req.body.name || !req.body.address) {
        return res.status(400).send({
            message: "Name and Address cannot be empty!"
        });
    }

    Contacts.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Contact with id=${id}. Maybe Contact was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Contact with id=" + id
        });
    });
};

// Delete one contact by id (also deletes related phones)
exports.delete = (req, res) => {
    const id = parseInt(req.params.contactId);

    // First, delete all associated phones
    Phones.destroy({
        where: { contactId: id }
    })
    .then(() => {
        // Then, delete the contact
        Contacts.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contact with id=" + id
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error deleting Phones associated with Contact id=" + id
        });
    });
};
