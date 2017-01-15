/**
 * Created by ciane on 15/01/2017.
 */

const express = require('express');
const router = express.Router();
const Website = require('../database/models/website');
const WebsiteService = require('../services/website');
const WebsitesErrors = require('../errors/website');
const GeneralErrors = require('../errors/general');

// add a website
router.route('/add').post((req, res, next) => {
    const body = req.body;

    // check data
    let home = body[Website.Model.home];

    if(!home) {
        return next(GeneralErrors.InvalidParams);
    }

    home = home.trim();

    if(home.length == 0) {
        return next(GeneralErrors.InvalidParams);
    }

    let website = {};
    website[Website.Model.home] = home;

    // icon is not required
    let icon = body[Website.Model.icon];
    if(icon) {
        website[Website.Model.icon] = icon;
    }

    WebsiteService.add(website, body.AuthUser._id)
        .then((w) => {

            let newWebsite = {};
            newWebsite[Website.Model.home] = w[Website.Model.home];
            newWebsite[Website.Model.id] = w[Website.Model.id];

            // send the new website
            res.format({
                json: () => {
                    res.json({
                        website: newWebsite
                    })
                }
            });

        })
        .catch((err) => {
            next(WebsitesErrors.WebsiteAlreadyRegistered);
        });

});

// get all user's websites
router.route('/list').get((req, res, next) => {

    WebsiteService.list(req.body.AuthUser._id)
        .then((websites) => {

            // send websites list
            res.format({
                json: () => {
                    res.json({
                        websites: websites
                    })
                }
            });

        });

});

// remove a website
router.route('/remove/:id').get((req, res, next) => {

    const websiteId = req.params.id;

    WebsiteService.remove(websiteId, req.body.AuthUser._id)
        .then(() => {
            res.send();
        });

});

module.exports = router;