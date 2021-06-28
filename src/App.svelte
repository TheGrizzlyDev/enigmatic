<script>
	import { HSplitPane } from 'svelte-split-pane';
	import CodeEditor from "./ui/CodeEditor.svelte";
	import Emulator from './ui/Emulator.svelte';
	import { parsingErrors } from './state/interpreter';

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

<div class="notifications">
	{#each $parsingErrors.slice(0, 3) as error}
		<p class="error">Parser error: [{error.line}:{error.column}] {error.error}</p>
	{/each}
</div>

<style>
	.notifications {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		z-index: 10000;
		background: #202020f0;
	}

	.loading {
		margin: 8px;
		padding: 4px;
		border-radius: 2px;
		background: #fafafa;
    	color: #a0a0a0;
	}

	.error {
		margin: 8px;
		background: #c00000;
		color: #f0f0f0;
		padding: 4px;
		border-radius: 2px;
	}


	div.wrapper {
		width: 100%;
		height: 100%;
		margin: 0px;
	}

</style>