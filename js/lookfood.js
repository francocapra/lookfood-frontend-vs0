sap.ui.getCore().attachInit(function () {

    $.fn.removeClassStartingWith = function (filter) {
        $(this).removeClass(function (index, className) {
            return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
        });
        return this;
    };

    lfApp = new sap.m.App({
    }).placeAt('content');

    lfApp.addPage(getLoginPage());
    lfApp.addPage(getCockpitPage());
    lfApp.addPage(getReviewPage());

});

function getLoginPage() {

    var loginPage = new sap.m.Page('p_login',{
        title: 'Bem vindo ao LookFood',
        content: [
            new sap.m.FlexBox({
                alignItems: 'Start',
                justifyContent: 'Start',
                items: [
                    new sap.m.VBox({
                        items: [
                            new sap.m.Label({
                                labelFor: 'txtUserId',
                                text: 'Usuário'
                            }),
                            new sap.m.Input('txtUserId', {

                            }),
                            new sap.m.Label({
                                labelFor: 'txtPassword',
                                text: 'Senha'
                            }),
                            new sap.m.Input('txtPassword', {
                                type: sap.m.InputType.Password
                            }),
                            new sap.m.Button({
                                text: 'Acessar',
                                width: '100%',
                                type: sap.m.ButtonType.Emphasized,
                                press: function () {
                                    lfApp.to('p_cockpit');
                                }
                            }).addStyleClass('sapUiSmallMarginTop')
                        ]
                    }).addStyleClass('sapUiLargeMarginTop sapUiLargeMarginBegin vbox-login')
                ]
            })
        ]
    }).addStyleClass('page-body')

    return loginPage;
}

function getCockpitPage() {
    var cockpitPage = new sap.m.Page('p_cockpit', {
        title: 'Partner Cockpit',
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
                        header: 'Gerenciar Items de Review',
                        tileContent: new sap.m.TileContent({
                            content: [
                                new sap.m.NumericContent({
                                    value: 0,
                                    icon: 'sap-icon://add-document'
                                })
                            ]
                        })
                    }).addStyleClass('sapUiSmallMarginBegin sapUiSmallMarginTop'),
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
                    }).addStyleClass('sapUiSmallMarginBegin sapUiSmallMarginTop'),
                    new sap.m.GenericTile({
                        header: 'Estatísticas',
                        subheader: 'Relatórios e Análises',
                        tileContent: new sap.m.TileContent({
                            content: [
                                new sap.m.ImageContent({
                                    src: 'sap-icon://area-chart'
                                })
                            ]
                        })
                    }).addStyleClass('sapUiSmallMarginBegin sapUiSmallMarginTop')
                ]
            })
        ]
    }).addStyleClass('sapUiContentPadding');

    return cockpitPage;
}

function getReviewPage() {
    var reviewPage = new sap.m.Page('p_review', {
        showNavButton: true,
        navButtonPress: function () {
            lfApp.to('p_cockpit');
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.m.Panel({
                        headerText: 'Destaques',
                        content: [
                            new sap.m.FlexBox({
                                alignItems: 'Start',
                                justifyContent: 'Start',
                                items: [
                                    getTopEmployees(),
                                    getTopProducts()
                                ]
                            })
                        ]
                    })
                ]
            }),
            new sap.m.VBox({
                alignItems: 'Center',
                justifyContent: 'Center',
                items: [
                    new sap.m.Button({
                        text: 'Scanear QR Code',
                        type: sap.m.ButtonType.Emphasized,
                        press: function (evt) {

                            let scanner = null;
                            let reviewCode = null;

                            var _previewDialog = new sap.m.Dialog({
                                title: 'Posicione o código em frente o leitor',
                                content: [
                                    new sap.ui.core.HTML({
                                        content: '<video id="preview" width="300" heigth="300"></video>'
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
                                    inflatePartnerItems();
                                    // sap.ui.core.BusyIndicator.show(0);

                                    // $.ajax({
                                    //     type: 'GET',
                                    //     url: 'http://' + location.hostname + ':8081/LookFood/rest/ReviewServices/GetCustomerReviews/LFC0000001',
                                    //     success: function (response) {
                                    //         // console.log(response);

                                    //         sap.ui.core.BusyIndicator.hide();
                                    //         inflateReviews(response);
                                    //     },
                                    //     error: function (a, b, c) {
                                    //         console.log(a, b, c);
                                    //         sap.ui.core.BusyIndicator.hide();
                                    //     }
                                    // })
                                }
                            }).addStyleClass('preview-dialog').open();

                        }
                    })
                ]
            }).addStyleClass('sapUiSmallMargin')
        ]
    }).addStyleClass('sapUiContentPadding');

    return reviewPage;
}