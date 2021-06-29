<script>
    import { changeFile } from '../state/code'

    export let height

    let templateFile
    $: templateFile && changeFile(templateFile)
</script>

<div class="container" bind:clientHeight={height}>
    <img class="logo" src="logo.svg" alt="Enigma logo" />

    <select name="template" bind:value={templateFile}>
        <option value="real">Realistic</option>
        <option value="emoji">Emoji</option>
        <option value="bool">True/False</option>
    </select>
</div>


<style>
    .container {
        position: fixed;
        z-index: 100000;
        width: 100%;
        background: #1a1a1a;
        border-bottom: 1px solid #111;
        padding: 4px 8px;
        display: flex;
    }

    .logo {
        height: 32px;
        padding: 4px;
    }
</style>