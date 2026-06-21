<script setup>

    import { watch, ref } from 'vue';
    import { Notyf } from 'notyf';

    import axios from 'axios';

    import { onBeforeMount } from 'vue';

    import {useGlobalStore} from '../stores/global';

    import {useRouter} from 'vue-router';

    const store = useGlobalStore();
    const getUserDetails = store.getUserDetails;

    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    const notyf = new Notyf();

    watch([email,password], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    async function handleSubmit(e){
        e.preventDefault();

        try {

            let res = await axios.post(`${import.meta.env.VITE_BLOG_APP_API}/users/login`, {
                email: email.value,
                password: password.value
            })

            if(res.data) {

                notyf.success("Login Successful");

                localStorage.setItem("token", res.data.access);

                await getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                router.push({path: '/posts'})
            }
        } catch (e) {
            if(e.response.status === 404 || e.response.status === 401 || e.response.status === 400) {
                notyf.error(e.response.data.message);
            } else {
                notyf.error("Login Failed. Please contact administrator.")
            }

        }
    }

    onBeforeMount(() => {
        if (store.user.token) {
            router.push('/posts');
        }
    });
</script>

<template>
    <div class="container-fluid">
        <h1 class="my-5 pt-3 text-primary text-center">Login Page</h1> 
        <div class="row d-flex justify-content-center">
            <div class="col-md-5 border border rounded-3 mx-auto p-5">
                <form v-on:submit="handleSubmit">
                    <div class="mb-3">
                        <label for="emailInput" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="emailInput" v-model="email" />
                    </div>
                    <div class="mb-3">
                        <label for="passwordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="passwordInput" v-model="password" />
                    </div>
                    <div class="d-grid mt-5">
                        <button type="submit" class="btn btn-primary btn-block"  v-if="isEnabled">Login</button>
                        <button type="submit" class="btn btn-danger btn-block" disabled v-else>Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
