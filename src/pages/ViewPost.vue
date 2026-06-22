<script setup>

    import { onBeforeMount, reactive } from 'vue';

    import { useRoute, useRouter } from 'vue-router';

    import api from "../api";

    import {useGlobalStore} from '../stores/global';

    import { Notyf } from 'notyf';

    import EditPost from "../components/EditPost.vue";
    import DeletePost from "../components/DeletePost.vue";

    import { computed } from 'vue';

    const canEdit = computed(() => {
        return user.id === post.data.userId;
    });

    const canDelete = computed(() => {
        return user.isAdmin || user.id === post.data.userId;
    });

    const router = useRouter();

    const { user } = useGlobalStore();

    const notyf = new Notyf();

    const post = reactive({ data: {} });

    const goBack = () => {
        router.push({path: '/posts'})
    };

    const refreshPage = () => {
        window.location.reload();
    };

    onBeforeMount(async () => {

        const route = useRoute();

        let { data } = await api.get(
            `/posts/specific/${route.params.id}`
        );

        post.data = data;
    })

</script>

<template>
    <div class="container">
        <div class="row mx-auto my-3 gap-4 gap-md-0">

            <div class="col-md-6">
                <img
                    class="img-fluid rounded"
                    :src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(post.data.content)}`"
                    :alt="post.data.content"
                />
            </div>

            <div class="col-md-6">
                <div class="d-flex gap-2 text-primary">
                    <h1 class="bi bi-chat-dots"></h1>
                    <h1 class="mb-3">{{ post.data.title }}</h1>
                </div>

                <p>
                    Poster's ID: {{ post.data.userId }}
                </p>

                <p>
                    Posted on: {{ post.data.createdOn }}
                </p>

                <!-- <div class="d-flex" v-if="user.isAdmin">
                    <EditPost class="mx-1" :post="post.data" @edit-success="refreshPage" />
                    <DeletePost class="mx-1" :post="post.data" @post-deleted="goBack" />
                </div>
                <div class="d-flex" v-if="!user.isAdmin">
                    <router-link class="btn btn-primary" :to="{ name: 'Logout' }">Login as admin to edit or delete</router-link>
                </div> -->

                <div class="d-flex gap-2">

                    <EditPost
                        v-if="canEdit"
                        :post="post.data"
                        @edit-success="refreshPage"
                    />

                    <DeletePost
                        v-if="canDelete"
                        :post="post.data"
                        @post-deleted="goBack"
                    />

                </div>
            </div>

        </div>
    </div>
</template>