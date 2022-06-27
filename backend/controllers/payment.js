const { Transaction, sequelize } = require("../models");
const express = require("express");
const service = require("../models/service");
const { validationResult } = require("express-validator");
const Razorpay = require("razorpay");

exports.createTransaction = async (data) => {
  try {
    const { user_id, service_id, price, service_provider_id } = data;
    const transaction = await Transaction.create({
      user_id,
      service_id,
      price,
      service_provider_id,
      date: Date.now(),
      status: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

exports.generateLink = async (data) => {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_BZuc6ZpQxBIXUt",
      key_secret: "UDI7ZInRZQMWPiuNpHUQ39Vc",
    });

    const response = await instance.paymentLink.create({
      amount: data.amount,
      currency: "INR",
      description: "Payment for BOOK service",
      reference_id: data.reference_id,
      customer: {
        name: data.customer_name,
        email: "test@gmail.com",
        contact: "9888888888",
      },
    });
    return response;
  } catch (error) {
    return error.error.description;
  }
};

exports.getTransaction = async ({ user_id }) => {
  try {
    const response = await sequelize.query(
      `SELECT sp.name as service_provider_name,t.price,t.date,s.name as service_name FROM transactions as t
      JOIN service_providers as sp
      On sp.id=t.service_provider_id
      JOIN services as s ON s.id=t.service_id
      WHERE user_id = ${user_id}
      `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
