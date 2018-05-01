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
                                    lfApp.to('p_cockpit');
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
                                        text: oBundle.getText('newUserLink')
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
                                        text: oBundle.getText('forgotPasswordLink')
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
        title: 'Cockpit Do Usuário',
        headerContent: [
            new sap.m.Button({
                text: 'Sair',
                icon: 'sap-icon://log',
                press: function () {
                    var logOffDialog = new sap.m.Dialog({
                        title: 'Confirmação',
                        type: 'Message',
                        content: [
                            new sap.m.Text({
                                text: 'Deseja sair da aplicação?'
                            })
                        ],
                        beginButton: new sap.m.Button({
                            text: 'Sim',
                            press: function () {
                                logOffDialog.close();
                                lfApp.to('p_login');
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: 'Cancelar',
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
                        header: 'Gerenciar Itens Para Review',
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
                        header: 'Gerenciar Profissionais Para Review',
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
                        header: 'Meu Perfil',
                        subheader: 'Cadastro e Outras Informações',
                        tileContent: new sap.m.TileContent({
                            content: [
                                new sap.m.ImageContent({
                                    src: 'sap-icon://business-card'
                                })
                            ]
                        })
                    }).addStyleClass('sapUiSmallMarginEnd'),
                    new sap.m.GenericTile({
                        header: 'Iniciar Modo Review',
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
                        headerText: 'Destaques',
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
                                    text: 'Itens Para Review'
                                })
                            ]
                        }),
                        noDataText: 'Para listar seus itens. Clique em "Iniciar Review"'
                    })
                ]
            })
        ],
        footer: new sap.m.Toolbar({
            content: [
                new sap.m.ToolbarSpacer(),
                new sap.m.Button({
                    text: 'Iniciar Review',
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
        title: 'Gerenciamento De Itens',
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
                            text: 'Item'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Descrição'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Responsável'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Auxiliar'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Avaliação Atual'
                        })
                    })
                ]
            }).setNoDataText('Nenhum Item Cadastrado')
        ]
    })

    return pageItemsMgmt;
}

function getPageProfessionalMgmt() {
    var pageProfMgmt = new sap.m.Page('p_prof_mgmt', {
        title: 'Gerenciamento De Profissionais',
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
                            text: 'Nome'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Sobrenome'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Função'
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Text({
                            text: 'Avaliação Atual'
                        })
                    })
                ]
            }).setNoDataText('Nenhum Profissional Cadastrado')
        ]
    })

    return pageProfMgmt;
}

function getPageNewItem() {
    var pageNewItem = new sap.m.Page('p_new_item', {
        title: 'Adicionar Novo Item',
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.ui.layout.form.SimpleForm({
                        title: 'Informações Gerais',
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
                                text: 'Descrição'
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: 'Responsável'
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: 'Auxiliar'
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
                    text: 'Salvar',
                    type: 'Emphasized'
                }),
                new sap.m.Button({
                    text: 'Cancelar'
                })
            ]
        })
    })

    return pageNewItem;
}

function getPageNewProfessional() {
    var pageNewProf = new sap.m.Page('p_new_prof', {
        title: 'Adicionar Novo Profissional',
        showNavButton: true,
        navButtonPress: function () {
            lfApp.back();
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.ui.layout.form.SimpleForm({
                        title: 'Informações Gerais',
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
                                text: 'Nome'
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: 'Sobrenome'
                            }),
                            new sap.m.Input(),
                            new sap.m.Label({
                                text: 'Função'
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
                    text: 'Salvar',
                    type: 'Emphasized'
                }),
                new sap.m.Button({
                    text: 'Cancelar'
                })
            ]
        })
    })

    return pageNewProf;
}