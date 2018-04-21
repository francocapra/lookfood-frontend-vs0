sap.ui.getCore().attachInit(function () {

    $.fn.removeClassStartingWith = function (filter) {
        $(this).removeClass(function (index, className) {
            return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
        });
        return this;
    };

    var cockpitPage = new sap.m.Page('cockpit', {
        title: 'Partner Cockpit',
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
                            app.to('reviewPage');
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

    var reviewPage = new sap.m.Page('reviewPage', {
        showNavButton: true,
        navButtonPress: function () {
            app.to('cockpit');
        },
        content: [
            new sap.m.VBox({
                items: [
                    new sap.m.Panel({
                        headerText: 'Top 5 Profissionais',
                        content: [
                            new sap.m.FlexBox('TopProfFlexBox', {
                                alignItems: 'Center',
                                justifyContent: 'Center'
                            })
                        ]
                    }),
                    new sap.m.Panel({
                        headerText: 'Top 5 Produtos',
                        content: [
                            new sap.m.FlexBox({
                                alignItems: 'Center',
                                justifyContent: 'Center',
                                items: [
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
                                        content: '<video id="preview"></video>'
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

    var app = new sap.m.App('lfweb', {
        pages: [
            cockpitPage,
            reviewPage
        ]
    }).placeAt('content');

    getTopEmployees();

});

async function getTopEmployees() {
    // TopProfFlexBox

    var oData = await $.getJSON('testdata/top-products-list.json');

    console.log(oData);

    var oTile1 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '1. '
            })
        })
    });

    var oTile2 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '2. '
            })
        })
    });

    var oTile3 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '3. '
            })
        })
    });

    var oTile4 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '4. '
            })
        })
    });

    var oTile5 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '5. '
            })
        })
    });

    var oEmpSlideTile = new sap.m.SlideTile({
        displayTime: 3000,
        tiles: [
            oTile1,
            oTile2,
            oTile3,
            oTile4,
            oTile5
        ]
    });

    sap.ui.getCore().byId('TopProfFlexBox').addItem(oEmpSlideTile);
}

function getTopProducts() {

    var oTile1 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '1. '
            })
        })
    });

    var oTile2 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '2. '
            })
        })
    });

    var oTile3 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '3. '
            })
        })
    });

    var oTile4 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '4. '
            })
        })
    });

    var oTile5 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        frameType: 'TwoByOne',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '5. '
            })
        })
    });

    var oPrdSlideTile = new sap.m.SlideTile({
        displayTime: 3000,
        tiles: [
            oTile1,
            oTile2,
            oTile3,
            oTile4,
            oTile5
        ]
    });

    return oPrdSlideTile;
}