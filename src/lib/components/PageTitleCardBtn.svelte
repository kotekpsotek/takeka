<script lang=ts>
    import Icon from "@iconify/svelte";
    import { motionHover } from "../utils/motion";

    export let content: string;
    export let iconA: string | undefined = undefined;
    export let iconB: string | undefined = undefined;
</script>

<button 
    class="btn btn-primary rounded-lg shadow-xl hover:shadow-2xl group relative overflow-hidden"
    on:click
    use:motionHover
>
    <div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="relative flex items-center gap-2">
        <div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">
            {#if iconA}
                <Icon icon={iconA} class="w-4 h-4" />
            {/if}
        </div>
        {content}
        {#if iconB}
            <Icon icon={iconB} class="w-4 h-4"/>
        {/if}
    </div>
</button>