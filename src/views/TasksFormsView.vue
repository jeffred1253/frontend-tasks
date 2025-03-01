<script>
    import apiClient from "../api/axios";
    import router from "../router";
    export default {
        data() {
            return {
                titre: '',
                description: '',
                echeance: '',
                statut: '',
            }
        },
        props: {
            taskid: Number
        },
        methods: {
            // Insertion d'une nouvelle tâche
            insert() {
                try {
                    console.log(taskid)
                    apiClient.post('/addTask', {
                        titre: this.titre,
                        description: this.description,
                        echeance: this.echeance,
                        statut: this.statut,
                    })
                        .then(res => {
                            if (res.status == 200) {
                                router.push("/myTasks");
                            }
                        })
                        .catch(err => console.log(err));
                } catch (error) {
                    console.error("Erreur lors de l'insertion d'une nouvelle tâche : " + error)
                }
            },
            // Modification d'une tâche
            update() {
                try {
                    apiClient.post('/updateTask/' + this.taskid, {
                        titre: this.titre,
                        description: this.description,
                        echeance: this.echeance,
                        statut: this.statut,
                    })
                        .then(res => {
                            if (res.status == 200) {
                                router.push("/myTasks");
                            }
                        })
                        .catch(err => console.log(err));
                } catch (error) {
                    console.error("Erreur lors de la mise à jour d'une tâche : " + error)
                }
            }
        }
    }
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div class="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-center mb-4">
                {{ taskid ? "Modifier la tâche" : "Créer une tâche" }}
            </h2>
            <form @submit.prevent="!taskid ? insert() : insert()" class="space-y-4">
                <input type="hidden" name="id" v-if="taskid" :value="taskid">
                
                <div>
                    <label for="titre" class="block text-sm font-medium text-gray-700">Titre</label>
                    <input type="text" id="titre" v-model="titre" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" id="description" v-model="description"
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label for="echeance" class="block text-sm font-medium text-gray-700">Échéance</label>
                    <input type="date" id="echeance" v-model="echeance"
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label for="statut" class="block text-sm font-medium text-gray-700">Statut</label>
                    <select id="statut" v-model="statut" required
                        class="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="En attente">En attente</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </div>
                
                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    {{ taskid ? "Mettre à jour" : "Créer" }}
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>