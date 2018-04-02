sap.ui.getCore().attachInit(function () {
    var _layout = new sap.ui.layout.VerticalLayout({
        width: '90%',
        content: [
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
                    performLogin();
                }
            })
        ]
    }).addStyleClass('login-layout').placeAt('loginBox');
});

function performLogin() {
    var _customerId = sap.ui.getCore().byId('txtUserId');
    var _password = sap.ui.getCore().byId('txtPassword');

    var _data = {
        customerId: _customerId.getValue(),
        password: _password.getValue()
    }

    sap.ui.core.BusyIndicator.show(0);

    $.ajax({
        url: 'http://' + location.hostname + ':8081/LookFood/rest/ReviewServices/DoLogin',
        type: 'POST',
        contentType: 'text/plain',
        data: JSON.stringify(_data),
        statusCode: {
            200: function () {
                sap.ui.core.BusyIndicator.hide();
                window.location.href = "index.html";
            }
        },
        error: function (httpObj) {
            sap.ui.core.BusyIndicator.hide();
            if (httpObj.status == '401') {
                var _dialog = new sap.m.Dialog({
                    type: 'Message',
                    state: 'Error',
                    content: [
                        new sap.m.Text({
                            text: 'Usuário e/ou Senha incorretos.'
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: 'Ok',
                        press: function () {
                            _dialog.close();
                        }
                    }),
                    afterClose: function () {
                        _dialog.destroy();
                    }
                }).open();
            }
        }
    })
}