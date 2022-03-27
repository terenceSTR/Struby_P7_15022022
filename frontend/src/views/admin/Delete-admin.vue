<template>
    <div class="card-groupomania">
        <h1><b-icon-trash-fill></b-icon-trash-fill> Supprimer l'utilisateur</h1>
        <p>Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible...</p>
        <b-button variant="danger" @click="deleteUser()"><b-icon-trash-fill></b-icon-trash-fill> Supprimer</b-button>
    </div>
</template>

<script>
    export default {
        name: 'Delete-admin',

        mounted: function() {
            this.$store.dispatch('getUserInfos');
            this.$store.dispatch('getUserInfosByAdmin', this.$route.params.id);

            if (!this.$store.state.userInfos.isAdmin) {
                this.$router.push('/');
                return;
            }
        },

        methods: {
            deleteUser() {
                const self = this;
                this.$store.dispatch('deleteUserByAdmin')
                    .then(function() {
                        self.$router.push('/admin/users');
                    }, function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style></style>
