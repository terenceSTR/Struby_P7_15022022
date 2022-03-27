<template>
    <header>
        <b-navbar toggleable="lg" type="light" variant="info" fixed="top">
            <b-container>
                <b-navbar variant="faded" type="dark">
                    <b-navbar-brand>
                        <img src="../../assets/images/logo.png" class="d-inline-block align-top logo" alt="Groupomania">
                    </b-navbar-brand>
                </b-navbar>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <li v-if="status != 'login'" class="nav-item">
                            <router-link to="/signup" class="nav-link"><b-icon-person-plus-fill></b-icon-person-plus-fill> Inscription</router-link>
                        </li>
                        <li v-if="status != 'login'" class="nav-item">
                            <router-link to="/" class="nav-link" exact><b-icon-box-arrow-in-right></b-icon-box-arrow-in-right> Connexion</router-link>
                        </li>
                        <li v-if="status == 'login'">
                            <b-button @click="createPost()" pill variant="danger" class="btn-black"><b-icon-plus-circle-fill></b-icon-plus-circle-fill> Poster</b-button>
                        </li>
                        <li v-if="status == 'login'" class="nav-item">
                            <router-link to="/posts" class="nav-link" exact><b-icon-list></b-icon-list> Tous les posts</router-link>
                        </li>
                        <b-nav-item-dropdown v-if="status == 'login' && userName" right>
                            <template #button-content><b-icon-person-fill></b-icon-person-fill> {{ userName }}</template>
                            <li>
                                <router-link to="/modify-user" class="dropdown-item">
                                    <b-icon-pencil-fill></b-icon-pencil-fill> Modification(s)
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/delete-user" class="dropdown-item">
                                    <b-icon-trash-fill></b-icon-trash-fill> Suppression
                                </router-link>
                            </li>
                            <div v-if="isAdmin" class="dropdown-divider"></div>
                            <b-dropdown-item v-if="isAdmin" @click="allUsers()">
                                <b-icon-person-lines-fill></b-icon-person-lines-fill> Administration
                            </b-dropdown-item>
                            <div class="dropdown-divider"></div>
                            <b-dropdown-item @click="logout()">
                                <b-icon-box-arrow-in-left></b-icon-box-arrow-in-left> Déconnexion
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </header>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Header-general',

        mounted: function() {
            if (this.$store.state.user.userId != -1) {
                this.$store.commit('SET_STATUS', 'login')
            }
        },

        computed: {
            ...mapState({
                status: 'status'
            }),

            ...mapGetters({
                userName: 'userName',
                isAdmin: 'isAdmin'
            }),
        },

        methods: {
            logout: function() {
                this.$store.dispatch('logout');
                this.$router.push('/');
            },

            createPost: function() {
                this.$router.push('/create-post');
            },

            allUsers: function() {
                this.$router.push('/admin/users');
            }
        }
    }
</script>

<style scoped src="./Header.css"></style>
