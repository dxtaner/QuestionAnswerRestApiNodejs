const path = require("path");
const root = path.dirname(require.main.filename);

const errorWrapper = require(root + "/helpers/error/errorWrapper");

const {
  searchHelper,
  populateHelper,
} = require("./queryMiddlewareHelpers.js");

const questionQueryMiddleware = function (model, options) {
  return errorWrapper(async function (req, res, next) {
    // Initial Query
    let query = model.find({});

    // Search Parameter
    query = searchHelper("title", query, req);

    // Populate If Available
    if (options && options.population) {
      query = populateHelper(query, options.population);
    }


  });
};

module.exports = questionQueryMiddleware;
