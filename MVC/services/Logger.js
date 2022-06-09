class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
      this.logs = [];
    }
    return Logger.instance;
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message) {
    this.logs.push(message);
    console.log("Logged: " + message);
  }

  getLogCount() {
    console.log("Log count: " + this.logs.length);
    return this.logs.length;
  }

  getLogs() {
    return this.logs;
  }
}
