<template>
    <div class="card-groupomania">
        <h1><b-icon-pencil-fill></b-icon-pencil-fill> Modifier le rôle</h1>

        <b-form @submit.prevent="submitForm" class="form">
            <div class="form-group">
                <div class="form-check form-check-inline">
                    <input v-model="isAdmin" class="form-check-input" type="radio" name="role" id="admin" :value="true" checked>
                    <label class="form-check-label" for="admin">Administrateur</label>
                </div>
                <div class="form-check form-check-inline">
                    <input v-model="isAdmin" class="form-check-input" type="radio" name="role" id="user" :value="false">
                    <label class="form-check-label" for="user">Utilisateur</label>
                </div>
            </div>
            <b-button type="submit" variant="success"><b-icon-pencil-fill></b-icon-pencil-fill> Modifier</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: 'Modify-admin',

        mounted: function() {
            this.$store.dispatch('getUserInfos');
            this.$store.dispatch('getUserInfosByAdmin', this.$route.params.id);

            if (!this.$store.state.userInfos.isAdmin) {
                this.$router.push('/');
                return;
            }
        },

        computed: {
            isAdmin: {
                get() {
                    return this.$store.state.userInfosByAdmin.isAdmin;
                },
                set(newRole) {
                    this.$store.commit('SET_USER_ROLE', newRole);
                }
            }
        },

        methods: {
            submitForm() {
                const self = this;
                this.$store.dispatch('editUserRole', {
                    isAdmin: this.isAdmin
                })
                .then(function() {
                    self.$router.push('/admin/users')
                }, function(error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style></style>
