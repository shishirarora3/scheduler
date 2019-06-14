"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShipmentUpdateListenerInterfaceImpl = /** @class */ (function () {
    function ShipmentUpdateListenerInterfaceImpl() {
        this.queueUpdates = new QueueUpdates();
        this.shipmentSearchIndex = new ShipmentSearchIndex();
    }
    ShipmentUpdateListenerInterfaceImpl.prototype.receiveUpdate = function (id, shipmentData) {
        var _this = this;
        this.queueUpdates.requestReceiveUpdate(id, function () { return _this.shipmentSearchIndex.updateShipment(id, shipmentData); });
    };
    return ShipmentUpdateListenerInterfaceImpl;
}());
exports.ShipmentUpdateListenerInterfaceImpl = ShipmentUpdateListenerInterfaceImpl;
//# sourceMappingURL=shipmentUpdateListenerInterfaceImpl.js.map
