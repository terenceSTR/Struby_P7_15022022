<template>
    <div class="card-groupomania">
        <h1><b-icon-pencil-fill></b-icon-pencil-fill> Modifier le post</h1>

        <b-form @submit.prevent="submitForm" class="form">
            <b-form-group>
                <b-form-input
                placeholder="Titre"
                type="text"
                autofocus
                v-model="$v.title.$model"
                :class="{ 'is-invalid' : $v.title.$error, 'is-valid' : !$v.title.$invalid }"
                ></b-form-input>

                <b-form-invalid-feedback>Le titre est requis</b-form-invalid-feedback>
                <b-form-valid-feedback>Le titre est valide</b-form-valid-feedback>
            </b-form-group>

            <b-form-group>
                <b-form-textarea
                placeholder="Contenu"
                rows="4"
                max-rows="8"
                v-model="content"
                ></b-form-textarea>
            </b-form-group>

            <div class="current-post-image" v-if="image">
                <img :src="image" :alt="title" class="post-image">
            </div>

            <b-form-group>
                <div class="mb-3">{{ file ? 'Image sélectionnée' : 'Sélectionner une nouvelle image' }} : <b-button v-if="file" class="btn-remove-file" @click="removeFile()" size="sm" variant="outline-danger">Enlever l'image</b-button></div>
                <b-form-file 
                v-model="file"
                plain
                ref="file-input"
                accept="image/*"
                @change="onFilePicked"
                ></b-form-file>
            </b-form-group>
        
            <b-button type="submit" variant="success" :class="{ 'disabled' : invalidateFields }"><b-icon-pencil-fill></b-icon-pencil-fill> Modifier</b-button>
        </b-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required } from 'vuelidate/lib/validators'

    export default {
        name: 'Modify-posts',

        mounted: function() {
            this.$store.dispatch('getOnePost', this.$route.params.id);
            this.$store.dispatch('getUserInfos');
        },

        data() {
            return {
                file: null
            }
        },

        validations: {
            title: {
                required
            }
        },

        computed: {
            ...mapState({
                post: 'post',
                userInfos: 'userInfos'
            }),

            title: {
                get() {
                    return this.$store.state.post.title;
                },
                set(newTitle) {
                    this.$store.commit('SET_POST_TITLE', newTitle)
                }
            },

            content: {
                get() {
                    return this.$store.state.post.content;
                },
                set(newContent) {
                    this.$store.commit('SET_POST_CONTENT', newContent)
                }
            },

            image: {
                get() {
                    return this.$store.state.post.imageUrl;
                }
            },

            invalidateFields: function() {
                if (this.$v.$invalid) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            onFilePicked(event) {
                this.file = event.target.files[0];
            },

            removeFile() {
                this.$refs['file-input'].reset();
            },

            submitForm() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    const formData = new FormData();
                    const postId = this.post.id;

                    formData.append('title', this.title);
                    formData.append('content', this.content);
                    formData.append('image', this.file);
                    formData.append('userId', this.userInfos.id);

                    const self = this;
                    this.$store.dispatch('modifyPost', formData)
                        .then(function() {
                            self.$router.push(`/post/${postId}`);
                        }, function(error) {
                            console.log(error);
                        })
                }
            }
        }
    }
</script>

<style></style>
