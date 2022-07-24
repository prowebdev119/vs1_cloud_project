

/**
 * 
 * 
 * @type {{transactionType: string, reportNames: Array, frequency: FxFrequency, send: string, recipients: string}}
 */
export default class FxUpdateSetting {
  constructor({ transactionType, reportNames, frequency, send, recipients }) {
    this.transactionType = transactionType;
    this.reportNames = reportNames;
    this.frequency = frequency;
    this.send = send;
    this.recipients = recipients;
  }
}


export class FxFrequency {
    constructor({
        type, 
        rythm
    }) {

        this.type = type;
        this.rythm = rythm;
    }
}