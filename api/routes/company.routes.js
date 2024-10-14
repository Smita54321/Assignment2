module.exports = app => {
    const companies = require("../controllers/company.controller.js");

    var router = require("express").Router();

    // Create a new company
    router.post("/", companies.create);

    // Get all companies
    router.get("/", companies.findAll);

    // Get one company by id
    router.get("/:companyId", companies.findOne);

    // Update a company by id
    router.put("/:companyId", companies.update);

    // Delete a company by id
    router.delete("/:companyId", companies.delete);

    app.use('/api/companies', router);
};