import * as moment from "moment-timezone";

class DateService {
  localDateTime() {
    const date = moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
    return date;
  }

  localDate() {
    const date = (moment.tz(new Date(), "Asia/Jakarta").format("YYYY-MM-DD") + " 00:00:00");
    return date;
  }

  localTime() {
    const date = moment.tz(new Date(), "Asia/Jakarta").format("HH:mm:ss");
    return date;
  }
}

export default DateService;