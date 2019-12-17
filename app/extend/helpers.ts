import * as moment from "moment";

moment.locale("zh");

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
