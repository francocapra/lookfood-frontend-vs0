function getTopEmployees() {

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
    }).addStyleClass('sapUiSmallMargin');

    return oEmpSlideTile;
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
    }).addStyleClass('sapUiSmallMargin');;

    return oPrdSlideTile;
}