import { useEffect } from 'react';
import { EventEmitter } from "eventemitter3";

const eventLeaderboard = new EventEmitter();

export const sendEndGame = (score) => {
    eventLeaderboard.emit("endGame", { score });
}

export const useSubscribeToEvent = (ev, handler) => {
    useEffect(() => {
        eventLeaderboard.on(ev, handler);

        return () => eventLeaderboard.off(ev);
    }, [ev, handler]);
}
