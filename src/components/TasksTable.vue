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
    <h1>Liste des tâches</h1>
    <input v-model="searchKey" type="search" placeholder="Recherche..." />
    <select v-model="statutKey">
        <option value="0">Toutes</option>
        <option value="1">En attente</option>
        <option value="2">En cours</option>
        <option value="3">Terminé</option>
    </select>
    <table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Date d'échéance</th>
                <th>Statut</th>
                <th colspan="2">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in filteredTasks" :key="task.id">
                <td>{{ task.titre }}</td>
                <td>{{ task.description }}</td>
                <td>{{ task.echeance }}</td>
                <td>{{ task.statut }}</td>
                <td><button>Modifier</button></td>
                <td><button @click="confirmDelete(task)">Supprimer</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>
