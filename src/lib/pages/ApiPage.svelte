<script lang=ts>
    import { theme, THEMES } from "../stores/theme";
    import PageWrapper from "./PageWrapper.svelte";
    import PageTitleCard from "./utils/PageTitleCard.svelte";
</script>

<PageWrapper>
    <!-- Page card -->
    <PageTitleCard
        icons={[
            {
                name: "material-symbols:api-rounded",
                classAllocation: "bottom-0 left-0 w-16 h-16",
                color: THEMES.DARK === $theme ? "white" : ""
            },
            {
                name: "material-symbols:network-intel-node",
                classAllocation: "top-0 right-0 w-16 h-16",
                color: THEMES.DARK === $theme ? "white" : ""
            }
        ]}
        cardName="API"
    >
        <p slot="description">
            Connect your app/s with <b>RavenLens API</b>
        </p>
    </PageTitleCard>

    <!-- Rest of content -->
</PageWrapper>