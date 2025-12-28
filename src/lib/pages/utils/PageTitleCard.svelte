<!-- Is wrapper for page title -->
<script lang=ts>
    import Icon from "@iconify/svelte";
    import { motionInView } from "../../utils/motion";

    export let icons: { name: string, classAllocation: string, color?: string }[] = [];
    export let cardName: string;
</script>

<div class="relative w-full dark:bg-base-100 overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50" use:motionInView={{ animation: 'fadeInDown' }}>
    <!-- Background optional icons -->
    {#each icons as icon}
        <div class="absolute {icon.classAllocation.trim() || "top-0 right-0 w-16 h-16"} opacity-10">
            <Icon icon={icon.name} color={icon.color} class="w-full h-full text-primary" />
        </div>
    {/each}

    <!-- Content -->
    <div class="relative flex items-center justify-between">
        <!-- Card name and descritpion -->
        <div>
            <h1
            class="text-3xl font-bold text-primary"
            >
                {cardName}
            </h1>

            <p class="mt-2 text-sm text-base-content/70 max-w-md">
                <slot name="description"/>
            </p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3">
            <slot name="buttons"/>
        </div>
    </div>
</div>
