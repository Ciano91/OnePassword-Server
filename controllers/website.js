/**
 * Created by ciane on 15/01/2017.
 */

const express = require('express');
const router = express.Router();
const Website = require('../database/models/website');
const WebsiteService = require('../services/website');
const WebsitesErrors = require('../errors/website');
const GeneralErrors = require('../errors/general');

const Icons = {
    amazon: 'https://lh3.googleusercontent.com/-c9bKgaRfC3Q/AAAAAAAAAAI/AAAAAAAAJUE/Eo2MLCqyiZs/photo.jpg',
    facebook: 'http://centerlyne.com/wp-content/uploads/2016/07/logo-facebook.png',
    google: 'https://yt3.ggpht.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
    dropbox: 'https://www.dropbox.com/static/images/about/dropbox_logo_glyph_2015.svg'
};

// add a website
router.route('/add').post((req, res, next) => {
    const body = req.body;

    // check data
    let home = body[Website.Model.home];
    let pin = body.pin;
    let loginData = body[Website.Model.loginData];

    if(!(home && pin && loginData)) {
        return next(GeneralErrors.InvalidParams);
    }

    let website = {};

    // user
    website[Website.Model.user] = req.user._id;

    // home
    website[Website.Model.home] = home;

    // login data
    website[Website.Model.loginData] = loginData;

    // icon is not required
    let icon = body[Website.Model.icon];
    if(icon) {
        website[Website.Model.icon] = icon;
    }

    WebsiteService.add(website, pin)
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
            return next(err);
        });

});

// get all user's websites
router.route('/list').get((req, res, next) => {

    WebsiteService.list(req.user._id)
        .then((websites) => {

            // set the icons
            let newWebsites = websites.map((website) => {
                if(!website.icon) {
                    let icon = getIcon(website.home);
                    if(icon) {
                        website.icon = icon;
                    }
                }
                return website;
            });

            // send websites list
            res.format({
                json: () => {
                    res.json({
                        websites: newWebsites
                    })
                }
            });

        });

});

// get the login data for a website
router.route('/login').post((req, res, next) => {
    const body = req.body;

    // check data
    let pin = body.pin;

    if(!pin) {
        return next(GeneralErrors.InvalidParams);
    }

    WebsiteService.login(pin)
        .then((website) => {

            // send websites access data
            res.format({
                json: () => {
                    res.json({
                        loginData: website.loginData
                    })
                }
            });

        })
        .catch((err) => {
            return next(err);
        })

});

// remove a website
router.route('/remove/:id').get((req, res, next) => {

    const websiteId = req.params.id;

    WebsiteService.remove(websiteId, req.user._id)
        .then(() => {
            res.json({});
        });

});

function getIcon(url) {
    for(const siteName of Object.keys(Icons)) {
        if(url.includes(siteName)) {
            return Icons[siteName];
        }
    }
    return null;
}

module.exports = router;