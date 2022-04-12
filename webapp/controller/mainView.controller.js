sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/odata/v2/ODataModel',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} _Filter
     * @param {typeof sap.ui.model.FilterOperator} _FilterOperator
     */

    function (Controller, _Filter, _FilterOperator, ODataModel) {
        "use strict";

        return Controller.extend("logaligroup.invoices.controller.mainView", {
            onInit: function () {
                //debugger;
               this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZOD_INV_LIST_SRV");

                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();
                oJSONModel.loadData("./model/selectionScreenMenu.json");
                oView.setModel(oJSONModel, "selectionScreen");
                
                this.oJSONModel1 = new sap.ui.model.json.JSONModel();
                //  const oView1 = this.getView();
                //  this.oJSONModel1.loadData("./model/invoicesList.json");
                //  oView1.setModel(this.oJSONModel1, "invoicesList");

                this.oDataModel.read("/InvoicesListSet", {
                    // filters: 
                    success: (oData) => {
                        //const a = this.oJSONModel1.getData();
                        //debugger;
                        const b = oData.results;

                       // const a = oData.results[].Country;
                    
                        // this.oDataModel.setData(b);
                        this.oJSONModel1.setData(b);
                        this.getView().setModel(this.oJSONModel1, "invoicesList");

                    },
                    error: function _OnError(_oError) {
                        oView.setBusy(false);
                    }
                });

            },
            onFilter: function (_oEvent) {
                // debugger;
                const oData = this.getView().getModel("selectionScreen").getData();
                let filters = [];
                if (oData.ShipName !== "") {
                    filters.push(new _Filter("Shipname", _FilterOperator.Contains, oData.ShipName));
                }
                if (oData.CountryKey !== "") {
                    filters.push(new _Filter("Country", _FilterOperator.EQ, oData.CountryKey));
                }
                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },
            onTest: function () {
                this.oDataModel.read("/InvoicesListSet", {
                    // filters: 
                    success: (oData) => {

                        //const a = this.oJSONModel1.getData();
                        const b = oData.results;
                        //   debugger;
                        // this.oDataModel.setData(b);
                        this.oJSONModel1.setData(b);
                        this.getView().setModel(this.oJSONModel1, "invoicesList");
                        // oView.byId("shipName").setText(oData.results[0].Shipname);
                        // oView.byId("Country").setText(oData.results[0].Country);
                        // oView.byId("CID").setText(oData.results[0].Pernr);
                        // var date = new Date().toISOString().substr(5, 2);
                        //  oView.byId("inputMonth").setSelectedKey(date);
                        // oView.byId("inputYear").setValue(new Date().getFullYear());

                    },
                    error: function _OnError(_oError) {

                        oView.setBusy(false);
                    }
                });

            },
            onClearFilter: function () {
                const oModelSelScreen = this.getView().getModel("selectionScreen");
                oModelSelScreen.setProperty("/ShipName", "");
                oModelSelScreen.setProperty("/CountryKey", "");

                const oList = this.getView().byId("invoicesList");
                const oBinding = oList.getBinding("items");
                oBinding.filter([]);
            }
        });
    });
