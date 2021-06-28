<script>
	import { HSplitPane } from 'svelte-split-pane';
	import createInterpreter from "./enigmascript";
	import CodeEditor from "./ui/CodeEditor.svelte";
	import Emulator from './ui/Emulator.svelte';

	let code = `
using 🔥, ✨, 💩, 👽️

rotor(🔥 => 💩, ✨ => 🔥, 💩 => 👽️, 👽️ => ✨) starting at 🔥
# Just a comment
rotor(🔥 => 🔥, ✨ => 👽️, 💩 => ✨, 👽️ => 💩) starting at ✨

plugboard(🔥 <=> 👽️, ✨ <=> 💩)

run {
    res = plugboard <- rotors <- in
    rotors.step()
    out = res
}`.trim();

	$: interpreter = createInterpreter(code);

</script>

<div class="wrapper">
	<HSplitPane>
        <left slot="left">
            <CodeEditor bind:code/>
        </left>
        <right slot="right">
            <Emulator />
        </right>
	</HSplitPane>
</div>

<div class="notifications">
	{#await interpreter}
	<p class="loading">...loading</p>
	{:catch errors}
		{#each errors.errors.slice(0, 3) as error}
			<p class="error">[{error.line}:{error.column}] {error.error}</p>
		{/each}
	{/await}
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