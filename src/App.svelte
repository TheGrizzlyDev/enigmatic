<script>
	import createInterpreter from "./enigmascript";
	import CodeEditor from "./ui/CodeEditor.svelte";

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

<CodeEditor bind:code class="editor"/>

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
	:global(.editor) {
		height: 100%;
	}

	.notifications {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
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
</style>