const express = require('express');
const fetch = require('node-fetch');
const httpStatus = require('http-status');

const router = express.Router();
const { apiKey } = require('./config/vars');

/**
 * @swagger
 * definitions:
 *   Hotel:
 *     properties:
 *       title:
 *         type: string
 *       highlightedTitle:
 *         type: string
 *       vicinity:
 *         type: string
 *       position:
 *         type: array
 *         items:
 *           type: integer
 *       category:
 *         type: string
 *       href:
 *         type: string
 *       type:
 *         type: string
 */


/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     description: Returns hotels
 *     tags: [Hotel]
 *     produces:
 *       - application/json
 *     parameters:
*        - in: query
*          name: lat
*          schema:
*           type: integer
*          required: true
*          description: The latitude.
*        - in: query
*          name: long
*          schema:
*            type: integer
*          required: true
*          description: The longitude.
*        - in: query
*          name: radius
*          schema:
*            type: integer
*          required: false
*          description: Radius from the center in meter.
 *     responses:
 *       200:
 *         description: hotels
 */
router.get('/search', async (req, res) => {
  try {
    const url = new URL('https://places.sit.ls.hereapi.com/places/v1/autosuggest');

    const { lat, long, radius } = req.query;

    if (!lat || !long) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ message: 'You need to pass lat & long as query param!' });
    }

    const params = {
      at: `${lat},${long}`,
      q: 'hotel',
      apiKey,
    };

    if (radius) {
      delete params.at;
      params.in = `${lat},${long};r=${radius}`;
    }

    url.search = new URLSearchParams(params).toString();

    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    const json = await response.json();

    return res.status(httpStatus.OK).send(json.results);
  } catch (err) {
    console.error('err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error' });
  }
});

module.exports = router;
