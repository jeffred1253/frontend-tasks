<script>
    import apiClient from "../api/axios";
    export default {
        data() {
            return {
                email: '',
                password: '',
                confPassword: ''
            }
        },
        props: {
            isRegistration: Boolean
        },
        methods: {
            // Connexion d'un utilisateur enregistré
            login() {
                try {
                    apiClient.post('/login', {
                        email: this.email,
                        password: this.password
                    })
                        .then(res => {
                            localStorage.setItem("token", res.data.token);
                            //router.push("/");
                            console.log(`${localStorage.getItem("token")}`);
                        })
                        .catch(err => console.log(err));
                } catch (error) {
                    console.error("Erreur d'authentification : " + error)
                }
            },
            // Enregistrement d'un nouvel utilisateur
            register() {
                try {
                    if (this.password != this.confPassword) {
                        alert('Mot de passe différent du mot de passe de confirmation !')
                        console.log(this.password)
                        console.log(this.confPassword)
                        return
                    }
                    apiClient.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                        .then(res => {
                            localStorage.setItem("token", res.data.token);
                            //router.push("/");
                            console.log(`${localStorage.getItem("token")}`);
                        })
                        .catch(err => console.log(err));
                } catch (error) {
                    console.error("Erreur d'authentification : " + error)
                }
            },
            // Sélectionne entre register et login la fonction à exécuter
            authSwitcher() {
                if (this.isRegistration) {
                    return this.register
                } else {
                    return this.login
                }
            }
        }
    }
</script>

<template>
    <div>
        <form @submit.prevent="!isRegistration ? login() : register()">
            <div v-if="isRegistration">
                <label for="name">Nom d'utilisateur</label>
                <input type="text" name="name" id="name" v-model="name" required>
            </div><br>
            <label for="email">Email : </label>
            <input type="email" name="email" id="email" v-model="email" required><br>
            <label for="password">Mot de passe : </label>
            <input type="password" name="password" id="password" v-model="password" required><br>
            <div v-if="isRegistration">
                <label for="confPassword">Confirmer le mot de passe</label>
                <input type="password" name="confPassword" id="confPassword" v-model="confPassword" required>
            </div><br>
            <button type="submit">{{ !isRegistration ? "Se connecter" : "Enregistrer" }}</button>
        </form>
    </div>
</template>

<style scoped>

</style>