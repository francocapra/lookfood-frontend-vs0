function showGlobalLoader() {
    sap.ui.core.BusyIndicator.show(0);
}

function hideGlobalLoader() {
    sap.ui.core.BusyIndicator.hide();
}

function getTopEmployees(oData) {

    var oTile1 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: oData[0].ProfessionalName,
                subheader: oData[0].ReviewAverage
            })
        })
    });

    var oTile2 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: oData[1].ProfessionalName,
                subheader: oData[1].ReviewAverage
            })
        })
    });

    var oTile3 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: oData[2].ProfessionalName,
                subheader: oData[2].ReviewAverage
            })
        })
    });

    var oTile4 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: oData[3].ProfessionalName,
                subheader: oData[3].ReviewAverage
            })
        })
    });

    var oTile5 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: oData[4].ProfessionalName,
                subheader: oData[4].ReviewAverage
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
    }).addStyleClass('sapUiSmallMargin');

    return oEmpSlideTile;
}

function getTopProducts(oData) {

    var oTile1 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '1. '
            })
        })
    });

    var oTile2 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '2. '
            })
        })
    });

    var oTile3 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '3. '
            })
        })
    });

    var oTile4 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
        tileContent: new sap.m.TileContent({
            content: new sap.m.NewsContent({
                contentText: '4. '
            })
        })
    });

    var oTile5 = new sap.m.GenericTile({
        backgroundImage: 'imgs/review-mode/top-professionals/chefs.png',
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
    }).addStyleClass('sapUiSmallMargin');;

    return oPrdSlideTile;
}

function doLogin(oData, navigate) {
    $.ajax({
        type: 'POST',
        url: 'https://app-lookfood.herokuapp.com/login',
        contentType: 'application/json',
        data: JSON.stringify(oData),
        success: function (data, textStatus, jqXHR) {
            // console.log(data, textStatus, jqXHR);
            navigate(jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR.responseText);
            navigate(jqXHR);
        }
    })
}

function getPartnerDetails(partnerEmail, processResponse) {
    $.ajax({
        type: 'GET',
        url: 'https://app-lookfood.herokuapp.com/partners/email?value=' + partnerEmail,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', window.sessionStorage.getItem('Authorization'));
        },
        success: function (data, textStatus, jqXHR) {
            // console.log(data, textStatus, jqXHR);
            processResponse(data, jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR.responseText);
            processResponse(null, jqXHR);
        }
    })
}

function createUser(oData, processResponse) {
    $.ajax({
        type: 'POST',
        url: 'https://app-lookfood.herokuapp.com/partners',
        contentType: 'application/json',
        data: JSON.stringify(oData),
        success: function (data, textStatus, jqXHR) {
            processResponse(jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // console.log(jqXHR.responseText);
            hideGlobalLoader();
            sap.m.MessageToast.show(oBundle.getText('requestFailure'))
        }
    })
}