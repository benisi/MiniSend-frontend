import moment from "moment";

export default (value) => {
  if (typeof value === "string") {
    return moment(value).format("Do MMMM, YYYY @ h:mma ");
  }
  return value;
};
