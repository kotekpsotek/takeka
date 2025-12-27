<!-- Is wrapper for page title -->
<script lang=ts>
    import { motionInView } from "../utils/motion";
</script>

<div class="relative dark:bg-base-100 overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50" use:motionInView={{ animation: 'fadeInDown' }}>
    <slot/>
</div>
