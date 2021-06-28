<script>
    import CodeMirror from "@svelte-parts/editor/codemirror";
    import "codemirror/lib/codemirror.css";
    import '@svelte-parts/editor/md-dark.css'
	import { code } from '../state/code'

    const config = {
        lineNumbers: true,
        lineWrapping: true,
        theme: "md-dark"
    };

    const handleOnChange = e => {
        code.update(_ => e.getValue())
    }
</script>

<CodeMirror {config} accessEditor={editor => {
    editor.setValue($code)
    editor.on('change', handleOnChange)
}}/>

<style>
    :global(.CodeMirror) {
        height: 100% !important;
    }
</style>