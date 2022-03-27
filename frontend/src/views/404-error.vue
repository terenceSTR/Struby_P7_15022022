<template>
    <div class="card-groupomania">
        <h1><b-icon-exclamation-triangle></b-icon-exclamation-triangle> Erreur 404... Page introuvable</h1>
        <p>La page que vous cherchez semble introuvable. Veuillez retourner à la page d'accueil.</p>
        <router-link :to="{ name: 'allPosts' }">
            <b-button variant="primary"><b-icon-house-door-fill></b-icon-house-door-fill>  Accueil</b-button>
        </router-link>
    </div>
</template>

<script>
    export default {}
</script>

<style></style>