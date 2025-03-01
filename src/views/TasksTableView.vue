<script>
    import apiClient from '../api/axios'

    /*const tasks = [
        {id: "1", titre: "Manger", description:"Consommer un aliment", echeance:"2025-02-28", statut:"En attente"},
        {id: "2", titre: "Boire", description:"Consommer un une boisson", echeance:"2025-02-28", statut:"Terminé"},
        {id: "3", titre: "Dormir", description:"Se reposer pendant un moment", echeance:"2025-02-28", statut:"En attente"},
        {id: "4", titre: "Travailler", echeance:"2025-02-28", statut:"En cours"}
    ]*/

    export default {
        data() {
            return {
                tasks: [],
                searchKey: '',
                statutKey: 0
            }
        },
        computed: {
            // Filtrage des données récupérées suisvant la valeur insérée dans la barre de recherche
            filteredTasks() {
                try {
                    let statutSelect = ""
                    switch (this.statutKey) {
                        case '1':
                            statutSelect = "En attente"
                            break;
                        case '2':
                            statutSelect = "En cours"
                            break;
                        case '3':
                            statutSelect = "Terminé"
                            break;
                    
                        default:
                            break;
                    }

                    // Filtrage par statut
                    let filterStatut = this.tasks.filter((task) => {
                        return task.statut.toLowerCase().includes(statutSelect.toLowerCase())
                    })

                    // Filtrage par titre
                    return filterStatut.filter((task) => {
                        return task.titre.toLowerCase().includes(this.searchKey.toLowerCase())
                    })
                } catch (error) {
                    console.error('Erreur au cours du filtrage des données : ', error);
                }
            }
        },
        mounted() {
            this.getTasks();
        },
        methods: {
            // Confirmation de suppression de la tâchesélectionnée
            confirmDelete(task) {
                try {
                    let confirme = window.confirm("Voulez-vous vraiment Supprimer la tâche '" + task.titre + "' ?")
                    if (confirme == true) {
                        apiClient.delete('/remove/' + task.id)
                        this.getTasks();
                        console.log(task.titre + " supprimé")
                    }
                } catch (error) {
                    console.error('Erreur pendant la suppression de données : ', error);
                }
            },
            // Récupération des tâches de l'utilisateur connecté
            async getTasks() {
                try {
                    const response = await apiClient.get('/myTasks')
                    this.tasks = response.data
                } catch (error) {
                    console.error('Erreur pendant la récupération de données : ', error);
                }
            }
        }
    }

</script>

<template>
    <div class="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <h1 class="text-2xl font-semibold text-center mb-4">Liste des tâches</h1>
        
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
                <input v-model="searchKey" type="search" placeholder="Recherche..."
                    class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                
                <select v-model="statutKey" class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="0">Toutes</option>
                    <option value="1">En attente</option>
                    <option value="2">En cours</option>
                    <option value="3">Terminé</option>
                </select>
            </div>
            <router-link :to="`/newTask`">
                <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Ajouter</button>
            </router-link>
        </div>
        
        <table class="w-full border-collapse border border-gray-300 shadow-sm">
            <thead class="bg-gray-100">
                <tr>
                    <th class="p-3 border border-gray-300">Titre</th>
                    <th class="p-3 border border-gray-300">Description</th>
                    <th class="p-3 border border-gray-300">Date d'échéance</th>
                    <th class="p-3 border border-gray-300">Statut</th>
                    <th colspan="2" class="p-3 border border-gray-300">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in filteredTasks" :key="task.id" class="text-center hover:bg-gray-50 transition">
                    <td class="p-3 border border-gray-300">{{ task.titre }}</td>
                    <td class="p-3 border border-gray-300">{{ task.description }}</td>
                    <td class="p-3 border border-gray-300">{{ task.echeance }}</td>
                    <td class="p-3 border border-gray-300">{{ task.statut }}</td>
                    <td class="p-3 border border-gray-300">
                        <router-link :to="`/updateTask/${task.id}`">
                            <button class="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition">Modifier</button>
                        </router-link>
                    </td>
                    <td class="p-3 border border-gray-300">
                        <button @click="confirmDelete(task)" class="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<style scoped>

</style>
