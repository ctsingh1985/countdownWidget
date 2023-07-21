import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C83CountdownWidgetTransitionController from './C83CountdownWidgetTransitionController';

export default class C83CountdownWidget extends AbstractTransitionBlock {
  public static displayName: string = 'c83-countdown-widget';
  public transitionController: C83CountdownWidgetTransitionController;
  private startDate: any = this.element.dataset.startDate;
  private startTime: any = this.element.dataset.startTime;
  private endDate: any = this.element.dataset.endDate;
  private endTime: any = this.element.dataset.endTime;
  private timezoneOffset: any = this.element.dataset.timezoneOffset;
  private formattedStartDateTime: any;
  private inputStartFormattedDAT: any = `${this.startDate}T${this.startTime}`;
  private formattedEndDateTime: any;
  private inputEndFormattedDAT: any = `${this.endDate}T${this.endTime}`;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C83CountdownWidgetTransitionController(this);
    const sDAT = new Date(this.inputStartFormattedDAT);
    const eDAT = new Date(this.inputEndFormattedDAT);
    const sTzDifference = (this.timezoneOffset * 60 + sDAT.getTimezoneOffset()) / 60;
    const eTzDifference = (this.timezoneOffset * 60 + eDAT.getTimezoneOffset()) / 60;
    if (sTzDifference !== 0) {
      const calcSTzDifference = -sTzDifference;
      const calcETzDifference = -eTzDifference;
      sDAT.setHours(sDAT.getHours() + (sTzDifference !== 0 ? 0 : calcSTzDifference));
      sDAT.setMinutes(sDAT.getMinutes() + (calcSTzDifference !== 0 ? calcSTzDifference * 60 : 0));
      eDAT.setHours(eDAT.getHours() + (eTzDifference !== 0 ? 0 : calcETzDifference));
      eDAT.setMinutes(eDAT.getMinutes() + (eTzDifference !== 0 ? calcETzDifference * 60 : 0));
      const sDd = sDAT.getDate();
      const sMm = sDAT.getMonth() + 1;
      const sYy = sDAT.getFullYear();
      const sHrs = sDAT.getHours();
      const sMins = sDAT.getMinutes();
      const sSec = sDAT.getSeconds();

      const eDd = eDAT.getDate();
      const eMm = eDAT.getMonth() + 1;
      const eYy = eDAT.getFullYear();
      const eHrs = eDAT.getHours();
      const eMins = eDAT.getMinutes();
      const eSec = eDAT.getSeconds();

      const a = sMm <= 9 ? `0${sMm}` : sMm;
      const b = sDd <= 9 ? `0${sDd}` : sDd;
      const c = sHrs <= 9 ? `0${sHrs}` : sHrs;
      const d = sMins <= 9 ? `0${sMins}` : sMins;
      const e = sSec <= 9 ? `0${sSec}` : sSec;
      const f = eMm <= 9 ? `0${eMm}` : eMm;
      const g = eDd <= 9 ? `0${eDd}` : eDd;
      const h = eHrs <= 9 ? `0${eHrs}` : eHrs;
      const i = eMins <= 9 ? `0${eMins}` : eMins;
      const j = eSec <= 9 ? `0${eSec}` : eSec;

      const sDateString = `${sYy}-${a}-${b}`;
      const sTimeString = `${c}:${d}:${e}`;
      const eDateString = `${eYy}-${f}-${g}`;
      const eTimeString = `${h}:${i}:${j}`;
      this.formattedStartDateTime = `${sDateString}T${sTimeString}`;
      this.formattedEndDateTime = `${eDateString}T${eTimeString}`;
    } else {
      this.formattedStartDateTime = this.inputStartFormattedDAT;
      this.formattedEndDateTime = this.inputEndFormattedDAT;
    }
  }

  private calcTime(offset: any, targetDate: any) {
    const d = new Date(targetDate);
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const tz = utc + 3600000 * offset;
    const zTime = new Date(tz).toLocaleString();
    return zTime;
  }

  private coundtownTimer() {
    const countdownText = this.getElement('.js-countdown-text') as HTMLElement;
    const countdownBeforeText = this.getElement('.countdown-before') as HTMLElement;
    const countdownAfterText = this.getElement('.countdown-after') as HTMLElement;
    const countdownRemainingDays: any = this.getElement('.countdown-remaining-days') as HTMLElement;
    const countdownRemainingHours: any = this.getElement(
      '.countdown-remaining-hours',
    ) as HTMLElement;
    const countdownRemainingMinutes: any = this.getElement(
      '.countdown-remaining-minutes',
    ) as HTMLElement;
    const countdownRemainingSeconds: any = this.getElement(
      '.countdown-remaining-seconds',
    ) as HTMLElement;
    // Update the count down every 1 second
    const x = setInterval(() => {
      // Get today's date and time
      const sDate: any = this.calcTime(this.timezoneOffset, this.formattedStartDateTime);
      let startCountDownDate: any = new Date(sDate).getTime();

      const ctSDAT = new Date(this.inputStartFormattedDAT);
      const ctSTzDifference = (this.timezoneOffset * 60 + ctSDAT.getTimezoneOffset()) / 60;
      if (ctSTzDifference !== 0) {
        startCountDownDate = this.formattedStartDateTime;
        startCountDownDate = new Date(startCountDownDate).getTime();
      }

      const nowStartCountDownDate = new Date().getTime();
      const eDate: any = this.calcTime(this.timezoneOffset, this.formattedEndDateTime);
      let countDownDate: any = new Date(eDate).getTime();

      const ctEDAT = new Date(this.inputStartFormattedDAT);
      const ctETzDifference = (this.timezoneOffset * 60 + ctEDAT.getTimezoneOffset()) / 60;
      if (ctETzDifference !== 0) {
        countDownDate = this.formattedEndDateTime;
        countDownDate = new Date(countDownDate).getTime();
      }

      const now = new Date().getTime();
      // Find the distance between now and the count down date

      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with class="countdown"
      countdownRemainingDays.innerHTML = days;
      countdownRemainingHours.innerHTML = hours;
      countdownRemainingMinutes.innerHTML = minutes;
      countdownRemainingSeconds.innerHTML = seconds;

      // If the count down is over, write some text
      if (startCountDownDate > nowStartCountDownDate) {
        countdownText.style.display = 'none';
        countdownBeforeText.style.display = 'block';
      } else if (distance < 0) {
        clearInterval(x);
        countdownText.style.display = 'none';
        countdownBeforeText.style.display = 'none';
        countdownAfterText.style.display = 'block';
      } else {
        countdownText.style.display = 'block';
        countdownBeforeText.style.display = 'none';
      }
    }, 1000);
  }

  public adopted() {
    this.coundtownTimer();
  }
}
