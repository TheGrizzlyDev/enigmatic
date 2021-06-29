import { writable } from "svelte/store"; 

export const notifications = writable([])

export function addNotification({
    level = 'info',
    notifier,
    msg,
}) {
    const notification = {
        level,
        msg,
        notifier
    }
    notifications.update(notifications => [...notifications, notification])

    const close = () => {
        notifications.update(notifications => notifications.filter(it => it !== notification))
    }

    return { close }
}

export const addError = (notification) => addNotification({ level: 'error', ...notification })
