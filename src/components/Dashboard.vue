<script>
    import apiClient from '../api/axios'

    export default {
        data() {
            return {
                attente: 0,
                cours: 0,
                termine: 0,
                total: 0
            }
        },
        mounted() {
            this.getStats();
        },
        methods: {
            // Récupération des statistiques de l'utilisateur connecté
            async getStats() {
                try {
                    const response = await apiClient.get('/stats')
                    console.log(response)
                    this.attente = response.data.attente
                    this.cours = response.data.cours
                    this.termine = response.data.termine
                    this.total = response.data.total
                } catch (error) {
                    console.error('Erreur pendant la récupération des statistiques : ', error);
                }
            }
        }
    }
</script>

<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th colspan="4"><h4>My tasks statuts</h4></th>
                </tr>
                <tr>
                    <th>En attente</th>
                    <th>En cours</th>
                    <th>Terminé</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ attente }}</td>
                    <td>{{ cours }}</td>
                    <td>{{ termine }}</td>
                    <td>{{ total }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
