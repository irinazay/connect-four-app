export default function countTimer(counter: number) {
  let minute = Math.floor(counter / 60) % 60;
  let seconds = Math.floor(counter) % 60;

  return `${minute < 10 ? "0" + minute : minute}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
