import '../../lib/global/indexdbstorage.js';
import {SideBarService} from '../../js/sidebar-service';
import { UtilityService } from "../../utility-service";

let sideBarService = new SideBarService();
let utilityService = new UtilityService();

Template.superannuationSettings.onCreated(function() {
  const templateObject = Template.instance();
  templateObject.datatablerecords = new ReactiveVar([]);
  templateObject.datatableallowancerecords = new ReactiveVar([]);
  templateObject.tableheaderrecords = new ReactiveVar([]);
  templateObject.countryData = new ReactiveVar();
  templateObject.Ratetypes = new ReactiveVar([]);
  templateObject.imageFileData=new ReactiveVar();
  // templateObject.Accounts = new ReactiveVar([]);   
});

Template.superannuationSettings.onRendered(function() {

  const templateObject = Template.instance();
  var splashArraySuperannuationList = new Array();

  function MakeNegative() {
    $('td').each(function() {
        if ($(this).text().indexOf('-' + Currency) >= 0) $(this).addClass('text-danger')
    });
  };

  templateObject.getSuperannuationData = function(){
       
    getVS1Data('TSuperannuation').then(function(dataObject) {
        if (dataObject.length == 0) {
             sideBarService.getSuperannuation(initialBaseDataLoad, 0).then(function (data) {
              addVS1Data('TSuperannuation', JSON.stringify(data));
              let lineItems = [];
              let lineItemObj = {};
            
              for (let i = 0; i < data.tsuperannuation.length; i++) {
                
                  var dataListAllowance = [
                      data.tsuperannuation[i].fields.ID || '',
                      data.tsuperannuation[i].fields.Superfund || '',
                      data.tsuperannuation[i].fields.Supertypeid || '',
                      data.tsuperannuation[i].fields.Employeeid || '',
                      'Key Missing',
                      'Key Missing',
                      'Key Missing',
                      data.tsuperannuation[i].fields.Accountno || '',
                      'Key Missing',
                    //   '<td contenteditable="false" class="colDeletesup"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                  ];

                  splashArraySuperannuationList.push(dataListAllowance);
              }

        


              setTimeout(function () {
                  MakeNegative();
              }, 100);
              setTimeout(function () {
                  $('#tblSuperannuation').DataTable({

                      data: splashArraySuperannuationList,
                      "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                      columnDefs: [                              
                        
                           {
                             className: "colSuperannuationID hiddenColumn",
                             "targets": [0]
                           },
                           {
                              className: "colSuperannuationName",
                              "targets": [1]
                           },  
                           {
                              className: "colSuperannuationType",
                              "targets": [2]
                           },  
                           {
                            className: "colEmployerNum",
                            "targets": [3]
                           },  
                           {
                            className: "colabn",
                            "targets": [4]
                           },  
                           {
                            className: "colservicealias",
                            "targets": [5]
                           },  
                           {
                            className: "colbsb",
                            "targets": [6]
                           },  
                           {
                            className: "colaccountnumber",
                            "targets": [7]
                           },  
                           {
                            className: "colaccountname",
                            "targets": [8]
                           },  
                                               
                        //    {
                        //       className: "colDeletesup",
                        //       "orderable": false,
                        //       "targets": -1
                        //    }
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
                          $('#tblSuperannuation').DataTable().ajax.reload();
                      },
                      "fnDrawCallback": function (oSettings) {
                          $('.paginate_button.page-item').removeClass('disabled');
                          $('#tblSuperannuation_ellipsis').addClass('disabled');
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
                                  var splashArraySuperannuationListDupp = new Array();
                                  let dataLenght = oSettings._iDisplayLength;
                                  let customerSearch = $('#tblSuperannuation_filter input').val();

                                  sideBarService.getSuperannuation(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (data) {

                                    for (let i = 0; i < data.tsuperannuation.length; i++) {
                
                                        var dataListAllowance = [
                                            data.tsuperannuation[i].fields.ID || '',
                                            data.tsuperannuation[i].fields.Superfund || '',
                                            data.tsuperannuation[i].fields.Supertypeid || '',
                                            data.tsuperannuation[i].fields.Employeeid || '',
                                            'Key Missing',
                                            'Key Missing',
                                            'Key Missing',
                                            data.tsuperannuation[i].fields.Accountno || '',
                                            'Key Missing',
                                            // '<td contenteditable="false" class="colDeletesup"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                        ];
                      
                                        splashArraySuperannuationList.push(dataListAllowance);
                                    }

                                              let uniqueChars = [...new Set(splashArraySuperannuationList)];
                                              var datatable = $('#tblSuperannuation').DataTable();
                                              datatable.clear();
                                              datatable.rows.add(uniqueChars);
                                              datatable.draw(false);
                                              setTimeout(function () {
                                                $("#tblSuperannuation").dataTable().fnPageChange('last');
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
                    splashArraySuperannuationList = [];
                    if (dataLenght == -1) {
                      $('.fullScreenSpin').css('display', 'none');

                    } else {
                        if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                            $('.fullScreenSpin').css('display', 'none');
                        } else {
                            sideBarService.getSuperannuation(dataLenght, 0).then(function (dataNonBo) {

                                addVS1Data('TSuperannuation', JSON.stringify(dataNonBo)).then(function (datareturn) {
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

          for (let i = 0; i < data.tsuperannuation.length; i++) {
                
            
            var dataListAllowance = [
                data.tsuperannuation[i].fields.ID || '',
                data.tsuperannuation[i].fields.Superfund || '',
                data.tsuperannuation[i].fields.Supertypeid || '',
                data.tsuperannuation[i].fields.Employeeid || '',
                'Key Missing',
                'Key Missing',
                'Key Missing',
                data.tsuperannuation[i].fields.Accountno || '',
                'Key Missing',
                // '<td contenteditable="false" class="colDeletesup"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
            ];

            splashArraySuperannuationList.push(dataListAllowance);
        }
    


          setTimeout(function () {
              MakeNegative();
          }, 100);
          setTimeout(function () {
              $('#tblSuperannuation').DataTable({

                  data: splashArraySuperannuationList,
                  "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                  columnDefs: [                              
                        
                    {
                      className: "colSuperannuationID hiddenColumn",
                      "targets": [0]
                    },
                    {
                       className: "colSuperannuationName",
                       "targets": [1]
                    },  
                    {
                       className: "colSuperannuationType",
                       "targets": [2]
                    },  
                    {
                     className: "colEmployerNum",
                     "targets": [3]
                    },  
                    {
                     className: "colabn",
                     "targets": [4]
                    },  
                    {
                     className: "colservicealias",
                     "targets": [5]
                    },  
                    {
                     className: "colbsb",
                     "targets": [6]
                    },  
                    {
                     className: "colaccountnumber",
                     "targets": [7]
                    },  
                    {
                     className: "colaccountname",
                     "targets": [8]
                    },  
                                        
                    // {
                    //    className: "colDeletesup",
                    //    "orderable": false,
                    //    "targets": -1
                    // }
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
                      $('#tblSuperannuation').DataTable().ajax.reload();
                  },
                  "fnDrawCallback": function (oSettings) {
                      $('.paginate_button.page-item').removeClass('disabled');
                      $('#tblSuperannuation_ellipsis').addClass('disabled');
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
                              var splashArraySuperannuationListDupp = new Array();
                              let dataLenght = oSettings._iDisplayLength;
                              let customerSearch = $('#splashArraySuperannuationList_filter input').val();

                              sideBarService.getSuperannuation(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (data) {

                                 for (let i = 0; i < data.tsuperannuation.length; i++) {
                
                                    var dataListAllowance = [
                                        data.tsuperannuation[i].fields.ID || '',
                                        data.tsuperannuation[i].fields.Superfund || '',
                                        data.tsuperannuation[i].fields.Supertypeid || '',
                                        data.tsuperannuation[i].fields.Employeeid || '',
                                        'Key Missing',
                                        'Key Missing',
                                        'Key Missing',
                                        data.tsuperannuation[i].fields.Accountno || '',
                                        'Key Missing',
                                        // '<td contenteditable="false" class="colDeletesup"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                    ];
                    
                                    splashArraySuperannuationList.push(dataListAllowance);
                                  }
                                          let uniqueChars = [...new Set(splashArraySuperannuationList)];
                                          var datatable = $('#tblSuperannuation').DataTable();
                                          datatable.clear();
                                          datatable.rows.add(uniqueChars);
                                          datatable.draw(false);
                                          setTimeout(function () {
                                            $("#tblSuperannuation").dataTable().fnPageChange('last');
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
                splashArraySuperannuationList = [];
                if (dataLenght == -1) {
                  $('.fullScreenSpin').css('display', 'none');

                } else {
                    if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                        $('.fullScreenSpin').css('display', 'none');
                    } else {
                        sideBarService.getSuperannuation(dataLenght, 0).then(function (dataNonBo) {

                            addVS1Data('TSuperannuation', JSON.stringify(dataNonBo)).then(function (datareturn) {
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
      sideBarService.getSuperannuation(initialBaseDataLoad, 0).then(function (data) {
          addVS1Data('TSuperannuation', JSON.stringify(data));
          let lineItems = [];
          let lineItemObj = {};
          for (let i = 0; i < data.tsuperannuation.length; i++) {
                
            var dataListAllowance = [
                data.tsuperannuation[i].fields.ID || '',
                data.tsuperannuation[i].fields.Superfund || '',
                data.tsuperannuation[i].fields.Supertypeid || '',
                data.tsuperannuation[i].fields.Employeeid || '',
                'Key Missing',
                'Key Missing',
                'Key Missing',
                data.tsuperannuation[i].fields.Accountno || '',
                'Key Missing',
                // '<td contenteditable="false" class="colDeletesup"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
            ];

            splashArraySuperannuationList.push(dataListAllowance);
          }
  

          setTimeout(function () {
              MakeNegative();
          }, 100);
          setTimeout(function () {
              $('#tblSuperannuation').DataTable({

                  data: splashArraySuperannuationList,
                  "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
                  columnDefs: [                              
                        
                    {
                      className: "colSuperannuationID hiddenColumn",
                      "targets": [0]
                    },
                    {
                       className: "colSuperannuationName",
                       "targets": [1]
                    },  
                    {
                       className: "colSuperannuationType",
                       "targets": [2]
                    },  
                    {
                     className: "colEmployerNum",
                     "targets": [3]
                    },  
                    {
                     className: "colabn",
                     "targets": [4]
                    },  
                    {
                     className: "colservicealias",
                     "targets": [5]
                    },  
                    {
                     className: "colbsb",
                     "targets": [6]
                    },  
                    {
                     className: "colaccountnumber",
                     "targets": [7]
                    },  
                    {
                     className: "colaccountname",
                     "targets": [8]
                    },  
                                        
                    // {
                    //    className: "colDeletesup",
                    //    "orderable": false,
                    //    "targets": -1
                    // }
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
                      $('#tblSuperannuation').DataTable().ajax.reload();
                  },
                  "fnDrawCallback": function (oSettings) {
                      $('.paginate_button.page-item').removeClass('disabled');
                      $('#tblSuperannuation_ellipsis').addClass('disabled');
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
                              var splashArraySuperannuationListDupp = new Array();
                              let dataLenght = oSettings._iDisplayLength;
                              let customerSearch = $('#tblLeave_filter input').val();

                              sideBarService.getSuperannuation(initialDatatableLoad, oSettings.fnRecordsDisplay()).then(function (data) {

                                for (let i = 0; i < data.tsuperannuation.length; i++) {
                
                                    var dataListAllowance = [
                                        data.tsuperannuation[i].fields.ID || '',
                                        data.tsuperannuation[i].fields.Superfund || '',
                                        data.tsuperannuation[i].fields.Supertypeid || '',
                                        data.tsuperannuation[i].fields.Employeeid || '',
                                        'Key Missing',
                                        'Key Missing',
                                        'Key Missing',
                                        data.tsuperannuation[i].fields.Accountno || '',
                                        'Key Missing',
                                        // '<td contenteditable="false" class="colDeletesup"><span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0"><i class="fa fa-remove"></i></button></span>'
                                    ];
                    
                                    splashArraySuperannuationList.push(dataListAllowance);
                                  }

                                     let uniqueChars = [...new Set(splashArraySuperannuationList)];
                                     var datatable = $('#tblSuperannuation').DataTable();
                                          datatable.clear();
                                          datatable.rows.add(uniqueChars);
                                          datatable.draw(false);
                                          setTimeout(function () {
                                            $("#tblSuperannuation").dataTable().fnPageChange('last');
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
                splashArraySuperannuationList = [];
                if (dataLenght == -1) {
                  $('.fullScreenSpin').css('display', 'none');

                } else {
                    if (settings.fnRecordsDisplay() >= settings._iDisplayLength) {
                        $('.fullScreenSpin').css('display', 'none');
                    } else {
                        sideBarService.getSuperannuation(dataLenght, 0).then(function (dataNonBo) {

                            addVS1Data('TSuperannuation', JSON.stringify(dataNonBo)).then(function (datareturn) {
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

templateObject.getSuperannuationData();

})