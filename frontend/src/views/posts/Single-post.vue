<template>
    <div class="single" v-if="post">
        <!-- Single Post -->
        <div class="single-post">
            <div class="user">
                <div class="user-info" v-if="post.User">
                    <b-avatar></b-avatar>
                    <h2>{{ post.User.name }}</h2>
                </div>
                <div v-if="hasPostRole || isAdmin" class="user-actions">
                    <router-link
                        v-if="hasPostRole && post.id"
                        :to="{ name: 'modifyPost',
                        params: { id: post.id }}"
                    >
                        <b-button variant="success" class="btn-circle"><b-icon-pencil-fill></b-icon-pencil-fill></b-button>
                    </router-link>
                    <router-link
                        v-if="(hasPostRole || isAdmin) && post.id"
                        :to="{ name: 'deletePost',
                        params: { id: post.id }}"
                    >
                        <b-button variant="danger" class="btn-circle"><b-icon-trash-fill></b-icon-trash-fill></b-button>
                    </router-link>
                </div>
            </div>
            <div class="post">
                <h3 class="post-title">{{ post.title }}</h3>
                <p v-if="post.content" class="post-content">{{ post.content }}</p>
                <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="post-image">
            </div>
        </div>
        <!-- Comment Form -->
        <div class="card-groupomania" id="comment">
            <b-form class="form" @submit.prevent="submitForm">
                <b-form-group>
                    <b-form-textarea
                    placeholder="Commentaire"
                    rows="4"
                    max-rows="6"
                    v-model="$v.content.$model"
                    :class="{ 'is-invalid' : $v.content.$error, 'is-valid' : !$v.content.$invalid }"
                    ></b-form-textarea>

                    <b-form-invalid-feedback>Le commentaire est requis</b-form-invalid-feedback>
                    <b-form-valid-feedback>Champ valide</b-form-valid-feedback>
                </b-form-group>
                <b-button type="submit" variant="dark" :class="{ 'disabled' : invalidateFields }"><b-icon-chat-dots-fill></b-icon-chat-dots-fill> Envoyer</b-button>
            </b-form>
        </div>
        <!-- Comments -->
        <div class="card-groupomania" v-if="comments.length !== 0">
            <!-- Comment -->
            <div class="comment-card" v-for="(comment, index) in comments" :key="comment.id">
                <div class="user">
                    <div class="user-info" v-if="comment.User">
                        <b-avatar></b-avatar>
                        <h2>{{ comment.User.name }}</h2>
                    </div>
                    <div class="user-actions" v-if="hasCommentRole(index) || isAdmin">
                        <router-link 
                        v-if="hasCommentRole(index) && comment.id" 
                        :to="{ name: 'modifyComment',
                        params: { postId: comment.postId, id: comment.id }}"
                        >
                            <b-button variant="success" class="btn-circle"><b-icon-pencil-fill></b-icon-pencil-fill></b-button>
                        </router-link>

                        <router-link
                        v-if="(hasCommentRole(index) || isAdmin) && comment.id"
                        :to="{ name: 'deleteComment',
                        params: { postId: comment.postId, id: comment.id }}"
                        >
                            <b-button variant="danger" class="btn-circle"><b-icon-trash-fill></b-icon-trash-fill></b-button>
                        </router-link>
                    </div>
                </div>
                <div class="comment-content">
                    <p>{{ comment.content }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="card-groupomania">
        <h1><b-icon-exclamation-triangle></b-icon-exclamation-triangle> Aucun post trouvé</h1>
        <p>Le post que vous voulez afficher n'existe pas/plus. Retrouvez la liste des posts sur la page d'accueil.</p>
        <router-link :to="{ name: 'allPosts' }">
            <b-button variant="primary"><b-icon-house-door-fill></b-icon-house-door-fill>  Accueil</b-button>
        </router-link>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    import { required } from 'vuelidate/lib/validators'

    export default {
        name: 'Single-post',

        mounted: function() {
            this.$store.dispatch('getOnePost', this.$route.params.id);
            this.$store.dispatch('getAllComments', this.$route.params.id);
            this.$store.dispatch('getUserInfos');
        },

        data() {
            return {
                content: '',
            }
        },

        validations: {
            content: {
                required
            }
        },

        computed: {
            ...mapState({
                post: 'post',
                comments: 'comments',
                userInfos: 'userInfos'
            }),

            ...mapGetters({
                hasPostRole: 'hasPostRole',
                hasCommentRole: 'hasCommentRole',
                isAdmin: 'isAdmin'
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
            submitForm() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.$store.dispatch('createComment', {
                        id: this.$route.params.id,
                        newComment: {
                            content: this.content,
                            userId: this.userInfos.id
                        }
                    }).then(function() {
                        window.location.reload();
                    }, function(error) {
                        console.log(error);
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .single-post {
        background: #FFF;
        border: 1px solid #0dcaf0;
        padding: 25px !important;
        margin-bottom: 25px;
    }

    .single-post .post {
        margin-bottom: 0;
    }

    .comment-card {
        background: #FFF;
        border: 1px solid #0dcaf0;
        background: #F2F2F2;
        padding: 15px;
        margin-bottom: 15px;
    }

    .comment-card:last-child {
        margin-bottom: 0;
    }

    .comment-card .user {
        margin-bottom: 10px;
    }

    .user {
        margin-bottom: 20px;
    }

    .comment-content p {
        font-size: 14.5px;
        font-weight: 300;
        margin-bottom: 5px;
    }
</style>
