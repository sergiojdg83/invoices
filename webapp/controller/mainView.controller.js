sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} _Filter
     * @param {typeof sap.ui.model.FilterOperator} _FilterOperator
     */

    function (Controller, _Filter, _FilterOperator) {
        "use strict";

        return Controller.extend("logaligroup.invoices.controller.mainView", {
            onInit: function () {

                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();
                oJSONModel.loadData("./model/selectionScreenMenu.json");
                oView.setModel(oJSONModel, "selectionScreen");

                const oJSONModel1 = new sap.ui.model.json.JSONModel();
                const oView1 = this.getView();
                oJSONModel1.loadData("./model/invoicesList.json");
                oView1.setModel(oJSONModel1, "invoicesList");
            },
            onFilter: function (_oEvent){
               const oData = this.getView().getModel("selectionScreen").getData();
               let filters = [];
               if(oData.ShipName !== "") {
                 filters.push(new _Filter ("ShipName", _FilterOperator.Contains, oData.ShipName));
               }
               if(oData.CountryKey !== "") {
                filters.push(new _Filter ("Country", _FilterOperator.EQ, oData.CountryKey));
              }
              const oList = this.getView().byId("invoicesList");
              const oBinding = oList.getBinding("items");
              oBinding.filter(filters);
            },
            onClearFilter: function (){
                const oModelSelScreen = this.getView().getModel("selectionScreen");
                oModelSelScreen.setProperty("/ShipName", "");
                oModelSelScreen.setProperty("/CountryKey", "");

                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter([]);
            }
        });
    });
