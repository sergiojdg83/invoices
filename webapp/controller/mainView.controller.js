sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
/**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 * @param {typeof sap.ui.model.Filter} Filter
 * @param {typeof sap.ui.model.FilterOperator} FilterOperator
 * @param {typeof sap.ui.model.json.JSONModel} JSONModel
 */

    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.invoices.controller.mainView", {
            onInit: function () {

                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();
                oJSONModel.loadData("./model/selectionScreenMenu.json");
                oView.setModel(oJSONModel, "selectionScreen");

            }
        });
    });
