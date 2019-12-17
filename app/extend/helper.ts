import * as moment from "moment";

moment.locale("zh");

export default {
  relativeTime: (time: Date) => moment(new Date(time)).fromNow()
};
