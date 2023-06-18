const searchHelper = (searchKey, query, req) => {
  if (req.query.search) {
    queryObject = {};

    const regex = new RegExp(req.query.search, "i");
    queryObject[searchKey] = regex;

    return query.where(queryObject);
  }
  return query;
};

module.exports = {
  searchHelper,
};
