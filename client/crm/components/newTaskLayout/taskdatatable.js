import {
    CRMService
} from '../../crm-service';
let crmService = new CRMService();

Template.taskdatatable.onCreated(function() {

});

Template.taskdatatable.onRendered(function() {
    setTimeout(function() {
        $('#tblNewProjectsDatatable').DataTable({
            "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            buttons: [{
                extend: 'excelHtml5',
                text: '',
                download: 'open',
                className: "btntabletocsv hiddenColumn",
                filename: "Project List" + moment().format(),
                orientation: 'portrait',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column) {
                            if (data.includes("</span>")) {
                                var res = data.split("</span>");
                                data = res[1];
                            }

                            return column === 1 ? data.replace(/<.*?>/ig, "") : data;

                        }
                    }
                }
            }, {
                extend: 'print',
                download: 'open',
                className: "btntabletopdf hiddenColumn",
                text: '',
                title: 'Project List',
                filename: "Project List" + moment().format(),
                exportOptions: {
                    columns: ':visible',
                    stripHtml: false
                }
            }],
            select: true,
            destroy: true,
            colReorder: true,
            pageLength: initialDatatableLoad,
            lengthMenu: [
                [initialDatatableLoad, -1],
                [initialDatatableLoad, "All"]
            ],
            info: true,
            responsive: true,
            "order": [
                [1, "desc"]
            ],
            action: function() {
                $('#tblProjectsDatatable').DataTable().ajax.reload();
            },
            "fnInitComplete": function() {
                $("<button class='btn btn-primary btnRefreshTableProjects' type='button' id='btnRefreshTableProjects' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblNewProjectsDatatable_filter");
            }
        });
        $('.fullScreenSpin').css('display', 'none');
    }, 0);

    setTimeout(function() {
        $('#tblTaskListDatatable').DataTable({
            columnDefs: [{
                    "orderable": false,
                    "targets": 0
                },
                {
                    "orderable": false,
                    "targets": 5
                }
            ],
            colReorder: {
                fixedColumnsLeft: 0
            },
            "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            buttons: [{
                extend: 'excelHtml5',
                text: '',
                download: 'open',
                className: "btntabletocsv hiddenColumn",
                filename: "Task List" + moment().format(),
                orientation: 'portrait',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column) {
                            if (data.includes("</span>")) {
                                var res = data.split("</span>");
                                data = res[1];
                            }

                            return column === 1 ? data.replace(/<.*?>/ig, "") : data;

                        }
                    }
                }
            }, {
                extend: 'print',
                download: 'open',
                className: "btntabletopdf hiddenColumn",
                text: '',
                title: 'Shipping List',
                filename: "Shipping List" + moment().format(),
                exportOptions: {
                    columns: ':visible',
                    stripHtml: false
                }
            }],
            select: true,
            destroy: true,
            colReorder: true,
            pageLength: initialDatatableLoad,
            lengthMenu: [
                [initialDatatableLoad, -1],
                [initialDatatableLoad, "All"]
            ],
            info: true,
            responsive: true,
            "order": [
                [4, "desc"],
                [1, "desc"]
            ],
            action: function() {
                $('#tblTaskListDatatable').DataTable().ajax.reload();
            },
            "fnInitComplete": function() {
                $("<button class='btn btn-primary btnRefreshTasks' type='button' id='btnRefreshTasks' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblTaskListDatatable_filter");
            }
        });
        $('.fullScreenSpin').css('display', 'none');
    }, 0);

    setTimeout(function() {
        $('#tblProjectTasks').DataTable({
            columnDefs: [{
                    "orderable": false,
                    "targets": 0
                },
                {
                    "orderable": false,
                    "targets": 5
                }
            ],
            colReorder: {
                fixedColumnsLeft: 0
            },
            "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            buttons: [{
                extend: 'excelHtml5',
                text: '',
                download: 'open',
                className: "btntabletocsv hiddenColumn",
                filename: "Task List" + moment().format(),
                orientation: 'portrait',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column) {
                            if (data.includes("</span>")) {
                                var res = data.split("</span>");
                                data = res[1];
                            }

                            return column === 1 ? data.replace(/<.*?>/ig, "") : data;

                        }
                    }
                }
            }, {
                extend: 'print',
                download: 'open',
                className: "btntabletopdf hiddenColumn",
                text: '',
                title: 'Shipping List',
                filename: "Shipping List" + moment().format(),
                exportOptions: {
                    columns: ':visible',
                    stripHtml: false
                }
            }],
            select: true,
            destroy: true,
            colReorder: true,
            pageLength: initialDatatableLoad,
            lengthMenu: [
                [initialDatatableLoad, -1],
                [initialDatatableLoad, "All"]
            ],
            info: true,
            responsive: true,
            "order": [
                [4, "desc"],
                [1, "desc"]
            ],
            action: function() {
                $('#tblProjectTasks').DataTable().ajax.reload();
            },
            "fnInitComplete": function() {
                $("<button class='btn btn-primary btnRefreshProjectTasks' type='button' id='btnRefreshProjectTasks' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblProjectTasks_filter");
            }
        });
        $('.fullScreenSpin').css('display', 'none');
    }, 0);

    setTimeout(function() {
        $('#tblFilters').DataTable({
            columnDefs: [
                {
                    "orderable": false,
                    "targets": 2
                }
            ],
            "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            buttons: [{
                extend: 'excelHtml5',
                text: '',
                download: 'open',
                className: "btntabletocsv hiddenColumn",
                filename: "Project List" + moment().format(),
                orientation: 'portrait',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column) {
                            if (data.includes("</span>")) {
                                var res = data.split("</span>");
                                data = res[1];
                            }

                            return column === 1 ? data.replace(/<.*?>/ig, "") : data;

                        }
                    }
                }
            }, {
                extend: 'print',
                download: 'open',
                className: "btntabletopdf hiddenColumn",
                text: '',
                title: 'Project List',
                filename: "Project List" + moment().format(),
                exportOptions: {
                    columns: ':visible',
                    stripHtml: false
                }
            }],
            select: true,
            destroy: true,
            colReorder: true,
            pageLength: initialDatatableLoad,
            lengthMenu: [
                [initialDatatableLoad, -1],
                [initialDatatableLoad, "All"]
            ],
            info: true,
            responsive: true,
            "order": [
                [1, "desc"]
            ],
            action: function() {
                $('#tblFilters').DataTable().ajax.reload();
            },
            "fnInitComplete": function() {
                $("<button class='btn btn-primary btnNewFilter' type='button' id='btnNewFilter' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus' style='margin-right: 5px'></i>New Filter</button>").insertAfter("#tblFilters_filter");
                $("<button class='btn btn-primary btnRefreshFilters' type='button' id='btnRefreshFilters' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblFilters_filter");
            }
        });
        $('.fullScreenSpin').css('display', 'none');
    }, 0);

    setTimeout(function() {
        $('#tblLabels').DataTable({
            columnDefs: [
                {
                    "orderable": false,
                    "targets": 2
                }
            ],
            "sDom": "<'row'><'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'l>r>t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>B",
            buttons: [{
                extend: 'excelHtml5',
                text: '',
                download: 'open',
                className: "btntabletocsv hiddenColumn",
                filename: "Project List" + moment().format(),
                orientation: 'portrait',
                exportOptions: {
                    columns: ':visible',
                    format: {
                        body: function(data, row, column) {
                            if (data.includes("</span>")) {
                                var res = data.split("</span>");
                                data = res[1];
                            }

                            return column === 1 ? data.replace(/<.*?>/ig, "") : data;

                        }
                    }
                }
            }, {
                extend: 'print',
                download: 'open',
                className: "btntabletopdf hiddenColumn",
                text: '',
                title: 'Project List',
                filename: "Project List" + moment().format(),
                exportOptions: {
                    columns: ':visible',
                    stripHtml: false
                }
            }],
            select: true,
            destroy: true,
            colReorder: true,
            pageLength: initialDatatableLoad,
            lengthMenu: [
                [initialDatatableLoad, -1],
                [initialDatatableLoad, "All"]
            ],
            info: true,
            responsive: true,
            "order": [
                [1, "desc"]
            ],
            action: function() {
                $('#tblLabels').DataTable().ajax.reload();
            },
            "fnInitComplete": function() {
                $("<button class='btn btn-primary btnNewLabel' type='button' id='btnNewLabel' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-plus' style='margin-right: 5px'></i>New Label</button>").insertAfter("#tblLabels_filter");
                $("<button class='btn btn-primary btnRefreshLabels' type='button' id='btnRefreshLabels' style='padding: 4px 10px; font-size: 14px; margin-left: 8px !important;'><i class='fas fa-search-plus' style='margin-right: 5px'></i>Search</button>").insertAfter("#tblLabels_filter");
            }
        });
        $('.fullScreenSpin').css('display', 'none');
    }, 0);

});

Template.taskdatatable.events({
    'click #tblTaskListDatatable td.colOpenTask': function(event) {
        $('#taskModal').modal('toggle');
    },
    'click .btnEditTask': function(event) {
        $('#taskModal').modal('toggle');
    },
    'click .btnCommentTask': function(event) {
        $('#taskModal').modal('toggle');
    },
    'click #tblNewProjectsDatatable tr': function(event) {
        $('#newProjectTasksModal').modal('toggle');
    },
    'click .sectionOpened': function(event) {
        $('.sectionOpened').css('display','none');
        $('.sectionClosed').css('display','inline-flex');
        $('.sectionCol1').css('display','none');
    },
    'click .sectionClosed': function(event) {
        $('.sectionOpened').css('display','inline-flex');
        $('.sectionClosed').css('display','none');
        $('.sectionCol1').css('display','inline');
    },
    'click .btnNewFilter': function(event) {
        $('#newFilterModal').modal('toggle');
    },
    'click .btnNewLabel': function(event) {
        $('#newLabelModal').modal('toggle');
    },
});

Template.taskdatatable.helpers({

});
