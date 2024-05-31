const { getFeeds, postFeeds, deleteFeeds, updateFeeds, searchFeed } = require('../controllers/feeds.controllers');

const feedRoutes = require('express').Router();



feedRoutes.get("/feeds", getFeeds);
feedRoutes.get("/feeds/search", searchFeed)
feedRoutes.post("/feeds/new", postFeeds);
feedRoutes.put("/feeds/:id", updateFeeds);
feedRoutes.delete("/feeds/:id", deleteFeeds);

module.exports = feedRoutes;
