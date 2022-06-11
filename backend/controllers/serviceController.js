const { Service } = require('../models')
const express = require('express');
const service = require('../models/service');
const { validationResult } = require('express-validator');




exports.addservice = async (req, res) => {
    try {
        const { servicename, desc, price } = req.body;
        if (!servicename || !desc || !price) {
            res.send("failed");
            return
        }
        const service = await Service.create({
            description: req.body.desc,
            name: req.body.servicename,
            price: req.body.price
        });
        return res.send("success");
        ;
    } catch (error) {
        console.log("add service error", error);
        return res.send("failed")
    }
}

exports.getservices = async (req, res) => {
    const services = await Service.findAll()
    res.send(services)
}

exports.listservice = async (req, res, next) => {
    try {
        const services = await Service.findAll();
        console.log({ services });
        return res.json({ status: "success", services: services });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            error: error
        });
    }
}

exports.oneservice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ status: "error", message: errors.array() });
    }
    try {
        const { id } = req.params;
        const service = await Service.findOne({
            where: {
                id: id
            }
        })
        console.log(service)
        return res.json({ status: "success", service: service });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            error: error
        });

    }
}

exports.editService = async (req, res, next) => {
    try {
        console.log(req.params);

        const { servicename, desc, price, service_id } = req.body;
        if (!service_id) {
            return res.json({ status: "failure", service: {} });
        }
        const service = await Service.update({
            name: servicename,
            description: desc,
            price: price,
        }, {
            where: {
                id: service_id
            }
        });
        return res.json({ status: "success", service: service[0] });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            error: error
        });
    }

}

exports.deleteservice = async (req, res, next) => {

    try {
        console.log(req.params);

        const { servicename, desc, price, service_id } = req.body;
        if (!service_id) {
            return res.json({ status: "failure", service: {} });
        }
        const service = await Service.destroy({
            where: {
                id: service_id
            }

        });
        return res.json({ status: "success", service: service[0] });
    } catch (error) {
        console.log(error);
        return res.json({
            status: "error",
            error: error
        });
    }
}