sap.ui.define([
], function () {
    "use strict";

    return {
        /**
         * @public
         * @param {boolean} bIsPhone the value to be checked
         * @returns {string} path to image
         */
        srcImageValue : function (bIsPhone) {
            var sImageSrc = "";
            if (bIsPhone === false) {
                sImageSrc = "./imgs/peppo-cucina.svg";
            } else {
                sImageSrc = "./imgs/peppo-cucina.svg";
            }
            return sImageSrc;
        }

    };
}
);