import React from 'react';
import { useDispatch } from 'react-redux';

import { toggleUserInterfaceProp } from '../reducers';

export default function useAlerts() {
    const dispatch = useDispatch();

    function displayAlert(alertText: string, alertTriggerId: string) {
        const alertTrigger = window.document.getElementById(alertTriggerId);
        dispatch(toggleUserInterfaceProp({ alertText }));
        if (alertTrigger) {
            alertTrigger.click();
        }
    }

    return { displayAlert };
}
