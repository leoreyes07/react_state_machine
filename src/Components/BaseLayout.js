import React from "react";
import { useMachine } from "@xstate/react";
import bookingMachine from "../Machines/bookingMachine";

export const BaseLayout = () => {
    useMachine(bookingMachine);

    return (
        <div className="base-layout">
            Hi there! This is the base layout.
        </div>
    );
};


