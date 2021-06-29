<script>
	import { HSplitPane } from 'svelte-split-pane';
	import CodeEditor from "./ui/CodeEditor.svelte";
	import Emulator from './ui/Emulator.svelte';
	import Notification from './ui/Notification.svelte';

</script>

<div class="wrapper">
	<HSplitPane>
        <left slot="left">
            <CodeEditor/>
        </left>
        <right slot="right">
            <Emulator/>
        </right>
	</HSplitPane>
</div>

<Notification />

<style>

	div.wrapper {
		width: 100%;
		height: 100%;
		margin: 0px;
	}

</style>