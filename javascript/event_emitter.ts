interface IListener {
    handleEvent: (...args: any[]) => void;
}

export class EventEmitter {
    private eventListeners = new Map<string, IListener[]>();

    public addEventListener(event: string, handleEvent: () => void) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event)!.push({ handleEvent });
        } else {
            this.eventListeners.set(event, [{ handleEvent }]);
        }
    }

    public removeEventListener(event: string, handleEvent: () => void) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event)!;
            const maybeListener = listeners.findIndex(listener => {
                return listener.handleEvent === handleEvent;
            });
            if (maybeListener >= 0) {
                listeners.splice(maybeListener, 1);
            }
        }
    }

    public emit(event: string, ...args: any[]) {
        const listeners = this.eventListeners.get(event) || [];
        listeners.forEach(listener => {
            listener.handleEvent.apply(this, args);
        });
    }
}
