Template.leaveTypeSettings.onCreated(function() {
    const templateObject = Template.instance();
    templateObject.datatablerecords = new ReactiveVar([]);
    templateObject.datatableallowancerecords = new ReactiveVar([]);
    templateObject.tableheaderrecords = new ReactiveVar([]);
    templateObject.countryData = new ReactiveVar();
    templateObject.Ratetypes = new ReactiveVar([]);
    templateObject.imageFileData=new ReactiveVar();
   // templateObject.Accounts = new ReactiveVar([]);   
});

Template.leaveTypeSettings.onRendered(function() {

})