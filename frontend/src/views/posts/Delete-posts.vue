<template>
    <div class="card-groupomania">
        <h1><b-icon-trash-fill></b-icon-trash-fill> Supprimer le post</h1>
        <p>Etes vous sûr de vouloir supprimer ce post ? Cette action est irréversible.</p>
        <b-button variant="danger" @click="deletePost()"><b-icon-trash-fill></b-icon-trash-fill> Supprimer</b-button>
    </div>
</template>

<script>
    export default {
        name: 'Delete-posts',

        mounted: function() {
            this.$store.dispatch('getOnePost', this.$route.params.id);
        },

        methods: {
            deletePost: function() {
                const self = this;
                this.$store.dispatch('deletePost')
                    .then(function() {
                        self.$router.push('/')
                    }, function(error) {
                        console.log(error);
                    })
            }
        }
    }
</script>

<style></style>
