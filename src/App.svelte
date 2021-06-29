<script>
	import { HSplitPane } from 'svelte-split-pane';
	import AppBar from './ui/AppBar.svelte';
	import CodeEditor from "./ui/CodeEditor.svelte";
	import Emulator from './ui/Emulator.svelte';
	import Notification from './ui/Notification.svelte';

	let appbarHeight;
</script>


<AppBar bind:height={appbarHeight}/>

<div class="wrapper" class:appbarHeight style="--appbar-height: {appbarHeight}px">
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

	div.appbarHeight {
    	padding-top: var(--appbar-height);
		height: calc(100% - var(--appbar-height));
	}

</style>