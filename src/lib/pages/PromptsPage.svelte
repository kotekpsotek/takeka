<script lang=ts>
    import { theme, THEMES } from "../stores/theme";
    import { _ } from 'svelte-i18n';
    import PageWrapper from "./PageWrapper.svelte";
    import PageTitleCard from "./utils/PageTitleCard.svelte";

</script>

<PageWrapper>
    <PageTitleCard
        icons={[
            {
                name: "material-symbols:wand-stars-outline-rounded",
                classAllocation: "bottom-0 left-0 w-16 h-16",
                color: THEMES.DARK === $theme ? "white" : ""
            },
            {
                name: "material-symbols:contextual-token-add-outline-rounded",
                classAllocation: "top-0 right-0 w-16 h-16",
                color: THEMES.DARK === $theme ? "white" : ""
            }
        ]}
        cardName={$_("prompts.heading")}
    >
        <svelte:fragment slot="description">
            {$_("prompts.description")}
        </svelte:fragment>
    </PageTitleCard>
</PageWrapper>