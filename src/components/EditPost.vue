<script setup>
    import { Modal } from "bootstrap";
    import { ref } from "vue";
    import { Notyf } from "notyf";
    import api from "../api";

    const props = defineProps({
        post: {
            type: Object,
            required: true,
        },
    });

    const emit = defineEmits(["edit-success"]);

    const modalRef = ref(null);
    const modalId = `editPostModal-${props.post._id}`;
    let modalInstance = null;
    
    const notyf = new Notyf();

    const title = ref(props.post.title);
    const content = ref(props.post.content);
    const isLoading = ref(false);
    
    const openModal = () => {
        if (!modalInstance) {
            modalInstance = new Modal(modalRef.value);
        }
        modalInstance.show();
    };

    const hideModal = () => {
        if (modalInstance) modalInstance.hide();
    };

    const updatePost = async () => {
        try {
            isLoading.value = true;

            await api.patch(`/posts/${props.post._id}`, {
                title: title.value,
                content: content.value
            });

            notyf.success("Post updated successfully!");

            emit("edit-success");

            hideModal();
        } catch (err) {
            notyf.error("Failed to update post.");
        } finally {
            isLoading.value = false;
        }
    };
</script>

<template>
    <div>
        <button class="btn btn-primary" @click="openModal">Edit</button>

        <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="editPostModalLabel" aria-hidden="true" ref="modalRef">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="updatePost">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Post</h5>
                            <button type="button" class="btn-close" @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="postTitle" class="form-label">Title</label>
                                <input
                                    type="text"
                                    id="postTitle"
                                    class="form-control"
                                    v-model="title"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="postContent" class="form-label"
                                    >Content</label
                                >
                                <textarea
                                    id="postContent"
                                    class="form-control"
                                    v-model="content"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideModal">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="isLoading">
                                {{ isLoading ? "Updating..." : "Save Changes" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>