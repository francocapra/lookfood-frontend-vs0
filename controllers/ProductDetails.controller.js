sap.ui.define([
    "lookfood/resources/Lookfood/controllers/Base"
    ], function (Base){
        "use strict";
        return Base.extend("lookfood.resources.Lookfood.controllers.ProductDetails", {
            onInit: function(oEvent){
                this.getRouter()
                    .getRoute("appProductDetails")
                    .attachPatternMatched(this._onProductIDMatched, this);

            },

            _onProductIDMatched: function(){
                var sProductId =  oEvent.getParameter("arguments").productId;
                
            }
        });
    }
)