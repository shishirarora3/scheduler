declare class ShipmentSearchIndex {
    updateShipment(id: string, shipmentData: any): Promise<{
        startTime: Date;
        endTime: Date;
    }>;
}
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any): any;
}
declare class QueueUpdates {
    map: any;
    log: Array<any>;
    timeouts: any;
    trigger(id: string): Promise<any>;
    requestReceiveUpdate(id: string, cb: Function): Promise<any>;
}
export declare class ShipmentUpdateListenerInterfaceImpl implements ShipmentUpdateListenerInterface {
    queueUpdates: QueueUpdates;
    shipmentSearchIndex: ShipmentSearchIndex;
    receiveUpdate(id: string, shipmentData: any): any;
}
export {};
