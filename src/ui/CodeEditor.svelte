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

    const accessEditor = editor => {
        editor.on('change', e => {
            code.update(_ => e.getValue())
        })
        code.subscribe(value => {
            if (! value) return
            editor.setValue(value)
        })
    }
</script>

<CodeMirror {config} {accessEditor}/>

<style>
    :global(.CodeMirror) {
        height: 100% !important;
    }
</style>