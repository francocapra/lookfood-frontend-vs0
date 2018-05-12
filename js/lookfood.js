sap.ui.getCore().attachInit(function () {

    $.fn.removeClassStartingWith = function (filter) {
        $(this).removeClass(function (index, className) {
            return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
        });
        return this;
    };

    //localization settings
    jQuery.sap.require("jquery.sap.resources");
    sLocale = sap.ui.getCore().getConfiguration().getLanguage();
    oBundle = jQuery.sap.resources({ url: "res/i18n/i18n.properties", locale: sLocale });

    lfApp = new sap.m.App({
        afterNavigate: function (event) {
            if (event.getParameters().toId == 'p_login') {
                sap.m.MessageToast.show('Sessão encerrada');
            }
        }
    }).placeAt('content');

    //Main Pages
    lfApp.addPage(getPageLogin());
    lfApp.addPage(getPageCockpit());
    lfApp.addPage(getPageReview());
    lfApp.addPage(getPageItemMgmt());
    lfApp.addPage(getPageProfessionalMgmt());

    //Child Pages
    lfApp.addPage(getPageNewItem());
    lfApp.addPage(getPageNewProfessional());

    var model = new sap.ui.model.json.JSONModel();
    model.loadData(jQuery.sap.getModulePath('gourmeo.tdc', '/partner-top-list.json'));
    model.attachRequestCompleted(function () {
        var modelData = model.getData();

        var box = sap.ui.getCore().byId('partnerTopItems');

        box.addItem(getTopEmployees(modelData.TopEmployees));
    });

});

//Main pages
function getPageLogin() {

    var pageLogin = new sap.m.Page('p_login', {
        title: oBundle.getText('loginPageTitle'),
        content: [
            new sap.m.FlexBox({
                alignItems: 'Center',
                justifyContent: 'Center',
                items: [
                    new sap.m.VBox({
                        items: [
                            new sap.m.FlexBox({
                                alignItems: 'Center',
                                justifyContent: 'Center',
                                items: new sap.m.Image({
                                    src: 'imgs/brand/gourmeo_logo_web.png',
                                    width: '200px',
                                    height: '200px'
                                })
                            }),
                            new sap.m.Label({
                                labelFor: 'txtUserId',
                                text: oBundle.getText('loginUserLabel')
                            }),
                            new sap.m.Input('txtUserId', {
                                placeholder: oBundle.getText('userInputPlaceholder')
                            }),
                            new sap.m.Label({
                                labelFor: 'txtPassword',
                                text: oBundle.getText('loginUserPassword')
                            }),
                            new sap.m.Input('txtPassword', {
                                type: sap.m.InputType.Password,
                                placeholder: oBundle.getText('passwordInputPlaceholder')
                            }),
                            new sap.m.Button({
                                text: oBundle.getText('btnLogin'),
                                width: '100%',
                                type: sap.m.ButtonType.Emphasized,
                                press: function () {

                                    showGlobalLoader()

                                    var json = {
                                        email: sap.ui.getCore().byId('txtUserId').getValue(),
                                        password: sap.ui.getCore().byId('txtPassword').getValue(),
                                    }

                                    var user = new UserCredentials(sap.ui.getCore().byId('txtUserId').getValue(), sap.ui.getCore().byId('txtPassword').getValue())

                                    doLogin(json, function (jqXHR) {
                                        if (jqXHR.status == 200) {
                                            hideGlobalLoader()
                                            window.sessionStorage.setItem('Authorization', jqXHR.getResponseHeader('Authorization'))
                                            lfApp.to('p_cockpit');
                                        }
                                    });
                                }
                            }).addStyleClass('sapUiSmallMarginTop'),
                            new sap.m.HBox({
                                alignItems: 'Center',
                                justifyContent: 'Center',
                                items: [
                                    new sap.m.Text({
                                        text: oBundle.getText('newUserLabel')
                                    }),
                                    new sap.m.Link({
                                        text: oBundle.getText('newUserLink'),
                                        press: function () {
                                            var _d = getDialogNewUser();
                                            _d.open();
                                        }
                                    }).addStyleClass('sapUiTinyMarginBegin')
                                ]
                            }).addStyleClass('sapUiSmallMarginTop'),
                            new sap.m.HBox({
                                alignItems: 'Center',
                                justifyContent: 'Center',
                                items: [
                                    new sap.m.Text({
                                        text: oBundle.getText('forgotPasswordLabel')
                                    }),
                                    new sap.m.Link({
                                        text: oBundle.getText('forgotPasswordLink'),
                                        press: function () {
                                            var _d = getDialogForgotPass();
                                            _d.open();
                                        }
                                    }).addStyleClass('sapUiTinyMarginBegin')
                                ]
                            }).addStyleClass('sapUiSmallMarginTop')
                        ]
                    }).addStyleClass('sapUiLargeMarginTop vbox-login')
                ]
            })
        ]
    }).addStyleClass('page-body')

    return pageLogin;
}

function getPageCockpit() {
    var pageCockpit = new sap.m.Page('p_cockpit', {
        title: oBundle.getText('cockpitPageTitle'),
        headerContent: [
            new sap.m.Button({
                text: oBundle.getText('logoffBtn'),
                icon: 'sap-icon://log',
                press: function () {
                    var logOffDialog = new sap.m.Dialog({
                        title: oBundle.getText('logoffDialogTitle'),
                        type: 'Message',
                        content: [
                            new sap.m.Text({
                                text: oBundle.getText('logoffDialogMessage')
                            })
                        ],
                        beginButton: new sap.m.Button({
                            text: oBundle.getText('logoffConfirmBtn'),
                            press: function () {
                                logOffDialog.close();
                                lfApp.to('p_login');
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: oBundle.getText('logoffCancelBtn'),
                            type: 'Emphasized',
                            press: function () {
                                logOffDialog.close();
                            }
                        }),
                        afterClose: function () {
                            logOffDialog.destroy();
                        }
                    }).open();
                }
            })
        ],
        content: [
            new sap.m.HBox({
                items: [
                    new sap.m.GenericTile({
                        header: oBundle.getText('tileItemsMgmt'),
                        tileContent: [
                            new sap.m.TileContent({
                                content: [
                                    new sap.m.ImageContent({
                                        src: 'sap-icon://product'
                                    })
                                ]
                            })
                        ],
                        press: function () {
                            lfApp.to('p_items_mgmt');
                        }
                    }).addStyleClass('sapUiSmallMarginEnd'),
                    new sap.m.GenericTile({
                        header: oBundle.getText('tileProfessionalMgmt'),
                        tileContent: [
                            new sap.m.TileContent({
                                content: [
                                    new sap.m.ImageContent({
                                        src: 'sap-icon://employee'
                                    })
                                ]
                            })
                        ],
                        press: function () {
                            lfApp.to('p_prof_mgmt');
                        }
                    }).addStyleClass('sapUiSmallMarginEnd'),
                    new sap.m.GenericTile({
                        header: oBundle.getText('tileUserProfile'),
                        subheader: oBundle.getText('tileUserProfSubheader'),
                        tileContent: new sap.m.TileContent({
                            content: [
                                new sap.m.ImageContent({
                                    src: 'sap-icon://business-card'
                                })
                            ]
                        })
                    }).addStyleClass('sapUiSmallMarginEnd'),
                    new sap.m.GenericTile({
                        header: oBundle.getText('tileReviewMode'),
                        tileContent: new sap.m.TileContent({
                            content: [
                                new sap.m.NumericContent({
                                    value: 0,
                                    icon: 'sap-icon://favorite'
                                })
                            ]
                        }),
                        press: function () {
                            lfApp.to('p_review');
                        }
                    }).addStyleClass('sapUiSmallMarginEnd')
                ]
            })
        ]
    }).addStyleClass('sapUiContentPadding');

    return pageCockpit;
}

function getPageReview() {
    var pageReview = new sap.m.Page('p_review', {
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.m.Panel({
                        headerText: oBundle.getText('highlights'),
                        content: [
                            new sap.m.FlexBox('partnerTopItems', {
                                alignItems: 'Start',
                                justifyContent: 'Start'
                            })
                        ]
                    }),
                    new sap.m.List('reviewItemsList', {
                        headerToolbar: new sap.m.Toolbar({
                            content: [
                                new sap.m.Title({
                                    text: oBundle.getText('reviewListHeader')
                                })
                            ]
                        }),
                        noDataText: oBundle.getText('reviewListNoData')
                    })
                ]
            })
        ],
        footer: new sap.m.Toolbar({
            content: [
                new sap.m.ToolbarSpacer(),
                new sap.m.Button({
                    text: oBundle.getText('startReviewBtn'),
                    type: 'Emphasized',
                    press: function (evt) {

                        let scanner = null;
                        let reviewCode = null;

                        var _previewDialog = new sap.m.Dialog({
                            title: 'Posicione o código em frente o leitor',
                            content: [
                                new sap.ui.core.HTML({
                                    content: '<video id="preview" width="400" heigth="400"></video>'
                                })
                            ],
                            beginButton: new sap.m.Button({
                                text: 'Fechar',
                                press: function () {
                                    _previewDialog.close();
                                }
                            }),
                            afterOpen: function () {
                                scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
                                scanner.addListener('scan', function (content) {
                                    reviewCode = content;
                                    _previewDialog.close();
                                });
                                Instascan.Camera.getCameras().then(function (cameras) {
                                    // alert(cameras[0].name)
                                    if (cameras.length > 0) {
                                        scanner.activeCameraId = cameras[0].id;
                                        scanner.start(cameras[0]);
                                    } else {
                                        console.error('No cameras found.');
                                        alert("No cameras foud.")
                                    }
                                }).catch(function (e) {
                                    console.error(e);
                                    alert(e);
                                });
                            },
                            beforeClose: function () {
                                scanner.stop();
                                scanner = null;
                            },
                            afterClose: function () {
                                _previewDialog.destroy();
                                console.log(reviewCode);

                            }
                        }).addStyleClass('preview-dialog').open();

                    }
                })
            ]
        })
    }).addStyleClass('sapUiContentPadding');

    return pageReview;
}

function getPageItemMgmt() {

    var pageItemsMgmt = new sap.m.Page('p_items_mgmt', {
        title: oBundle.getText('itemMgmtPageTitle'),
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        headerContent: [
            new sap.m.Button({
                icon: 'sap-icon://add',
                press: function () {
                    lfApp.to('p_new_item');
                }
            }),
            new sap.m.Button({
                icon: 'sap-icon://refresh'
            })
        ],
        content: [
            new sap.m.Table({
                columns: [
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnItem')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnDesc')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnResp')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnAux')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnCurReview')
                        })
                    })
                ]
            }).setNoDataText(oBundle.getText('tableItemsNoData'))
        ]
    })

    return pageItemsMgmt;
}

function getPageProfessionalMgmt() {
    var pageProfMgmt = new sap.m.Page('p_prof_mgmt', {
        title: oBundle.getText('profMgmtPageTitle'),
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        headerContent: [
            new sap.m.Button({
                icon: 'sap-icon://add',
                press: function () {
                    lfApp.to('p_new_prof');
                }
            }),
            new sap.m.Button({
                icon: 'sap-icon://refresh'
            })
        ],
        content: [
            new sap.m.Table({
                columns: [
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnName')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnSurname')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnRole')
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: oBundle.getText('tableColumnCurReview')
                        })
                    })
                ]
            }).setNoDataText(oBundle.getText('tableProfNoData'))
        ]
    })

    return pageProfMgmt;
}

function getPageNewItem() {
    var pageNewItem = new sap.m.Page('p_new_item', {
        title: oBundle.getText('newItemPageTitle'),
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.ui.layout.form.SimpleForm({
                        title: oBundle.getText('newItemFormHeader'),
                        editable: true,
                        layout: 'ResponsiveGridLayout',
                        labelSpanXL: 3,
                        labelSpanL: 3,
                        labelSpanM: 3,
                        labelSpanS: 12,
                        adjustLabelSpan: false,
                        emptySpanXL: 4,
                        emptySpanL: 4,
                        emptySpanM: 4,
                        emptySpanS: 4,
                        columnsXL: 1,
                        columnsL: 1,
                        columnsM: 1,
                        singleContainerFullSize: false,
                        content: [
                            new sap.m.Label({
                                text: oBundle.getText('newItemDescription')
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: oBundle.getText('newItemResponsable')
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: oBundle.getText('newItemAuxiliary')
                            }),
                            new sap.m.Input()
                        ]
                    })
                ]
            }).addStyleClass('sapUiSmallMargin')
        ],
        footer: new sap.m.Toolbar({
            content: [
                new sap.m.ToolbarSpacer(),
                new sap.m.Button({
                    text: oBundle.getText('btnSave'),
                    type: 'Emphasized'
                }),
                new sap.m.Button({
                    text: oBundle.getText('btnCancel')
                })
            ]
        })
    })

    return pageNewItem;
}

function getPageNewProfessional() {
    var pageNewProf = new sap.m.Page('p_new_prof', {
        title: oBundle.getText('newProfPageTitle'),
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.ui.layout.form.SimpleForm({
                        title: oBundle.getText('newProfFormHeader'),
                        editable: true,
                        layout: 'ResponsiveGridLayout',
                        labelSpanXL: 3,
                        labelSpanL: 3,
                        labelSpanM: 3,
                        labelSpanS: 12,
                        adjustLabelSpan: false,
                        emptySpanXL: 4,
                        emptySpanL: 4,
                        emptySpanM: 4,
                        emptySpanS: 4,
                        columnsXL: 1,
                        columnsL: 1,
                        columnsM: 1,
                        singleContainerFullSize: false,
                        content: [
                            new sap.m.Label({
                                text: oBundle.getText('newProfName')
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: oBundle.getText('newProfSurname')
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: oBundle.getText('newProfRole')
                            }),
                            new sap.m.Input()
                        ]
                    })
                ]
            }).addStyleClass('sapUiSmallMargin')
        ],
        footer: new sap.m.Toolbar({
            content: [
                new sap.m.ToolbarSpacer(),
                new sap.m.Button({
                    text: oBundle.getText('btnSave'),
                    type: 'Emphasized'
                }),
                new sap.m.Button({
                    text: oBundle.getText('btnCancel')
                })
            ]
        })
    })

    return pageNewProf;
}

//Additional screens
function getDialogNewUser() {
    var newUserDialog = new sap.m.Dialog({
        title: oBundle.getText('newPartnerDiagTitle'),
        content: [
            new sap.m.VBox({
                justifyContent: 'Center',
                alignItems: 'Center',
                items: [
                    new sap.m.HBox({
                        items: [
                            new sap.ui.core.Icon({
                                src: 'sap-icon://email',
                                size: '2em',
                                color: '#d52941'
                            }).addStyleClass('sapUiTinyMargin'),
                            new sap.m.Input('txtNewUserEmail',{
                                placeholder: oBundle.getText('newUserIdField')
                            })
                        ]
                    }),
                    new sap.m.HBox({
                        items: [
                            new sap.ui.core.Icon({
                                src: 'sap-icon://key',
                                size: '2em',
                                color: '#d52941'
                            }).addStyleClass('sapUiTinyMargin'),
                            new sap.m.Input('txtNewUserPass',{
                                placeholder: oBundle.getText('newUserPassField'),
                                type: sap.m.InputType.Password
                            })
                        ]
                    }),
                    new sap.m.HBox({
                        items: [
                            new sap.ui.core.HTML({
                                content: '<a href="#"><i class="fab fa-facebook-square"' +
                                    'style="font-size:2em;color:#3b5998;margin:0px 5px"></i></a>'
                            }),
                            new sap.ui.core.HTML({
                                content: '<a href="#"><i class="fab fa-google-plus"' +
                                    'style="font-size:2em;color:#d34836;margin:0px 5px"></i></a>'
                            })
                        ]
                    }).addStyleClass('sapUiTinyMarginTop sapUiTinyMarginBottom')
                ]
            }).addStyleClass('sapUiContentPadding')
        ],
        beginButton: new sap.m.Button({
            text: oBundle.getText('createUserButton'),
            type: 'Emphasized',
            press:function(){
                var n = new UserCredentials(
                    sap.ui.getCore().byId('txtNewUserEmail').getValue(),
                    sap.ui.getCore().byId('txtNewUserPass').getValue()
                )

                console.log(JSON.stringify(n));
                showGlobalLoader();

                createUser(n, function(jqXHR){
                    if (jqXHR.status == 200) {
                        hideGlobalLoader();
                        sap.m.MessageToast.show(oBundle.getText('userCreationSuccess'))
                    }
                    else
                        hideGlobalLoader();
                });
            }
        }),
        endButton: new sap.m.Button({
            text: oBundle.getText('btnCancel'),
            press: function () {
                newUserDialog.close();
            }
        }),
        afterClose: function () {
            newUserDialog.destroy();
        }
    });

    return newUserDialog;
}

function getDialogForgotPass() {
    var forgotPassDialog = new sap.m.Dialog({
        title: oBundle.getText('forgotPassDialogTitle'),
        content: [
            new sap.m.HBox({
                justifyContent: 'Center',
                alignItems: 'Center',
                items: [
                    new sap.ui.core.Icon({
                        src: 'sap-icon://email',
                        size: '2em',
                        color: '#d52941'
                    }).addStyleClass('sapUiTinyMargin'),
                    new sap.m.Input({
                        placeholder: oBundle.getText('forgotPassField')
                    })
                ]
            })
        ],
        beginButton: new sap.m.Button({
            type: 'Emphasized',
            text: oBundle.getText('btnRecoverPass'),
            press: function () {

            }
        }),
        endButton: new sap.m.Button({
            text: oBundle.getText('btnCancel'),
            press: function () {
                forgotPassDialog.close();
            }
        }),
        afterClose: function () {
            forgotPassDialog.close();
        }
    }).addStyleClass('sapUiContentPadding');

    return forgotPassDialog;
}