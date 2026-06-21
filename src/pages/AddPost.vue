<script setup>
    import { ref, onBeforeMount, watch } from "vue";
    import { Notyf } from "notyf";
    import { useRouter } from "vue-router";
    import { useGlobalStore } from "../stores/global";
    import api from "../api";

    const notyf = new Notyf();
    const router = useRouter();
    const { user } = useGlobalStore();

    const title = ref("");
    const content = ref("");
    const isEnabled = ref(false);

    async function handleSubmit() {
        const post = {
            title: title.value,
            content: content.value
        };

        try {
            const response = await api.post("/posts", post);

            if (response.status === 201) {
                notyf.success(response.data.message);

                router.push({ path: "/posts" });
            } else {
                notyf.error(response.data.message);
            }
        } catch (error) {
            if (error.response.status === 409) {
                notyf.error(error.response.data.message);
            } else {
                console.error(error.response.data.message);
                notyf.error("Error adding post. Please contact administrator.");
            }
        }
    }

    watch([title, content], (currentValue, oldValue) => {
        if (currentValue.every((input) => input !== "")) {
            isEnabled.value = true;
        } else {
            isEnabled.value = false;
        }
    });

    onBeforeMount(() => {
        if (!user.token) {
            router.push({ path: "/posts" });
        }
    });
</script>

<template>
    <div class="container my-5" style="max-width: 500px">
        <h1 class="text-center">Add New Post</h1>
        <form v-on:submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="postTitleInput" class="form-label">Title</label>
                <input type="text" class="form-control" id="postTitleInput" v-model="title" />
            </div>
            <div class="mb-3">
                <label for="postContent" class="form-label">Content</label>
                <textarea
                    class="form-control"
                    id="postContent"
                    v-model="content"
                    rows="5"
                ></textarea>
            </div>
            <button type="submit" class="btn btn-primary" v-if="isEnabled">Add Post</button>
            <button type="submit" class="btn btn-danger" disabled v-else>Add Post</button>
        </form>
    </div>
</template>