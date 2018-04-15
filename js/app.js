sap.ui.getCore().attachInit(function () {

    $.fn.removeClassStartingWith = function (filter) {
        $(this).removeClass(function (index, className) {
            return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ')
        });
        return this;
    };

    var _tokenLayout = new sap.ui.layout.VerticalLayout({
        content: [
            new sap.m.Text({
                text: 'Para scanear o código fornecido, clique no botão abaixo:'
            }),
            new sap.m.Input('txtTokenNumber', {

            }).addStyleClass('token-input'),
            new sap.m.Button({
                text: 'Scanear QR Code',
                width: '100%',
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
                            inflateReviews(getSamplePartnerCollection());
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
    }).addStyleClass('token-layout').placeAt('tokenContainer');

});

function inflateReviews(oData) {

    var oPartnerCollection = new sap.ui.model.json.JSONModel(oData);
    sap.ui.getCore().setModel(oPartnerCollection, 'partnermodel');

    var productList = new sap.m.List({
        headerText: "List de Produtos"
    });

    productList.bindItems({
        path: 'partnermodel>/PartnerCollection/ProductCollection',
        template: new sap.m.ObjectListItem({
            title: '{partnermodel>ProductName}',
            // intro: '{partnermodel>ProductId}',
            // number: '{partnermodel>foodPrice}',
            icon: 'sap-icon://meal',
            numberUnit: 'R$',
            type: 'Active',
            attributes: [
                new sap.m.ObjectAttribute({
                    text: '{partnermodel>ResponsibleName}'
                }),
                new sap.m.ObjectAttribute({
                    text: '{partnermodel>AuxiliaryName}'
                })
            ],
            tap: function (evt) {

                var _partnerId = this.data('partnerId');
                var _productId = this.data('productId');

                var _dialog = new sap.m.Dialog({
                    title: 'Informe a nota da avaliação',
                    contentWidth: '600px',
                    content: [
                        new sap.ui.layout.VerticalLayout({
                            content: [
                                new sap.m.Text('reviewValue', {
                                    text: '0'
                                }).addStyleClass('review-value-low'),
                                new sap.m.Slider('reviewSlider', {
                                    width: '80%',
                                    min: 0,
                                    max: 10,
                                    step: 1,
                                    liveChange: function (evt, a, b) {
                                        var _value = evt.getSource().getValue();
                                        var _label = $('#reviewValue');

                                        if (_value >= 0 & _value <= 3) {
                                            _label.removeClassStartingWith('review-');
                                            _label.addClass('review-value-low');
                                        }
                                        else if (_value > 3 & _value <= 7) {
                                            _label.removeClassStartingWith('review-');
                                            _label.addClass('review-value-medium');
                                        }
                                        else if (_value > 7 & _value <= 10) {
                                            _label.removeClassStartingWith('review-');
                                            _label.addClass('review-value-high');
                                        }

                                        _label.text(_value);
                                    }
                                })
                            ]
                        }).addStyleClass('review_dialog_note_layout')
                    ],
                    beginButton: new sap.m.Button({
                        text: 'Confirmar',
                        type: sap.m.ButtonType.Emphasized,
                        press: function () {
                            var _confirmationDialog = new sap.m.Dialog({
                                title: 'Confirmação',
                                type: 'Message',
                                content: [
                                    new sap.m.Text({
                                        text: 'Confirma review para o prato?'
                                    })
                                ],
                                beginButton: new sap.m.Button({
                                    text: 'Sim',
                                    press: function () {

                                        var _date = new Date();
                                        var _month = (_date.getMonth() + 1) < 10 ? ('0' + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
                                        var _day = (_date.getDate() + 1) < 10 ? ('0' + _date.getDate()) : _date.getDate();
                                        var _hour = _date.getHours() < 10 ? ('0' + _date.getHours()) : _date.getHours();
                                        var _minutes = _date.getMinutes() < 10 ? ('0' + _date.getMinutes()) : _date.getMinutes();
                                        var _seconds = _date.getSeconds() < 10 ? ('0' + _date.getSeconds()) : _date.getSeconds();

                                        var _reviewValue = sap.ui.getCore().byId('reviewSlider').getValue();

                                        var partnerReview = {
                                            partnerId: _partnerId,
                                            productId: _productId,
                                            reviewDate: String.prototype.concat(_date.getFullYear(), _month, _day),
                                            reviewTime: String.prototype.concat(_hour, _minutes, _seconds),
                                            reviewValue: _reviewValue
                                        }

                                        sap.ui.core.BusyIndicator.show(0);

                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://' + location.hostname + ':8081/LookFood/rest/ReviewServices/SaveReview/',
                                            contentType: 'application/json',
                                            data: JSON.stringify(partnerReview),
                                            success: function () {
                                                _confirmationDialog.close();
                                                sap.ui.core.BusyIndicator.hide();

                                                sap.m.MessageToast.show('Voto computado com sucesso.\nObrigado!', {
                                                    duration: 3000
                                                })
                                            },
                                            error: function (a, b, c) {
                                                console.log(a, b, c);
                                                _confirmationDialog.close();
                                                sap.ui.core.BusyIndicator.hide();
                                            }
                                        })
                                    }
                                }),
                                endButton: new sap.m.Button({
                                    text: 'Cancelar',
                                    press: function () {
                                        _confirmationDialog.close();
                                    }
                                }),
                                afterClose: function () {
                                    _dialog.close();
                                    _confirmationDialog.destroy();
                                }
                            }).open();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: 'Fechar',
                        press: function () {
                            _dialog.close();
                        }
                    }),
                    afterClose: function () {
                        _dialog.destroy();
                    }
                });

                _dialog.open();
            }
        }).data('productId', '{partnermodel>ProductId}')
            .data('partnerId', '{partnermodel>PartnerId}')
    })

    var serviceList = new sap.m.List({
        headerText: "List de Serviços"
    });

    serviceList.bindItems({
        path: 'partnermodel>/PartnerCollection/ServiceCollection',
        template: new sap.m.ObjectListItem({
            title: '{partnermodel>ServiceName}',
            // intro: '{partnermodel>ServiceId}',
            // number: '{partnermodel>foodPrice}',
            icon: 'sap-icon://employee',
            numberUnit: 'R$',
            type: 'Active',
            attributes:[
                new sap.m.ObjectAttribute({
                    text:'{partnermodel>ResponsibleName}'
                })
            ],
            tap: function (evt) {

                var _partnerId = this.data('partnerId');
                var _serviceId = this.data('serviceId');

                var _dialog = new sap.m.Dialog({
                    title: 'Informe a nota da avaliação',
                    contentWidth: '600px',
                    content: [
                        new sap.ui.layout.VerticalLayout({
                            content: [
                                new sap.m.Text('reviewValue', {
                                    text: '0'
                                }).addStyleClass('review-value-low'),
                                new sap.m.Slider('reviewSlider', {
                                    width: '80%',
                                    min: 0,
                                    max: 10,
                                    step: 1,
                                    liveChange: function (evt, a, b) {
                                        var _value = evt.getSource().getValue();
                                        var _label = $('#reviewValue');

                                        if (_value >= 0 & _value <= 3) {
                                            _label.removeClassStartingWith('review-');
                                            _label.addClass('review-value-low');
                                        }
                                        else if (_value > 3 & _value <= 7) {
                                            _label.removeClassStartingWith('review-');
                                            _label.addClass('review-value-medium');
                                        }
                                        else if (_value > 7 & _value <= 10) {
                                            _label.removeClassStartingWith('review-');
                                            _label.addClass('review-value-high');
                                        }

                                        _label.text(_value);
                                    }
                                })
                            ]
                        }).addStyleClass('review_dialog_note_layout')
                    ],
                    beginButton: new sap.m.Button({
                        text: 'Confirmar',
                        type: sap.m.ButtonType.Emphasized,
                        press: function () {
                            var _confirmationDialog = new sap.m.Dialog({
                                title: 'Confirmação',
                                type: 'Message',
                                content: [
                                    new sap.m.Text({
                                        text: 'Confirma review para o serviço?'
                                    })
                                ],
                                beginButton: new sap.m.Button({
                                    text: 'Sim',
                                    press: function () {

                                        var _date = new Date();
                                        var _month = (_date.getMonth() + 1) < 10 ? ('0' + (_date.getMonth() + 1)) : (_date.getMonth() + 1);
                                        var _day = (_date.getDate() + 1) < 10 ? ('0' + _date.getDate()) : _date.getDate();
                                        var _hour = _date.getHours() < 10 ? ('0' + _date.getHours()) : _date.getHours();
                                        var _minutes = _date.getMinutes() < 10 ? ('0' + _date.getMinutes()) : _date.getMinutes();
                                        var _seconds = _date.getSeconds() < 10 ? ('0' + _date.getSeconds()) : _date.getSeconds();

                                        var _reviewValue = sap.ui.getCore().byId('reviewSlider').getValue();

                                        var serviceReview = {
                                            partnerId: _partnerId,
                                            serviceId: _serviceId,
                                            reviewDate: String.prototype.concat(_date.getFullYear(), _month, _day),
                                            reviewTime: String.prototype.concat(_hour, _minutes, _seconds),
                                            reviewValue: _reviewValue
                                        }

                                        sap.ui.core.BusyIndicator.show(0);

                                        $.ajax({
                                            type: 'POST',
                                            url: 'http://' + location.hostname + ':8081/LookFood/rest/ReviewServices/SaveReview/',
                                            contentType: 'application/json',
                                            data: JSON.stringify(serviceReview),
                                            success: function () {
                                                _confirmationDialog.close();
                                                sap.ui.core.BusyIndicator.hide();

                                                sap.m.MessageToast.show('Voto computado com sucesso.\nObrigado!', {
                                                    duration: 3000
                                                })
                                            },
                                            error: function (a, b, c) {
                                                console.log(a, b, c);
                                                _confirmationDialog.close();
                                                sap.ui.core.BusyIndicator.hide();
                                            }
                                        })
                                    }
                                }),
                                endButton: new sap.m.Button({
                                    text: 'Cancelar',
                                    press: function () {
                                        _confirmationDialog.close();
                                    }
                                }),
                                afterClose: function () {
                                    _dialog.close();
                                    _confirmationDialog.destroy();
                                }
                            }).open();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: 'Fechar',
                        press: function () {
                            _dialog.close();
                        }
                    }),
                    afterClose: function () {
                        _dialog.destroy();
                    }
                });

                _dialog.open();
            }
        }).data('serviceId', '{partnermodel>ServiceId}')
            .data('partnerId', '{partnermodel>PartnerId}')
    })

    var _reviewDialog = new sap.m.Dialog({
        title: 'Avaliação de estabelecimento',
        minWidth: '100%',
        content: [
            productList,
            serviceList
        ],
        beginButton: new sap.m.Button({
            text: 'Close',
            type: 'Emphasized',
            press: function () {
                _reviewDialog.close();
            }
        }),
        afterClose: function () {
            _reviewDialog.destroy();
        }
    }).addStyleClass('review-dialog').open();
}