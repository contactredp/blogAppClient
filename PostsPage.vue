<script>

    import api from '../api.js';

    import {ref, reactive, onMounted, onBeforeMount, watch} from 'vue';

    import PostComponent from '../components/PostComponent.vue';
    import UserView from '../components/UserView.vue';
    import { useGlobalStore } from '../stores/global.js';
    import { useRouter } from "vue-router";

    export default {
        components: {
            PostComponent,
            UserView
        },
        setup() {

            const router = useRouter();

            const { user } = useGlobalStore();

            const posts = reactive({data:[]});

            const fetchPosts = async () => {
                let { data } = await api.get("/posts/all");
                console.log(data);
                posts.data = data;
            };

            /*watch(() => user.isAdmin,
                async () => {

                    let { data } = await api.get("/posts/all");
                    console.log(data);
                    posts.data = data;

                },
                { immediate: true }
            )*/

            onBeforeMount(async () => {

                if (!user.token) {
                    router.push("/login");
                    return;
                }

                let { data } = await api.get("/posts/all");
                posts.data = data;
            });

            return {
                posts,
                user,
                fetchPosts
            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="row">
            <UserView :postsData="posts.data" />
        </div>
    </div>
</template>

<style scoped>

</style>
