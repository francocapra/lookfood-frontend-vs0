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