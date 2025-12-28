<script lang="ts">
    export let isDraggable: boolean = false;
    export let name: string;
    export let size: "fit" | "md" | "lg" | "xl" | "2xl" = "fit";

    /** Has width and height as value incorporated as value */
    let modalSizeClass: string;
    $: switch(size) {
        case "fit":
            modalSizeClass = "w-fit h-fit";
        break;
        
        case "md":

        break;
        
        case "lg":

        break;
            
        case "xl":

        break;
            
        case "2xl":

        break;
    }
</script>

<div 
    id="modal-wrapper"
    class="w-full h-full bg-black bg-opacity-50"
>
    <div 
        id="modal"
        class="{modalSizeClass}"
    >

    </div>
</div>
