<script setup>
    import { ref, computed } from "vue";
    import { Notyf } from "notyf";
    import api from "../api";

    const props = defineProps({
        post: {
            type: Object,
            required: true,
        },
    });

    const notyf = new Notyf();

    const emit = defineEmits(["post-deleted"]);

    const isLoading = ref(false);

    const deletePost = async () => {

        try {
            await api.delete(`/posts/${props.post._id}`);

            notyf.success("Post deleted successfully!");

            emit("post-deleted");
        } catch (err) {
            notyf.error("Action failed. Please try again.");
        }
    };
</script>

<template>
    <button class="btn btn-danger" @click="deletePost" :disabled="isLoading">Delete</button>
</template>