var request = require('supertest'),
    cheerio = require('cheerio'),
    app = require('../app'),
    req = request(app);

var request = {};
var response = {
  viewName: "",
  data : {},
  render: function(view, viewData) {
    this.viewName = view;
    this.data = viewData;
  }
};

describe('/ へのアクセス', function() {
  var url = '/';
  it('はステータスコード200を返すべき', function(done) {
    req.get(url).end(function(err,res) {
      var r = res.res,
          statusCode = r.statusCode;
      statusCode.should.equal(200);
      done();
    });
  });

  it('のp要素はWelcome to Expressを返すべき', function(done) {
    req.get(url).end(function(err,res) {
      var r = res.res,
          $ = cheerio.load(r.text);
      $('body p').text().should.equal('Welcome to Express');
      done();
    });
  });
});
