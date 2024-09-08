const CalcDate = (date: string | undefined) => {
    // const month_short = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "Jun",
    //   "Jul",
    //   "Aug",
    //   "Sep",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];

    if (!date) {
      alert(`error calc date`)
      return ``
    }
    const dateNow = new Date();
    const [monthContent, dayContent, yearContent] = date
      .slice(4, 24)
      .split(" ");

    const tContent = new Date(date).getTime();
    const tDateNow = dateNow.getTime();
    const tDiff = tDateNow - tContent;
    const dayDiff = tDiff / (24 * 3600 * 1000);
    const hourDiff = tDiff / (3600 * 1000);
    const minuteDiff = tDiff / (60 * 1000);


    if (dateNow.getFullYear() - Number(yearContent) > 0) {
      return `${monthContent} ${dayContent}, ${yearContent}`;
    } else if (dayDiff > 28) {
      return `${monthContent} ${dayContent}`;
    } else if (dayDiff > 7) {
      return `${Math.floor(dayDiff / 7)}w ago`;
    } else if (dayDiff > 1) {
      return `${Math.floor(dayDiff)}d ago`;
    } else if (hourDiff > 1) {
      return `${Math.floor(hourDiff)}h ago`;
    } else if (minuteDiff > 5) {
      return `${Math.floor(minuteDiff)}min ago`;
    } else {
      return `Now`;
    }
  };

export default CalcDate