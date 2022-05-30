const axios = require('axios');
const response = require('../helpers/response');

const jobList = async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
            params: {
                description: req.query.description,
                location: req.query.location,
                full_time: req.query.full_time,
                page: req.query.page
            }
        };

        await axios.request(options)
            .then((job) => {
                return response.successResponse(res, job.data);
            })
            .catch((err) => {
                return response.errorResponse(res, err);
            });
    } catch (err) {
        return response.errorResponse(res, err);
    };
};

const jobDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const options = {
            method: 'GET',
            url: `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`,
        };

        await axios.request(options)
            .then((job) => {
                return response.successResponse(res, job.data);
            })
            .catch((err) => {
                return response.errorResponse(res, err);
            });
    } catch (err) {
        return response.errorResponse(res, err);
    };
};

module.exports = {
    jobList,
    jobDetail
}
