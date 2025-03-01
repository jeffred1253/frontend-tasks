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
    <div class="p-6 flex justify-center">
        <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="bg-blue-500 text-white text-center py-4 text-lg font-semibold">
                My Tasks Status
            </div>
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr class="bg-gray-100 text-gray-700">
                        <th class="p-4 border border-gray-300">En attente</th>
                        <th class="p-4 border border-gray-300">En cours</th>
                        <th class="p-4 border border-gray-300">Terminé</th>
                        <th class="p-4 border border-gray-300">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="text-center text-gray-800 bg-white hover:bg-gray-50 transition">
                        <td class="p-4 border border-gray-300">{{ attente }}</td>
                        <td class="p-4 border border-gray-300">{{ cours }}</td>
                        <td class="p-4 border border-gray-300">{{ termine }}</td>
                        <td class="p-4 border border-gray-300 font-semibold text-blue-600">{{ total }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
