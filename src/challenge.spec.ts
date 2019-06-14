import {ShipmentUpdateListenerInterfaceImpl} from "./challenge";

test(`
executions of updateShipment with the same id never run concurrently 
                  OR
any id should not run more than one or lesser than 0, at any point in time

Example run=>
 [ { start: '1' },
 { start: '2' },
 { end: '2' },
 { start: '2' },
 { end: '1' },
 { start: '1' },
 { end: '1' },
 { end: '2' } ]
 Expected => At any point "running" object should have either 1 or 0 as value of its keys(ids)
 
`, async () => {
    const shipmentUpdateListenerInterfaceImpl = new ShipmentUpdateListenerInterfaceImpl();
    let actual: any;

    await Promise.all([
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("2", {}),
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("2", {}),
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
        shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
    ]);

    actual = await new Promise((res) => {
        setTimeout(async () => {
            [actual] = await Promise.all([
                shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
                shipmentUpdateListenerInterfaceImpl.receiveUpdate("2", {}),
                shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
                shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
                shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
                shipmentUpdateListenerInterfaceImpl.receiveUpdate("1", {}),
            ]);
            res(actual);
        }, 6000);
    });

    const running: any = {
        1: 0,
        2: 0
    };
    console.log(actual);
    actual.forEach(({start, end}: any) => {
        if (start) {
            running[start]++;
        } else if (end) {
            running[end]--;
        }
        expect(running[1]).toBeGreaterThanOrEqual(0);
        expect(running[1]).toBeLessThanOrEqual(1);
        expect(running[2]).toBeGreaterThanOrEqual(0);
        expect(running[2]).toBeLessThanOrEqual(1);
    });

}, 100000);
