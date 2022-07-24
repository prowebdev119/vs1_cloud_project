import '../../lib/global/indexdbstorage.js';
import {SideBarService} from '../../js/sidebar-service';
import { UtilityService } from "../../utility-service";

let sideBarService = new SideBarService();
let utilityService = new UtilityService();

Template.deductionSettings.onCreated(function() {
  const templateObject = Template.instance();
  templateObject.datatablerecords = new ReactiveVar([]);
  templateObject.datatableallowancerecords = new ReactiveVar([]);
  templateObject.tableheaderrecords = new ReactiveVar([]);
  templateObject.countryData = new ReactiveVar();
  templateObject.Ratetypes = new ReactiveVar([]);
  templateObject.imageFileData=new ReactiveVar();
  // templateObject.Accounts = new ReactiveVar([]);   
});

Template.deductionSettings.onRendered(function() {

  const templateObject = Template.instance();
  var splashArrayDeductionList = new Array();

  templateObject.getAllDeductions = function() {
    getVS1Data('TDeduction').then(function(dataObject) {
        // console.log('err-dataObject', dataObject)
        if (dataObject.length == 0) {
          sideBarService.getDeduction(initialBaseDataLoad, 0).then(function (data) {
              addVS1Data('TDeduction', JSON.stringify(data));
              let lineItems = [];
              let lineItemObj = {};
              let deductionTypeVal = 'None';
              for (let i = 0; i < data.tdeduction.length; i++) {
                  let deductionAmount = utilityService.modifynegativeCurrencyFormat(data.tdeduction[i].fields.Amount) || 0.00;
                  if(data.tdeduction[i].fields.Taxexempt == true){
                    deductionTypeVal = 'None';
                  }else{
                    if(data.tdeduction[i].fields.IsWorkPlacegiving == true){
                      deductionTypeVal = 'Workplace Giving';
                    }

                    if(data.tdeduction[i].fields.Unionfees == true){
                      deductionTypeVal = 'Union / Association Fees';
                    }
                  }
                  var dataListDeduction = [
                      data.tdeduction[i].fields.ID || 0,
                      data.tdeduction[i].fields.Description || '-',
                      deductionTypeVal || 'None',
                      data.tdeduction[i].fields.Displayin || '',
                      deductionAmount || 0.00,
                      data.tdeduction[i].fields.Accountname || '',
                      data.tdeduction[i].fields.Accountid || 0,
                      data.tdeduction[i].fields.Payrolltaxexempt || false,
                      data.tdeduction[i].fields.Superinc || false,
                      data.tdeduction[i].fields.Workcoverexempt || false,
                    //   '<td contenteditable="false" class="colDeleteDeductions"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                  ];

                  splashArrayDeductionList.push(dataListDeduction);
              }

              function MakeNegative() {
                  $('td').each(function () {
                      if ($(this).text().indexOf('-' + Currency) >= 0) $(this).addClass('text-danger')
                  });
              };


              setTimeout(function () {
                  MakeNegative();
              }, 100);
              setTimeout(function () {
                  $('#tblDeductions').DataTable({

                      data: splashArrayDeductionList,
                      "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                      columnDefs: [
                          {
                              className: "colDeductionsID hiddenColumn",
                              "targets": [0]
                          },
                          {
                              className: "colDeductionsNames",
                              "targets": [1]
                          },  {
                              className: "colDeductionsType",
                              "targets": [2]
                          }, {
                              className: "colDeductionsDisplayName",
                              "targets": [3]
                          }, {
                              className: "colDeductionsAmount  text-right",
                              "targets": [4]
                          }, {
                              className: "colDeductionsAccounts",
                              "targets": [5]
                          }, {
                              className: "colDeductionsAccountsID hiddenColumn",
                              "targets": [6]
                          }, {
                              className: "colDeductionsPAYG hiddenColumn",
                              "targets": [7]
                          }, {
                              className: "colDeductionsSuperannuation hiddenColumn",
                              "targets": [8]
                          }, {
                              className: "colDeductionsReportableasW1 hiddenColumn",
                              "targets": [9]
                          }, 
                        //   {
                        //       className: "colDeleteDeductions",
                        //       "orderable": false,
                        //       "targets": -1
                        //   }
                      ],
                      select: true,
                      destroy: true,
                      colReorder: true,
                      pageLength: initialDatatableLoad,
                      lengthMenu: [ [initialDatatableLoad, -1], [initialDatatableLoad, "All"] ],
                      info: true,
                      responsive: true,
                      "order": [[0, "asc"]],
                      action: function () {
                          $('#tblDeductions').DataTable().ajax.reload();
                      },
                      "fnDrawCallback": function (oSettings) {
                          $('.paginate_button.page-item').removeClass('disabled');
                          $('#tblDeductions_ellipsis').addClass('disabled');
                          if (oSettings._iDisplayLength == -1) {
                              if (oSettings.fnRecordsDisplay() > 150) {

                              }
                          } else {

                          }
                          if (oSettings.fnRecordsDisplay() < initialDatatableLoad) {
                              $('.paginate_button.page-item.next').addClass('disabled');
                          }

                          $('.paginate_button.next:not(.disabled)', this.api().table().container())
                              .on('click', function () {
                                  $('.fullScreenSpin').css('display', 'inline-block');
                                  var splashArrayDeductionListDupp = new Array();
                                  let dataLenght = oSettings._iDisplayLength;
                                  let customerSearch = $('#tblDeductions_filter input').val();

                                  sideBarService.getDeduction(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (dataObjectnew) {

                                              for (let j = 0; j < dataObjectnew.tdeduction.length; j++) {

                                                  let allowanceAmount = utilityService.modifynegativeCurrencyFormat(dataObjectnew.tdeduction[j].fields.Amount) || 0.00;

                                                  var dataListCustomerDupp = [
                                                    dataObjectnewdataObjectnew.tdeduction[i].fields.ID || 0,
                                                    dataObjectnew.tdeduction[i].fields.Description || '-',
                                                    dataObjectnew.tdeduction[i].fields.DeductionType || '',
                                                    dataObjectnew.tdeduction[i].fields.DisplayIn || '',
                                                    allowanceAmount || 0.00,
                                                    dataObjectnew.tdeduction[i].fields.Accountname || '',
                                                    dataObjectnew.tdeduction[i].fields.Accountid || 0,
                                                    dataObjectnew.tdeduction[i].fields.Payrolltaxexempt || false,
                                                    dataObjectnewdataObjectnew.tdeduction[i].fields.Superinc || false,
                                                    dataObjectnew.tdeduction[i].fields.Workcoverexempt || false,
                                                    // '<td contenteditable="false" class="colDeleteDeductions"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                                  ];

                                                  splashArrayDeductionList.push(dataListCustomerDupp);
                                                  //}
                                              }

                                              let uniqueChars = [...new Set(splashArrayDeductionList)];
                                              var datatable = $('#tblDeductions').DataTable();
                                              datatable.clear();
                                              datatable.rows.add(uniqueChars);
                                              datatable.draw(false);
                                              setTimeout(function () {
                                                $("#tblDeductions").dataTable().fnPageChange('last');
                                              }, 400);

                                              $('.fullScreenSpin').css('display', 'none');


                                  }).catch(function (err) {
                                      $('.fullScreenSpin').css('display', 'none');
                                  });

                              });
                          setTimeout(function () {
                              MakeNegative();
                          }, 100);
                      },
                      "fnInitComplete": function () {
                          $("<button class='btn btn-primary btnAddNewDeduction' data-dismiss='modal' data-toggle='modal'  type='button' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus'></i></button>").insertAfter("#tblDeductions_filter");
                          $("<button class='btn btn-primary btnRefreshDeduction' type='button' id='btnRefreshDeduction' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblDeductions_filter");

                      }

                  }).on('page', function () {
                      setTimeout(function () {
                          MakeNegative();
                      }, 100);

                  }).on('column-reorder', function () {

                  }).on('length.dt', function (e, settings, len) {
                    //$('.fullScreenSpin').css('display', 'inline-block');
                    let dataLenght = settings._iDisplayLength;
                    splashArrayDeductionList = [];
                    if (dataLenght == -1) {
                      $('.fullScreenSpin').css('display', 'none');

                    } else {
                        if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                            $('.fullScreenSpin').css('display', 'none');
                        } else {
                            sideBarService.getDeduction(dataLenght, 0).then(function (dataNonBo) {

                                addVS1Data('TDeduction', JSON.stringify(dataNonBo)).then(function (datareturn) {
                                    templateObject.resetData(dataNonBo);
                                    $('.fullScreenSpin').css('display', 'none');
                                }).catch(function (err) {
                                    $('.fullScreenSpin').css('display', 'none');
                                });
                            }).catch(function (err) {
                                $('.fullScreenSpin').css('display', 'none');
                            });
                        }
                    }
                      setTimeout(function () {
                          MakeNegative();
                      }, 100);
                  });


              }, 0);

              $('div.dataTables_filter input').addClass('form-control form-control-sm');

              $('.fullScreenSpin').css('display', 'none');
          }).catch(function (err) {
            $('.fullScreenSpin').css('display', 'none');
          });
        }else{

          let data = JSON.parse(dataObject[0].data);
          let useData = data;
          let lineItems = [];
          let lineItemObj = {};
          let deductionTypeVal = 'None';
          for (let i = 0; i < data.tdeduction.length; i++) {
              let deductionAmount = utilityService.modifynegativeCurrencyFormat(data.tdeduction[i].fields.Amount) || 0.00;
              if(data.tdeduction[i].fields.Taxexempt == true){
                deductionTypeVal = 'None';
              }else{
                if(data.tdeduction[i].fields.IsWorkPlacegiving == true){
                  deductionTypeVal = 'Workplace Giving';
                }

                if(data.tdeduction[i].fields.Unionfees == true){
                  deductionTypeVal = 'Union / Association Fees';
                }
              }
              var dataListDeduction = [
                  data.tdeduction[i].fields.ID || 0,
                  data.tdeduction[i].fields.Description || '-',
                  deductionTypeVal || 'None',
                  data.tdeduction[i].fields.Displayin || '',
                  deductionAmount || 0.00,
                  data.tdeduction[i].fields.Accountname || '',
                  data.tdeduction[i].fields.Accountid || 0,
                  data.tdeduction[i].fields.Payrolltaxexempt || false,
                  data.tdeduction[i].fields.Superinc || false,
                  data.tdeduction[i].fields.Workcoverexempt || false,
                //   '<td contenteditable="false" class="colDeleteDeductions"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
              ];

              splashArrayDeductionList.push(dataListDeduction);
          }

          function MakeNegative() {
              $('td').each(function () {
                  if ($(this).text().indexOf('-' + Currency) >= 0) $(this).addClass('text-danger')
              });
          };


          setTimeout(function () {
              MakeNegative();
          }, 100);
          setTimeout(function () {
              $('#tblDeductions').DataTable({

                  data: splashArrayDeductionList,
                  "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                  columnDefs: [
                      {
                          className: "colDeductionsID hiddenColumn",
                          "targets": [0]
                      },
                      {
                          className: "colDeductionsNames",
                          "targets": [1]
                      },  {
                          className: "colDeductionsType",
                          "targets": [2]
                      }, {
                          className: "colDeductionsDisplayName",
                          "targets": [3]
                      }, {
                          className: "colDeductionsAmount  text-right",
                          "targets": [4]
                      }, {
                          className: "colDeductionsAccounts",
                          "targets": [5]
                      }, {
                          className: "colDeductionsAccountsID hiddenColumn",
                          "targets": [6]
                      }, {
                          className: "colDeductionsPAYG hiddenColumn",
                          "targets": [7]
                      }, {
                          className: "colDeductionsSuperannuation hiddenColumn",
                          "targets": [8]
                      }, {
                          className: "colDeductionsReportableasW1 hiddenColumn",
                          "targets": [9]
                      }, 
                    //   {
                    //       className: "colDeleteDeductions",
                    //       "orderable": false,
                    //       "targets": -1
                    //   }
                  ],
                  select: true,
                  destroy: true,
                  colReorder: true,
                  pageLength: initialDatatableLoad,
                  lengthMenu: [ [initialDatatableLoad, -1], [initialDatatableLoad, "All"] ],
                  info: true,
                  responsive: true,
                  "order": [[0, "asc"]],
                  action: function () {
                      $('#tblDeductions').DataTable().ajax.reload();
                  },
                  "fnDrawCallback": function (oSettings) {
                      $('.paginate_button.page-item').removeClass('disabled');
                      $('#tblDeductions_ellipsis').addClass('disabled');
                      if (oSettings._iDisplayLength == -1) {
                          if (oSettings.fnRecordsDisplay() > 150) {

                          }
                      } else {

                      }
                      if (oSettings.fnRecordsDisplay() < initialDatatableLoad) {
                          $('.paginate_button.page-item.next').addClass('disabled');
                      }

                      $('.paginate_button.next:not(.disabled)', this.api().table().container())
                          .on('click', function () {
                              $('.fullScreenSpin').css('display', 'inline-block');
                              var splashArrayDeductionListDupp = new Array();
                              let dataLenght = oSettings._iDisplayLength;
                              let customerSearch = $('#tblDeductions_filter input').val();

                              sideBarService.getDeduction(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (dataObjectnew) {

                                          for (let j = 0; j < dataObjectnew.tdeduction.length; j++) {

                                              let allowanceAmount = utilityService.modifynegativeCurrencyFormat(dataObjectnew.tdeduction[j].fields.Amount) || 0.00;

                                              var dataListCustomerDupp = [
                                                dataObjectnewdataObjectnew.tdeduction[i].fields.ID || 0,
                                                dataObjectnew.tdeduction[i].fields.Description || '-',
                                                dataObjectnew.tdeduction[i].fields.DeductionType || '',
                                                dataObjectnew.tdeduction[i].fields.DisplayIn || '',
                                                allowanceAmount || 0.00,
                                                dataObjectnew.tdeduction[i].fields.Accountname || '',
                                                dataObjectnew.tdeduction[i].fields.Accountid || 0,
                                                dataObjectnew.tdeduction[i].fields.Payrolltaxexempt || false,
                                                dataObjectnewdataObjectnew.tdeduction[i].fields.Superinc || false,
                                                dataObjectnew.tdeduction[i].fields.Workcoverexempt || false,
                                                alldata = dataObjectnew.tdeduction[i].fields.Description+','
                                                          +dataObjectnew.tdeduction[i].fields.DeductionType
                                                          +','+dataObjectnew.tdeduction[i].fields.DisplayIn
                                                          +','+allowanceAmount+','
                                                          +dataObjectnew.tdeduction[i].fields.Accountname+','+dataObjectnew.tdeduction[i].fields.Accountid
                                                          +','+dataObjectnew.tdeduction[i].fields.Payrolltaxexempt+
                                                          ','+dataObjectnewdataObjectnew.tdeduction[i].fields.Superinc+','
                                                          +dataObjectnew.tdeduction[i].fields.Workcoverexempt,
                                                // '<td contenteditable="false" class="colDeleteDeductions"><span class="alldataget" style="display:none;">'+alldata+'</span><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                              ];

                                              splashArrayDeductionList.push(dataListCustomerDupp);
                                              //}
                                          }

                                          let uniqueChars = [...new Set(splashArrayDeductionList)];
                                          var datatable = $('#tblDeductions').DataTable();
                                          datatable.clear();
                                          datatable.rows.add(uniqueChars);
                                          datatable.draw(false);
                                          setTimeout(function () {
                                            $("#tblDeductions").dataTable().fnPageChange('last');
                                          }, 400);

                                          $('.fullScreenSpin').css('display', 'none');


                              }).catch(function (err) {
                                  $('.fullScreenSpin').css('display', 'none');
                              });

                          });
                      setTimeout(function () {
                          MakeNegative();
                      }, 100);
                  },
                  "fnInitComplete": function () {
                      $("<button class='btn btn-primary btnAddNewDeduction' data-dismiss='modal' data-toggle='modal'  type='button' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus'></i></button>").insertAfter("#tblDeductions_filter");
                      $("<button class='btn btn-primary btnRefreshDeduction' type='button' id='btnRefreshDeduction' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblDeductions_filter");

                  }

              }).on('page', function () {
                  setTimeout(function () {
                      MakeNegative();
                  }, 100);

              }).on('column-reorder', function () {

              }).on('length.dt', function (e, settings, len) {
                //$('.fullScreenSpin').css('display', 'inline-block');
                let dataLenght = settings._iDisplayLength;
                splashArrayDeductionList = [];
                if (dataLenght == -1) {
                  $('.fullScreenSpin').css('display', 'none');

                } else {
                    if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                        $('.fullScreenSpin').css('display', 'none');
                    } else {
                        sideBarService.getDeduction(dataLenght, 0).then(function (dataNonBo) {

                            addVS1Data('TDeduction', JSON.stringify(dataNonBo)).then(function (datareturn) {
                                templateObject.resetData(dataNonBo);
                                $('.fullScreenSpin').css('display', 'none');
                            }).catch(function (err) {
                                $('.fullScreenSpin').css('display', 'none');
                            });
                        }).catch(function (err) {
                            $('.fullScreenSpin').css('display', 'none');
                        });
                    }
                }
                  setTimeout(function () {
                      MakeNegative();
                  }, 100);
              });


          }, 0);

          $('div.dataTables_filter input').addClass('form-control form-control-sm');
          $('.fullScreenSpin').css('display', 'none');

        }
    }).catch(function(err) {
        // console.log('err-Deduction', err)
      sideBarService.getDeduction(initialBaseDataLoad, 0).then(function (data) {
          addVS1Data('TDeduction', JSON.stringify(data));
          let lineItems = [];
          let lineItemObj = {};
          let deductionTypeVal = 'None';
          for (let i = 0; i < data.tdeduction.length; i++) {
              let deductionAmount = utilityService.modifynegativeCurrencyFormat(data.tdeduction[i].fields.Amount) || 0.00;
              if(data.tdeduction[i].fields.Taxexempt == true){
                deductionTypeVal = 'None';
              }else{
                if(data.tdeduction[i].fields.IsWorkPlacegiving == true){
                  deductionTypeVal = 'Workplace Giving';
                }

                if(data.tdeduction[i].fields.Unionfees == true){
                  deductionTypeVal = 'Union / Association Fees';
                }
              }
              var dataListDeduction = [
                  data.tdeduction[i].fields.ID || 0,
                  data.tdeduction[i].fields.Description || '-',
                  deductionTypeVal || 'None',
                  data.tdeduction[i].fields.Displayin || '',
                  deductionAmount || 0.00,
                  data.tdeduction[i].fields.Accountname || '',
                  data.tdeduction[i].fields.Accountid || 0,
                  data.tdeduction[i].fields.Payrolltaxexempt || false,
                  data.tdeduction[i].fields.Superinc || false,
                  data.tdeduction[i].fields.Workcoverexempt || false,
                //   '<td contenteditable="false" class="colDeleteDeductions"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
              ];

              splashArrayDeductionList.push(dataListDeduction);
          }

          function MakeNegative() {
              $('td').each(function () {
                  if ($(this).text().indexOf('-' + Currency) >= 0) $(this).addClass('text-danger')
              });
          };


          setTimeout(function () {
              MakeNegative();
          }, 100);
          setTimeout(function () {
              $('#tblDeductions').DataTable({

                  data: splashArrayDeductionList,
                  "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                  columnDefs: [
                      {
                          className: "colDeductionsID hiddenColumn",
                          "targets": [0]
                      },
                      {
                          className: "colDeductionsNames",
                          "targets": [1]
                      },  {
                          className: "colDeductionsType",
                          "targets": [2]
                      }, {
                          className: "colDeductionsDisplayName",
                          "targets": [3]
                      }, {
                          className: "colDeductionsAmount  text-right",
                          "targets": [4]
                      }, {
                          className: "colDeductionsAccounts",
                          "targets": [5]
                      }, {
                          className: "colDeductionsAccountsID hiddenColumn",
                          "targets": [6]
                      }, {
                          className: "colDeductionsPAYG hiddenColumn",
                          "targets": [7]
                      }, {
                          className: "colDeductionsSuperannuation hiddenColumn",
                          "targets": [8]
                      }, {
                          className: "colDeductionsReportableasW1 hiddenColumn",
                          "targets": [9]
                      }, 
                    //   {
                    //       className: "colDeleteDeductions",
                    //       "orderable": false,
                    //       "targets": -1
                    //   }
                  ],
                  select: true,
                  destroy: true,
                  colReorder: true,
                  pageLength: initialDatatableLoad,
                  lengthMenu: [ [initialDatatableLoad, -1], [initialDatatableLoad, "All"] ],
                  info: true,
                  responsive: true,
                  "order": [[0, "asc"]],
                  action: function () {
                      $('#tblDeductions').DataTable().ajax.reload();
                  },
                  "fnDrawCallback": function (oSettings) {
                      $('.paginate_button.page-item').removeClass('disabled');
                      $('#tblDeductions_ellipsis').addClass('disabled');
                      if (oSettings._iDisplayLength == -1) {
                          if (oSettings.fnRecordsDisplay() > 150) {

                          }
                      } else {

                      }
                      if (oSettings.fnRecordsDisplay() < initialDatatableLoad) {
                          $('.paginate_button.page-item.next').addClass('disabled');
                      }

                      $('.paginate_button.next:not(.disabled)', this.api().table().container())
                          .on('click', function () {
                              $('.fullScreenSpin').css('display', 'inline-block');
                              var splashArrayDeductionListDupp = new Array();
                              let dataLenght = oSettings._iDisplayLength;
                              let customerSearch = $('#tblDeductions_filter input').val();

                              sideBarService.getDeduction(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (dataObjectnew) {

                                          for (let j = 0; j < dataObjectnew.tdeduction.length; j++) {

                                              let allowanceAmount = utilityService.modifynegativeCurrencyFormat(dataObjectnew.tdeduction[j].fields.Amount) || 0.00;

                                              var dataListCustomerDupp = [
                                                dataObjectnewdataObjectnew.tdeduction[i].fields.ID || 0,
                                                dataObjectnew.tdeduction[i].fields.Description || '-',
                                                dataObjectnew.tdeduction[i].fields.DeductionType || '',
                                                dataObjectnew.tdeduction[i].fields.DisplayIn || '',
                                                allowanceAmount || 0.00,
                                                dataObjectnew.tdeduction[i].fields.Accountname || '',
                                                dataObjectnew.tdeduction[i].fields.Accountid || 0,
                                                dataObjectnew.tdeduction[i].fields.Payrolltaxexempt || false,
                                                dataObjectnewdataObjectnew.tdeduction[i].fields.Superinc || false,
                                                dataObjectnew.tdeduction[i].fields.Workcoverexempt || false,
                                                // '<td contenteditable="false" class="colDeleteDeductions"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                              ];

                                              splashArrayDeductionList.push(dataListCustomerDupp);
                                              //}
                                          }

                                          let uniqueChars = [...new Set(splashArrayDeductionList)];
                                          var datatable = $('#tblDeductions').DataTable();
                                          datatable.clear();
                                          datatable.rows.add(uniqueChars);
                                          datatable.draw(false);
                                          setTimeout(function () {
                                            $("#tblDeductions").dataTable().fnPageChange('last');
                                          }, 400);

                                          $('.fullScreenSpin').css('display', 'none');


                              }).catch(function (err) {
                                  $('.fullScreenSpin').css('display', 'none');
                              });

                          });
                      setTimeout(function () {
                          MakeNegative();
                      }, 100);
                  },
                  "fnInitComplete": function () {
                      $("<button class='btn btn-primary btnAddNewDeduction' data-dismiss='modal' data-toggle='modal' type='button' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus'></i></button>").insertAfter("#tblDeductions_filter");
                      $("<button class='btn btn-primary btnRefreshDeduction' type='button' id='btnRefreshDeduction' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblDeductions_filter");

                  }

              }).on('page', function () {
                  setTimeout(function () {
                      MakeNegative();
                  }, 100);

              }).on('column-reorder', function () {

              }).on('length.dt', function (e, settings, len) {
                //$('.fullScreenSpin').css('display', 'inline-block');
                let dataLenght = settings._iDisplayLength;
                splashArrayDeductionList = [];
                if (dataLenght == -1) {
                  $('.fullScreenSpin').css('display', 'none');

                } else {
                    if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                        $('.fullScreenSpin').css('display', 'none');
                    } else {
                        sideBarService.getDeduction(dataLenght, 0).then(function (dataNonBo) {

                            addVS1Data('TDeduction', JSON.stringify(dataNonBo)).then(function (datareturn) {
                                templateObject.resetData(dataNonBo);
                                $('.fullScreenSpin').css('display', 'none');
                            }).catch(function (err) {
                                $('.fullScreenSpin').css('display', 'none');
                            });
                        }).catch(function (err) {
                            $('.fullScreenSpin').css('display', 'none');
                        });
                    }
                }
                  setTimeout(function () {
                      MakeNegative();
                  }, 100);
              });


          }, 0);

          $('div.dataTables_filter input').addClass('form-control form-control-sm');

          $('.fullScreenSpin').css('display', 'none');
      }).catch(function (err) {
        $('.fullScreenSpin').css('display', 'none');
      });
    });
    };
    templateObject.getAllDeductions();

})