import FxUpdateSetting from "./FxUpdateSetting";


export default class FxUpdater {
    constructor() {



        console.log("Fxupdater initiated");
    }



    buildObject(event) {
        console.log(event);
        let jsonData = [];

        const groupedReports = $('#tblEssentialAutomatedEmails').find(".grouped-reports");
        const statements = $('#tblEssentialAutomatedEmails').find(".statements");
        const  profitAndLoss = $('#tblEssentialAutomatedEmails').find(". profit-and-loss");
        const invoices = $('#tblEssentialAutomatedEmails').find(".invoices");
      
        if(invoices) {
            // jsonData.push(FxUpdateSetting({
            //     transactionType: 
            // }));
        }

        console.log(groupedReports);
    }



    async send() {

    } 
}