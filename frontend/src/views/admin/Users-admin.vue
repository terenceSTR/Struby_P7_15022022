<template>
    <div class="card-groupomania">
        <h1><b-icon-person-lines-fill></b-icon-person-lines-fill> Utilisateurs</h1>
        <table class="table table-striped table-responsive" v-if="users.length !== 0">
            <thead>
                <tr>

                    <th scope="col">Nom</th>
                    <th scope="col">Rôle</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ user.name }}</th>
                    <td>{{ getUserRole(index) }}</td>
                    <td>
                        <router-link v-if="user.id" :to="{ name: 'adminModifyUser', params: { id: user.id } }">
                            <b-button variant="success" class="btn-circle"><b-icon-pencil-fill></b-icon-pencil-fill></b-button>
                        </router-link>
                        <router-link v-if="user.id" :to="{ name: 'adminDeleteUser', params: { id: user.id } }">
                            <b-button variant="danger" class="btn-circle"><b-icon-trash-fill></b-icon-trash-fill></b-button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>Aucun utilisateur pour le moment</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Users-admin',

        mounted: function() {
            this.$store.dispatch('getUserInfos');
            this.$store.dispatch('getAllUsersByAdmin');
            
            if (!this.$store.state.userInfos.isAdmin) {
                this.$router.push('/');
                return;
            }
        },

        computed: {
            ...mapState({
                users: 'users'
            }),

            ...mapGetters({
                getUserRole: 'getUserRole'
            })
        }
    }
</script>

<style scoped>
    td a:first-child button {
        margin-left: 0;
    }
</style>
