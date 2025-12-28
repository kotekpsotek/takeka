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
                name: "material-symbols:settings-outline-rounded",
                classAllocation: "top-0 right-0 w-16 h-16",
                color: THEMES.DARK === $theme ? "white" : ""
            }
        ]}
        cardName={$_("workspaceSettings.heading")}
    >
        <svelte:fragment slot="description">
            {$_("workspaceSettings.description")}
        </svelte:fragment>
    </PageTitleCard>
</PageWrapper>