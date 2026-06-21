<script>

    import { ref, watch } from "vue";

    import { Notyf } from 'notyf';

    import { useGlobalStore } from "../stores/global";

    const notyf = new Notyf();

    export default {
        props: {
            postData: Object
        },
        setup({ postData }) {

            const {user} = useGlobalStore();

            return {
                user
            }
        }
    }
    
</script>

<template>
    <div class="col-md-4">
        <div id="PostCard" class="cardHighlights card p-2 shadow-sm">

            <img 
                class="card-img-top"
                :src="`https://placehold.co/600x400/63c3ff/ffffff?font=raleway&text=${encodeURIComponent(postData.content)}`"
                :alt="postData.content"
            >

            <div class="card-body fw-bold mb-2">
                <h4 class="card-title">
                    {{postData.title}}
                </h4>
                <div class="d-grid mt-3">
                    <router-link class="btn btn-outline-primary d-block" 
                    :to="{ path: `/posts/${postData._id}`}">
                        Details & Options
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
