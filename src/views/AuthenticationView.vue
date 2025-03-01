<script>
    import apiClient from "../api/axios";
    import router from "../router";
    export default {
        data() {
            return {
                name: '',
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
                            if (res.status == 200) {
                                router.push("/myTasks");
                            }
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
                            if (res.status == 200) {
                                router.push("/myTasks");
                            }
                            console.log(`${localStorage.getItem("token")}`);
                        })
                        .catch(err => console.log(err));
                } catch (error) {
                    console.error("Erreur d'authentification : " + error)
                }
            },
        }
    }
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-center mb-4">
                {{ isRegistration ? "Créer un compte" : "Connexion" }}
            </h2>
            <form @submit.prevent="!isRegistration ? login() : register()" class="space-y-4">
                <div v-if="isRegistration">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                    <input type="text" id="name" v-model="name" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" v-model="email" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <input type="password" id="password" v-model="password" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div v-if="isRegistration">
                    <label for="confPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                    <input type="password" id="confPassword" v-model="confPassword" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    {{ isRegistration ? "Enregistrer" : "Se connecter" }}
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>