<script>
    import { notifications } from "../state/notification";
    import Fa from "svelte-fa";
    import {
        faTimesCircle,
        faExclamationTriangle,
        faInfoCircle,
    } from "@fortawesome/free-solid-svg-icons";

    const iconFor = (notification) =>
        ({
            error: faTimesCircle,
            warn: faExclamationTriangle,
            info: faInfoCircle,
        }[notification.level]);
</script>

<div class="notifications">
    {#each $notifications.slice(0, 3) as notification}
        <p class="notification {notification.level}">
            <Fa icon={iconFor(notification)} />
            {notification.notifier}: {notification.msg}
        </p>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        z-index: 10000;
        background: linear-gradient(0deg, #999f 50%, transparent);
    }

    .notification {
        margin: 8px;
        padding: 4px;
        border-radius: 2px;
    }

    .info {
        background: #fafafa;
        color: #202020;
    }

    .error {
        background: #c00000;
        color: #f0f0f0;
    }

    .warn {
        background: #ebe710;
        color: #202020;
    }
</style>
