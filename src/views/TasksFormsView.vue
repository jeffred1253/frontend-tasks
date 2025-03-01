<script>
    export default {
        data() {
            return {
                titre,
                description,
                echeance,
                statut
            }
        },
        props: {
            newTask: Boolean
        },
        methods: {
            // Insertion d'une nouvelle tâche
            insert() {
                try {
                    apiClient.post('/addTask', {
                        titre: this.titre,
                        description: this.description,
                        echeance: this.echeance,
                        statut: this.statut,
                    })
                        .then(res => {
                            //router.push("/");
                            console.log();
                        })
                        .catch(err => console.log(err));
                } catch (error) {
                    console.error("Erreur lors de l'insertion d'une nouvelle tâche : " + error)
                }
            },
            // Modification d'une tâche
            update() {
                try {
                    apiClient.post('/updateTask/' + this.id, {
                        titre: this.titre,
                        description: this.description,
                        echeance: this.echeance,
                        statut: this.statut,
                    })
                        .then(res => {
                            //router.push("/");
                            console.log();
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
    <div>
        <form @submit.prevent="!newTask ? update() : insert()">
            <div>
                <label for="titre">Titre : </label>
                <input type="text" name="titre" id="titre" v-model="titre">
            </div><br>
            <div>
                <label for="description">Description : </label>
                <input type="text" name="description" id="description" v-model="description">
            </div><br>
            <div>
                <label for="echeance">Echeance : </label>
                <input type="date" name="echeance" id="echeance" v-model="echeance">
            </div>
            <div>
                <label for="statut">Statut : </label>
                <select name="statut" id="statut" v-model="statut">
                    <option value="En attente">En attente</option>
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                </select>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>