<template>
    <div class="card-groupomania">
        <h1><b-icon-trash-fill></b-icon-trash-fill> Supprimer le compte</h1>
        <p>Etes vous sûr de vouloir supprimer ce compte ? Cette action est irréversible.</p>
        <b-button variant="danger" @click="deleteUser()"><b-icon-trash-fill></b-icon-trash-fill> Supprimer</b-button>
    </div>
</template>

<script>
    export default {
        name: 'Delete-users',

        mounted: function() {
            this.$store.dispatch('getUserInfos');
        },

        methods: {
            deleteUser() {
                const self = this;
                this.$store.dispatch('deleteUser')
                    .then(function() {
                        self.$store.dispatch('logout');
                        self.$router.push('/');
                    }, function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style></style>
