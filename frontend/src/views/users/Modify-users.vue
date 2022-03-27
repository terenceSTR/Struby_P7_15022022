<template>
    <div class="card-groupomania">
        <h1><b-icon-pencil-fill></b-icon-pencil-fill> Modifier le compte</h1>

        <b-form @submit.prevent="submitForm" class="form">
            <b-form-group label="Nom" label-for="name">
                <b-form-input
                id="name"
                placeholder="Entrer votre nom"
                type="text"
                autofocus
                v-model="$v.name.$model"
                :class="{ 'is-invalid' : $v.name.$error, 'is-valid' : !$v.name.$invalid }"
                ></b-form-input>

                <b-form-invalid-feedback>Le nom est requis</b-form-invalid-feedback>
                <b-form-valid-feedback>Le nom est valide</b-form-valid-feedback>
            </b-form-group>

            <b-form-group label="Email" label-for="email">
                <b-form-input
                id="email"
                :value="email"
                type="email"
                required
                disabled
                ></b-form-input>
            </b-form-group>
        
            <b-button type="submit" variant="success" :class="{ 'disabled' : invalidateFields }"><b-icon-pencil-fill></b-icon-pencil-fill> Modifier</b-button>
        </b-form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'

    export default {
        mounted: function() {
            this.$store.dispatch('getUserInfos');
        },

        validations: {
            name: {
                required
            }
        },

        computed: {
            name: {
                get() {
                    return this.$store.state.userInfos.name;
                },
                set(newName) {
                    this.$store.commit('SET_USER_NAME', newName)
                }
            },

            email: {
                get() {
                    return this.$store.state.userInfos.email;
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
                    this.$store.dispatch('editUserName', { 
                    name: this.name 
                    }).then(function() {
                        console.log('Utilisateur modifié avec succès !')
                    }, function(error) {
                        console.log(error);
                    });
                }
            }
        }
    }
</script>

<style></style>
