<script>
    import CodeMirror from "@svelte-parts/editor/codemirror";
    import "codemirror/lib/codemirror.css";
    import '@svelte-parts/editor/md-dark.css'

    export let code = '';


    const config = {
        lineNumbers: true,
        lineWrapping: true,
        theme: "md-dark"
    };
</script>

<CodeMirror {config} accessEditor={editor => {
    editor.setValue(code)
    editor.on('change', e => code = e.getValue())
}}/>
