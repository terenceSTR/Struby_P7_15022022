<template>
    <div class="card-groupomania">
        <h1><b-icon-pencil-fill></b-icon-pencil-fill> Modifier le commentaire</h1>

        <b-form @submit.prevent="submitForm" class="form">
            <b-form-group>
                <b-form-textarea
                placeholder="Commentaire"
                rows="4"
                max-rows="6"
                autofocus
                v-model="$v.content.$model"
                :class="{ 'is-invalid' : $v.content.$error, 'is-valid' : !$v.content.$invalid }"
                ></b-form-textarea>

                <b-form-invalid-feedback>Le commentaire est requis</b-form-invalid-feedback>
                <b-form-valid-feedback>Le commentaire est valide</b-form-valid-feedback>
            </b-form-group>

            <b-button type="submit" variant="success" :class="{ 'disabled' : invalidateFields }"><b-icon-pencil-fill></b-icon-pencil-fill> Modifier</b-button>
        </b-form>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { required } from 'vuelidate/lib/validators'

    export default {
        name: 'Modify-comments',

        mounted: function() {
            this.$store.dispatch('getOneComment', {
                postId: this.$route.params.postId,
                id: this.$route.params.id
            });

            this.$store.dispatch('getUserInfos');
        },

        validations: {
            content: {
                required
            }
        },

        computed: {
            ...mapState({
                comment: 'comment',
                userInfos: 'userInfos'
            }),

            content: {
                get() {
                    return this.$store.state.comment.content;
                },
                set(newContent) {
                    this.$store.commit('SET_COMMENT', newContent)
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
            submitForm() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    const self = this;
                    this.$store.dispatch('editComment', {
                        content: this.content,
                        userId: this.userInfos.id
                    })
                    .then(function() {
                        self.$router.push(`/post/${self.comment.postId}`);
                    }, function(error) {
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style></style>
