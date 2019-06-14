async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return {startTime, endTime}
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any): any
}

class QueueUpdates {
    map: any = {};
    log: Array<any> = [];
    timeouts: any = {};

    async trigger(id: string): Promise<any> {
        const cbs = this.map[id];
        this.map[id] = [];
        const {startTime, endTime} = await cbs
            .reduce(
                async (
                    prevPromise: Promise<any>,
                    cb: Function
                ) => {
                    const {startTime, endTime} = await prevPromise;
                    if (startTime && endTime) {
                        this.log.push({"start": id, startTime});
                        this.log.push({"end": id, endTime});
                    }
                    return cb();
                }, Promise.resolve({startTime: false, endTime: false})
            );
        if (startTime && endTime) {
            this.log.push({"start": id, startTime});
            this.log.push({"end": id, endTime});
        }
        if (this.map[id] && this.map[id].length) {
            await this.trigger(id);
        }
    }

    requestReceiveUpdate(id: string, cb: Function): Promise<any> { //1
        const map: any = this.map;
        if (!map[id] || !map[id].length) {
            map[id] = [cb]
        } else {
            map[id].push(cb);
        }
        return new Promise((res) => {
            if (!!this.timeouts[id]) {
                clearTimeout(this.timeouts[id].timeoutId);
                this.timeouts[id].res();
            }
            this.timeouts[id] = {
                res: () => res(this.log),
                timeoutId: setTimeout(
                    () => {
                        this.trigger(id).then(r => {
                            res(this.log);
                        })
                    },
                    0
                )
            }
        });
    }
}

export class ShipmentUpdateListenerInterfaceImpl implements ShipmentUpdateListenerInterface {
    queueUpdates = new QueueUpdates();
    shipmentSearchIndex = new ShipmentSearchIndex();

    receiveUpdate(id: string, shipmentData: any): any {
        return this.queueUpdates.requestReceiveUpdate(id, () => this.shipmentSearchIndex.updateShipment(id, shipmentData));
    }
}
