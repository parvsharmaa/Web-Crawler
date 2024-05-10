class Config {
  static get JWT_SECRET() {
    return '9afhe-hcdcd0-rhfbr6-7decd45';
  }

  static get DB_URI() {
    return 'mongodb+srv://parvsharma:Parv%40123@app-crawler.9qz8a5i.mongodb.net/amazon';
  }

  static get CRAWLER_API() {
    return 'http://localhost:8080/scrape';
  }
}

export default Config;
