import '../../lib/global/indexdbstorage.js';
import {SideBarService} from '../../js/sidebar-service';
import { UtilityService } from "../../utility-service";

let sideBarService = new SideBarService();
let utilityService = new UtilityService();

Template.reimbursementSettings.onCreated(function() {
  const templateObject = Template.instance();
  templateObject.datatablerecords = new ReactiveVar([]);
  templateObject.datatableallowancerecords = new ReactiveVar([]);
  templateObject.tableheaderrecords = new ReactiveVar([]);
  templateObject.countryData = new ReactiveVar();
  templateObject.Ratetypes = new ReactiveVar([]);
  templateObject.imageFileData=new ReactiveVar();
  // templateObject.Accounts = new ReactiveVar([]);   
});

Template.reimbursementSettings.onRendered(function() {

  const templateObject = Template.instance();
  var splashArrayReisument = new Array();
  
  function MakeNegative() {
    $('td').each(function() {
        if ($(this).text().indexOf('-' + Currency) >= 0) $(this).addClass('text-danger')
    });
  };

  templateObject.getReimbursement = function(){
 
    getVS1Data('TReimbursement').then(function(dataObject) {
        if (dataObject.length == 0) {
             sideBarService.getCalender(initialBaseDataLoad, 0).then(function (data) {
              addVS1Data('TReimbursement', JSON.stringify(data));
              let lineItems = [];
              let lineItemObj = {};
              for (let i = 0; i < data.treimbursement.length; i++) {
                
                  var dataListAllowance = [
                      data.treimbursement[i].fields.ID || '',
                      data.treimbursement[i].fields.ReimbursementName || 0,
                      data.treimbursement[i].fields.ReimbursementAccount || 0,
                     '<td contenteditable="false" class="colDeleterei"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                  ];

                  splashArrayReisument.push(dataListAllowance);
              }

        


              setTimeout(function () {
                  MakeNegative();
              }, 100);
              setTimeout(function () {
                  $('#tblReimbursements').DataTable({

                      data: splashArrayCalenderList,
                      "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                      columnDefs: [                              
                        
                        {
                             className: "colReimbursementID hiddenColumn",
                             "targets": [0]
                           },
                           {
                              className: "colReimbursementName",
                              "targets": [1]
                           },  
                           {
                              className: "colReimbursementAccount",
                              "targets": [2]
                           },                        
                           {
                              className: "colDeleterei",
                              "orderable": false,
                              "targets": -1
                           }
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
                          $('#tblReimbursements').DataTable().ajax.reload();
                      },
                      "fnDrawCallback": function (oSettings) {
                          $('.paginate_button.page-item').removeClass('disabled');
                          $('#tblReimbursements_ellipsis').addClass('disabled');
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
                                  var splashArrayReisumentDupp = new Array();
                                  let dataLenght = oSettings._iDisplayLength;
                                  let customerSearch = $('#tblReimbursements_filter input').val();

                                  sideBarService.getReimbursement(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (data) {

                                    for (let i = 0; i < data.treimbursement.length; i++) {
                
                                        var dataListAllowance = [
                                            data.treimbursement[i].fields.ID || '',
                                            data.treimbursement[i].fields.ReimbursementName || 0,
                                            data.treimbursement[i].fields.ReimbursementAccount || 0,
                                           '<td contenteditable="false" class="colDeleterei"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                        ];
                      
                                        splashArrayReisument.push(dataListAllowance);
                                    }

                                              let uniqueChars = [...new Set(splashArrayReisument)];
                                              var datatable = $('#tblReimbursements').DataTable();
                                              datatable.clear();
                                              datatable.rows.add(uniqueChars);
                                              datatable.draw(false);
                                              setTimeout(function () {
                                                $("#tblReimbursements").dataTable().fnPageChange('last');
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
                        //   $("<button class='btn btn-primary btnAddNewAllowance' data-dismiss='modal' data-toggle='modal' data-target='#newPayCalendarModal' type='button' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus'></i></button>").insertAfter("#tblPayCalendars_filter");
                        //   $("<button class='btn btn-primary btnRefreshAllowance' type='button' id='btnRefreshAllowance' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#ttblPayCalendars_filter");

                      }

                  }).on('page', function () {
                      setTimeout(function () {
                          MakeNegative();
                      }, 100);

                  }).on('column-reorder', function () {

                  }).on('length.dt', function (e, settings, len) {
                    //$('.fullScreenSpin').css('display', 'inline-block');
                    let dataLenght = settings._iDisplayLength;
                    splashArrayReisument = [];
                    if (dataLenght == -1) {
                      $('.fullScreenSpin').css('display', 'none');

                    } else {
                        if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                            $('.fullScreenSpin').css('display', 'none');
                        } else {
                            sideBarService.getReimbursement(dataLenght, 0).then(function (dataNonBo) {

                                addVS1Data('tblReimbursements', JSON.stringify(dataNonBo)).then(function (datareturn) {
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
          for (let i = 0; i < data.treimbursement.length; i++) {
                
            var dataListAllowance = [
                data.treimbursement[i].fields.ID || '',
                data.treimbursement[i].fields.ReimbursementName || 0,
                data.treimbursement[i].fields.ReimbursementAccount || 0,
               '<td contenteditable="false" class="colDeleterei"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
            ];

            splashArrayReisument.push(dataListAllowance);
        }
    


          setTimeout(function () {
              MakeNegative();
          }, 100);
          setTimeout(function () {
              $('#tblReimbursements').DataTable({

                  data: splashArrayReisument,
                  "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                  columnDefs: [                              
                        
                    {
                         className: "colReimbursementID hiddenColumn",
                         "targets": [0]
                       },
                       {
                          className: "colReimbursementName",
                          "targets": [1]
                       },  
                       {
                          className: "colReimbursementAccount",
                          "targets": [2]
                       },                        
                       {
                          className: "colDeleterei",
                          "orderable": false,
                          "targets": -1
                       }
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
                      $('#tblReimbursements').DataTable().ajax.reload();
                  },
                  "fnDrawCallback": function (oSettings) {
                      $('.paginate_button.page-item').removeClass('disabled');
                      $('#tblReimbursements_ellipsis').addClass('disabled');
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
                              var splashArrayReisumentDuppDupp = new Array();
                              let dataLenght = oSettings._iDisplayLength;
                              let customerSearch = $('#tblReimbursements_filter input').val();

                              sideBarService.getReimbursement(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (data) {

                                for (let i = 0; i < data.treimbursement.length; i++) {
                
                                    var dataListAllowance = [
                                        data.treimbursement[i].fields.ID || '',
                                        data.treimbursement[i].fields.ReimbursementName || 0,
                                        data.treimbursement[i].fields.ReimbursementAccount || 0,
                                       '<td contenteditable="false" class="colDeleterei"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                    ];
                    
                                    splashArrayReisument.push(dataListAllowance);
                                  }

                                          let uniqueChars = [...new Set(splashArrayReisument)];
                                          var datatable = $('#tblReimbursements').DataTable();
                                          datatable.clear();
                                          datatable.rows.add(uniqueChars);
                                          datatable.draw(false);
                                          setTimeout(function () {
                                            $("#tblReimbursements").dataTable().fnPageChange('last');
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
                      $("<button class='btn btn-primary btnAddNewAllowance' data-dismiss='modal' data-toggle='modal' data-target='#newPayCalendarModal' type='button' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus'></i></button>").insertAfter("#tblAlowances_filter");
                      $("<button class='btn btn-primary btnRefreshAllowance' type='button' id='btnRefreshAllowance' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblAlowances_filter");

                  }

              }).on('page', function () {
                  setTimeout(function () {
                      MakeNegative();
                  }, 100);

              }).on('column-reorder', function () {

              }).on('length.dt', function (e, settings, len) {
                //$('.fullScreenSpin').css('display', 'inline-block');
                let dataLenght = settings._iDisplayLength;
                splashArrayCalenderList = [];
                if (dataLenght == -1) {
                  $('.fullScreenSpin').css('display', 'none');

                } else {
                    if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                        $('.fullScreenSpin').css('display', 'none');
                    } else {
                        sideBarService.getReimbursement(dataLenght, 0).then(function (dataNonBo) {

                            addVS1Data('TReimbursement', JSON.stringify(dataNonBo)).then(function (datareturn) {
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
      sideBarService.getReimbursement(initialBaseDataLoad, 0).then(function (data) {
          addVS1Data('TReimbursement', JSON.stringify(data));
          let lineItems = [];
          let lineItemObj = {};
          for (let i = 0; i < data.treimbursement.length; i++) {
                
            var dataListAllowance = [
                data.treimbursement[i].fields.ID || '',
                data.treimbursement[i].fields.ReimbursementName || 0,
                data.treimbursement[i].fields.ReimbursementAccount || 0,
               '<td contenteditable="false" class="colDeleterei"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
            ];

            splashArrayReisument.push(dataListAllowance);
        }
  

          setTimeout(function () {
              MakeNegative();
          }, 100);
          setTimeout(function () {
              $('#tblReimbursements').DataTable({

                  data: splashArrayReisument,
                  "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                  columnDefs: [                              
                        
                    {
                         className: "colReimbursementID hiddenColumn",
                         "targets": [0]
                       },
                       {
                          className: "colReimbursementName",
                          "targets": [1]
                       },  
                       {
                          className: "colReimbursementAccount",
                          "targets": [2]
                       },                        
                       {
                          className: "colDeleterei",
                          "orderable": false,
                          "targets": -1
                       }
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
                      $('#tblReimbursements').DataTable().ajax.reload();
                  },
                  "fnDrawCallback": function (oSettings) {
                      $('.paginate_button.page-item').removeClass('disabled');
                      $('#tblReimbursements_ellipsis').addClass('disabled');
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
                              var splashArrayReisumentDupp = new Array();
                              let dataLenght = oSettings._iDisplayLength;
                              let customerSearch = $('#tblReimbursements_filter input').val();

                              sideBarService.getReimbursement(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (data) {

                                for (let i = 0; i < data.treimbursement.length; i++) {
                
                                    var dataListAllowance = [
                                        data.treimbursement[i].fields.ID || '',
                                        data.treimbursement[i].fields.ReimbursementName || 0,
                                        data.treimbursement[i].fields.ReimbursementAccount || 0,
                                       '<td contenteditable="false" class="colDeleterei"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                    ];
                    
                                    splashArrayReisument.push(dataListAllowance);
                                }

                                     let uniqueChars = [...new Set(splashArrayReisument)];
                                     var datatable = $('#tblReimbursements').DataTable();
                                          datatable.clear();
                                          datatable.rows.add(uniqueChars);
                                          datatable.draw(false);
                                          setTimeout(function () {
                                            $("#tblReimbursements").dataTable().fnPageChange('last');
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
                    //   $("<button class='btn btn-primary btnAddNewAllowance' data-dismiss='modal' data-toggle='modal' data-target='#newPayCalendarModal' type='button' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus'></i></button>").insertAfter("#tblAlowances_filter");
                    //   $("<button class='btn btn-primary btnRefreshAllowance' type='button' id='btnRefreshAllowance' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblAlowances_filter");

                  }

              }).on('page', function () {
                  setTimeout(function () {
                      MakeNegative();
                  }, 100);

              }).on('column-reorder', function () {

              }).on('length.dt', function (e, settings, len) {
                //$('.fullScreenSpin').css('display', 'inline-block');
                let dataLenght = settings._iDisplayLength;
                splashArrayReisument = [];
                if (dataLenght == -1) {
                  $('.fullScreenSpin').css('display', 'none');

                } else {
                    if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                        $('.fullScreenSpin').css('display', 'none');
                    } else {
                        sideBarService.getReimbursement(dataLenght, 0).then(function (dataNonBo) {

                            addVS1Data('TReimbursement', JSON.stringify(dataNonBo)).then(function (datareturn) {
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
templateObject.getReimbursement();

})