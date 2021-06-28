<script>
    // based on https://www.cmu.edu/biolphys/deserno/pdf/log_interpol.pdf
    const logInterpolation = (xMin, xMax, yMin, yMax, current) => {
        const clampedCurrent = Math.min(yMax, Math.max(yMin, current));
        const factor = (clampedCurrent - yMin) / (yMax - yMin);
        return Math.floor(Math.pow(xMax, factor) * Math.pow(xMin, 1 - factor));
    };

    const alphabet = ["🔥", "✨", "💩", "👽️"]; //will become part of the ctx

    const minFont = 16;
    const maxFont = 32;
    $: fontSize = logInterpolation(maxFont, minFont, 4, 26, alphabet.length);

    // Given
    // ratio = Math.round(Math.sqrt(length))
    // cols = 3 * rows
    // length = cols * rows
    // Then
    // rows = length / cols
    // cols / 3 = length / cols
    // cols^2 / 3 = length
    // cols^2 = length * 3
    // cols = Math.floor(Math.sqrt(length * Math.round(Math.sqrt(length))))
    $: maxCols = Math.floor(
        Math.sqrt(alphabet.length * Math.round(Math.sqrt(alphabet.length)))
    );

    // given the number of expected cols we calculate the rows
    $: rows = Math.ceil(alphabet.length / maxCols);

    // once we have the rows we recalculate the number of effective cols so we avoid overstacking the last one
    $: cols = Math.ceil(alphabet.length / rows);

    $: items = new Array(rows)
        .fill()
        .map((_, row) => alphabet.slice(row * cols, (row + 1) * cols));

    let highlighted;
    let clicked;
    let cancelClicked;
    let output = '🔥' //TODO replace with actual output from the machine

    const clickTimeout = 1000;
    $: {
        clearTimeout(cancelClicked);
        cancelClicked = (clicked || output) && setTimeout(() => {
                clicked = null;
                output = null;
        }, clickTimeout);
    }
</script>

<div class="emulator" style="--font-size: {fontSize}px">
    <div class="container display">
        <div class="section-title">OUT</div>
        {#each items as row}
            <div class="row">
                {#each row as item}
                    <span 
                        class="key"
                        class:clicked={output === item}>{item}</span>
                {/each}
            </div>
        {/each}
    </div>

    <div class="container keyboard">
        <div class="section-title">IN</div>
        {#each items as row}
            <div class="row">
                {#each row as item}
                    <span
                        class="key"
                        class:clicked={clicked === item}
                        class:highlighted={highlighted === item}
                        on:click={(_) => (clicked = item)}
                        on:mouseenter={(_) => (highlighted = item)}
                        on:mouseleave={(_) => (highlighted = null)}>{item}</span
                    >
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    div.emulator {
        --dark-color: #222;
        --light-color: #efefef;
        font-size: var(--font-size, 16px);
        display: flex;
        flex-direction: column;
        height: 100%;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        background: var(--dark-color);
        color: var(--light-color);
    }

    div.section-title {
        text-align: center;
        font-size: 1.5em;
        color: var(--dark-color);
        background: var(--light-color);
    }

    div.container {
        margin: 8px;
        border: 4px solid var(--light-color);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-evenly;
    }

    div.row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-evenly;
    }

    span.key {
        padding: 1em;
        background: var(--light-color);
        border-radius: 4em;
        border: 1px solid #aaa;
        margin: 0.5em;
    }

    span.highlighted {
        border-color: #dddf6b;
        background: #eff0c3;
    }

    span.clicked {
        border-color: #e4e73c;
        background: #dddf6b;
    }
</style>
