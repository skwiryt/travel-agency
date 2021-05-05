export const formatTime = (time) => {
  if (!time || typeof time != 'number' || time < 0) {
    return null;
  }
  const stringOf = (number) => number < 10 ? `0${number}` : number.toString();
  
  if (time < 60) {
    return `00:00:${stringOf(time)}`;
  }
  const seconds = Math.floor(time % 60);
  const minutes =  Math.floor(((time - seconds)/60) % 60);
  if (time < 60 * 60) {
    return `00:${stringOf(minutes)}:${stringOf(seconds)}`;
  }
  const hours = Math.floor((time - seconds - minutes * 60)/(60 * 60) % 60);

  return `${stringOf(hours)}:${stringOf(minutes)}:${stringOf(seconds)}`;

};