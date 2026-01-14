import {defineStore} from 'pinia'
import {assetsService} from '@/services/assets.service'

export const useAssetsStore = defineStore('assets', {
    state: () => ({
        /** @type {{ symbol: string, name: string, category: string, current_price: number | null, updated_at: string | null }} */
        assets: {}
    }),
    actions: {
        async getAllAssets() {
            const data = await assetsService.getAll()
            console.log('data', data)
            this.assets = data
        },
    }
})