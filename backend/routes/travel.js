var express = require('express');
var router = express.Router();

const wrap = require('express-async-wrap');
const models = require('../models');

router.post('/addTravel', wrap(async (req, res) => {
  console.log(req.body)
  const travel = await models.Travel.create({ 
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    total_budget: req.body.total_budget,
    start_date: req.body.start_date,
    end_date: req.body.end_date
  });
  if(travel) {
    res.send({
      result: true
    });
  } else {
    res.send({
      result: false
    });
  }
}));

router.post('/addNation', wrap(async (req, res) => {
  const cities = await models.City.findAll({
    where: {
      capital: 'primary'
    }
  });
  for (let i = 0; i < cities.length; i += 1) {
    const nation = await models.Nation.create({
      name: cities[i].country,
      latitude: cities[i].latitude,
      longitude: cities[i].longitude,
    });
  }
}))

module.exports = router;
