<template>
    <div class="card-groupomania">
        <h1><b-icon-plus-circle-fill></b-icon-plus-circle-fill> Publier un post</h1>

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
                v-model="content"
                placeholder="Contenu"
                rows="4"
                max-rows="8"
                ></b-form-textarea>
            </b-form-group>

            <b-form-group>
                <div class="mb-3">{{ imageUrl ? 'Image sélectionnée' : 'Sélectionner une image' }} : <b-button v-if="file" class="btn-remove-file" @click="removeFile()" size="sm" variant="outline-danger">Enlever l'image</b-button></div>
                <b-form-file 
                v-model="file"
                plain
                ref="file-input"
                accept="image/*"
                @change="onFilePicked"
                ></b-form-file>
            </b-form-group>
        
            <b-button type="submit" variant="light" :class="{ 'disabled' : invalidateFields }"><b-icon-plus-circle-fill></b-icon-plus-circle-fill> Publier</b-button>
        </b-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required } from 'vuelidate/lib/validators'

    export default {
        name: 'Create-posts',

        mounted: function() {
            this.$store.dispatch('getUserInfos');
        },

        data() {
            return {
                title: '',
                content: '',
                imageUrl: null
            }
        },

        validations: {
            title: {
                required
            }
        },

        computed: {
            ...mapState({
                userInfos: 'userInfos'
            }),

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
                this.imageUrl = event.target.files[0];
            },

            removeFile() {
                this.$refs['file-input'].reset();
            },

            submitForm() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    const formData = new FormData();
                    formData.append('title', this.title);
                    formData.append('content', this.content);
                    formData.append('image', this.imageUrl);
                    formData.append('userId', this.userInfos.id);
                    
                    const self = this;
                    this.$store.dispatch('createPost', formData)
                        .then(function() {
                            self.$router.push('/');
                        }, function(error) {
                            console.log(error);
                        });
                }
            }
        }
    }
</script>

<style></style>
