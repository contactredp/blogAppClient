<script setup>
    import PostComponent from '../components/PostComponent.vue';
    import { defineProps } from 'vue';

    const props = defineProps({
        postsData: Array
    });
</script>

<template>
    <div class="row">
        <div class="col my-5">
            <h1 class="text-center text-primary py-1">Blog Post Catalog</h1>
            <p class="text-center">View all blog posts</p>
        </div>
        <div class="text-center my-3">
            <router-link class="btn btn-outline-primary" :to="{ name: 'AddPost' }">Add Post</router-link>
        </div>
    </div>
    <div class="row g-4">
        <PostComponent v-for="post in postsData" :postData="post" />
    </div>
</template>